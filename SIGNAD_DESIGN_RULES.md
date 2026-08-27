# SIGNAD VEHICLE DESIGN MASTER GUIDELINES

> These rules are permanently embedded in the Signad vehicle wrap design generator logic (`src/pages/MyDesign.jsx` → `buildPrompt`). All AI-generated mockups must conform to these rules. Do not remove or weaken any rule without explicit approval.

---

## 1. Multi-View Generation Rule

When the user generates a design, produce **all 4 perspective views simultaneously** in a synchronized 2×2 layout:

1. **Left Side View** — full left side panel
2. **Right Side View** — full right side panel
3. **Front View** — front grille, headlights, and hood/bonnet
4. **Rear View** — back of vehicle, tailgate/rear window, rear bumper area

All four views are generated in a single batch operation and displayed together in the preview grid.

---

## 2. Strict Layout & Design Constraints

### Symmetrical & Consistent Sides
- Left and Right side views **must have identical branding layout**, logo size, colors, and visual proportions.
- All text, phone numbers, and URLs must remain **properly oriented and fully readable** on both sides — never mirrored or inverted.

### Bumper Exclusion
- Front and rear bumpers must remain **100% clean / original factory paint or plastic**.
- No graphics, decals, text, or wrap patterns on bumpers — ever.

### License Plate Exclusion
- Keep all license/number plates **clean and standard**.
- Never overlay graphics, logos, or promotional text on plates.

### Additional Exclusions
- No road signs, traffic signs, warning signs, directional signs, or signboard-style graphics on or near the rear bumper.
- No red-and-white chevron hazard tape, safety striped tape, or diagonal striped bands across the tailgate or rear bumper.
- No reflective safety stripes or hazard warning bands unless explicitly toggled on by the user (rear chevron option).

---

## 3. Wrap Coverage Hierarchy

The selected coverage type is passed into the AI generation prompt:

| Coverage | AI Instruction |
|---|---|
| **Full Wrap** | 100% coverage across full vehicle body panels. Complete color change and full branding across all side panels, doors, hood, roof, tailgate, and rear quarter panels (excluding bumpers and plates). |
| **Half / Partial Wrap** | 50–60% coverage. Factory paint on the front half (hood, front doors, front fenders). Graphics and branding applied exclusively to the rear half: rear doors, rear quarter panels, tailgate, and rear window area. |
| **Simple Signage / Spot Decals** | Pure factory body paint. Clean cut-vinyl spot logos on front doors, bonnet logo, and phone/website text on rear tailgate only. No full-panel graphics. |

---

## 4. Branding & Lead Integration

### Primary Brand
- **"Signad"** / **"Signad Vehicle Graphics"**
- Never display template or placeholder names like "WrapPro", "WrapPro Visuals", or similar.
- When no custom company name is provided, default to "Signad Vehicle Graphics".

### Contact Defaults
- **Phone:** 027-4320-180 / 021-0296-4174
- **Location:** Auckland, New Zealand

### Export & Summary
- All 4 generated views (Left, Right, Front, Rear) are displayed in the Design Summary modal and exportable as PDF.
- The selected wrap coverage type is included in:
  - The Design Summary modal (UI + PDF export)
  - The quote request submission payload (QuoteRequest entity `message` field)
  - The lead capture email notification to the Signad team

---

## Implementation Reference

| Rule | Location |
|---|---|
| Multi-view generation | `src/pages/MyDesign.jsx` → `VIEWS` array + `handleGenerate` |
| Prompt builder | `src/pages/MyDesign.jsx` → `buildPrompt(view, form, rear)` |
| Wrap coverage logic | `buildPrompt` → `wrapCoverageInstruction` |
| Symmetry rule | `buildPrompt` → `symmetryRule` (applied to left & right views) |
| Bumper & plate exclusion | `buildPrompt` → `exclusionRules` |
| Signad branding rule | `buildPrompt` → `brandingRule` |
| Design summary + PDF | `src/components/design/DesignSummary.jsx` |
| Lead capture + quote request | `src/components/ShareLeadCapture.jsx` |
| CompanyProfile entity (wrap_type) | `base44/entities/CompanyProfile.jsonc` |