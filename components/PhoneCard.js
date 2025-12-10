// Reusable phone card component
export default function PhoneCard({ phone }) {
  const getPhoneImage = (model) => {
    const imageMap = {
      'iPhone 13 Pro': 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400',
      'Galaxy S21 Ultra': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
      '9 Pro': 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400',
      'Redmi Note 10 Pro': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
      'Galaxy Z Flip3': 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=400',
      'iPhone 13': 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400',
      'Poco X3 Pro': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    };
    return imageMap[model] || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80&fit=crop&auto=format';
  };

  const cleanPrice = (priceStr) => {
    if (!priceStr) return '0';
    return String(priceStr).replace(/[$,]/g, '').trim();
  };

  const price = cleanPrice(phone['Price ($)']);
  const storage = phone.Storage || 'N/A';
  const ram = phone.RAM || 'N/A';
  const battery = phone['Battery Capacity (mAh)'] || 'N/A';
  const camera = phone['Camera (MP)'] || 'N/A';
  const screen = phone['Screen Size (inches)'] || 'N/A';
  const imageUrl = getPhoneImage(phone.Model);

  return (
    <div className="car-card">
      <img src={imageUrl} alt={phone.Model} className="car-img" style={{ objectFit: 'cover' }} />
      <div className="car-info">
        <h3 className="car-title">{phone.Model}</h3>
        <div className="car-specs">
          <span>📦 {storage}</span>
          <span>🧠 {ram}</span>
          <span>📱 {screen}"</span>
          {camera !== 'N/A' && <span>📷 {camera}</span>}
          <span>🔋 {battery} mAh</span>
        </div>
        <div className="car-price">${price}</div>
        <a 
          href="#" 
          className="btn" 
          onClick={(e) => {
            e.preventDefault();
            alert('Item checked out.');
          }}
        >
          Check Out Now
        </a>
      </div>
    </div>
  );
}

