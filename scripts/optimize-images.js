const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImage() {
    const inputImage = path.join(__dirname, '../public/images/hero.jpg');
    const outputDir = path.join(__dirname, '../public/images');

    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Create optimized JPG version
    await sharp(inputImage)
        .resize(1920, 1080, { 
            fit: 'cover',
            withoutEnlargement: true
        })
        .jpeg({ 
            quality: 85,
            progressive: true,
            mozjpeg: true
        })
        .toFile(path.join(outputDir, 'hero-optimized.jpg'));

    // Create WebP version for modern browsers
    await sharp(inputImage)
        .resize(1920, 1080, { 
            fit: 'cover',
            withoutEnlargement: true
        })
        .webp({ 
            quality: 85,
            effort: 6
        })
        .toFile(path.join(outputDir, 'hero.webp'));

    console.log('Images optimized successfully!');
}

optimizeImage().catch(console.error);
