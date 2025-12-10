// Analytics Dashboard JavaScript
const API_URL = 'http://localhost:5000/api';

let allPhones = [];
let charts = {};

// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for Chart.js to load
    setTimeout(() => {
        if (typeof Chart === 'undefined') {
            console.error('Chart.js not loaded!');
            showError();
        } else {
            loadAnalyticsData();
        }
    }, 100);
});

// Load analytics data
async function loadAnalyticsData() {
    try {
        const response = await fetch(`${API_URL}/phones`);
        const result = await response.json();
        
        if (result.success) {
            allPhones = result.data;
            processAnalytics();
            createCharts();
            displayInsights();
        }
    } catch (error) {
        console.error('Error loading analytics:', error);
        showError();
    }
}

// Show error message
function showError() {
    document.querySelector('.stats-overview').innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
            <h3 style="color: #666;">Unable to load analytics</h3>
            <p style="color: #999;">Please make sure the server is running</p>
            <p style="color: #999; font-size: 14px; margin-top: 10px;">Run: python app.py</p>
        </div>
    `;
}

// Process analytics
function processAnalytics() {
    // Calculate statistics
    const prices = allPhones.map(p => parseFloat(cleanPrice(p['Price ($)']))).filter(p => !isNaN(p));
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const totalValue = prices.reduce((a, b) => a + b, 0);
    
    // Update stat cards
    document.getElementById('totalProducts').textContent = allPhones.length;
    document.getElementById('avgPrice').textContent = `$${avgPrice.toFixed(2)}`;
    document.getElementById('totalValue').textContent = `$${totalValue.toLocaleString()}`;
}

// Create all charts
function createCharts() {
    try {
        createPriceDistributionChart();
        createRAMDistributionChart();
        createStorageDistributionChart();
        createBatteryDistributionChart();
    } catch (error) {
        console.error('Error creating charts:', error);
        throw error;
    }
}

// Price Distribution Chart
function createPriceDistributionChart() {
    const prices = allPhones.map(p => parseFloat(cleanPrice(p['Price ($)']))).filter(p => !isNaN(p));
    
    const ranges = {
        '$0-$200': prices.filter(p => p <= 200).length,
        '$200-$500': prices.filter(p => p > 200 && p <= 500).length,
        '$500-$1000': prices.filter(p => p > 500 && p <= 1000).length,
        '$1000+': prices.filter(p => p > 1000).length
    };
    
    const ctx = document.getElementById('priceDistributionChart');
    charts.priceDistribution = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(ranges),
            datasets: [{
                label: 'Number of Phones',
                data: Object.values(ranges),
                backgroundColor: [
                    'rgba(0, 212, 255, 0.7)',
                    'rgba(0, 255, 136, 0.7)',
                    'rgba(102, 126, 234, 0.7)',
                    'rgba(118, 75, 162, 0.7)'
                ],
                borderColor: [
                    'rgba(0, 212, 255, 1)',
                    'rgba(0, 255, 136, 1)',
                    'rgba(102, 126, 234, 1)',
                    'rgba(118, 75, 162, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });
}


// RAM Distribution Chart
function createRAMDistributionChart() {
    const ramCounts = {};
    allPhones.forEach(phone => {
        const ram = parseInt(phone.RAM);
        if (!isNaN(ram)) {
            const ramKey = `${ram}GB`;
            ramCounts[ramKey] = (ramCounts[ramKey] || 0) + 1;
        }
    });
    
    const sortedRam = Object.entries(ramCounts)
        .sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    
    const ctx = document.getElementById('ramDistributionChart');
    charts.ramDistribution = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedRam.map(r => r[0]),
            datasets: [{
                label: 'Number of Phones',
                data: sortedRam.map(r => r[1]),
                backgroundColor: 'rgba(0, 212, 255, 0.7)',
                borderColor: 'rgba(0, 212, 255, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Storage Distribution Chart
function createStorageDistributionChart() {
    const storageCounts = {};
    allPhones.forEach(phone => {
        const storage = parseInt(phone.Storage);
        if (!isNaN(storage)) {
            const storageKey = `${storage}GB`;
            storageCounts[storageKey] = (storageCounts[storageKey] || 0) + 1;
        }
    });
    
    const sortedStorage = Object.entries(storageCounts)
        .sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    
    const ctx = document.getElementById('storageDistributionChart');
    charts.storageDistribution = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: sortedStorage.map(s => s[0]),
            datasets: [{
                data: sortedStorage.map(s => s[1]),
                backgroundColor: [
                    'rgba(0, 212, 255, 0.7)',
                    'rgba(0, 255, 136, 0.7)',
                    'rgba(102, 126, 234, 0.7)',
                    'rgba(118, 75, 162, 0.7)',
                    'rgba(240, 147, 251, 0.7)',
                    'rgba(245, 87, 108, 0.7)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Battery Distribution Chart
function createBatteryDistributionChart() {
    const batteries = allPhones.map(p => parseInt(p['Battery Capacity (mAh)'])).filter(b => !isNaN(b));
    
    const ranges = {
        '< 3000 mAh': batteries.filter(b => b < 3000).length,
        '3000-4000 mAh': batteries.filter(b => b >= 3000 && b < 4000).length,
        '4000-5000 mAh': batteries.filter(b => b >= 4000 && b < 5000).length,
        '5000+ mAh': batteries.filter(b => b >= 5000).length
    };
    
    const ctx = document.getElementById('batteryDistributionChart');
    charts.batteryDistribution = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(ranges),
            datasets: [{
                label: 'Number of Phones',
                data: Object.values(ranges),
                backgroundColor: 'rgba(0, 255, 136, 0.7)',
                borderColor: 'rgba(0, 255, 136, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


// Display insights
function displayInsights() {
    // Find most expensive phone
    const prices = allPhones.map(p => ({
        phone: p,
        price: parseFloat(cleanPrice(p['Price ($)']))
    })).filter(p => !isNaN(p.price));
    
    if (prices.length > 0) {
        const mostExpensive = prices.reduce((max, p) => p.price > max.price ? p : max);
        const mostAffordable = prices.reduce((min, p) => p.price < min.price ? p : min);
        
        document.getElementById('mostExpensive').textContent = 
            `${mostExpensive.phone.Model} - $${mostExpensive.price}`;
        document.getElementById('mostAffordable').textContent = 
            `${mostAffordable.phone.Model} - $${mostAffordable.price}`;
    } else {
        document.getElementById('mostExpensive').textContent = 'N/A';
        document.getElementById('mostAffordable').textContent = 'N/A';
    }
    
    // Largest battery
    const batteries = allPhones.map(p => ({
        phone: p,
        battery: parseInt(p['Battery Capacity (mAh)'])
    })).filter(p => !isNaN(p.battery));
    
    if (batteries.length > 0) {
        const largestBattery = batteries.reduce((max, p) => p.battery > max.battery ? p : max);
        document.getElementById('largestBattery').textContent = 
            `${largestBattery.phone.Model} - ${largestBattery.battery} mAh`;
    } else {
        document.getElementById('largestBattery').textContent = 'N/A';
    }
    
    // Highest RAM
    const rams = allPhones.map(p => ({
        phone: p,
        ram: parseInt(p.RAM)
    })).filter(p => !isNaN(p.ram));
    
    if (rams.length > 0) {
        const highestRAM = rams.reduce((max, p) => p.ram > max.ram ? p : max);
        document.getElementById('highestRAM').textContent = 
            `${highestRAM.phone.Model} - ${highestRAM.ram}GB`;
    } else {
        document.getElementById('highestRAM').textContent = 'N/A';
    }
    
    // Most common storage
    const storageCounts = {};
    allPhones.forEach(phone => {
        const storage = phone.Storage;
        if (storage) {
            storageCounts[storage] = (storageCounts[storage] || 0) + 1;
        }
    });
    const storageEntries = Object.entries(storageCounts).sort((a, b) => b[1] - a[1]);
    if (storageEntries.length > 0) {
        const commonStorage = storageEntries[0];
        document.getElementById('commonStorage').textContent = 
            `${commonStorage[0]} (${commonStorage[1]} phones)`;
    } else {
        document.getElementById('commonStorage').textContent = 'N/A';
    }
    
    // Top expensive and affordable tables
    if (prices.length > 0) {
        const topExpensive = [...prices].sort((a, b) => b.price - a.price).slice(0, 5);
        document.getElementById('topExpensiveTable').innerHTML = topExpensive.map(p => `
            <tr>
                <td>${p.phone.Model}</td>
                <td>$${p.price}</td>
            </tr>
        `).join('');
        
        const topAffordable = [...prices].sort((a, b) => a.price - b.price).slice(0, 5);
        document.getElementById('topAffordableTable').innerHTML = topAffordable.map(p => `
            <tr>
                <td>${p.phone.Model}</td>
                <td>$${p.price}</td>
            </tr>
        `).join('');
    } else {
        document.getElementById('topExpensiveTable').innerHTML = '<tr><td colspan="2">No data available</td></tr>';
        document.getElementById('topAffordableTable').innerHTML = '<tr><td colspan="2">No data available</td></tr>';
    }
}

// Clean price string
function cleanPrice(priceStr) {
    if (!priceStr) return '0';
    return priceStr.replace(/[$,]/g, '').trim();
}

