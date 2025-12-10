// Products Page JavaScript
const API_URL = 'http://localhost:5000/api';

let allPhones = [];
let filteredPhones = [];
let currentPage = 1;
const phonesPerPage = 12;

// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPhones();
    setupFilters();
    setupURLFilters();
});

// Load all phones
async function loadPhones() {
    try {
        const response = await fetch(`${API_URL}/phones`);
        const result = await response.json();
        
        if (result.success) {
            allPhones = result.data;
            filteredPhones = [...allPhones];
            
            // Apply URL filters if any
            applyURLFilters();
            
            // Display phones
            displayPhones();
        }
    } catch (error) {
        console.error('Error loading phones:', error);
        showError();
    }
}

// Show error message
function showError() {
    const container = document.getElementById('productsGrid');
    container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px;">
            <h3 style="color: #666; margin-bottom: 10px;">Unable to load products</h3>
            <p style="color: #999;">Please make sure the server is running</p>
            <p style="color: #999; font-size: 14px; margin-top: 10px;">Run: python app.py</p>
        </div>
    `;
}

// Populate brand filter (removed - no longer needed)

// Setup filters
function setupFilters() {
    const filtersForm = document.getElementById('filtersForm');
    const resetBtn = document.getElementById('resetFilters');
    const sortBy = document.getElementById('sortBy');
    
    // Add event listeners to all filter inputs
    if (filtersForm) {
        const filterInputs = filtersForm.querySelectorAll('select');
        filterInputs.forEach(input => {
            input.addEventListener('change', applyFilters);
        });
    }
    
    // Reset filters
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
    
    // Sort
    if (sortBy) {
        sortBy.addEventListener('change', applyFilters);
    }
}

// Apply filters from URL parameters
function setupURLFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('price')) {
        document.getElementById('filterPrice').value = urlParams.get('price');
    }
    if (urlParams.has('ram')) {
        const ram = urlParams.get('ram');
        document.getElementById('filterRAM').value = ram;
    }
    if (urlParams.has('storage')) {
        const storage = urlParams.get('storage');
        document.getElementById('filterStorage').value = storage;
    }
}

// Apply URL filters
function applyURLFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.toString()) {
        applyFilters();
    }
}

// Apply all filters
function applyFilters() {
    const priceRange = document.getElementById('filterPrice').value;
    const ram = document.getElementById('filterRAM').value;
    const storage = document.getElementById('filterStorage').value;
    const sortBy = document.getElementById('sortBy').value;
    
    filteredPhones = allPhones.filter(phone => {
        // Price filter
        if (priceRange) {
            const price = parseFloat(cleanPrice(phone['Price ($)']));
            const [min, max] = priceRange.split('-').map(Number);
            if (max) {
                if (price < min || price > max) return false;
            } else {
                if (price < min) return false;
            }
        }
        
        // RAM filter
        if (ram) {
            const phoneRam = parseInt(phone.RAM);
            if (isNaN(phoneRam) || phoneRam < parseInt(ram)) return false;
        }
        
        // Storage filter
        if (storage) {
            const phoneStorage = parseInt(phone.Storage);
            if (isNaN(phoneStorage) || phoneStorage < parseInt(storage)) return false;
        }
        
        return true;
    });
    
    // Apply sorting
    sortPhones(sortBy);
    
    // Reset to first page
    currentPage = 1;
    
    // Display filtered phones
    displayPhones();
}

// Sort phones
function sortPhones(sortBy) {
    switch (sortBy) {
        case 'price-low':
            filteredPhones.sort((a, b) => {
                return parseFloat(cleanPrice(a['Price ($)'])) - parseFloat(cleanPrice(b['Price ($)']));
            });
            break;
        case 'price-high':
            filteredPhones.sort((a, b) => {
                return parseFloat(cleanPrice(b['Price ($)'])) - parseFloat(cleanPrice(a['Price ($)']));
            });
            break;
        default:
            // Default order
            break;
    }
}

// Reset filters
function resetFilters() {
    document.getElementById('filtersForm').reset();
    document.getElementById('sortBy').value = 'default';
    filteredPhones = [...allPhones];
    currentPage = 1;
    
    // Clear URL parameters
    window.history.replaceState({}, '', window.location.pathname);
    
    displayPhones();
}

// Display phones
function displayPhones() {
    const container = document.getElementById('productsGrid');
    const countElement = document.getElementById('productsCount');
    
    // Update count
    countElement.textContent = `Showing ${filteredPhones.length} phone${filteredPhones.length !== 1 ? 's' : ''}`;
    
    if (filteredPhones.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px;">
                <h3 style="color: #666;">No phones found</h3>
                <p style="color: #999;">Try adjusting your filters</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredPhones.map(phone => createPhoneCard(phone)).join('');
}

// Get phone image
function getPhoneImage(model) {
    // Map of phone models to image URLs
    const imageMap = {
        'iPhone 13 Pro': 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400',
        'Galaxy S21 Ultra': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
        '9 Pro': 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400',
        'Redmi Note 10 Pro': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
        'Galaxy Z Flip3': 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=400',
        'iPhone 13': 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400',
        'Poco X3 Pro': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        'Reno6 Pro+ 5G': 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400',
        'X70 Pro+': 'https://images.unsplash.com/photo-1603891631130-cnc0eb637cf6?w=400',
        'Nord CE 5G': 'https://images.unsplash.com/photo-1592286927505-b7afe6f77880?w=400',
        'Galaxy A52s 5G': 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400',
        'GT Neo2': 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400',
        'iPhone 12 Mini': 'https://images.unsplash.com/photo-1611472173362-3f53dbd65d80?w=400',
        'Find X3 Pro': 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400',
        'Mi 11 Lite 5G NE': 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400',
        'Galaxy S21': 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400',
        'Y20s (G)': 'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=400',
        '8s 5G': 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400',
        'A94': 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400',
        'Redmi 10 Prime': 'https://images.unsplash.com/photo-1571867424488-4565932edb41?w=400',
        'Galaxy A22 5G': 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400',
        'Narzo 50 Pro 5G': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
        '9': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        'Redmi Note 10 Pro Max': 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400',
        'iPhone 11': 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400',
        'Galaxy A03s': 'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=400',
        'A74 5G': 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400',
        'Y12s (2021)': 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400',
        '9i': 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400',
        'Galaxy M52 5G': 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400',
        'Redmi 10': 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400'
    };
    
    // Return specific image if exists, otherwise use placeholder
    return imageMap[model] || `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80&fit=crop&auto=format`;
}

// Create phone card HTML
function createPhoneCard(phone) {
    const price = cleanPrice(phone['Price ($)']);
    const storage = phone.Storage || 'N/A';
    const ram = phone.RAM || 'N/A';
    const battery = phone['Battery Capacity (mAh)'] || 'N/A';
    const camera = phone['Camera (MP)'] || 'N/A';
    const screen = phone['Screen Size (inches)'] || 'N/A';
    const imageUrl = getPhoneImage(phone.Model);
    
    return `
        <div class="car-card">
            <img src="${imageUrl}" alt="${phone.Model}" class="car-img" style="object-fit: cover;">
            <div class="car-info">
                <h3 class="car-title">${phone.Model}</h3>
                <div class="car-specs">
                    <span>📦 ${storage}</span>
                    <span>🧠 ${ram}</span>
                    <span>📱 ${screen}"</span>
                    <span>📷 ${camera}</span>
                    <span>🔋 ${battery} mAh</span>
                </div>
                <div class="car-price">$${price}</div>
                <a href="#" class="btn" onclick="alert('Item checked out.'); return false;">Check Out Now</a>
            </div>
        </div>
    `;
}

// Clean price string
function cleanPrice(priceStr) {
    if (!priceStr) return '0';
    return priceStr.replace(/[$,]/g, '').trim();
}

// Random gradient for phone cards
function getRandomGradient() {
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
}

