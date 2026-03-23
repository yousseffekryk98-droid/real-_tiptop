# TIPTOP Admin v3 — Clean Modular Architecture

## 📁 Project Structure

```
src/
├── index.jsx                      # Entry point with i18n provider
├── App.jsx                        # Root app component with sidebar & routing
│
├── config/
│   ├── tokens.js                  # Design tokens (colors, fonts, spacing)
│   ├── translations.js            # i18n translations (EN/AR)
│   └── constants.js               # Sectors, categories, seed data, uid helper
│
├── contexts/
│   └── I18nContext.jsx            # i18n provider & useTranslation hook
│
├── styles/
│   └── global.jsx                 # Global styles & animations
│
├── utils/
│   └── helpers.js                 # varTotal, getHealth, mkSlug utilities
│
├── components/
│   ├── EditorPanel.jsx            # Product editor with tabs
│   ├── ActivityFeed.jsx           # Real-time activity feed
│   │
│   └── shared/
│       ├── UI.jsx                 # HealthBadge, DraggablePriceTag, SectionHeader, FontLink
│       ├── VariantEditor.jsx      # Size variants editor (add/edit/delete inline)
│       └── SEOFieldset.jsx        # SEO metadata fields
│
└── pages/
    ├── DashboardPage.jsx          # Dashboard with stats, orders, categories, feed
    ├── CatalogPage.jsx            # Product table with filtering & editor panel
    ├── AddProductPage.jsx         # New product form with live preview
    └── CheckoutPage.jsx           # Full Shopify-style checkout flow
```

## 🎯 Key Features

### ✓ Modular & Clean
- Each component in its own file
- Clear separation of concerns
- Easy to find and maintain code

### ✓ Fully Functional
- **Size Variants** — inline editor with add/delete/qty controls (no window.prompt)
- **Live Product Count** — reads from React state, updates in real-time
- **Editor Panel** — clean tabs for Details/Variants/Sectors/SEO with health summary
- **Checkout Flow** — contact → delivery → shipping → payment → billing → confirmation

### ✓ i18n Ready
- English & Arabic translations
- RTL support throughout
- react-i18next compatible strings

### ✓ Design System
- Consistent design tokens
- All animations in one place
- Theme colors centralized

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm start
```

## 📝 Component Overview

### Pages
- **DashboardPage** — KPIs, orders table, category breakdown, activity feed
- **CatalogPage** — searchable/filterable product table with inline editor
- **AddProductPage** — form wizard with live storefront preview
- **CheckoutPage** — complete checkout UI with order summary sidebar

### Components
- **EditorPanel** — product metadata editor with 4 tabs
- **VariantEditor** — fully functional size/qty editor
- **SEOFieldset** — SEO metadata with live Google preview
- **ActivityFeed** — real-time event feed with auto-updates
- **UI Helpers** — badges, draggable price tag, section headers

### Config
- **tokens.js** — all colors, fonts, spacing in one object
- **translations.js** — 200+ translation keys for EN/AR
- **constants.js** — sectors, categories, seed products

## 🔧 Customization

### Add New Products
Edit `src/config/constants.js` `INITIAL_PRODUCTS` array

### Change Colors
Update `T` object in `src/config/tokens.js`

### Add Translations
Add keys to `TR.en` and `TR.ar` in `src/config/translations.js`

### Create New Page
1. Create file in `src/pages/`
2. Export default component
3. Import in `src/App.jsx`
4. Add to navigation `NAV` array

## 📦 Dependencies

- React 18+
- No external UI libraries (custom CSS)
- No icons library (pure emojis)

---

**Built for maintainability & scale.** Clean code, modular design, ready for production.
