#!/bin/bash

# Create the images directory if it doesn't exist
mkdir -p public/images

# Download a black brick wall image
curl -L "https://img.freepik.com/free-photo/black-brick-wall-textured-background_53876-63572.jpg" -o "public/images/black-brick.webp"
