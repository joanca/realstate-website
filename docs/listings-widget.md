# Listings Widget Technical Notes

This document explains how the legacy WordPress listings widget is integrated into the React app, what failed locally, and the fixes now in place.

## What the Widget Is

The listings block is not a React-native data source. It is a legacy Moxi/WordPress widget pipeline that:

1. Finds placeholder elements with `data-get-widget`.
2. Calls `/services/get-widget/` with merged query params.
3. Injects returned HTML into the target container.
4. Runs legacy jQuery/WMS processing to convert listing payloads into rendered cards/slider UI.

## Runtime Flow in This Repo

Component: `src/components/Listings.tsx`

1. `Listings` creates a light-DOM portal node right after `#emily-realestate`.
2. It renders a legacy-compatible placeholder:
   - `data-get-widget="{...}"`
   - `data-target-parent="yes"`
   - `data-widget-check="[data-propcard-listing-id]"`
3. It triggers legacy processing via:

```js
jQuery(document).trigger('flbuilder-render-updated')
```

4. Legacy bundles listen for that event and run widget processing (`ProcessGetWidgets` and downstream handlers).

Important: `ProcessGetWidgets` is inside legacy closures and is not a stable global API.

## Why Localhost Needed a Proxy

Legacy code builds widget URL from:

- `document.body.getAttribute('data-sitebase-lang') + '/services/get-widget/'`

When app origin is `http://localhost:3000`, direct XHR to `https://emilybrealty.com/services/get-widget/` fails due to CORS.

### Dev Fix Implemented

1. `vite.config.ts` proxy:
   - `/services/*` -> `https://emilybrealty.com/services/*`
2. `Listings` detects localhost + cross-origin `data-sitebase-lang` and temporarily sets:
   - `data-sitebase-lang = window.location.origin`
3. On unmount, original `data-sitebase-lang` is restored.

## What We Learned During Debugging

### 1) `cardsCount > 0` can still mean "not actually hydrated"

The response and DOM can contain listing shells while visible card rendering is still incomplete. We now track both:

- Hydrated card selector: `[data-propcard-listing-id]`
- Shell selector: `.searchcard-listing[data-raw-listing-obj]`

### 2) `get-widget-processed` is not a reliable stop signal

`processedPlaceholderPresent` can stay false even when the pipeline progresses. We no longer rely on it to stop retries.

### 3) Missing legacy deps were the real blocker

Local embed initially failed with:

- `WMS.propertycards.SearchCardProcess` undefined
- `jQuery.fn.CreatePanelSlider` not a function

Root cause: stale embedded script URLs in `embedded.html` versus current production-minified bundles.

### 4) Additional hidden dependency: `quicktagsL10n`

After loading newer `jquery-ui-core` fallback bundle, local hit:

- `ReferenceError: quicktagsL10n is not defined`

Production includes inline `quicktags-js-extra` before that bundle. Local did not, so a shim was required.

## Current Localhost Robustness (Now Implemented)

`Listings.tsx` now includes localhost fallback behavior (only when local proxy mode is active):

1. Readiness gate before triggering
   - `flbuilder-render-updated` fires only when all are ready:
     - `jQuery.fn`
     - `jQuery.fn.CreatePanelSlider`
     - `WMS.propertycards.SearchCardProcess`

2. Fallback legacy script injection
   - If readiness is missing on localhost, inject:
     - `minify-b-utils-308272f61f1dd2c74483441c316e3a30.js`
     - `minify-b-helpers-1ee421ddc2805789a72e4793e539f2d7.js`
     - `minify-b-jquery-ui-core-b9fa3ca169d8baa2628ab7f9ca4c6e50.js`

3. `quicktagsL10n` shim
   - If `window.quicktagsL10n` is missing, apply fallback object before injecting script bundle.

4. Retry loop stop condition improved
   - Stop only when cards are present and hydration readiness is true, or max attempts reached.

This avoids stopping early on shell-only DOM state.

## Debugging Signals Available

Console prefix:

- `[ListingsWidget]`

Current logs include:

- trigger context (`jquery`, `CreatePanelSlider`, `WMS`, `SearchCardProcess`, `wp.hooks`, `siteBaseLang`)
- placeholder and portal state
- pre/post counts for hydrated cards and shell cards
- ajax success/error for `/services/get-widget/`
- `cardsInResponse` and `shellCardsInResponse`
- `search-cards-processed` event log
- fallback injection lifecycle (start/success/failure)
- retry stop reason including `hydrationReady`

## Interpreting Common Log Patterns

### Healthy local progression

- `ajax success` with non-trivial `responseLength`
- `cardsInResponse > 0`
- readiness flags eventually true (`CreatePanelSlider`, `SearchCardProcess`)
- `trigger end` with non-zero card/shell counts
- retry loop stops with `hydrationReady: true`

### Shell-only/incomplete hydration

- `shellCardsCount > 0` but visible content missing
- readiness still false for `SearchCardProcess` and/or other deps
- script error appears before card processing completes

### Script-pack drift after WP deploy/minify cache rotate

If localhost breaks again after upstream deploy:

- likely fallback URL hash drifted
- refresh fallback script URLs from current production page source

## Production Behavior

On real host (`https://emilybrealty.com`):

- no localhost `data-sitebase-lang` override
- no fallback script injection
- no `quicktagsL10n` shim
- existing WP script chain is used directly
- React continues to act as placeholder + trigger bridge only

## Related Files

- `src/components/Listings.tsx`
- `src/App.tsx`
- `vite.config.ts`
- `src/App.test.tsx`
- `docs/listings-widget.md`
