#!/bin/bash

# Base URLs for different types of images
MAIN_IMAGES=(
    "https://images.unsplash.com/photo-1583994016667-99b13b0ae3b8"
    "https://images.unsplash.com/photo-1531384441138-2736e62e0919"
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    "https://images.unsplash.com/photo-1521119989659-a83eee488004"
    "https://images.unsplash.com/photo-1541823709867-1b206113eafd"
    "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6"
    "https://images.unsplash.com/photo-1540331547168-8b63109225b7"
    "https://images.unsplash.com/photo-1531384441138-2736e62e0919"
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    "https://images.unsplash.com/photo-1521119989659-a83eee488004"
    "https://images.unsplash.com/photo-1541823709867-1b206113eafd"
    "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6"
    "https://images.unsplash.com/photo-1540331547168-8b63109225b7"
)

CONTEMPORARY_IMAGES=(
    "https://images.unsplash.com/photo-1583994016667-99b13b0ae3b8"
    "https://images.unsplash.com/photo-1531384441138-2736e62e0919"
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    "https://images.unsplash.com/photo-1521119989659-a83eee488004"
    "https://images.unsplash.com/photo-1541823709867-1b206113eafd"
    "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6"
    "https://images.unsplash.com/photo-1540331547168-8b63109225b7"
    "https://images.unsplash.com/photo-1531384441138-2736e62e0919"
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    "https://images.unsplash.com/photo-1521119989659-a83eee488004"
    "https://images.unsplash.com/photo-1541823709867-1b206113eafd"
    "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6"
    "https://images.unsplash.com/photo-1540331547168-8b63109225b7"
    "https://images.unsplash.com/photo-1531384441138-2736e62e0919"
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    "https://images.unsplash.com/photo-1521119989659-a83eee488004"
    "https://images.unsplash.com/photo-1541823709867-1b206113eafd"
    "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6"
    "https://images.unsplash.com/photo-1540331547168-8b63109225b7"
    "https://images.unsplash.com/photo-1531384441138-2736e62e0919"
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
)

ARCHIVAL_IMAGES=(
    "https://images.unsplash.com/photo-1583994016667-99b13b0ae3b8"
    "https://images.unsplash.com/photo-1531384441138-2736e62e0919"
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    "https://images.unsplash.com/photo-1521119989659-a83eee488004"
    "https://images.unsplash.com/photo-1541823709867-1b206113eafd"
    "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6"
    "https://images.unsplash.com/photo-1540331547168-8b63109225b7"
    "https://images.unsplash.com/photo-1531384441138-2736e62e0919"
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    "https://images.unsplash.com/photo-1521119989659-a83eee488004"
    "https://images.unsplash.com/photo-1541823709867-1b206113eafd"
    "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6"
    "https://images.unsplash.com/photo-1540331547168-8b63109225b7"
    "https://images.unsplash.com/photo-1531384441138-2736e62e0919"
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
)

# Function to download and convert images
download_and_convert() {
    local category=$1
    local images=("${@:2}")
    local count=1
    
    for url in "${images[@]}"; do
        echo "Downloading and converting image $count for $category..."
        curl -L "${url}?w=1200&h=1600&fit=crop" -o "public/images/gallery/${category}/${count}.webp"
        ((count++))
    done
}

# Download and convert main images
download_and_convert "main" "${MAIN_IMAGES[@]}"

# Download and convert contemporary images
download_and_convert "contemporary" "${CONTEMPORARY_IMAGES[@]}"

# Download and convert archival images
download_and_convert "archival" "${ARCHIVAL_IMAGES[@]}"

echo "Gallery setup complete!"
