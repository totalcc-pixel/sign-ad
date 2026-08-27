import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const siteUrl = body.siteUrl || 'sc-domain:signad.co.nz';
    const startDate = body.startDate || new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const endDate = body.endDate || new Date().toISOString().slice(0, 10);

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('google_search_console');

    // 1. List sites
    const sitesRes = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    const sitesData = await sitesRes.json();

    // 2. Search analytics - query performance
    const analyticsRes = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ['date'],
        rowLimit: 1000
      })
    });
    const analyticsData = await analyticsRes.json();

    // 3. Query by query (top search queries)
    const queriesRes = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 20
      })
    });
    const queriesData = await queriesRes.json();

    // 4. Query by page (top pages)
    const pagesRes = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 20
      })
    });
    const pagesData = await pagesRes.json();

    // 5. Sitemaps
    const sitemapsRes = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    const sitemapsData = await sitemapsRes.json();

    return Response.json({
      sites: sitesData.siteEntry || [],
      analytics: analyticsData.rows || [],
      topQueries: queriesData.rows || [],
      topPages: pagesData.rows || [],
      sitemaps: sitemapsData.sitemap || []
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}