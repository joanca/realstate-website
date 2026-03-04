# Listings Widget Technical Notes

This document explains how the legacy WordPress listings widget is integrated into the React app and how to debug it.

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
3. It triggers legacy processing by firing:

```js
jQuery(document).trigger('flbuilder-render-updated')
```

4. The Moxi utils bundle (`minify-b-utils-...js`) listens for that event and runs its internal `ProcessGetWidgets` function.

Important: `ProcessGetWidgets` is inside a closure in the legacy script and is not reliably available on `window`.

## Why Localhost Needed a Proxy

Legacy code builds widget URL from:

- `document.body.getAttribute('data-sitebase-lang') + '/services/get-widget/'`

When app origin is `http://localhost:3000`, cross-origin requests to `https://emilybrealty.com/services/get-widget/` fail in browser XHR (`status: 0`) due to CORS restrictions.

### Dev Fix Implemented

1. `vite.config.ts` defines a proxy:
   - `/services/*` -> `https://emilybrealty.com/services/*`
2. `Listings` detects localhost and temporarily overrides:
   - `data-sitebase-lang` from `https://emilybrealty.com` to `http://localhost:3000`
3. On unmount, it restores the original `data-sitebase-lang` value.

This keeps production behavior unchanged and enables local development.

## Current Symptoms and Meaning

If logs show:

- `processedPlaceholderPresent: true`
- `cardsCount: 0`

then the placeholder was processed but cards were not materialized in the DOM.

This usually means one of these states:

1. AJAX returned HTML but no matching `[data-propcard-listing-id]` entries.
2. Returned HTML has card payload shells (`.searchcard-listing`) but the follow-up processor (`WMS.propertycards.SearchCardProcess`) did not fully hydrate visible content.
3. A required legacy dependency loaded late or failed before card rendering stage.

## Debugging Signals (Already Added)

`Listings` currently logs:

- trigger context (`jQuery`, `WMS`, `wp.hooks`, `siteBaseLang`, placeholder state)
- AJAX success/error for `/services/get-widget/`
- response length and number of listing cards in response
- portal lifecycle and retry-stop reason

Console prefix:

- `[ListingsWidget]`

## Known Issue: Empty Listing Card Shells

Symptom:

- Widget request succeeds.
- Container markup appears.
- Individual listing blocks exist, but visible card content is empty.

Likely cause:

- The server response includes card payload placeholders, but a later legacy hydration stage does not complete (`WMS.propertycards.SearchCardProcess` / related downstream handlers).

Practical verification checklist:

1. Confirm response quality
   - Check `[ListingsWidget] ajax success` log.
   - Verify `cardsInResponse > 0` and non-trivial `responseLength`.
2. Confirm processing stage
   - In DOM, inspect for `.searchcard-listing[data-raw-listing-obj]`.
   - Verify whether child content is still empty after retries.
3. Confirm required globals at processing time
   - `window.WMS`
   - `window.WMS.propertycards`
   - `window.WMS.propertycards.SearchCardProcess`
4. Confirm event lifecycle
   - Ensure `flbuilder-render-updated` is fired after placeholder exists.
   - Verify no script errors are thrown before hydration stage.
5. Confirm CSS/display constraints
   - Ensure card nodes are not present but hidden by host styles.

Recommended next debugging step:

- Add temporary logs around `search-cards-processed` and check whether it fires after widget injection. If not, the issue is likely in the legacy processing chain rather than the fetch layer.

## Production Behavior

On the real WordPress host (`https://emilybrealty.com`), no localhost override is applied.

- Requests go to same-origin `/services/get-widget/`
- Existing global scripts from WP are used
- React only provides the placeholder + trigger bridge

## Related Files

- `src/components/Listings.tsx`
- `src/App.tsx`
- `vite.config.ts`
- `src/App.test.tsx`
