import csv
import re

def clean_csv_data(input_file='data.csv', output_file='data_cleaned.csv'):
    """
    Clean the CSV data to remove duplicates, fix formatting, and handle missing values
    """
    print("Starting data cleaning process...")
    
    # Read all data
    phones = []
    seen_phones = set()  # To track duplicates
    duplicates_found = 0
    
    with open(input_file, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        
        for row in reader:
            # Skip empty rows
            if not row.get('Brand') and not row.get('Model'):
                continue
            
            # Clean and standardize each field
            brand = row.get('Brand', '').strip()
            model = row.get('Model', '').strip()
            
            # Storage: Remove spaces, standardize to "128GB" format
            storage = row.get('Storage ', '') or row.get('Storage', '')
            storage = re.sub(r'\s+', '', storage.strip())  # Remove all spaces
            if storage and not storage.endswith('GB'):
                storage = storage + 'GB'
            
            # RAM: Remove spaces, standardize to "6GB" format
            ram = row.get('RAM ', '') or row.get('RAM', '')
            ram = re.sub(r'\s+', '', ram.strip())
            if ram and not ram.endswith('GB'):
                ram = ram + 'GB'
            
            # Screen Size
            screen = row.get('Screen Size (inches)', '').strip()
            
            # Camera: Standardize format (remove MP if present, keep + format)
            camera = row.get('Camera (MP)', '').strip()
            camera = re.sub(r'MP', '', camera)  # Remove MP units
            camera = re.sub(r'\s+', ' ', camera)  # Normalize spaces
            
            # Battery
            battery = row.get('Battery Capacity (mAh)', '').strip()
            battery = re.sub(r'[^\d]', '', battery)  # Keep only numbers
            
            # Price: Remove $, commas, spaces - keep only numbers
            price = row.get('Price ($)', '').strip()
            price = re.sub(r'[$,\s]', '', price)  # Remove $, commas, spaces
            
            # Create unique key for duplicate detection (Brand + Model + Storage + RAM)
            unique_key = f"{brand}|{model}|{storage}|{ram}".lower()
            
            # Skip if duplicate
            if unique_key in seen_phones:
                print(f"   [WARNING] Skipping duplicate: {brand} {model} {storage} {ram}")
                duplicates_found += 1
                continue
            
            seen_phones.add(unique_key)
            
            # Add cleaned phone
            phones.append({
                'Brand': brand,
                'Model': model,
                'Storage': storage,
                'RAM': ram,
                'Screen Size (inches)': screen,
                'Camera (MP)': camera,
                'Battery Capacity (mAh)': battery,
                'Price ($)': price
            })
    
    # Write cleaned data
    with open(output_file, 'w', newline='', encoding='utf-8') as file:
        fieldnames = ['Brand', 'Model', 'Storage ', 'RAM ', 'Screen Size (inches)', 
                     'Camera (MP)', 'Battery Capacity (mAh)', 'Price ($)']
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        
        writer.writeheader()
        for phone in phones:
            writer.writerow({
                'Brand': phone['Brand'],
                'Model': phone['Model'],
                'Storage ': phone['Storage'],
                'RAM ': phone['RAM'],
                'Screen Size (inches)': phone['Screen Size (inches)'],
                'Camera (MP)': phone['Camera (MP)'],
                'Battery Capacity (mAh)': phone['Battery Capacity (mAh)'],
                'Price ($)': phone['Price ($)']
            })
    
    original_count = len(phones) + duplicates_found
    print(f"\n[SUCCESS] Data cleaning complete!")
    print(f"   Original rows: {original_count}")
    print(f"   Cleaned rows: {len(phones)}")
    print(f"   Duplicates removed: {duplicates_found}")
    print(f"   Saved to: {output_file}\n")
    
    return len(phones)

if __name__ == '__main__':
    clean_csv_data()

