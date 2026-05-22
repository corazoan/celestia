# Celestia Storefront Implementation Plan - May 21, 2026

## Objective
Transition from Admin-focused development to a high-end, functional Customer Experience. Focus on the "Ethereal Minimalist" design language.

## 1. Product Listing Page (PLP)
**Route:** `app/(users)/collections/[slug]/page.tsx`
- **Features:**
    - Dynamic data fetching based on category slug.
    - Responsive product grid (1 col mobile, 2 col tablet, 4 col desktop).
    - "Quick View" hover effect on product cards.
    - Sorting functionality (Price: Low to High, Newest, etc.).
- **Design:** Clean borders, generous whitespace, and subtle fade-in animations for images.

## 2. Product Detail Page (PDP)
**Route:** `app/(users)/products/[slug]/page.tsx`
- **Features:**
    - High-resolution image gallery (main image + thumbnails).
    - Variant selection (Size, Color) with availability checking.
    - Dynamic pricing based on selected variant.
    - "Product Story" section for rich descriptions.
- **Design:** Sticky product info on desktop, swipeable gallery on mobile.

## 3. Mini-Cart (Slide-out)
**Component:** `app/components/cart/CartDrawer.tsx`
- **Features:**
    - Side-drawer triggered by the Header cart icon.
    - Real-time updates (adding/removing items).
    - Subtotal calculation.
    - "Checkout" call-to-action.

## 4. Enhanced Home Page
**Route:** `app/(users)/page.tsx`
- **Sections:**
    - **Hero:** Full-screen high-impact image with "CELESTIA" brand statement.
    - **Featured Categories:** Visual tiles linking to top collections.
    - **Latest Drops:** Horizontal scroll of the newest 8 products.

## Technical Tasks
- [ ] Create `getProductsByCategory` server utility.
- [ ] Implement `ProductCard` reusable component.
- [ ] Setup `CartProvider` using React Context for global state.
- [ ] Update `Header.tsx` to link to the new CartDrawer.

## Design Specs
- **Primary Font:** Playfair Display (Headings) / Inter (Body).
- **Transitions:** `duration-500 ease-in-out`.
- **Shadows:** Minimal or soft-blurs (e.g., `shadow-sm`).
- **Colors:** White background, Zinc-900 text, Slate-400 for secondary info.
