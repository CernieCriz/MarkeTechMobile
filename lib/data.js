// Data handling utilities for Next.js
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'phones.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read phones data
export function readPhones() {
  try {
    ensureDataDir();
    if (fs.existsSync(DATA_FILE)) {
      const fileData = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(fileData);
    }
    return [];
  } catch (error) {
    console.error('Error reading phones:', error);
    return [];
  }
}

// Write phones data
export function writePhones(phones) {
  try {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(phones, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing phones:', error);
    return false;
  }
}

// Get phone by ID
export function getPhoneById(id) {
  const phones = readPhones();
  return phones.find(p => p.id === parseInt(id));
}

// Add new phone
export function addPhone(phoneData) {
  const phones = readPhones();
  const newId = phones.length > 0 ? Math.max(...phones.map(p => p.id)) + 1 : 1;
  
  const newPhone = {
    id: newId,
    Brand: phoneData.brand || '',
    Model: phoneData.model || '',
    Storage: phoneData.storage || '',
    RAM: phoneData.ram || '',
    'Screen Size (inches)': phoneData.screenSize || '',
    'Camera (MP)': phoneData.camera || '',
    'Battery Capacity (mAh)': phoneData.battery || '',
    'Price ($)': phoneData.price || ''
  };
  
  phones.push(newPhone);
  writePhones(phones);
  return newPhone;
}

// Update phone
export function updatePhone(id, phoneData) {
  const phones = readPhones();
  const index = phones.findIndex(p => p.id === parseInt(id));
  
  if (index === -1) return null;
  
  phones[index] = {
    ...phones[index],
    Brand: phoneData.brand !== undefined ? phoneData.brand : phones[index].Brand,
    Model: phoneData.model !== undefined ? phoneData.model : phones[index].Model,
    Storage: phoneData.storage !== undefined ? phoneData.storage : phones[index].Storage,
    RAM: phoneData.ram !== undefined ? phoneData.ram : phones[index].RAM,
    'Screen Size (inches)': phoneData.screenSize !== undefined ? phoneData.screenSize : phones[index]['Screen Size (inches)'],
    'Camera (MP)': phoneData.camera !== undefined ? phoneData.camera : phones[index]['Camera (MP)'],
    'Battery Capacity (mAh)': phoneData.battery !== undefined ? phoneData.battery : phones[index]['Battery Capacity (mAh)'],
    'Price ($)': phoneData.price !== undefined ? phoneData.price : phones[index]['Price ($)']
  };
  
  writePhones(phones);
  return phones[index];
}

// Delete phone
export function deletePhone(id) {
  const phones = readPhones();
  const index = phones.findIndex(p => p.id === parseInt(id));
  
  if (index === -1) return null;
  
  const deletedPhone = phones.splice(index, 1)[0];
  writePhones(phones);
  return deletedPhone;
}

// Get analytics
export function getAnalytics() {
  const phones = readPhones();
  
  // Calculate statistics
  const prices = phones.map(p => {
    const price = parseFloat(String(p['Price ($)']).replace(/[$,]/g, ''));
    return isNaN(price) ? 0 : price;
  }).filter(p => p > 0);
  
  const avgPrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
  const totalValue = prices.reduce((a, b) => a + b, 0);
  
  // Brand distribution
  const brandCounts = {};
  phones.forEach(phone => {
    const brand = phone.Brand || 'Unknown';
    if (brand) {
      brandCounts[brand] = (brandCounts[brand] || 0) + 1;
    }
  });
  
  // Price ranges
  const priceRanges = {
    '0-200': 0,
    '200-500': 0,
    '500-1000': 0,
    '1000+': 0
  };
  
  prices.forEach(price => {
    if (price <= 200) priceRanges['0-200']++;
    else if (price <= 500) priceRanges['200-500']++;
    else if (price <= 1000) priceRanges['500-1000']++;
    else priceRanges['1000+']++;
  });
  
  return {
    totalPhones: phones.length,
    totalBrands: Object.keys(brandCounts).length,
    avgPrice: parseFloat(avgPrice.toFixed(2)),
    totalValue: parseFloat(totalValue.toFixed(2)),
    brandDistribution: brandCounts,
    priceRanges
  };
}

