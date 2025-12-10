// CRUD Operations JavaScript
const API_URL = 'http://localhost:5000/api';

let allPhones = [];
let filteredPhones = [];
let currentPage = 1;
const itemsPerPage = 10;

// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadInventory();
    setupForms();
    setupModal();
    setupSearch();
});

// Load inventory
async function loadInventory() {
    try {
        const response = await fetch(`${API_URL}/phones`);
        const result = await response.json();
        
        if (result.success) {
            allPhones = result.data;
            filteredPhones = [...allPhones];
            displayInventory();
        }
    } catch (error) {
        console.error('Error loading inventory:', error);
        showToast('Error loading inventory. Please ensure server is running.', 'error');
        document.getElementById('inventoryTableBody').innerHTML = `
            <tr>
                <td colspan="10" style="text-align: center; padding: 40px;">
                    <p style="color: #666;">Unable to load inventory</p>
                    <p style="color: #999; font-size: 14px;">Run: python app.py</p>
                </td>
            </tr>
        `;
    }
}

// Display inventory table
function displayInventory() {
    const tbody = document.getElementById('inventoryTableBody');
    
    if (filteredPhones.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align: center; padding: 40px;">
                    <p>No phones in inventory</p>
                </td>
            </tr>
        `;
        return;
    }
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const phonesToShow = filteredPhones.slice(startIndex, endIndex);
    
    tbody.innerHTML = phonesToShow.map(phone => `
        <tr>
            <td>${phone.id}</td>
            <td>${phone.Model}</td>
            <td>${phone.Storage}</td>
            <td>${phone.RAM}</td>
            <td>${phone['Screen Size (inches)']}</td>
            <td>${phone['Camera (MP)']}</td>
            <td>${phone['Battery Capacity (mAh)']}</td>
            <td>$${cleanPrice(phone['Price ($)'])}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editPhone(${phone.id})">Edit</button>
                    <button class="btn-delete" onclick="deletePhone(${phone.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Update pagination
    updatePagination();
}

// Update pagination
function updatePagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredPhones.length / itemsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let html = '';
    
    // Previous button
    html += `<button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">Previous</button>`;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span>...</span>';
        }
    }
    
    // Next button
    html += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">Next</button>`;
    
    pagination.innerHTML = html;
}

// Change page
function changePage(page) {
    currentPage = page;
    displayInventory();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Setup forms
function setupForms() {
    const addForm = document.getElementById('addPhoneForm');
    const editForm = document.getElementById('editPhoneForm');
    const toggleBtn = document.getElementById('toggleFormBtn');
    
    // Toggle form visibility
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            addForm.style.display = addForm.style.display === 'none' ? 'flex' : 'none';
        });
    }
    
    // Add phone form
    if (addForm) {
        addForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await addPhone();
        });
    }
    
    // Edit phone form
    if (editForm) {
        editForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await updatePhone();
        });
    }
}

// Add new phone
async function addPhone() {
    const formData = {
        brand: '',
        model: document.getElementById('model').value,
        storage: document.getElementById('storage').value,
        ram: document.getElementById('ram').value,
        screenSize: document.getElementById('screenSize').value,
        camera: document.getElementById('camera').value,
        battery: document.getElementById('battery').value,
        price: document.getElementById('price').value
    };
    
    try {
        const response = await fetch(`${API_URL}/phones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Phone added successfully!', 'success');
            document.getElementById('addPhoneForm').reset();
            await loadInventory();
        } else {
            showToast('Failed to add phone: ' + result.message, 'error');
        }
    } catch (error) {
        console.error('Error adding phone:', error);
        showToast('Error adding phone. Please try again.', 'error');
    }
}

// Edit phone
function editPhone(id) {
    const phone = allPhones.find(p => p.id === id);
    if (!phone) return;
    
    // Fill edit form
    document.getElementById('editRowId').value = phone.id;
    document.getElementById('editModel').value = phone.Model;
    document.getElementById('editStorage').value = phone.Storage;
    document.getElementById('editRam').value = phone.RAM;
    document.getElementById('editScreenSize').value = phone['Screen Size (inches)'];
    document.getElementById('editCamera').value = phone['Camera (MP)'];
    document.getElementById('editBattery').value = phone['Battery Capacity (mAh)'];
    document.getElementById('editPrice').value = cleanPrice(phone['Price ($)']);
    
    // Show modal
    document.getElementById('editModal').style.display = 'block';
}

// Update phone
async function updatePhone() {
    const id = parseInt(document.getElementById('editRowId').value);
    const formData = {
        brand: '',
        model: document.getElementById('editModel').value,
        storage: document.getElementById('editStorage').value,
        ram: document.getElementById('editRam').value,
        screenSize: document.getElementById('editScreenSize').value,
        camera: document.getElementById('editCamera').value,
        battery: document.getElementById('editBattery').value,
        price: document.getElementById('editPrice').value
    };
    
    try {
        const response = await fetch(`${API_URL}/phones/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Phone updated successfully!', 'success');
            closeModal();
            await loadInventory();
        } else {
            showToast('Failed to update phone: ' + result.message, 'error');
        }
    } catch (error) {
        console.error('Error updating phone:', error);
        showToast('Error updating phone. Please try again.', 'error');
    }
}

// Delete phone
async function deletePhone(id) {
    if (!confirm('Are you sure you want to delete this phone?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/phones/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Phone deleted successfully!', 'success');
            await loadInventory();
        } else {
            showToast('Failed to delete phone: ' + result.message, 'error');
        }
    } catch (error) {
        console.error('Error deleting phone:', error);
        showToast('Error deleting phone. Please try again.', 'error');
    }
}

// Setup modal
function setupModal() {
    const modal = document.getElementById('editModal');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.getElementById('cancelEdit');
    
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }
    
    if (cancelBtn) {
        cancelBtn.onclick = closeModal;
    }
    
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
}

// Close modal
function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Setup search
function setupSearch() {
    const searchInput = document.getElementById('searchInventory');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            if (query === '') {
                filteredPhones = [...allPhones];
            } else {
                filteredPhones = allPhones.filter(phone => {
                    return phone.Model.toLowerCase().includes(query) ||
                           phone.Storage.toLowerCase().includes(query) ||
                           phone.RAM.toLowerCase().includes(query);
                });
            }
            
            currentPage = 1;
            displayInventory();
        });
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

// Clean price string
function cleanPrice(priceStr) {
    if (!priceStr) return '0';
    return priceStr.replace(/[$,]/g, '').trim();
}

