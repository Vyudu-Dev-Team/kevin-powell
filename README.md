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

### Content Management Guide

#### Team Section

1. **Adding Team Members**
   ```typescript
   // In components/TeamSection.tsx
   const teamMembers = [
     {
       name: "Team Member Name",
       role: "Role/Position",
       image: "/path/to/image.jpg",
       bio: "Brief biography or description",
       socialLinks: {
         linkedin: "https://linkedin.com/in/username",
         twitter: "https://twitter.com/username",
         instagram: "https://instagram.com/username"
       }
     },
     // Add more team members as needed
   ];
   ```

2. **Customizing Team Member Cards**
   ```typescript
   // In components/TeamMemberCard.tsx
   <TeamMemberCard
     member={teamMember}
     layout="default" // Options: default, compact, expanded
     showSocial={true} // Toggle social media links
     hoverEffect="scale" // Options: scale, flip, fade
   />
   ```

#### Contact Form Setup

1. **Email Configuration**
   ```typescript
   // In .env.local
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_USER=your-email@domain.com
   SMTP_PASSWORD=your-password
   CONTACT_EMAIL=recipient@domain.com
   ```

2. **Form Handler Setup**
   ```typescript
   // In pages/api/contact.ts
   import { createTransport } from 'nodemailer';

   export default async function handler(req, res) {
     // Configuration and validation
     const transporter = createTransport({
       host: process.env.SMTP_HOST,
       port: process.env.SMTP_PORT,
       secure: false,
       auth: {
         user: process.env.SMTP_USER,
         pass: process.env.SMTP_PASSWORD,
       },
     });
   }
   ```

3. **Form Customization**
   ```typescript
   // In components/ContactForm.tsx
   <ContactForm
     fields={[
       { name: 'name', label: 'Your Name', required: true },
       { name: 'email', label: 'Email Address', type: 'email', required: true },
       { name: 'message', label: 'Message', type: 'textarea', required: true }
     ]}
     submitButton={{
       text: 'Send Message',
       loadingText: 'Sending...'
     }}
     successMessage="Thank you for your message!"
   />
   ```

#### Modal Popups

1. **Creating New Popups**
   ```typescript
   // In components/Modal.tsx
   <Modal
     id="unique-modal-id"
     title="Modal Title"
     trigger={<button>Open Modal</button>}
     size="medium" // Options: small, medium, large, full
   >
     {/* Modal content */}
   </Modal>
   ```

2. **Project Showcase Popups**
   ```typescript
   // In data/projects.ts
   export const projects = [
     {
       id: "project-1",
       title: "Project Title",
       thumbnail: "/path/to/thumbnail.jpg",
       fullImage: "/path/to/full-image.jpg",
       description: "Project description",
       details: {
         client: "Client Name",
         date: "Project Date",
         role: "Your Role",
         link: "https://project-url.com"
       },
       gallery: [
         { url: "/path/to/image1.jpg", caption: "Caption 1" },
         { url: "/path/to/image2.jpg", caption: "Caption 2" }
       ]
     }
   ];
   ```

3. **Customizing Popup Animations**
   ```typescript
   // In components/Modal/animations.ts
   export const modalAnimations = {
     overlay: {
       initial: { opacity: 0 },
       animate: { opacity: 1 },
       exit: { opacity: 0 },
       transition: { duration: 0.3 }
     },
     content: {
       initial: { scale: 0.9, opacity: 0 },
       animate: { scale: 1, opacity: 1 },
       exit: { scale: 0.9, opacity: 0 },
       transition: { type: "spring", duration: 0.5 }
     }
   };
   ```

#### SEO and Metadata

1. **Page Metadata**
   ```typescript
   // In pages/_app.tsx or individual pages
   import Head from 'next/head';

   <Head>
     <title>Page Title | Kevin Powell</title>
     <meta name="description" content="Page description" />
     <meta property="og:title" content="Page Title" />
     <meta property="og:description" content="Page description" />
     <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
   </Head>
   ```

2. **Dynamic Metadata**
   ```typescript
   // In data/metadata.ts
   export const metadata = {
     siteName: "Kevin Powell Films",
     titleTemplate: "%s | Kevin Powell Films",
     description: "Default site description",
     socialImage: "/path/to/default-social-image.jpg",
     social: {
       twitter: "@username",
       instagram: "@username"
     }
   };
   ```

#### Content Security

1. **Image Optimization**
   ```typescript
   // In next.config.js
   module.exports = {
     images: {
       domains: ['your-image-domain.com'],
       formats: ['image/avif', 'image/webp'],
       deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
       imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
     },
   };
   ```

2. **Form Security**
   ```typescript
   // In pages/api/contact.ts
   import rateLimit from 'express-rate-limit';

   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 5 // limit each IP to 5 requests per windowMs
   });
   ```

#### Environment Variables

Create a `.env.local` file in the root directory:
```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME="Kevin Powell Films"

# Email Configuration
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASSWORD=your-password
CONTACT_EMAIL=recipient@domain.com

# API Keys (if needed)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
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

### Detailed Implementation Guide

#### Photo Gallery Management

1. **Adding/Updating Gallery Photos**
   ```typescript
   // In components/PhotoGallery.tsx
   const photos = [
     {
       url: "your-image-url",
       alt: "Image description",
       // Optional properties
       priority: true, // For LCP optimization
       quality: 85, // Image quality (default: 75)
       sizes: "(max-width: 768px) 100vw, 50vw" // Responsive sizing
     }
   ];

   // For optimal performance, recommended image specs:
   // - Format: WebP or AVIF with JPG fallback
   // - Resolution: 1920x1080 or 1280x720
   // - File size: < 200KB per image
   // - Aspect ratio: 16:9
   ```

2. **Gallery Performance Optimization**
   ```typescript
   // Custom hook for lazy loading
   const useGalleryLazyLoad = (itemsPerPage = 10) => {
     const [visibleItems, setVisibleItems] = useState(itemsPerPage);
     
     // Implementation details for infinite scroll
     // Usage example in PhotoGallery component
   };

   // Batch loading configuration
   const batchLoadConfig = {
     initial: 10,    // Initial load count
     subsequent: 5,  // Items per batch
     threshold: 0.5  // Intersection observer threshold
   };
   ```

#### Advanced Form Features

1. **File Upload Integration**
   ```typescript
   // In components/ContactForm.tsx
   const FileUploadField = () => {
     const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
     const maxSize = 5 * 1024 * 1024; // 5MB

     return (
       <input
         type="file"
         accept={allowedTypes.join(',')}
         onChange={handleFileChange}
         multiple
         max={3} // Maximum 3 files
       />
     );
   };

   // File validation and processing
   const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
     const files = Array.from(e.target.files || []);
     
     // Validation and processing logic
     // Image compression if needed
     // Upload to storage
   };
   ```

2. **Form Validation Patterns**
   ```typescript
   // Custom validation hooks
   const useFormValidation = (initialState) => {
     const validators = {
       email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
       phone: (value) => /^\+?[\d\s-]{10,}$/.test(value),
       name: (value) => value.length >= 2,
       message: (value) => value.length >= 10 && value.length <= 1000
     };

     // Implementation and usage
   };

   // Error messages configuration
   const errorMessages = {
     email: 'Please enter a valid email address',
     phone: 'Please enter a valid phone number',
     name: 'Name must be at least 2 characters long',
     message: 'Message must be between 10 and 1000 characters'
   };
   ```

#### Modal Customization

1. **Advanced Animation Patterns**
   ```typescript
   // In components/Modal/animations.ts
   const modalVariants = {
     slideIn: {
       initial: { x: '100%', opacity: 0 },
       animate: { x: 0, opacity: 1 },
       exit: { x: '-100%', opacity: 0 }
     },
     fade: {
       initial: { opacity: 0 },
       animate: { opacity: 1 },
       exit: { opacity: 0 }
     },
     scale: {
       initial: { scale: 0, opacity: 0 },
       animate: { scale: 1, opacity: 1 },
       exit: { scale: 0, opacity: 0 }
     }
   };

   // Usage in Modal component
   <Modal
     animation="slideIn"
     customTransition={{
       type: "spring",
       stiffness: 300,
       damping: 30
     }}
   />
   ```

2. **Responsive Modal Layouts**
   ```typescript
   // Modal size configurations
   const modalSizes = {
     small: {
       width: 'max-w-md',
       height: 'max-h-[70vh]'
     },
     medium: {
       width: 'max-w-2xl',
       height: 'max-h-[80vh]'
     },
     large: {
       width: 'max-w-4xl',
       height: 'max-h-[90vh]'
     },
     full: {
       width: 'max-w-full',
       height: 'h-screen'
     }
   };

   // Responsive behavior
   const getModalSize = (size, screenWidth) => {
     if (screenWidth < 640) return modalSizes.full;
     return modalSizes[size] || modalSizes.medium;
   };
   ```

#### SEO Optimization

1. **Structured Data Implementation**
   ```typescript
   // In components/StructuredData.tsx
   const FilmStructuredData = ({ film }) => {
     const structuredData = {
       "@context": "https://schema.org",
       "@type": "Movie",
       name: film.title,
       director: {
         "@type": "Person",
         name: "Kevin Powell"
       },
       // Additional film details
     };

     return (
       <script
         type="application/ld+json"
         dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
       />
     );
   };
   ```

2. **Dynamic SEO Tags**
   ```typescript
   // In components/SEO/DynamicTags.tsx
   const DynamicSEO = ({ pageData }) => {
     const { title, description, image, type } = pageData;
     
     return (
       <Head>
         {/* Basic Meta Tags */}
         <title>{formatTitle(title)}</title>
         <meta name="description" content={formatDescription(description)} />
         
         {/* Open Graph */}
         <meta property="og:title" content={formatTitle(title)} />
         <meta property="og:description" content={formatDescription(description)} />
         <meta property="og:image" content={formatImage(image)} />
         <meta property="og:type" content={type || 'website'} />
         
         {/* Twitter */}
         <meta name="twitter:card" content="summary_large_image" />
         <meta name="twitter:title" content={formatTitle(title)} />
         <meta name="twitter:description" content={formatDescription(description)} />
         <meta name="twitter:image" content={formatImage(image)} />
         
         {/* Additional tags based on page type */}
         {type === 'article' && (
           <>
             <meta property="article:published_time" content={pageData.publishDate} />
             <meta property="article:author" content={pageData.author} />
           </>
         )}
       </Head>
     );
   };
   ```

#### Performance Monitoring

1. **Analytics Implementation**
   ```typescript
   // In utils/analytics.ts
   const trackPageView = (url: string) => {
     // Google Analytics
     window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
       page_path: url,
     });

     // Custom performance metrics
     if (window.performance) {
       const perfData = window.performance.timing;
       const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
       trackCustomMetric('pageLoadTime', pageLoadTime);
     }
   };

   // Performance monitoring
   const performanceMetrics = {
     FCP: 'first-contentful-paint',
     LCP: 'largest-contentful-paint',
     FID: 'first-input-delay',
     CLS: 'cumulative-layout-shift'
   };
   ```

2. **Error Tracking**
   ```typescript
   // In utils/errorTracking.ts
   const errorTracker = {
     init: () => {
       window.addEventListener('error', handleError);
       window.addEventListener('unhandledrejection', handlePromiseError);
     },
     
     handleError: (error: Error) => {
       // Log error details
       console.error({
         message: error.message,
         stack: error.stack,
         timestamp: new Date().toISOString(),
         url: window.location.href
       });
       
       // Send to monitoring service
     }
   };
   ```