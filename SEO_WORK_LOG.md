# SEO Work Log — Knights Curry Express

> **Date:** October 26, 2025  
> **Scope:** On-site technical SEO — no visible UI changes made

---

## Summary

All changes are invisible to users. The goal was to add correct page-specific metadata, structured data (JSON-LD), canonical URLs, and internal links to existing copy — following the keyword strategy targeting **late-night Indian food near UCF** as the primary phrase.

---

## Expected Impact — What These Changes Will Do

### 🔍 Unique page titles in Google search results
**Change:** Each page now has its own `title` and `description` instead of all pages inheriting the root layout's homepage title.

**Impact:** Google will now show a different, relevant title and snippet for each page in search results. Before this, searching for "Knights Curry Express hours" or "Indian food platters UCF" could return any page showing the same generic "Best Indian Food in Orlando" title — giving users no signal about which page actually answers their query.

---

### 📍 Better ranking signal for local searches
**Change:** Primary keyword `late-night Indian food near UCF` placed in the `<title>` and `<meta description>` of the Late Night Specials page.

**Impact:** Google now understands this page is specifically about late-night dining near UCF. This improves its chance of appearing when someone searches `late-night Indian food near UCF`, `Indian food open late Orlando`, or similar local queries — which was not signalled at all before.

---

### 🗂️ Breadcrumb trails in search results
**Change:** `BreadcrumbList` JSON-LD added to Late Night Specials, Location & Hours, and all 9 menu category pages.

**Impact:** Google may display breadcrumb trails (e.g. `knightscurryexpress.com › Menu › Biryani & Rice Specials`) directly below the page title in search results. This makes the listing look more structured and trustworthy, and gives users a clearer idea of where the page sits — which typically improves click-through rate.

---

### 🏪 Richer business identity for Google
**Change:** Restaurant JSON-LD on the homepage was improved with a stable `@id`, `priceRange`, `servesCuisine` as a proper array, and verified `sameAs` Instagram link. The incorrect `/menu` redirect was removed.

**Impact:** Google builds a knowledge graph of businesses. A consistent, well-formed schema with a stable `@id` and accurate `sameAs` links helps Google associate the website with the correct business entity — which can improve the restaurant's Knowledge Panel accuracy and local search presence.

---

### 🔗 Internal link equity to the platters page
**Change:** The word "platters" in the existing Late Night Specials hero copy now links to `/menu/platters`.

**Impact:** Internal links pass ranking signals between pages. The Late Night Specials page has good local relevance — linking from it to the platters category page helps Google understand that platters are central to the late-night offering, and passes some of that topical authority to the platters menu page.

---

### 📋 Correct heading structure
**Change:** The main heading on the Late Night Specials page was changed from `<h2>` to `<h1>`.

**Impact:** Each page should have exactly one `<h1>` that describes the page topic. Google uses heading structure to understand page content hierarchy. Having no `<h1>` (or burying it as an `<h2>`) weakens the topical signal for that page. This fix ensures Google correctly reads "Late Night Food for Hungry Knights" as the primary topic of the page.

---

### 🏷️ Individual meta descriptions for all 9 menu categories
**Change:** `generateMetadata()` added to the dynamic menu category route, covering all 9 slugs.

**Impact:** Previously all menu category pages (`/menu/platters`, `/menu/biryani-rice-specials`, etc.) showed the root layout's homepage description in Google. Now each has a dish-specific description. This makes those pages more likely to rank for dish-specific searches like `chicken biryani Orlando` or `Indian food platters UCF`, and improves the snippet shown to users in results.

---

### ✅ No broken or misleading structured data
**Change:** Removed `menu: '/menu'` (a redirect) from JSON-LD, removed empty arrays (`sameAs: []`, `openingHoursSpecification: []`), fixed `servesCuisine` type.

**Impact:** Invalid or misleading structured data can cause Google to ignore the entire JSON-LD block. Cleaning it up ensures the Restaurant schema is parsed and trusted, making it eligible for rich result features in future.

---

## Files Changed

### 1. `app/layout.tsx` — Root Layout

**Before:** Homepage-specific title was hardcoded in the root layout, causing every page to inherit "Best Indian Food in Orlando, FL" as its title.

**After:**
- Added `title.template` so child pages can set their own titles cleanly (`'%s | Knights Curry Express'`)
- Added `metadataBase` (`https://www.knightscurryexpress.com`) — required for Next.js to resolve relative OG image URLs
- Shared `openGraph` defaults (`siteName`, `type`) moved here
- Removed homepage-specific description from root

---

### 2. `app/page.tsx` — Homepage

**Metadata added:**
- `title.absolute` — `Knights Curry Express — Best Indian Food Near UCF in Orlando, FL`
- `description` — UCF-focused, includes Halal, curries, biryani, platters
- `alternates.canonical` — `https://www.knightscurryexpress.com`
- Full `openGraph` block (title, description, url, siteName, type)

**JSON-LD (Restaurant schema) improved:**
| Field | Before | After |
|---|---|---|
| `@id` | `https://www.knightscurryexpress.com` (wrong — should be entity ID) | `https://www.knightscurryexpress.com/#restaurant` |
| `servesCuisine` | `'Indian'` (string) | `['Indian']` (array) |
| `priceRange` | missing | `'$$'` |
| `menu` | `/menu` (a redirect — invalid) | **removed** until stable URL confirmed |
| `sameAs` | missing | `['https://www.instagram.com/knightscurryexpress']` (verified from page copy) |

---

### 3. `app/late-night-specials/layout.tsx` — **New File**

`page.tsx` uses `'use client'` and cannot export `metadata`. A sibling `layout.tsx` (Server Component) was created to provide route-level metadata.

**Metadata set:**
- `title` — `Late-Night Indian Food Near UCF in Orlando`
- `description` — targets primary keyword without asserting specific hours (pending confirmation with Rahul)
- `alternates.canonical` — `/late-night-specials`
- Full `openGraph` block

---

### 4. `app/late-night-specials/page.tsx` — Late Night Specials Page

Three behind-the-scenes changes:

| Change | Detail |
|---|---|
| `<h2>` → `<h1>` | The main page heading was incorrectly tagged as `h2`. Promoted to `h1` — same visual appearance, correct semantic structure for Google |
| BreadcrumbList JSON-LD | Added `Home → Late Night Specials` breadcrumb schema (invisible `<script>` tag) |
| Internal link | The word "platters" in existing copy *"Halal Indian platters and street food…"* now links to `/menu/platters` — no new text added |

---

### 5. `app/location-and-hours/page.tsx` — Location & Hours Page

**Metadata added:**
- `title` — `Location & Hours` (renders as `Location & Hours | Knights Curry Express` via template)
- `description` — includes UCF, Orlando, directions, hours
- `alternates.canonical` — `/location-and-hours`
- Full `openGraph` block

**JSON-LD added:**
- `BreadcrumbList` — `Home → Location & Hours`

---

### 6. `app/menu/[category]/page.tsx` — Menu Category Pages

**`generateMetadata()` added** — every menu category now has its own title, description, canonical URL, and OpenGraph block. All 9 slugs covered:

| Slug | SEO Title |
|---|---|
| `platters` | Indian Food Platters Near UCF |
| `appetizers` | Indian Appetizers in Orlando |
| `street-food` | Indian Street Food Near UCF |
| `biryani-rice-specials` | Chicken & Veg Biryani in Orlando |
| `curries-veg` | Vegetarian Curries Near UCF |
| `curries-non-veg` | Non-Veg Curries Near UCF |
| `sandwiches-burgers-pizzas` | Indian-Style Sandwiches, Burgers & Pizzas Near UCF |
| `south-indian-breads` | South Indian Food & Breads Near UCF |
| `desserts-drinks` | Indian Desserts & Drinks in Orlando |

**BreadcrumbList JSON-LD added** — `Home → Menu → [Category Name]` (category name resolved dynamically from `getCategoryMetadata()`)

**Graceful fallback** — unknown slugs auto-format the slug as a readable title so no page is left blank.

---

## What Was Intentionally NOT Changed

| Item | Reason |
|---|---|
| `openingHoursSpecification` in JSON-LD | Hours conflict across pages — confirm with Rahul before updating |
| Late-night page hours display text | Same — hours unconfirmed |
| `meta keywords` | Google ignores this tag — not added |
| Sitemap `priority` values | Google ignores this field — not changed |
| `aggregateRating` in JSON-LD | Google won't display review stars for self-serving local business markup |
| Any visible page content or sections | User instruction: SEO only, no UI changes |

---

## Remaining Tasks (Pending)

- [ ] **Confirm hours with Rahul** — then update `openingHoursSpecification` in `app/page.tsx` JSON-LD and the late-night page copy
- [ ] **Add `hasMenu`** to JSON-LD — needs a stable, non-redirect menu URL
- [ ] **Update Google Business Profile** — hours, address (verify unit `#4`), phone
- [ ] **Submit sitemap** in Google Search Console after deploying
- [ ] **Collect keyword volume data** — Google Keyword Planner for the 6 secondary keywords
- [ ] **Validate structured data** — run [Google Rich Results Test](https://search.google.com/test/rich-results) on production URLs
- [ ] **Measure Core Web Vitals** — run [PageSpeed Insights](https://pagespeed.web.dev/) before making any performance changes

---

## Keyword Strategy — Broader UCF Market

### Competitive Landscape

Knights Curry Express doesn't just compete with other Indian restaurants. The real student decision is **"where should we eat tonight?"** — and competition spans multiple categories:

| Category | Competitors near UCF |
|---|---|
| **Late night** | Fat Shack (Collegiate Way, till 1–3 AM), Insomnia Cookies (University Blvd, till 1–3 AM), Domino's (till 2 AM), McDonald's (Alafaya) |
| **Cheap student eats** | Tenders (halal, 4.7★, inexpensive, loaded fries), Huey Magoo's, Chick-fil-A |
| **Halal (any cuisine)** | Tenders, Shah's Halal Food (E Colonial, till 2–3 AM), Baba's Halal (N Alafaya) |

**Cross-category advantages Knights Curry Express holds:**
- Fully halal ✅
- Open till 2:30 AM Fri/Sat — the latest real-meal (not dessert/pizza) option near UCF ✅
- Inexpensive — same price tier as Tenders and McDonald's ✅
- Big shareable platters ✅
- Takeout and delivery on major apps ✅

---

### The 15 Broader Keywords (Cross-Category)

These target **"where should we eat tonight"** searches — not cuisine-specific. Use alongside the 15 Indian-specific keywords. Each is mapped to the page that best answers it.

| # | Keyword | Rationale | Target Page |
|---|---|---|---|
| 1 | **late night food UCF** | Strongest broad term — only real-meal option open that late | `/late-night-specials` |
| 2 | **food open late near UCF** | Student phrasing of the same search | `/late-night-specials` |
| 3 | **cheap eats near UCF** | Platters from $11.99 — same tier as Tenders & McDonald's | `/menu/platters` |
| 4 | **halal food Orlando** | Dietary search, not cuisine — competes with Tenders & Shah's | Homepage |
| 5 | **halal restaurants near UCF** | Local variant of the same dietary search | Homepage |
| 6 | **best food near UCF** | Broad head term; campus dining & chains currently dominate | Homepage |
| 7 | **restaurants near UCF** | Generic discovery search every student types first | Homepage |
| 8 | **takeout near UCF** | Counter takeout is core to the format | `/location-and-hours` |
| 9 | **food delivery near UCF** | Domino's, Tenders & Insomnia push delivery; Knights is on major apps too | Homepage |
| 10 | **vegetarian food near UCF** | Veg platters, paneer, dal, chole compete with campus veg options | `/menu/curries-veg` |
| 11 | **vegan food near UCF** | Dal, chole & dosa can be vegan; nearest dedicated vegan spot is miles away in Oviedo | `/menu/curries-veg` |
| 12 | **spicy food near UCF** | Chicken 65, chilli paneer, masala fries — "spicy" is searched across all cuisines | `/menu/appetizers` |
| 13 | **comfort food near UCF** | Big hearty platters — same positioning Fat Shack uses with loaded sandwiches | `/menu/platters` |
| 14 | **food under $15 near UCF** | Platters $11.99–$14.99, chicken 65 $8.49, Knights Fries $5.49 — menu literally wins this | `/menu/platters` |
| 15 | **group dinner near UCF** | Big shareable platters for students eating with friends | `/menu/platters` |

---

### Full Keyword Map — Both Sets Combined

```
Homepage
  ├── Indian food near UCF
  ├── Indian restaurant near UCF
  ├── Halal food Orlando
  ├── Halal restaurants near UCF
  ├── Best food near UCF
  ├── Restaurants near UCF
  └── Food delivery near UCF

/late-night-specials          ← PRIMARY target page
  ├── Late-night Indian food near UCF  [primary keyword]
  ├── Late-night Indian food Orlando
  ├── Indian food after midnight Orlando
  ├── Late night food UCF
  ├── Food open late near UCF
  └── Orlando food open after midnight

/location-and-hours
  ├── Knights Curry Express hours
  ├── Knights Curry Express location
  └── Takeout near UCF

/menu/platters
  ├── Indian food platters near UCF
  ├── Indian curry platters Orlando
  ├── Cheap eats near UCF
  ├── Comfort food near UCF
  ├── Food under $15 near UCF
  └── Group dinner near UCF

/menu/biryani-rice-specials
  ├── Chicken biryani Orlando
  ├── Veg biryani Orlando
  └── Late-night biryani Orlando

/menu/curries-veg
  ├── Vegetarian food near UCF
  └── Vegan food near UCF

/menu/appetizers
  └── Spicy food near UCF
```

---

### Implementation Notes for These Keywords

- **No new pages needed.** All 15 keywords map to pages that already exist.
- **Do not force all 15 into one page.** Each keyword belongs on the page that actually answers the search intent.
- **Validate demand first.** Run all 15 through Google Keyword Planner before writing content around them — confirm monthly volume and competition.
- **Vegetarian/vegan gap is real.** The nearest dedicated vegan restaurant near UCF is in Oviedo. Dal, chole, and dosa can be positioned here — low-effort, low-competition opportunity on `/menu/curries-veg`.
- **"Food under $15 near UCF"** is a price-point search the menu literally wins. Consider adding it to the Google Business description or as a callout once hours are confirmed.
- **Halal is the strongest differentiator against non-Indian competitors.** Tenders and Shah's are the only other halal options open late — but neither serves sit-down meals with platters at this price point.

---

## Build & TypeScript Status

```
npx tsc --noEmit → exit code 0 (no errors)
npm run build    → exit code 0 (Compiled successfully, 83/83 static pages generated)
```

