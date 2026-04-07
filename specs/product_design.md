# Product Design Document: Nepal Trek Itinerary Platform

## 1. Executive Summary
Build a premium, high-impact trekking platform for `nepaltrekitinerary.com` that serves as the definitive guide for trekking in Nepal. The design must be immersive, modern, and "adventurous," utilizing state-of-the-art web technologies to create a feeling of elevation and exploration.

## 2. Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Data Visualization**: Recharts or Tremor (for altitude charts)
- **Language**: TypeScript

## 3. Design System & Aesthetics

### 3.1. Color Palette
- **Theme**: Dark Mode Default (to make images pop and reduce glare).
- **Primary Accent**: **Nepal Orange (`#FF671F`)** - Used for CTAs, highlights, and active states. Represents the monastic robes and marigolds.
- **Secondary Accent**: **Himalayan Blue (`#003893`)** - Used for gradients, deep UI elements, and trust markers. Represents the high-altitude sky.
- **Backgrounds**: Deep charcoal/slate gradients, not pure black, to support glassmorphism.

### 3.2. Typography
- **Headings**: **Outfit** or **Montserrat** (Bold, Uppercase, Tracking-wide). "Adventurous" and "Sturdy".
- **Body**: **Inter** or **Geist Sans** (Clean, legible).

### 3.3. The "Vibe": Organic & Premium
*Moving away from rigid structures to a free-flowing narrative experience.*
- **Glassmorphism**: Itinerary cards and overlays should use translucent frosted-glass effects (`backdrop-filter: blur(12px)` + thin white borders).
- **Parallax Scroll**: Background images (mountains, trails) should move at different speeds relative to the content to create depth and immersion.
- **Organic Layouts**: While utilizing a grid system, the visual presentation should feel broken or organic. Images may overlap text, and container borders may be soft or rounded.

## 4. Key Features

### 4.1. The "Smart Search" Hero Section
A conversational, high-intelligence search interface in the Hero section.
- **Interaction**: Users type natural language queries.
- **Examples**: "High altitude, 10 days, quiet trail" or "Beginner friendly Everest view".
- **Visuals**: Centered, floating glass input bar over a cinematic mountain video/image. Auto-suggestions animate in.

### 4.2. "Organic" Bento Grid Homepage
Showcase top destinations (Everest, Annapurna, Manaslu) using a layout that balances structure with visual flair.
- **Layout**: a non-uniform grid where featured treks take up larger, irregular spaces.
- **Content**: High-res imagery, distinct typography overlays, and hover-reveal details.
- **Movement**: Scroll-triggered entry animations (staggered fade-ins).

### 4.3. Interactive Altitude Component
A specialized data visualization component for every itinerary page.
- **Library**: Recharts or Tremor.
- **Data**: Elevation (y-axis) vs. Days/Trek Points (x-axis).
- **Interactive**:
    - Tooltip on hover shows: "Day 5: Namche Bazaar (3,440m)".
    - Highlights "Acclimatization Days" in a distinct color (e.g., Nepal Orange).
    - Smooth curve lines to represent the ascent/descent profile.

## 5. UI/UX Micro-Interactions
- **Cursor Effects**: Custom cursor (optional) or subtle glow moving with the mouse.
- **Buttons**: Magnetic hover effects or "fill on hover" animations.
- **Page Transitions**: Smooth transitions between the Homepage and Itinerary details (using Framer Motion `layoutId`).

## 6. Implementation Stages
1.  **Setup**: Next.js 14 + Tailwind config with custom colors/fonts.
2.  **Components**: Build GlassCard, SmartSearchBar, AltitudeChart.
3.  **Pages**: Assemble the Homepage (Hero + Organic Grid) and Itinerary Detail template.
4.  **Polish**: Add Parallax and Scroll Animations.
