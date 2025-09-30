# Design Refresh Plan

## Objectives

-   Deliver a modern, minimal aesthetic while preserving the existing
    page flow and static asset setup.
-   Keep the glassmorphism DNA but update the palette, typography
    rhythm, and component treatments for stronger contrast and focus.
-   Maintain accessibility (color contrast, focus states) and
    mobile-first responsiveness across the 420 px shell.

## Strategy Overview

1.  **Token-led palette reset:** Rework global CSS variables in
    `assets/css/styles.css` so a neutral base, refined accent, and warm
    translucent surfaces drive the entire theme.
2.  **Surface + depth adjustments:** Tweak blur, borders, and shadows on
    glass components to feel softer and more consistent with
    contemporary marketplace apps.
3.  **Navigation polish:** Lighten the bottom navigation chrome, refine
    icon treatments, and balance the primary action without altering
    navigation logic.
4.  **Typography & spacing refinements:** Increase legibility and
    hierarchy with new heading weights, line heights, and tighter
    spacing rules that align with the refreshed palette.
5.  **Illustrative assets & iconography:** Swap mixed icon styles and
    avatars for a consistent line set and updated imagery that mirrors
    the new tone.
6.  **Motion & feedback cleanup:** Ensure transitions,
    micro-interactions, and focus states harmonize with the reduced
    visual noise.

## Detailed Plan

### 1. Palette & Global Tokens

-   Replace the deep purple gradient with a gradient anchored in dark
    charcoal and a single accent (e.g., electric teal or soft amber)
    using `--primary-color`, `--primary-color-light`, and body
    background rules.
-   Introduce secondary support tokens (e.g., `--accent-muted`,
    `--surface-bg`, `--surface-border`) to create subtle contrast tiers
    for cards, navigation, and overlays.
-   Update text variables to a warm gray-on-dark combination
    (`--text-color`, `--text-color-dark`) that maintains AAA contrast on
    primary surfaces.
-   Reassess shadow tokens (`--shadow-light`, `--shadow-strong`) to
    reduce glow in favor of diffused elevation that matches the calmer
    palette.

### 2. Glass Surfaces & Cards

-   Adjust `.glass-card` backdrop blur to 16px with lower opacity to
    soften the frosted look, and pair with the new border token for less
    "icy" edges.
-   Standardize card padding, corner radii, and hover elevations so
    marketing cards, dog profiles, and booking summaries read as the
    same component family.
-   Introduce a lightweight card header style (subtle divider, uppercase
    microcopy) for sections that need clearer labeling without heavier
    colors.

### 3. Buttons & CTAs

-   Flatten `.btn-primary` by reducing drop shadows, increasing border
    radius to match the rest of the system, and aligning hover states
    with the accent color.
-   Define a focus ring token (`--focus-ring`) and apply consistent
    focus outlines across `.btn`, `.icon-button`, and navigation
    actions.
-   Revisit `.btn-secondary` and `.btn-danger` to ensure contrast and
    hover states harmonize with the updated surfaces and text tokens.

### 4. Navigation & App Chrome

-   Lighten `.bottom-nav` background to a semi-opaque neutral surface
    that floats over the gradient, with a subtle top border or blur to
    delineate space.
-   Update `.nav-item` typography and icon colors to align with the new
    accent, ensuring the active state is indicated through a color fill
    and soft pill highlight rather than heavy glows.
-   Refine the central primary action (currently the "Book Walk" pill)
    into a round, accent-colored icon button or outlined pill to reduce
    weight but keep affordance.

### 5. Typography & Layout Rhythm

-   Establish a typographic scale (e.g., 14/16 body, 20/28 section
    headings, 24/32 hero) and update corresponding CSS selectors
    (`.page h1`, `.section-title`, etc.).
-   Increase vertical spacing within `.main-content` and section
    wrappers, using consistent spacing utilities to separate modules
    without introducing additional DOM changes.
-   Align key copy blocks to left and limit center-aligned text to hero
    or CTA moments to improve scan patterns on small screens.

### 6. Imagery, Icons, and Avatars

-   Replace mixed icon sets with a consistent 2px stroke icon family;
    update SVGs or inline icons referenced in `index.html` to ensure
    visual consistency.
-   Refresh avatar placeholders to rounded rectangles or circles with
    soft gradients that match the new palette; adjust image masks if
    necessary.
-   Audit illustrations within booking and profile flows to confirm they
    complement the refreshed color system and do not reintroduce old
    hues.

### 7. Motion & Feedback

-   Fine-tune `stagger-in` or slide animations to use shorter durations
    and ease curves that feel snappier; keep transitions consistent
    across pages.
-   Ensure loading spinners, success toasts, and error banners inherit
    the new accent colors and maintain sufficient contrast.
-   Add subtle press/hover feedback for cards and buttons using scale
    and shadow changes aligned with the adjusted elevation tokens.

## Implementation Phases

1.  **Token groundwork:** Update CSS variables, gradient background, and
    global typography defaults; verify contrast and adjust shadows.
2.  **Component theming:** Apply new tokens to cards, buttons, bottom
    navigation, and modal overlays; audit states and interactions.
3.  **Asset refresh:** Replace icons and avatars, update SVG references,
    and ensure imagery uses the refined palette.
4.  **Polish & QA:** Review motion timings, accessibility (focus states,
    contrast), and perform cross-device checks at 375--428 px widths.

## Risks & Mitigations

-   **Contrast regressions:** Use tooling (e.g., Stark, manual checks)
    to confirm new palette stays above accessibility thresholds.
-   **Asset inconsistency:** Maintain an asset manifest to track updated
    icons/illustrations and avoid mixing old and new visuals during the
    transition.
-   **Performance:** Ensure heavier blur or shadow values do not impact
    mobile performance by testing on lower-powered devices after
    adjustments.

## Success Criteria

-   The home screen, booking flow, and profile sections share a
    cohesive, modern visual language without altering user flow.
-   All primary actions remain immediately recognizable with improved
    focus states and clear hierarchy.
-   Visual refresh achieves a calmer, marketplace-aligned appearance
    while retaining the lightweight static architecture.
