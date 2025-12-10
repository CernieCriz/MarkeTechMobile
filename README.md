# MarkeTech Mobile - Phone Marketplace System

A complete web-based phone marketplace system with inventory management, analytics dashboard, and CSV-based CRUD operations.

## Features

✅ **Modern Landing Page**
- Professional hero section with branding
- Product search functionality
- Featured phones showcase
- Contact section

✅ **Product Marketplace**
- Browse all available smartphones
- Advanced filtering (brand, price, RAM, storage)
- Sorting options
- Responsive product cards

✅ **Inventory Management (CRUD)**
- Create new phone entries
- Read/view all inventory
- Update existing entries
- Delete entries
- Real-time CSV updates
- Search functionality
- Pagination

✅ **Analytics Dashboard**
- Statistics overview (total products, brands, average price, inventory value)
- Interactive Chart.js visualizations:
  - Price distribution
  - Brand distribution
  - RAM distribution
  - Storage distribution
  - Battery capacity distribution
  - Average price by brand
- Data insights
- Top expensive and budget-friendly phones

✅ **Responsive Design**
- Mobile-friendly layout
- Modern blue/green gradient branding
- Smooth animations
- Professional UI/UX

## Technology Stack

### Frontend
- HTML5
- CSS3 (Modern responsive design)
- Vanilla JavaScript
- Chart.js for data visualization

### Backend
- Python Flask
- CSV file handling
- RESTful API

## Installation & Setup

### Prerequisites
- Python 3.7 or higher
- Modern web browser

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 2: Start the Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

### Step 3: Open in Browser

Open your web browser and navigate to:
```
http://localhost:5000
```

## File Structure

```
MarkeTech-Mobile/
├── index.html              # Landing page
├── products.html           # Product marketplace
├── crud.html              # Inventory management
├── analytics.html         # Analytics dashboard
├── styles.css             # Main stylesheet
├── script.js              # Homepage JavaScript
├── products.js            # Products page JavaScript
├── crud.js                # CRUD operations JavaScript
├── analytics.js           # Analytics JavaScript
├── app.py                 # Flask backend server
├── data.csv               # Phone inventory data
├── MarkeTech Mobile Logo.png  # Company logo
├── requirements.txt       # Python dependencies
└── README.md             # This file
```

## API Endpoints

### GET /api/phones
Get all phones from inventory
```json
{
  "success": true,
  "data": [...],
  "count": 408
}
```

### GET /api/phones/:id
Get a specific phone by ID

### POST /api/phones
Add a new phone
```json
{
  "brand": "Samsung",
  "model": "Galaxy S23",
  "storage": "256GB",
  "ram": "8GB",
  "screenSize": "6.1",
  "camera": "50+12+10",
  "battery": "3900",
  "price": "899"
}
```

### PUT /api/phones/:id
Update an existing phone

### DELETE /api/phones/:id
Delete a phone from inventory

### GET /api/analytics
Get analytics data

## CSV Data Format

The `data.csv` file follows this structure:
```csv
Brand,Model,Storage ,RAM ,Screen Size (inches),Camera (MP),Battery Capacity (mAh),Price ($)
Apple,iPhone 13 Pro,128 GB,6 GB,6.1,12 + 12 + 12,3095,999
Samsung,Galaxy S21 Ultra,256 GB,12 GB,6.8,108 + 10 + 10 + 12,5000,1199
...
```

## Usage Guide

### Adding a New Phone
1. Navigate to "Manage Inventory" page
2. Fill in the "Add New Phone" form
3. Click "Add Phone" button
4. The phone will be added to the CSV file

### Editing a Phone
1. Go to "Manage Inventory"
2. Find the phone in the inventory table
3. Click "Edit" button
4. Update the information in the modal
5. Click "Update Phone"

### Deleting a Phone
1. Go to "Manage Inventory"
2. Click "Delete" button next to the phone
3. Confirm deletion

### Viewing Analytics
1. Navigate to "Analytics" page
2. View statistics, charts, and insights
3. All data is automatically processed from the CSV file

### Filtering Products
1. Go to "Products" page
2. Use the filter options:
   - Brand
   - Price Range
   - RAM
   - Storage
3. Click "Reset Filters" to clear all filters

## Customization

### Changing Colors
Edit `styles.css` and modify the CSS variables:
```css
:root {
    --primary-color: #00d4ff;
    --secondary-color: #00ff88;
    --gradient: linear-gradient(135deg, #0099ff, #00ff88);
}
```

### Adding More Fields
1. Update `data.csv` header
2. Modify forms in `crud.html`
3. Update API handlers in `app.py`
4. Update JavaScript functions in `crud.js`

## Troubleshooting

### Server won't start
- Make sure Flask is installed: `pip install Flask flask-cors`
- Check if port 5000 is available
- Try running on a different port: `app.run(port=5001)`

### Can't load products
- Ensure the server is running
- Check browser console for errors
- Verify `data.csv` exists and is readable

### Charts not displaying
- Check if Chart.js is loaded (internet connection required)
- Open browser console to check for JavaScript errors

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Future Enhancements

- User authentication
- Shopping cart functionality
- Payment integration
- Product reviews and ratings
- Image upload for products
- Database integration (MongoDB/PostgreSQL)
- Advanced search with autocomplete
- Export analytics reports (PDF/Excel)

## Credits

Developed for MarkeTech Mobile
© 2025 All Rights Reserved

## License

This project is for educational/demonstration purposes.

## Support

For issues or questions, please contact:
- Email: info@marketechmobile.com
- Phone: +1 (555) 123-4567

---

**Enjoy using MarkeTech Mobile! 📱**

