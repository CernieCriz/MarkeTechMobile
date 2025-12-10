// Homepage
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PhoneCard from '../components/PhoneCard';
import { useRouter } from 'next/router';

export default function Home() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    price: '',
    ram: '',
    storage: ''
  });
  const router = useRouter();

  useEffect(() => {
    loadPhones();
  }, []);

  const loadPhones = async () => {
    try {
      const response = await fetch('/api/phones');
      const result = await response.json();
      if (result.success) {
        setPhones(result.data);
      }
      setLoading(false);
    } catch (err) {
      setError('Unable to load phones');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.price) params.append('price', filters.price);
    if (filters.ram) params.append('ram', filters.ram);
    if (filters.storage) params.append('storage', filters.storage);
    router.push(`/products?${params.toString()}`);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
  };

  return (
    <Layout title="MarkeTech Mobile - Your Trusted Phone Marketplace">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Discover Your Perfect Smartphone</h1>
            <p>Browse hundreds of premium smartphones from top brands at unbeatable prices</p>
            <a href="/products" className="btn">Explore Products</a>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <div className="container">
        <section className="search-section">
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1a1a1a' }}>Find Your Ideal Phone</h2>
          <form className="search-form" onSubmit={handleSearch}>
            <div className="form-group">
              <label htmlFor="priceRange">Max Price</label>
              <select 
                id="priceRange" 
                value={filters.price}
                onChange={(e) => setFilters({...filters, price: e.target.value})}
              >
                <option value="">Any Price</option>
                <option value="200">Under $200</option>
                <option value="500">Under $500</option>
                <option value="1000">Under $1,000</option>
                <option value="2000">Under $2,000</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="ram">RAM</label>
              <select 
                id="ram"
                value={filters.ram}
                onChange={(e) => setFilters({...filters, ram: e.target.value})}
              >
                <option value="">Any RAM</option>
                <option value="4">4GB+</option>
                <option value="6">6GB+</option>
                <option value="8">8GB+</option>
                <option value="12">12GB+</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="storage">Storage</label>
              <select 
                id="storage"
                value={filters.storage}
                onChange={(e) => setFilters({...filters, storage: e.target.value})}
              >
                <option value="">Any Storage</option>
                <option value="64">64GB+</option>
                <option value="128">128GB+</option>
                <option value="256">256GB+</option>
              </select>
            </div>
            <div className="form-group">
              <label>&nbsp;</label>
              <button type="submit" className="btn" style={{ cursor: 'pointer', width: '100%' }}>Search Phones</button>
            </div>
          </form>
        </section>
      </div>

      {/* Featured Phones Section */}
      <div className="container">
        <h2 className="section-title">Featured Smartphones</h2>
        <div className="cars-grid">
          {loading && <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>Loading...</p>}
          {error && <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#666' }}>{error}</p>}
          {!loading && !error && phones.slice(0, 6).map(phone => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container">
          <h2 className="section-title" style={{ color: 'white' }}>Why Choose MarkeTech Mobile?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Wide Selection</h3>
              <p>Choose from hundreds of smartphones from all major brands</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Quality Assured</h3>
              <p>All devices are verified and come with warranty coverage</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive pricing with regular deals and discounts</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Quick and secure shipping to your doorstep</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p><strong>Email:</strong> info@marketechmobile.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Tech Street, Silicon Valley, CA 94025</p>
              <p><strong>Hours:</strong> Mon-Fri 9AM-6PM PST</p>
            </div>
            <div className="contact-form">
              <form onSubmit={handleContactSubmit}>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" rows="4" required></textarea>
                <button type="submit" className="btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

