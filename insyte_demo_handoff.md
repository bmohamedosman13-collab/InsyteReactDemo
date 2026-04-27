# Insyte Interactive Demo — Build Handoff

This document is the complete specification for building the Insyte interactive demo. Read it fully before writing any code. Reference materials accompany this document: `insyte_demo_walkthrough.html` (visual reference) and `insyte_demo_documents.md` (all content for the demo).

---

## 1. Project context

Insyte is a privacy-first NLP document intelligence platform for Alberta's social services, mental health, and nonprofit sectors. The product analyzes intake forms, case files, program reports, and clinical documentation to surface patterns, sentiment, and risk indicators that humans would miss in large document sets.

This project is **not** the production product. It is a **clickable interactive demo** for prospect conversations. All data is hardcoded. There is no backend, no real AI, no live document processing. The goal is to communicate the product vision to people at the ECVO Regional Nonprofit Roundtable on May 27, 2026, and at CPA2026 in Montreal June 3-8.

The deadline is May 27, 2026. Today is April 27, 2026. The build is solo by the founder.

**Hosted at:** `demo.tryinsyte.ca` (subdomain of the existing main site)
**Stack:** React + Vite + Tailwind CSS + Framer Motion
**Deployment:** Cloudflare Pages, connected to GitHub repo `InsyteReactDemo`
**Repository status:** Empty repo created by the founder, ready to receive a fresh Vite project

---

## 2. Brand and design system

### Brand identity

Insyte's brand is already established. It must not be deviated from in this demo.

- Primary brand color: **Midnight Plum** `#2D1B4E`
- Wordmark descriptor: **"Document Intelligence"**
- Motto (do not display in the demo, but for reference): "For the work that never stops."
- Logo mark: a circular scrawl with a rising thread and a 4-point diamond apex (use a simplified SVG approximation — see logo section below)

### Visual aesthetic

The demo uses an "ambient dark" aesthetic inspired by Railway, Linear, and Resend. The intent is to feel like a calm, intelligent, sophisticated tool rather than a busy SaaS dashboard.

### Color tokens

Use these as CSS custom properties or Tailwind theme extensions:

```
--plum-deep:    #0F0A1F   (base background)
--plum:         #2D1B4E   (Insyte primary brand)
--plum-mid:     #1A1230   (elevated surfaces, browser frames in mockups)
--accent:       #B4A4E8   (interactive accent: links, focus rings, primary CTAs)
--accent-soft:  #9F8FCF   (secondary accent)

--text-primary:    rgba(255,255,255,0.95)
--text-secondary:  rgba(255,255,255,0.65)
--text-tertiary:   rgba(255,255,255,0.4)

--border-subtle:   rgba(255,255,255,0.08)   (default card border)
--border-active:   rgba(255,255,255,0.15)   (hover state)

--card-bg:         rgba(255,255,255,0.03)
--card-bg-hover:   rgba(255,255,255,0.05)
```

For sentiment visualization, use these semantic colors (only in sentiment analysis output, not elsewhere):
- Positive sentiment bar: `#6BCFA8`
- Negative sentiment bar: `#E89BB0`
- Neutral sentiment bar: `#9F8FCF` (matches accent-soft)

### Typography

Two typefaces, loaded from Google Fonts:

- **Cormorant Garamond** (serif) — for display: page titles, big numbers, section headings, project titles
- **DM Sans** (sans-serif) — for everything else: body, buttons, table content, labels, navigation

Weights to use:
- Cormorant: 400 and 500 only
- DM Sans: 300, 400, 500

Eyebrow labels (small uppercase text above headings) use DM Sans 11px, uppercase, letter-spacing 0.12em, in `--accent` or `--text-tertiary` depending on context.

### Background atmosphere

Two layers, both fixed-position so they don't scroll:

1. **Dotted grid overlay** — 1px dots at `rgba(255,255,255,0.04)`, 32px spacing, fixed across the entire viewport
2. **Radial glow** — large ellipse roughly 1200×800px positioned top-center, gradient from `rgba(45,27,78,0.45)` at center to transparent at 70%, with a 40px blur applied. Low opacity, ambient feel.

Optional second smaller glow in opposite corner (bottom-left or bottom-right) at lower opacity for depth.

### Glassmorphic cards

All major content surfaces (sidebar, document table, analysis result panel, modals) use:
- `background: rgba(255,255,255,0.03)`
- `backdrop-filter: blur(12px)` (also `-webkit-backdrop-filter`)
- `border: 1px solid rgba(255,255,255,0.08)` (default)
- `border-radius: 12px` for cards, `16px` for larger containers
- Hover state: border becomes `rgba(255,255,255,0.15)`, slight upward translation (-2px) with smooth transition

### Motion (Framer Motion)

Use animations sparingly but with intentionality:
- Page mount: cards stagger fade-in, 80ms delay between each
- Card hover: subtle lift (translateY -2px), border brightens, 200ms ease
- Analysis loading state: 1.2 second fake delay with subtle accent-color pulse on the active button
- Result panel: slides in from below with spring physics (stiffness ~120, damping ~14)
- Modal open: backdrop fade + modal scale from 0.96 to 1.0
- Tooltip onboarding: slide in from edge after 400ms delay on first page mount

Never use animations longer than 600ms. Never use bouncy or playful easing. Everything should feel calm and confident.

### Logo

For the demo, use a simplified SVG logo mark. The Insyte logo is a circular scrawl with a 4-point diamond at the top. For the demo header, render approximately like this:

```
A 24px circle with 1.5px border in --accent color
A 6px square rotated 45 degrees positioned at the top, centered, in --accent solid fill
"Insyte" wordmark beside it in Cormorant Garamond, 24px, weight 500, in --text-primary
```

This is a placeholder approximation. The founder has the real brand assets and may swap them in later.

---

## 3. Architecture and routing

### File structure

```
src/
  data/
    documents.json          (all 21 documents from insyte_demo_documents.md)
    analysisResults.json    (hardcoded analysis outputs)
    projects.json           (sidebar lists for org and case)
  components/
    Layout/
      AppShell.jsx          (wraps everything: background atmosphere, top nav)
      TopNav.jsx
      AmbientBackground.jsx (dotted grid + radial glow)
    Workbench/
      Sidebar.jsx
      ProjectHeader.jsx
      DocumentTable.jsx
      AnalysisBar.jsx
      AnalysisPanel.jsx     (renders results based on type)
      EmptyWorkbench.jsx    (the "upload folders here to start" state)
    Documents/
      PreviewModal.jsx
      DocumentRenderer.jsx  (renders the document content nicely)
    Onboarding/
      Tooltip.jsx           (first-time guided tour)
      SuggestedChips.jsx    (free-roam suggestions, only appears after analysis button click)
    Analyses/
      KeywordSearch.jsx
      SentimentResult.jsx
      PatternResult.jsx
      RiskResult.jsx
  pages/
    Landing.jsx             (org vs case picker)
    OrgWorkbench.jsx
    CaseWorkbench.jsx
  App.jsx
  main.jsx
  index.css                 (Tailwind + global styles + font imports)
```

### Routes

```
/             → Landing (org vs case picker)
/org          → Organization workbench
/case         → Casework workbench
```

No authentication, no login screen. The founder explicitly removed login from scope to reduce friction in the demo flow.

### Data shape

`documents.json` contains all 21 documents structured like:

```json
{
  "org": [
    {
      "id": "doc-01",
      "title": "Bridges Program Quarterly Report",
      "type": "Program Report",
      "author": "Tara Whitford, Bridges Program Coordinator",
      "date": "2026-04-08",
      "displayDate": "Apr 8",
      "pages": 4,
      "sections": [
        { "heading": "Program Overview", "body": "..." },
        { "heading": "Outcomes", "body": "..." }
      ]
    }
  ],
  "case": [...]
}
```

`analysisResults.json` keys results by analysis type, scope (org or case), and query/scenario. Example shape:

```json
{
  "org": {
    "sentiment": { "summary": "...", "perDocument": [...], "citations": [...] },
    "pattern": {
      "performance": { "title": "...", "body": "...", "citations": [...] },
      "turnover":    { "title": "...", "body": "...", "citations": [...] },
      "disciplinary":{ "title": "...", "body": "...", "citations": [...] }
    },
    "risk": {
      "fraud":      { "title": "...", "body": "...", "citations": [...] },
      "dutyOfCare": { "title": "...", "body": "...", "citations": [...] }
    },
    "keyword": {
      "fallback": "Try a more specific term, or use one of the suggested patterns."
    }
  },
  "case": { ... }
}
```

`projects.json` is straightforward sidebar content with project names, document counts, and an active flag.

---

## 4. The page-by-page experience

This is the most important section. The flow has changed from the visual walkthrough HTML in two specific ways the founder requested:

1. **Documents do not appear immediately.** When a user enters the org or case workbench, they see a sidebar of previous projects on the left and an **empty workbench** on the right. The empty workbench shows a single prompt: "Upload folders here to start a new project."
2. **The suggested actions chips do not appear until the user clicks an analysis button.** They are not a permanent banner. They appear contextually after the user engages with analysis.

### Page 1: Landing (`/`)

Centered layout. No sidebar, no nav.

**Content (top to bottom, all centered):**
- Eyebrow: "Document Intelligence" in `--accent`, uppercase, 12px, letter-spacing 0.15em
- Page title: "Welcome to Insyte" in Cormorant Garamond 40px, weight 400
- Subtitle: "Choose a workspace to begin. This is an interactive demo using sample data." in `--text-secondary`, 15px, max-width 480px
- Two large cards side by side, max-width 720px total

**Cards:**

**Card 1 — Organization**
- Square icon (40×40px) in top-left of card, with 1px `--accent` border
- Title: "Organization" in Cormorant 24px
- Description: "For agencies, programs, and leadership reviewing documents across multiple cases, files, and reports."
- CTA: "Enter workspace →" in `--accent`

**Card 2 — Casework**
- Circle icon (40×40px) in top-left of card, with 1px `--accent` border
- Title: "Casework"
- Description: "For clinicians and caseworkers reviewing all documents related to a single client over time."
- CTA: "Enter workspace →"

**Behavior:** Click either card to navigate to `/org` or `/case`. Cards have hover lift and border brighten.

**No login.** No additional friction.

---

### Page 2: Organization workbench (`/org`)

This is the core experience. Read this section carefully because the flow has specific states.

**Top nav (persistent):**
- Insyte logo (mark + wordmark) on the left
- Mode pill toggle on the right showing "Organization" (active) and "Casework". Clicking Casework navigates to `/case`. Pills are styled as a small segmented control inside a glassmorphic container.

**Main layout below the nav: two columns**

**Left column — Sidebar (280px wide):**
- Label: "Projects" (eyebrow style)
- A list of previous projects. Each shows a name and a small meta line ("14 documents · Active"). One project is active (highlighted with a left border accent in `--accent` and `--text-primary` color). The other projects are dimmer (`--text-secondary`).
- Below the list: a "+ New project" button styled as a dashed-border tile in `--accent` color.

**Sidebar content for org:**
```
Q1 2026 Program Review     — 14 documents · Active     [active]
2025 Annual Report          — 28 documents
Bissell Partnership         — 11 documents
Funder Reports Q4           — 9 documents
+ New project              [dashed button]
```

Important: previous projects' documents do NOT appear in the main area. Each project's documents live within that project. Selecting a different project from the sidebar would, in production, load that project's documents. For the demo, only the active project ("Q1 2026 Program Review") has working content. Clicking other projects does nothing or shows a subtle "demo: this project is illustrative" tooltip — keep it gentle.

**Right column — Main workbench:**

This is where the state machine lives. The main area has multiple states:

#### State A: Empty workbench (initial state on first load)

This is what the user sees when they land on `/org` for the very first time, or when they click "+ New project."

The main area shows:
- A large empty area (no document table yet)
- Centered within it, a glassmorphic card with:
  - An upload icon (use a simple SVG: a square with an upward arrow, in `--accent`)
  - Heading in Cormorant 22px: "Upload folders here to start a new project"
  - Subtext in `--text-secondary` 13px: "Drag and drop, or click to browse. Insyte processes intake forms, case files, reports, and clinical documentation."
  - The whole card is dashed-border, `--border-active`, soft hover state

**Behavior:** Clicking this card or hovering it triggers a brief transition to State B (sample data loaded). In a real product, this would open a file picker. In the demo, it simulates an upload by showing a brief loading state (1.5 seconds with a subtle spinner or progress indicator), then transitions to State B.

**Transition message:** While loading or immediately after, a soft toast or inline message appears: "We've created samples for you and uploaded them. Preview what's inside each document."

#### State B: Documents loaded, no analysis run yet

This is the post-upload state. The main area now shows:

**Project header (top):**
- Project title: "Q1 2026 Program Review" in Cormorant 28px
- Subtitle: "Northbridge Youth Mental Health Society · Last updated April 14"
- On the right: two stat blocks
  - "14 Documents"
  - "0 Analyses run" (this updates as the user runs analyses)

**Document table (middle):**
A glassmorphic table with these columns:
- Document name (with a small doc icon)
- Type
- Date
- Action (Preview button)

Display all 14 org documents. Each row has hover state. Each row's Preview button opens the document modal.

**Analysis bar (bottom):**
Four buttons in a horizontal grid, equal width:
- Keyword search
- Sentiment
- Pattern
- Risk

Each button is glassmorphic with a small "01", "02", "03", "04" eyebrow label and the analysis name in Cormorant 17px. Hover state brightens border to `--accent`.

**Important: at this point, there are NO suggested action chips visible.** The chips only appear after the user clicks an analysis button.

**Onboarding tooltip (first visit only):**
On first arrival at State B, show a tooltip card positioned near the document table:
- Eyebrow: "Welcome"
- Body: "We've loaded a sample organization for you to explore. Click any document to preview, or pick an analysis below to begin."
- Bottom row: "Step 1 of 4" + "Next →"

The tooltip is dismissable. After dismissal it doesn't reappear (use sessionStorage or React state).

The tooltip walks through 4 steps:
1. Welcome (shown above)
2. Documents — "Click Preview on any document to see its full contents"
3. Analyses — "Choose an analysis below. Each one looks at all 14 documents at once."
4. Citations — "Every insight links back to the source documents that informed it."

After step 4 or dismissal, the user is in free-roam mode.

#### State C: Analysis active

When the user clicks any of the four analysis buttons, the workbench transforms:

- The clicked button gets an active state (filled background in `--accent`, text in `--plum-deep`)
- A panel slides in below the analysis bar containing the result
- **Suggested actions chips appear** as a horizontal strip just above or below the analysis result, styled in a glassmorphic strip with a "Try" eyebrow label, showing 3-4 contextual scenarios for that analysis type

The chips are different per analysis:

**Keyword search chips:**
- "fraud"
- "burnout"
- "waitlist"
- "suicidal ideation"

**Sentiment chips:**
- "All documents"
- "Just the program reports"
- "Just internal emails"

**Pattern chips:**
- "Programs by performance"
- "Staff turnover and retention"
- "Disciplinary actions across programs"

**Risk chips:**
- "Fraud or financial irregularity"
- "Duty of care or client safety"

When a user clicks a chip, the analysis re-runs with that scenario and the panel updates. The current chip is highlighted as active.

For Pattern and Risk, there is also a free-text input where users can type custom queries. If they type something that matches one of the prebuilt scenarios via simple keyword matching, run that. If it doesn't match, show a graceful fallback:

> "This pattern requires the full Insyte product. Try one of the suggested patterns to see a live demo result."

### Analysis panel content

Each analysis renders differently. The shape of each:

**Keyword search:**
Input bar at top. Below it: list of document hits with the matched line of text highlighted in `--accent`, plus a count of total matches per document. Each hit is clickable to open the source document.

**Sentiment:**
Top: project-level summary paragraph (2-3 sentences).
Below: per-document sentiment bars showing each document's sentiment score on a horizontal bar centered at zero. Positive scores extend right in `#6BCFA8`, negative scores extend left in `#E89BB0`. Score values shown numerically beside each bar in Cormorant 16px.
Bottom: citation chips listing source documents.

**Pattern:**
Top: pattern title in Cormorant 22px (e.g., "Staff turnover and retention").
Body: paragraph(s) of insight text, with key document references rendered as inline `--accent` colored links with a dotted underline.
Bottom: citation chips for each contributing document, clearly labeled (e.g., "Doc 5: Staffing Roster").

**Risk:**
Same shape as Pattern, but with a search input at the top so users can type their risk query (or click a chip).
Result text emphasizes the risk findings with appropriate clinical/professional caution.
Citations at the bottom.

### State D: Document preview modal

When a user clicks "Preview" on any row, a modal opens.

The modal is centered, max-width 720px, with a dark backdrop overlay (rgba(0,0,0,0.6)) behind it.

**Modal header (in `--plum`):**
- Document title on the left (DM Sans, 13px, 500 weight, white)
- Close button (✕) on the right

**Modal body (in a light cream background like `#FAFAF7` for contrast and realism):**
The document content rendered to look like an actual Word document or report:
- Top section with organization name as small uppercase label, then the document title in Cormorant 28px in `--plum`, then author and date metadata in DM Sans 12px, all separated by a 2px `--plum` border below
- Body sections with H2 headings in Cormorant 20px in `--plum`, body text in DM Sans 14px in dark gray (#2A2A2A), comfortable line height (1.7)
- Comfortable padding (48px horizontal, 32px vertical)
- Scrollable if content is long, max-height 480px

**Modal footer (optional):**
- A subtle "Demo mode: download disabled" line in tertiary text. This signals the capability exists in production without requiring file generation.

Click outside the modal or click ✕ to close. ESC key also closes.

---

### Page 3: Casework workbench (`/case`)

Same skeleton as the org workbench. The differences:

**Sidebar:** Shows previous patients instead of projects. The active patient is M.J. Other entries are dummy.

```
M.J.        — 7 documents · 8 weeks    [active]
K.T.        — 12 documents
D.A.        — 5 documents
+ New patient
```

**Project header:**
- Title: "M.J." in Cormorant 28px
- Subtitle: "21yo · MDD moderate · Treating: Dr. R. Marcoux · Since Feb 17"
- Stats on the right:
  - "9 Current PHQ-9"
  - "−8 From intake"

**Documents:** Same table treatment as org, but showing the 7 patient documents from `documents.json`.

**Analyses:** Same 4-button bar, but analysis content is keyed to the patient case.

**Suggested chips for casework:**

Pattern chips:
- "Mood trajectory across journal"
- "Sleep and mood pattern"
- "Social withdrawal trajectory"

Risk chips:
- "Suicidal ideation or self-harm"

Sentiment is patient-level only (single client, no comparison across programs).

**Empty state for casework:** Same pattern as org. First entry shows "Upload patient files here to start a new chart" with the same upload-and-load behavior.

---

## 5. Content

All content for documents and analysis results is provided in the accompanying file `insyte_demo_documents.md`. That file contains:

- 14 organization documents (program reports, financials, HR documents, internal emails, board minutes, etc.) for the fictional Northbridge Youth Mental Health Society
- 7 individual case documents (intake assessment, PHQ-9 baseline, two SOAP notes, journal entries for one week, treatment plan update, PHQ-9 follow-up) for fictional patient M.J.
- A "Demo Analysis Hooks" section at the end with all the hardcoded analysis output text

Convert that markdown content into structured JSON for `documents.json` and `analysisResults.json` during the build. Preserve all the document interconnections — many documents are deliberately cross-referenced (e.g., the petty cash thread runs through Doc 4, 6, 9, and 14) so analyses can stitch them together convincingly.

The analysis hooks at the bottom of the documents file include:

**Org sentiment** — project-level summary plus per-program sentiment bars
**Org pattern** — three scenarios: program performance, staff turnover and retention, disciplinary actions
**Org risk** — two scenarios: fraud/financial irregularity, duty of care/client safety
**Case sentiment** — patient-level mood trajectory
**Case pattern** — sleep/mood relationship, social withdrawal trajectory
**Case risk** — suicidal ideation tracking

Each output includes citation chips listing which documents contributed.

---

## 6. Strict content constraints

Two non-negotiable constraints from the founder:

1. **Never use em dashes** anywhere in the UI copy, code comments, or documentation. Use commas, parentheses, or rephrase.
2. **Never break the brand.** No colors outside the defined palette. No fonts outside Cormorant Garamond and DM Sans. No styling that conflicts with the Midnight Plum primary.

---

## 7. Build order

Build in this exact order. Each step should result in something visible and testable before moving to the next.

1. **Initialize project.** Vite + React + Tailwind. Install Framer Motion, React Router, Lucide React for icons. Configure Tailwind with the custom color tokens. Set up the font imports for Cormorant Garamond and DM Sans.

2. **Build the AppShell.** Top nav with logo and mode pills. AmbientBackground component with dotted grid and radial glow. Test that it looks right on a blank page.

3. **Build the Landing page.** The two-card picker. Routing to `/org` and `/case`. This is the simplest page and serves as a sanity check that the design system is working.

4. **Build the workbench skeleton.** Sidebar component, project header component, empty state component. Wire them up at `/org` showing the empty workbench. The sidebar should show the project list. The main area should show the upload card.

5. **Add the upload-to-loaded transition.** Click the upload card → 1.5 second loading state → State B with documents loaded. Show the toast message about samples being created.

6. **Build the document table.** Render all 14 org documents from `documents.json`. Style rows with hover states. Make the Preview button visually distinct.

7. **Build the document preview modal.** Render document content in cream-colored document layout. ESC to close, click outside to close. Test with a few different documents to make sure formatting holds.

8. **Build the analysis bar.** Four buttons in a row. Active state styling. Click handlers that toggle which analysis is shown.

9. **Build the analysis panels one at a time.** Start with Sentiment because it has the most visual structure (the bars). Then Pattern. Then Risk. Then Keyword. Each one renders results from `analysisResults.json`.

10. **Add the suggested action chips.** Make them appear only when an analysis button is clicked. Wire chip clicks to update the analysis with different scenarios.

11. **Add the onboarding tooltip system.** Multi-step tooltip that shows on first visit. Use sessionStorage to track completion.

12. **Replicate everything for the casework workbench at `/case`.** Most components are reused. Just swap data sources.

13. **Polish pass.** Animations, transitions, loading states, empty states. Make sure every hover, click, and state change feels intentional.

14. **Deploy.** Push to GitHub repo `InsyteReactDemo`. Connect Cloudflare Pages. Configure DNS so `demo.tryinsyte.ca` points to the deployment.

---

## 8. Things to watch out for

A few specific traps to avoid:

**Don't over-animate.** This is a serious clinical-adjacent product. Calm and confident, not bouncy or playful. If an animation calls attention to itself, it's wrong.

**Don't use real patient data anywhere.** Even the fictional case is anonymized to "M.J." and contains no realistic identifying details. Don't add anything that could be mistaken for real clinical data.

**Don't make the demo feel like marketing.** No "click here to learn more" or sales-y language. The demo speaks in the voice of the product itself: clinical, calm, professional.

**Don't forget the empty states.** The empty workbench is the first impression after the user picks a mode. It must feel intentional and inviting, not broken.

**Don't add features beyond scope.** No real file upload. No real authentication. No real AI calls. No backend. The temptation will arise mid-build to "just add a quick API call." Resist. The hardcoded data is the entire point.

**Don't break the brand.** Midnight Plum is the soul of this product. Cormorant Garamond and DM Sans are the voice. Anything else dilutes the identity.

**Don't use em dashes.** Commas, parentheses, or sentence restructuring. Anywhere they appear, replace them.

---

## 9. Deployment notes

Once the build is complete:

1. Test thoroughly in dev mode (`npm run dev`)
2. Build production bundle (`npm run build`) and test the dist output locally
3. Initialize git, commit, and push to the existing `InsyteReactDemo` GitHub repository
4. In Cloudflare Pages, connect to the GitHub repo and configure:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node version: 18 or higher
5. Once deployed, configure custom domain `demo.tryinsyte.ca` in Cloudflare Pages. The main `tryinsyte.ca` is already on Cloudflare so this is a subdomain addition rather than a new zone.

---

## 10. Acceptance criteria

The demo is ready for ECVO when:

- A prospect can land on the URL, see the picker, and choose a workspace
- The empty state correctly invites them to create a new project
- Clicking the upload card simulates document loading and reveals the 14 org documents
- Each document opens in a clean preview modal showing realistic content
- Each of the four analyses produces a polished, believable result with source citations
- The suggested chips offer clickable variations of each analysis
- The casework workbench works the same way for the patient case
- The whole experience feels calm, intentional, and professional
- Nothing crashes, nothing looks broken, nothing reveals the demo is hardcoded
- The site loads at `demo.tryinsyte.ca` reliably

---

## 11. After ECVO

The demo will continue to be useful at CPA2026 in early June and in ongoing customer discovery conversations. Things that may be added in the post-ECVO iteration:

- Saved analysis history
- Export to PDF for individual analyses
- Loading state polish
- Light mode option for clinical settings
- A "back to landing" affordance for users who want to switch modes

These are explicitly out of scope for the May 27 deliverable.

---

## End of handoff

Reference materials:
- `insyte_demo_walkthrough.html` — visual reference of all major screens
- `insyte_demo_documents.md` — full content for all 21 documents and analysis hooks

Questions or ambiguity? Ask the founder before guessing.
