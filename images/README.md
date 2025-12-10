# Phone Images Folder

## How to Add Images

### Option 1: Download from Free Sources
1. Go to these free image sites:
   - **Unsplash**: https://unsplash.com/s/photos/smartphone
   - **Pexels**: https://www.pexels.com/search/smartphone/
   - **Pixabay**: https://pixabay.com/images/search/smartphone/

2. Download images and save them in: `images/phones/`
   - Example: `iphone-13-pro.jpg`
   - Example: `galaxy-s21.jpg`

3. Update the imageMap in `script.js` and `products.js`:
```javascript
const imageMap = {
    'iPhone 13 Pro': 'images/phones/iphone-13-pro.jpg',
    'Galaxy S21 Ultra': 'images/phones/galaxy-s21.jpg',
    // Add more...
};
```

### Option 2: Use Product Images from Manufacturers
- Apple: https://www.apple.com/iphone/
- Samsung: https://www.samsung.com/
- Google: https://store.google.com/

### Image Specifications
- **Format**: JPG or PNG
- **Size**: 400x400 pixels or larger
- **Aspect Ratio**: Square (1:1) or Portrait (3:4)
- **File Size**: Under 200KB for best performance

### Naming Convention
Use lowercase with hyphens:
- ✅ `iphone-13-pro.jpg`
- ✅ `galaxy-s21-ultra.jpg`
- ✅ `pixel-6.png`
- ❌ `iPhone 13 Pro.jpg` (avoid spaces)
- ❌ `GALAXY S21.PNG` (avoid uppercase)

## Current Image Map

The following phones have custom images in the code:
- iPhone 13 Pro
- Galaxy S21 Ultra
- 9 Pro (OnePlus)
- Redmi Note 10 Pro
- Pixel 6
- iPhone 13

All other phones use a generic placeholder image.

