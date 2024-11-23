# Kevin Powell Film Website

A modern, dynamic website showcasing Kevin Powell's film work, built with Next.js and featuring stunning animations and interactive elements.

## Overview

This website serves as a professional platform to showcase Kevin Powell's film work, featuring:

- Immersive hero section with dynamic 3D tilt animations
- Director's showcase section
- Dynamic infinite-scroll photo gallery
- Parallax scrolling sections
- Contact information
- Responsive design for all devices

## Technical Stack

- **Framework**: Next.js 14
- **Styling**: TailwindCSS
- **Animations**: Framer Motion & GSAP
- **Type Safety**: TypeScript

## Site Structure

### Components

1. **HeroSection (`components/HeroSection.tsx`)**
   - Features a 3D tilt effect responding to mouse movements
   - Configurable tilt angle (default: 15 degrees)
   - Perspective depth: 2000px
   - Image size: 40% viewport width (max 1080px)
   - Initial scale: 0.85

2. **PhotoGallery (`components/PhotoGallery.tsx`)**
   - Infinite-scroll carousel with two rows moving in opposite directions
   - Supports unlimited photos (default: 20)
   - Hover effects with image scaling and text overlay
   - Customizable scroll speed and image sizes
   - Hardware-accelerated animations

3. **ParallaxSections (`components/ParallaxSections.tsx`)**
   - Multiple sections with parallax scrolling effects
   - Configurable image positions and text alignment
   - Smooth transitions between sections

### Customization Guide

#### Updating Content

1. **Hero Section**
   ```typescript
   // In components/HeroSection.tsx
   <HeroSection
     imageUrl="your-image-url"
     title="Your Title"
     description="Your description"
   />
   ```

2. **Photo Gallery**
   ```typescript
   // In components/PhotoGallery.tsx
   const photos = [
     { 
       url: "your-image-url",
       alt: "Image description"
     },
     // Add more photos as needed
   ];
   ```
   
   Customize gallery settings:
   ```typescript
   // Adjust scroll speed (in seconds)
   transition={{ duration: 20 }}
   
   // Change image size
   className="relative flex-shrink-0 w-64" // w-64 = 256px
   
   // Modify hover scale
   whileHover={{ scale: 1.05 }}
   ```

3. **Parallax Sections**
   ```typescript
   // In components/ParallaxSections.tsx
   <ParallaxSection
     size="large" // Options: large, medium, small
     imageUrl="your-image-url"
     title="Section Title"
     description="Section description"
     align="left" // Options: left, right
   />
   ```

#### Styling

1. **Colors and Typography**
   - Update TailwindCSS theme in `tailwind.config.js`
   - Global styles in `styles/globals.css`
   - Component-specific styles in respective `.module.css` files

2. **Animations**
   - Hero tilt effect: Adjust in `HeroSection.tsx`
   - Gallery scroll speed: Modify `duration` in `PhotoGallery.tsx`
   - Parallax effects: Configure in `ParallaxSection.tsx`

3. **Responsive Breakpoints**
   ```javascript
   // Default breakpoints in tailwind.config.js
   screens: {
     'sm': '640px',
     'md': '768px',
     'lg': '1024px',
     'xl': '1280px',
     '2xl': '1536px',
   }
   ```

## Development

To run the development server:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Production

For production deployment:

```bash
npm run build
npm start
```

## Performance Optimization

1. **Image Optimization**
   - Use Next.js Image component for automatic optimization
   - Implement lazy loading for gallery images
   - Compress and resize images before upload

2. **Animation Performance**
   - Hardware acceleration enabled via `transform-gpu`
   - Efficient use of Framer Motion's `AnimatePresence`
   - Optimized infinite scroll implementation

3. **Code Splitting**
   - Automatic code splitting via Next.js
   - Dynamic imports for heavy components
   - Optimized bundle size

## Troubleshooting

Common issues and solutions:

1. **Gallery Performance**
   - If scrolling is choppy, try reducing the number of visible images
   - Adjust animation duration for smoother performance
   - Ensure images are properly optimized

2. **3D Tilt Effect**
   - If tilt effect is too strong/weak, adjust the tilt angle in `HeroSection.tsx`
   - For mobile, tilt effect is disabled by default
   - Check device orientation handling

3. **Parallax Scrolling**
   - If parallax feels off, adjust the scroll speed multiplier
   - Ensure images are properly sized
   - Check for conflicting transform properties

## Contributing

For contributions, please create a pull request with a clear description of your changes.

## License

[Add your license information here]

[Edit on StackBlitz ⚡️](https://stackblitz.com/~/github.com/VyuduInc/kevin-powell)