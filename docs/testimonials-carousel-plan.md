# Testimonials Carousel Plan

## Goal

Build an infinite testimonials carousel using `embla-carousel-react`.

## Decisions

- Use `embla-carousel-react` as the carousel engine.
- Add `embla-carousel-react` as a local `devDependency`.
- Add an `importmap` entry for `embla-carousel-react` in:
  - `src/index.start.html`
  - `src/embedded.start.html`
- Configure Embla with `loop: true` for infinite wraparound.
- Desktop shows 3 visible testimonial cards.
- Mobile shows 1 visible testimonial card.
- Navigation advances by 1 testimonial at a time on both desktop and mobile.
- Keep `TestimonialsSummary` and `TestimonialCard` as separate subcomponents.
- Use a reusable `Carousel` component.
- Do not introduce carousel context in the first version.

## Incremental Plan

### 1. Add Embla to the project

Install `embla-carousel-react` as a local dependency for development and type resolution.

Requirements:
- add `embla-carousel-react` to `package.json`
- keep existing scripts unchanged

Acceptance:
- local code can import `embla-carousel-react`
- dependency is locked in `pnpm-lock.yaml`

### 2. Add Embla to browser import maps

Update the import maps used by the production-style entrypoints.

Files:
- `src/index.start.html`
- `src/embedded.start.html`

Requirements:
- add an `embla-carousel-react` import entry
- preserve the existing React import map entries
- use `https://aravena.me/static/esm/embla-carousel-react@8.6.0`

Acceptance:
- `.start.html` entrypoints can resolve `embla-carousel-react`

### 3. Expand the testimonial data source

Update `useTestimonials()` so it no longer returns only 3 testimonials.

Requirements:
- keep the mapped item shape:
  - `quote`
  - `publicationDate`
- keep loading behavior unchanged
- keep fallback behavior unchanged
- return all fetched testimonials or a capped larger set such as 9 or 12

Acceptance:
- `TestimonialsSection` receives more than 3 testimonials when available
- current UI still renders correctly before carousel behavior is added

### 4. Create a reusable `Carousel` component backed by Embla

Create a generic `Carousel` component that uses `useEmblaCarousel`.

Initial responsibilities:
- accept `items`
- accept `renderItem`
- accept `ariaLabel`
- initialize Embla with `loop: true`
- render the viewport and track structure

First version constraints:
- no context
- no dots yet
- no custom animation beyond Embla behavior

Acceptance:
- the first slide renders correctly through the new component
- Embla is mounted and usable from React code

### 5. Model each testimonial as an individual slide

Render one testimonial per Embla slide.

Requirements:
- each slide renders one `TestimonialCard`
- desktop layout shows 3 slides at once
- mobile layout shows 1 slide at once

Acceptance:
- desktop visibly shows 3 cards
- mobile visibly shows 1 card

### 6. Replace the testimonials grid with `Carousel`

Use `Carousel` inside `TestimonialsSection`.

`TestimonialsSection` should remain responsible for:
- fetching testimonials
- summary row
- stars image URL
- bottom link

`Carousel` should render `TestimonialCard` items through `renderItem`.

Acceptance:
- the section remains structurally simple
- cards render through `Carousel` instead of a static grid

### 7. Add previous and next controls

Add navigation buttons to the Embla-backed carousel.

Behavior:
- previous uses `emblaApi.scrollPrev()`
- next uses `emblaApi.scrollNext()`
- `loop: true` handles infinite wraparound

Acceptance:
- next from the last slide wraps correctly
- previous from the first slide wraps correctly
- each click advances by 1 testimonial

### 8. Add responsive slide sizing

Use CSS to control how many slides are visible.

Requirements:
- mobile slide width = 100%
- desktop slide width = one-third of the viewport, accounting for gap
- preserve the existing card spacing and appearance

Acceptance:
- mobile shows 1 visible card
- desktop shows 3 visible cards
- layout remains aligned with the current bubble design

### 9. Add accessibility

Add accessible carousel controls and region labeling.

Requirements:
- label carousel region, for example `Testimonials carousel`
- label buttons:
  - `Previous testimonial`
  - `Next testimonial`

Acceptance:
- controls are understandable for assistive technology
- the carousel has a meaningful accessible label

### 10. Add optional polish

After the basic Embla carousel works, polish the presentation.

Possible follow-ups:
- arrow positioning
- spacing adjustments
- keyboard support
- dots later if needed

Acceptance:
- carousel behavior is stable before cosmetic refinements are added

## Notes

- Ignore dots for now.
- Keep the summary row centered on mobile in one line.
- Keep using the same stars image in the summary and testimonial cards.
- `src/index.html` and `src/embedded.html` do not hold the import maps for this workflow; the relevant updates belong in the `.start.html` files.
- Embla CDN URL for the import maps: `https://aravena.me/static/esm/embla-carousel-react@8.6.0`
