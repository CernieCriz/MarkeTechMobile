from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import csv
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

CSV_FILE = 'data.csv'

def read_csv():
    """Read CSV file and return data as list of dictionaries"""
    phones = []
    try:
        with open(CSV_FILE, 'r', encoding='utf-8') as file:
            csv_reader = csv.DictReader(file)
            for idx, row in enumerate(csv_reader, start=2):
                phone = {
                    'id': idx,
                    'Brand': row.get('Brand', '').strip(),
                    'Model': row.get('Model', '').strip(),
                    'Storage': row.get('Storage ', '').strip() or row.get('Storage', '').strip(),
                    'RAM': row.get('RAM ', '').strip() or row.get('RAM', '').strip(),
                    'Screen Size (inches)': row.get('Screen Size (inches)', '').strip(),
                    'Camera (MP)': row.get('Camera (MP)', '').strip(),
                    'Battery Capacity (mAh)': row.get('Battery Capacity (mAh)', '').strip(),
                    'Price ($)': row.get('Price ($)', '').strip()
                }
                # Only add if row has data
                if phone['Brand'] or phone['Model']:
                    phones.append(phone)
    except Exception as e:
        print(f"Error reading CSV: {e}")
    return phones

def write_csv(phones):
    """Write data to CSV file"""
    try:
        with open(CSV_FILE, 'w', newline='', encoding='utf-8') as file:
            fieldnames = ['Brand', 'Model', 'Storage ', 'RAM ', 'Screen Size (inches)', 
                         'Camera (MP)', 'Battery Capacity (mAh)', 'Price ($)']
            writer = csv.DictWriter(file, fieldnames=fieldnames)
            writer.writeheader()
            
            for phone in phones:
                writer.writerow({
                    'Brand': phone.get('Brand', ''),
                    'Model': phone.get('Model', ''),
                    'Storage ': phone.get('Storage', ''),
                    'RAM ': phone.get('RAM', ''),
                    'Screen Size (inches)': phone.get('Screen Size (inches)', ''),
                    'Camera (MP)': phone.get('Camera (MP)', ''),
                    'Battery Capacity (mAh)': phone.get('Battery Capacity (mAh)', ''),
                    'Price ($)': phone.get('Price ($)', '')
                })
        return True
    except Exception as e:
        print(f"Error writing CSV: {e}")
        return False

# Serve static files
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_file(path):
    return send_from_directory('.', path)

# API Routes
@app.route('/api/phones', methods=['GET'])
def get_phones():
    """Get all phones"""
    phones = read_csv()
    return jsonify({
        'success': True,
        'data': phones,
        'count': len(phones)
    })

@app.route('/api/phones/<int:phone_id>', methods=['GET'])
def get_phone(phone_id):
    """Get a specific phone by ID"""
    phones = read_csv()
    phone = next((p for p in phones if p['id'] == phone_id), None)
    
    if phone:
        return jsonify({
            'success': True,
            'data': phone
        })
    return jsonify({
        'success': False,
        'message': 'Phone not found'
    }), 404

@app.route('/api/phones', methods=['POST'])
def add_phone():
    """Add a new phone"""
    try:
        data = request.json
        phones = read_csv()
        
        # Create new phone entry
        new_phone = {
            'id': len(phones) + 2,  # Start from 2 since line 1 is header
            'Brand': data.get('brand', ''),
            'Model': data.get('model', ''),
            'Storage': data.get('storage', ''),
            'RAM': data.get('ram', ''),
            'Screen Size (inches)': data.get('screenSize', ''),
            'Camera (MP)': data.get('camera', ''),
            'Battery Capacity (mAh)': data.get('battery', ''),
            'Price ($)': data.get('price', '')
        }
        
        phones.append(new_phone)
        
        if write_csv(phones):
            return jsonify({
                'success': True,
                'message': 'Phone added successfully',
                'data': new_phone
            }), 201
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to add phone'
            }), 500
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/phones/<int:phone_id>', methods=['PUT'])
def update_phone(phone_id):
    """Update an existing phone"""
    try:
        data = request.json
        phones = read_csv()
        
        # Find phone index
        phone_index = next((i for i, p in enumerate(phones) if p['id'] == phone_id), None)
        
        if phone_index is None:
            return jsonify({
                'success': False,
                'message': 'Phone not found'
            }), 404
        
        # Update phone data
        phones[phone_index].update({
            'Brand': data.get('brand', phones[phone_index]['Brand']),
            'Model': data.get('model', phones[phone_index]['Model']),
            'Storage': data.get('storage', phones[phone_index]['Storage']),
            'RAM': data.get('ram', phones[phone_index]['RAM']),
            'Screen Size (inches)': data.get('screenSize', phones[phone_index]['Screen Size (inches)']),
            'Camera (MP)': data.get('camera', phones[phone_index]['Camera (MP)']),
            'Battery Capacity (mAh)': data.get('battery', phones[phone_index]['Battery Capacity (mAh)']),
            'Price ($)': data.get('price', phones[phone_index]['Price ($)'])
        })
        
        if write_csv(phones):
            return jsonify({
                'success': True,
                'message': 'Phone updated successfully',
                'data': phones[phone_index]
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to update phone'
            }), 500
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/phones/<int:phone_id>', methods=['DELETE'])
def delete_phone(phone_id):
    """Delete a phone"""
    try:
        phones = read_csv()
        
        # Find phone
        phone_index = next((i for i, p in enumerate(phones) if p['id'] == phone_id), None)
        
        if phone_index is None:
            return jsonify({
                'success': False,
                'message': 'Phone not found'
            }), 404
        
        # Remove phone
        deleted_phone = phones.pop(phone_index)
        
        if write_csv(phones):
            return jsonify({
                'success': True,
                'message': 'Phone deleted successfully',
                'data': deleted_phone
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to delete phone'
            }), 500
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    """Get analytics data"""
    phones = read_csv()
    
    # Calculate analytics
    total_phones = len(phones)
    brands = set(p['Brand'] for p in phones if p['Brand'])
    
    # Calculate average price
    prices = []
    for phone in phones:
        try:
            price_str = phone['Price ($)'].replace('$', '').replace(',', '').strip()
            if price_str:
                prices.append(float(price_str))
        except:
            pass
    
    avg_price = sum(prices) / len(prices) if prices else 0
    total_value = sum(prices)
    
    # Brand distribution
    brand_counts = {}
    for phone in phones:
        brand = phone['Brand']
        if brand:
            brand_counts[brand] = brand_counts.get(brand, 0) + 1
    
    # Price ranges
    price_ranges = {
        '0-200': 0,
        '200-500': 0,
        '500-1000': 0,
        '1000+': 0
    }
    
    for price in prices:
        if price <= 200:
            price_ranges['0-200'] += 1
        elif price <= 500:
            price_ranges['200-500'] += 1
        elif price <= 1000:
            price_ranges['500-1000'] += 1
        else:
            price_ranges['1000+'] += 1
    
    return jsonify({
        'success': True,
        'data': {
            'totalPhones': total_phones,
            'totalBrands': len(brands),
            'avgPrice': round(avg_price, 2),
            'totalValue': round(total_value, 2),
            'brandDistribution': brand_counts,
            'priceRanges': price_ranges
        }
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

