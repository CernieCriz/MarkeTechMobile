// Products page with filtering
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import PhoneCard from '../components/PhoneCard';

export default function Products() {
  const router = useRouter();
  const [allPhones, setAllPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    price: '',
    ram: '',
    storage: '',
    sort: 'default'
  });

  useEffect(() => {
    loadPhones();
  }, []);

  useEffect(() => {
    // Apply URL filters
    const { price, ram, storage } = router.query;
    if (price || ram || storage) {
      setFilters(prev => ({
        ...prev,
        price: price || '',
        ram: ram || '',
        storage: storage || ''
      }));
    }
  }, [router.query]);

  useEffect(() => {
    if (allPhones.length > 0) {
      applyFilters();
    }
  }, [filters, allPhones]);

  const loadPhones = async () => {
    try {
      const response = await fetch('/api/phones');
      const result = await response.json();
      if (result.success) {
        setAllPhones(result.data);
        setFilteredPhones(result.data);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error loading phones:', err);
      setLoading(false);
    }
  };

  const cleanPrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseFloat(String(priceStr).replace(/[$,]/g, ''));
  };

  const applyFilters = () => {
    let filtered = [...allPhones];

    // Price filter
    if (filters.price) {
      const maxPrice = parseInt(filters.price);
      filtered = filtered.filter(phone => {
        const price = cleanPrice(phone['Price ($)']);
        return price <= maxPrice;
      });
    }

    // RAM filter
    if (filters.ram) {
      const minRam = parseInt(filters.ram);
      filtered = filtered.filter(phone => {
        const ram = parseInt(phone.RAM);
        return !isNaN(ram) && ram >= minRam;
      });
    }

    // Storage filter
    if (filters.storage) {
      const minStorage = parseInt(filters.storage);
      filtered = filtered.filter(phone => {
        const storage = parseInt(phone.Storage);
        return !isNaN(storage) && storage >= minStorage;
      });
    }

    // Sort
    if (filters.sort === 'price-low') {
      filtered.sort((a, b) => cleanPrice(a['Price ($)']) - cleanPrice(b['Price ($)']));
    } else if (filters.sort === 'price-high') {
      filtered.sort((a, b) => cleanPrice(b['Price ($)']) - cleanPrice(a['Price ($)']));
    }

    setFilteredPhones(filtered);
  };

  const resetFilters = () => {
    setFilters({
      price: '',
      ram: '',
      storage: '',
      sort: 'default'
    });
    router.push('/products', undefined, { shallow: true });
  };

  return (
    <Layout title="Products - MarkeTech Mobile">
      <section className="products-section">
        <div className="container">
          <h1 className="page-title">Browse Smartphones</h1>

          {/* Filters */}
          <div className="filters-section">
            <form className="filters-form" id="filtersForm">
              <div className="form-group">
                <label>Max Price</label>
                <select 
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
                <label>RAM</label>
                <select 
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
                <label>Storage</label>
                <select 
                  value={filters.storage}
                  onChange={(e) => setFilters({...filters, storage: e.target.value})}
                >
                  <option value="">Any Storage</option>
                  <option value="64">64GB+</option>
                  <option value="128">128GB+</option>
                  <option value="256">256GB+</option>
                  <option value="512">512GB+</option>
                </select>
              </div>
              <div className="form-group">
                <label>Sort By</label>
                <select 
                  value={filters.sort}
                  onChange={(e) => setFilters({...filters, sort: e.target.value})}
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              <button 
                type="button" 
                className="btn-reset" 
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </form>
            <div className="products-count">
              <p>Showing {filteredPhones.length} phone{filteredPhones.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="cars-grid">
            {loading && <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>Loading phones...</p>}
            {!loading && filteredPhones.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px' }}>
                <h3 style={{ color: '#666' }}>No phones found</h3>
                <p style={{ color: '#999' }}>Try adjusting your filters</p>
              </div>
            )}
            {!loading && filteredPhones.map(phone => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

