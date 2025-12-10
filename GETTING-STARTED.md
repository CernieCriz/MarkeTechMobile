# 🚀 Getting Started - MarkeTech Mobile (Next.js)

## Quick Start (3 Steps)

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

### 3️⃣ Open in Browser
Visit: **http://localhost:3000**

That's it! 🎉

---

## 📖 What You'll See

### Homepage (/)
- Hero section with search
- Featured phones showcase
- Contact form

### Products (/products)
- Browse all phones
- Filter by price, RAM, storage
- Sort options

### Inventory Management (/crud)
- Add new phones
- Edit existing phones
- Delete phones
- Search inventory

### Analytics (/analytics)
- Statistics overview
- Interactive charts
- Data insights

---

## 🔧 Available Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Production
npm run build            # Build for production
npm start                # Start production server

# Utilities
npm run lint             # Run ESLint
npm run convert-data     # Convert CSV to JSON (if needed)
```

---

## 📂 Adding/Editing Phone Data

### Method 1: Via UI (Easiest)
1. Go to **http://localhost:3000/crud**
2. Click "Add New Phone"
3. Fill in the form
4. Click "Add Phone"

### Method 2: Edit JSON Directly
1. Open `data/phones.json`
2. Add/edit phone objects
3. Restart dev server

### Method 3: Import from CSV
1. Place your CSV in root directory as `data.csv`
2. Run: `npm run convert-data`
3. Your JSON will be updated at `data/phones.json`

---

## 🎨 Customizing

### Change Colors
Edit `styles/globals.css`:
```css
:root {
    --primary-color: #00d4ff;      /* Change this */
    --secondary-color: #00ff88;    /* And this */
    --gradient: linear-gradient(135deg, #0099ff, #00ff88);
}
```

### Change Logo
Replace `public/logo.png` with your logo

### Edit Content
- Homepage content: `pages/index.js`
- Products page: `pages/products.js`
- CRUD page: `pages/crud.js`
- Analytics: `pages/analytics.js`

---

## 🌐 Deploying to Vercel

### Super Quick Deploy:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Or use GitHub:**
1. Push code to GitHub
2. Connect to Vercel
3. Auto-deploy on every push

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for detailed guide.

---

## 🐛 Common Issues

### Port 3000 already in use
```bash
npx kill-port 3000
# Or use different port:
npm run dev -- -p 3001
```

### Can't see data
- Check if `data/phones.json` exists
- Try: `npm run convert-data`

### Build fails
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Hot reload not working
- Restart dev server
- Clear browser cache

---

## 📚 Learn More

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### React
- [React Documentation](https://react.dev)
- [React Tutorial](https://react.dev/learn)

### Deployment
- [Vercel Platform](https://vercel.com/docs)

---

## 🆘 Need Help?

Check these files:
- **README-NEXTJS.md** - Full documentation
- **DEPLOYMENT.md** - Deployment guide
- **DEPLOYMENT.md** - Troubleshooting

---

## ✨ Features Included

✅ Server-side rendering (SSR)  
✅ API routes (no backend needed!)  
✅ Responsive design  
✅ Interactive charts  
✅ CRUD operations  
✅ Search & filters  
✅ Modern UI/UX  
✅ Production-ready  

---

**Happy Coding! 🎉**

Questions? Contact: info@marketechmobile.com

