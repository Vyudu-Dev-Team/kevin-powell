#!/bin/bash

# Create directories if they don't exist
mkdir -p public/images/sections

# Download images
curl -L "https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&q=80&w=2940" -o public/images/sections/behind-scenes.jpg
curl -L "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2940" -o public/images/sections/cinematic-shot.jpg
curl -L "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=2940" -o public/images/sections/hero-shot.jpg

echo "Images downloaded successfully!"
