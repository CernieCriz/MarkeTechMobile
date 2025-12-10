# MarkeTech Mobile - Next.js Version

A modern phone marketplace system built with **Next.js** and **React**, deployed on **Vercel**.

## 🚀 Features

✅ **Modern Landing Page** - Professional hero section with branding  
✅ **Product Marketplace** - Browse smartphones with advanced filtering  
✅ **Inventory Management (CRUD)** - Full create, read, update, delete operations  
✅ **Analytics Dashboard** - Interactive Chart.js visualizations  
✅ **Responsive Design** - Mobile-friendly layout  
✅ **JSON Data Storage** - Simple file-based data persistence  
✅ **API Routes** - Built-in Next.js API endpoints  

## 🛠️ Technology Stack

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Charts**: Chart.js with react-chartjs-2
- **Styling**: CSS3 (Custom styles)
- **Data**: JSON file storage
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites
- Node.js 18.17.0 or higher
- npm or yarn

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Step 3: Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
marketech-mobile/
├── pages/
│   ├── api/              # API routes
│   │   ├── phones/
│   │   │   ├── index.js  # GET/POST /api/phones
│   │   │   └── [id].js   # GET/PUT/DELETE /api/phones/:id
│   │   └── analytics.js  # GET /api/analytics
│   ├── _app.js           # Custom App component
│   ├── index.js          # Homepage
│   ├── products.js       # Products page
│   ├── crud.js           # Inventory management
│   └── analytics.js      # Analytics dashboard
├── components/
│   ├── Layout.js         # Shared layout with header/footer
│   └── PhoneCard.js      # Reusable phone card component
├── lib/
│   └── data.js           # Data handling utilities
├── styles/
│   └── globals.css       # Global styles
├── data/
│   └── phones.json       # Phone inventory data
├── public/
│   ├── logo.png          # Company logo
│   └── images/           # Static images
├── scripts/
│   └── convert-csv-to-json.js  # CSV conversion utility
├── package.json
├── next.config.js
└── vercel.json
```

## 🔌 API Endpoints

### GET /api/phones
Get all phones from inventory

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 283
}
```

### GET /api/phones/:id
Get a specific phone by ID

### POST /api/phones
Add a new phone

**Request Body:**
```json
{
  "model": "iPhone 14 Pro",
  "storage": "256GB",
  "ram": "6GB",
  "screenSize": "6.1",
  "camera": "48 + 12 + 12",
  "battery": "3200",
  "price": "999"
}
```

### PUT /api/phones/:id
Update an existing phone

### DELETE /api/phones/:id
Delete a phone from inventory

### GET /api/analytics
Get analytics data

## 🌐 Deploy to Vercel

### Method 1: Deploy with Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production:
```bash
vercel --prod
```

### Method 2: Deploy via Git

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "feat: Initial Next.js conversion"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/marketech-mobile.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and configure everything
6. Click "Deploy"

### Method 3: Deploy from Vercel Dashboard

1. Visit [vercel.com/new](https://vercel.com/new)
2. Select "Import Git Repository"
3. Authorize GitHub and select your repo
4. Vercel auto-configures Next.js settings
5. Click "Deploy"

## 🔧 Configuration

### Environment Variables (Optional)
If you need to add environment variables in the future:
1. Create `.env.local` file
2. Add variables (e.g., `API_KEY=your_key`)
3. In Vercel dashboard, go to Project Settings → Environment Variables

### Data Persistence
The app currently uses JSON file storage (`data/phones.json`). For production with multiple instances, consider:
- Vercel KV (Redis)
- Vercel Postgres
- MongoDB Atlas
- Supabase

## 📱 Pages

- **/** - Homepage with hero, search, featured phones
- **/products** - Product listing with filters and sorting
- **/crud** - Inventory management (CRUD operations)
- **/analytics** - Analytics dashboard with charts

## 🎨 Customization

### Changing Colors
Edit `styles/globals.css`:
```css
:root {
    --primary-color: #00d4ff;
    --secondary-color: #00ff88;
    --gradient: linear-gradient(135deg, #0099ff, #00ff88);
}
```

### Adding More Fields
1. Update `lib/data.js` to handle new fields
2. Modify forms in `pages/crud.js`
3. Update phone card in `components/PhoneCard.js`

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill the process using port 3000
npx kill-port 3000
# Or use a different port
npm run dev -- -p 3001
```

### Build errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Data not loading
- Check that `data/phones.json` exists
- Verify API routes are working: `/api/phones`

## 🔄 Migrating from Python Flask

This is a complete rewrite of the original Flask app. Key changes:
- **Python Flask** → **Next.js API Routes**
- **Vanilla JavaScript** → **React Components**
- **CSV Storage** → **JSON Storage**
- **Multiple HTML files** → **Single Page Application with routing**
- **Python deployment** → **Vercel deployment**

## 📄 License

This project is for educational/demonstration purposes.

## 🙋 Support

For issues or questions:
- Email: info@marketechmobile.com
- Phone: +1 (555) 123-4567

---

**Deployed on Vercel** ⚡

Made with ❤️ using Next.js and React

