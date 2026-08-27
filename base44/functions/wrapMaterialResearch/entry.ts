import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    const body = await req.json().catch(() => ({}));

    // Auth: if user context exists, verify admin; scheduled workflow has no user
    let userEmail = null;
    try {
      const user = await base44.auth.me();
      if (user) {
        if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });
        userEmail = user.email;
      }
    } catch (_) {}

    // Determine recipient email — explicit param > caller's email > first admin user
    let recipient = body.email || userEmail;
    if (!recipient) {
      const users = await base44.asServiceRole.entities.User.list();
      const admin = users.find(u => u.role === 'admin');
      if (admin) recipient = admin.email;
    }
    if (!recipient) return Response.json({ error: 'No recipient email found' }, { status: 400 });

    // Search the web for the latest new vehicle wrapping vinyl products
    const prompt = `Search the web for the latest NEW vehicle wrapping vinyl products released recently (within the last few weeks to months). Focus on:
- New vinyl wrap film products (new colors, textures, finishes)
- New product launches from major brands (3M, Avery Dennison, Oracal, KPMF, Hexis, Inozetek, Teckwrap, Vvivid, etc.)
- New colors, patterns, or finishes (matte, satin, gloss, metallic, chrome, color-shift, textured, forged carbon, etc.)
- Recent announcements or releases from manufacturers

For each product found, provide: product name, brand, key features (color/texture/finish), and source link if available.
Return up to 10 of the most notable new products. Only include products that are genuinely new releases, not older established products.`;

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      add_context_from_internet: true,
      model: 'gemini_3_flash',
      response_json_schema: {
        type: 'object',
        properties: {
          products: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                product_name: { type: 'string' },
                brand: { type: 'string' },
                features: { type: 'string' },
                source_link: { type: 'string' }
              }
            }
          }
        }
      }
    });

    const products = result.products || [];

    // Build HTML email report
    const today = new Date().toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' });

    let htmlBody = `<div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #F39C12; border-bottom: 2px solid #F39C12; padding-bottom: 10px; margin: 0 0 8px 0;">🚗 Vehicle Wrap Vinyl — New Products Report</h1>
      <p style="color: #888; font-size: 13px;">Report generated: ${today}</p>`;

    if (products.length === 0) {
      htmlBody += `<p style="color: #666;">No notable new products found today. Check back tomorrow.</p>`;
    } else {
      htmlBody += `<p style="color: #666;">Found <strong>${products.length}</strong> new product(s):</p>`;
      products.forEach((p, i) => {
        htmlBody += `
        <div style="background: #f9f9f9; border-left: 4px solid #F39C12; padding: 12px 16px; margin: 12px 0; border-radius: 4px;">
          <h3 style="margin: 0 0 6px 0; color: #333; font-size: 16px;">${i + 1}. ${p.product_name || 'Unknown Product'}</h3>
          <p style="margin: 2px 0; color: #555; font-size: 14px;"><strong>Brand:</strong> ${p.brand || '—'}</p>
          <p style="margin: 2px 0; color: #555; font-size: 14px;"><strong>Features:</strong> ${p.features || '—'}</p>
          ${p.source_link ? `<p style="margin: 6px 0 0 0;"><a href="${p.source_link}" style="color: #F39C12; font-size: 14px;">View source →</a></p>` : ''}
        </div>`;
      });
    }

    htmlBody += `<hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
      <p style="color: #aaa; font-size: 12px;">This is an automated daily report from Signad Vehicle Graphics.</p>
    </div>`;

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: recipient,
      subject: `🚗 Vehicle Wrap Vinyl — Daily New Products Report (${today})`,
      body: htmlBody
    });

    return Response.json({ success: true, productsFound: products.length, sentTo: recipient });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}