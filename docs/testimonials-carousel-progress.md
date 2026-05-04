# Testimonials Carousel Progress

## Status

Planning only. No Embla implementation yet.

## Completed Decisions

- Extracted `TestimonialsSummary` as a subcomponent
- Extracted `TestimonialCard` as a subcomponent
- Confirmed the carousel should use `embla-carousel-react`
- Confirmed the carousel should use `loop: true` for infinite wraparound
- Confirmed desktop should show 3 visible testimonials
- Confirmed mobile should show 1 visible testimonial
- Confirmed navigation should advance by 1 testimonial at a time
- Confirmed the same stars image should be used in the summary and in the testimonial cards
- Confirmed `embla-carousel-react` must be added both as a local `devDependency` and in the `.start.html` import maps

## Next Implementation Steps

1. Add `embla-carousel-react` to `package.json`
2. Add `embla-carousel-react` to the import maps in:
   - `src/index.start.html`
   - `src/embedded.start.html`
3. Update `useTestimonials()` to return more than 3 testimonials
4. Create a reusable Embla-backed `Carousel` component
5. Move testimonial rendering in `TestimonialsSection` into `Carousel`
6. Add previous and next controls using Embla APIs
7. Add responsive slide sizing for 1-up mobile and 3-up desktop
8. Add accessibility labels and polish

## Open Questions

- None currently

## Risks To Watch

- `useTestimonials()` currently limits the dataset to 3 items, which blocks true carousel behavior
- import maps must be updated in the `.start.html` files, not the built `.html` files
- Embla import map URL to use: `https://aravena.me/static/esm/embla-carousel-react@8.6.0`
- slide sizing needs to preserve the current bubble spacing while showing 3 cards on desktop
