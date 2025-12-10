// CRUD page for inventory management
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function CRUD() {
  const [phones, setPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPhone, setEditingPhone] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    model: '',
    storage: '',
    ram: '',
    screenSize: '',
    camera: '',
    battery: '',
    price: ''
  });

  useEffect(() => {
    loadInventory();
  }, []);

  useEffect(() => {
    filterPhones();
  }, [searchQuery, phones]);

  const loadInventory = async () => {
    try {
      const response = await fetch('/api/phones');
      const result = await response.json();
      if (result.success) {
        setPhones(result.data);
        setFilteredPhones(result.data);
      }
      setLoading(false);
    } catch (err) {
      showToast('Error loading inventory', 'error');
      setLoading(false);
    }
  };

  const filterPhones = () => {
    if (!searchQuery) {
      setFilteredPhones(phones);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = phones.filter(phone =>
      phone.Model.toLowerCase().includes(query) ||
      phone.Storage.toLowerCase().includes(query) ||
      phone.RAM.toLowerCase().includes(query)
    );
    setFilteredPhones(filtered);
    setCurrentPage(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingPhone) {
      await updatePhone();
    } else {
      await addPhone();
    }
  };

  const addPhone = async () => {
    try {
      const response = await fetch('/api/phones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        showToastMessage('Phone added successfully!', 'success');
        resetForm();
        await loadInventory();
      } else {
        showToastMessage('Failed to add phone', 'error');
      }
    } catch (err) {
      showToastMessage('Error adding phone', 'error');
    }
  };

  const updatePhone = async () => {
    try {
      const response = await fetch(`/api/phones/${editingPhone.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        showToastMessage('Phone updated successfully!', 'success');
        resetForm();
        setEditingPhone(null);
        await loadInventory();
      } else {
        showToastMessage('Failed to update phone', 'error');
      }
    } catch (err) {
      showToastMessage('Error updating phone', 'error');
    }
  };

  const deletePhone = async (id) => {
    if (!confirm('Are you sure you want to delete this phone?')) return;
    
    try {
      const response = await fetch(`/api/phones/${id}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      if (result.success) {
        showToastMessage('Phone deleted successfully!', 'success');
        await loadInventory();
      } else {
        showToastMessage('Failed to delete phone', 'error');
      }
    } catch (err) {
      showToastMessage('Error deleting phone', 'error');
    }
  };

  const editPhone = (phone) => {
    setEditingPhone(phone);
    setFormData({
      model: phone.Model,
      storage: phone.Storage,
      ram: phone.RAM,
      screenSize: phone['Screen Size (inches)'],
      camera: phone['Camera (MP)'],
      battery: phone['Battery Capacity (mAh)'],
      price: String(phone['Price ($)']).replace(/[$,]/g, '')
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      model: '',
      storage: '',
      ram: '',
      screenSize: '',
      camera: '',
      battery: '',
      price: ''
    });
    setShowForm(false);
    setEditingPhone(null);
  };

  const showToastMessage = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  // Pagination
  const totalPages = Math.ceil(filteredPhones.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPhones = filteredPhones.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Layout title="Manage Inventory - MarkeTech Mobile">
      <section className="crud-section">
        <div className="container">
          <h1 className="page-title">Inventory Management</h1>

          {/* Toast Notification */}
          {toast.show && (
            <div className={`toast show ${toast.type}`}>
              {toast.message}
            </div>
          )}

          {/* Add Phone Button */}
          <div className="crud-controls">
            <button 
              className="btn" 
              onClick={() => {
                setShowForm(!showForm);
                if (editingPhone) resetForm();
              }}
            >
              {showForm ? 'Hide Form' : '+ Add New Phone'}
            </button>
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <div className="form-card">
              <h3>{editingPhone ? 'Edit Phone' : 'Add New Phone'}</h3>
              <form className="phone-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Model"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Storage (e.g., 128GB)"
                  value={formData.storage}
                  onChange={(e) => setFormData({...formData, storage: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="RAM (e.g., 8GB)"
                  value={formData.ram}
                  onChange={(e) => setFormData({...formData, ram: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Screen Size (inches)"
                  value={formData.screenSize}
                  onChange={(e) => setFormData({...formData, screenSize: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Camera (MP)"
                  value={formData.camera}
                  onChange={(e) => setFormData({...formData, camera: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Battery (mAh)"
                  value={formData.battery}
                  onChange={(e) => setFormData({...formData, battery: e.target.value})}
                  required
                />
                <input
                  type="number"
                  placeholder="Price ($)"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
                <div className="form-actions">
                  <button type="submit" className="btn">
                    {editingPhone ? 'Update Phone' : 'Add Phone'}
                  </button>
                  <button type="button" className="btn-cancel" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Inventory Table */}
          <div className="table-container">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Model</th>
                  <th>Storage</th>
                  <th>RAM</th>
                  <th>Screen</th>
                  <th>Camera</th>
                  <th>Battery</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '40px' }}>
                      Loading inventory...
                    </td>
                  </tr>
                )}
                {!loading && paginatedPhones.length === 0 && (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '40px' }}>
                      No phones in inventory
                    </td>
                  </tr>
                )}
                {!loading && paginatedPhones.map(phone => (
                  <tr key={phone.id}>
                    <td>{phone.id}</td>
                    <td>{phone.Model}</td>
                    <td>{phone.Storage}</td>
                    <td>{phone.RAM}</td>
                    <td>{phone['Screen Size (inches)']}"</td>
                    <td>{phone['Camera (MP)']}</td>
                    <td>{phone['Battery Capacity (mAh)']} mAh</td>
                    <td>${String(phone['Price ($)']).replace(/[$,]/g, '')}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-edit" onClick={() => editPhone(phone)}>
                          Edit
                        </button>
                        <button className="btn-delete" onClick={() => deletePhone(phone.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  className={currentPage === i + 1 ? 'active' : ''}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

