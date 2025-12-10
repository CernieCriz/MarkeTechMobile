// Script to convert CSV to JSON
const fs = require('fs');
const path = require('path');

// Read CSV file
const csvFile = path.join(__dirname, '..', 'data.csv');
const outputFile = path.join(__dirname, '..', 'data', 'phones.json');

function convertCSVToJSON() {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(outputFile);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read CSV
    const csvContent = fs.readFileSync(csvFile, 'utf8');
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) {
      console.error('CSV file is empty');
      return;
    }
    
    // Get headers
    const headers = lines[0].split(',');
    
    // Convert to JSON
    const phones = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      if (values.length === headers.length) {
        const phone = {
          id: i,
          Brand: values[0] ? values[0].trim() : '',
          Model: values[1] ? values[1].trim() : '',
          Storage: values[2] ? values[2].trim() : '',
          RAM: values[3] ? values[3].trim() : '',
          'Screen Size (inches)': values[4] ? values[4].trim() : '',
          'Camera (MP)': values[5] ? values[5].trim() : '',
          'Battery Capacity (mAh)': values[6] ? values[6].trim() : '',
          'Price ($)': values[7] ? values[7].trim() : ''
        };
        
        // Only add if model exists
        if (phone.Model) {
          phones.push(phone);
        }
      }
    }
    
    // Write JSON
    fs.writeFileSync(outputFile, JSON.stringify(phones, null, 2), 'utf8');
    console.log(`✅ Successfully converted ${phones.length} phones to JSON`);
    console.log(`📁 Output: ${outputFile}`);
    
  } catch (error) {
    console.error('Error converting CSV to JSON:', error.message);
  }
}

convertCSVToJSON();

