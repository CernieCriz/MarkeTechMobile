// API route for phones collection
import { readPhones, addPhone } from '../../../lib/data';

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Get all phones
    try {
      const phones = readPhones();
      res.status(200).json({
        success: true,
        data: phones,
        count: phones.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error reading phones data'
      });
    }
  } else if (req.method === 'POST') {
    // Add new phone
    try {
      const newPhone = addPhone(req.body);
      res.status(201).json({
        success: true,
        message: 'Phone added successfully',
        data: newPhone
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error adding phone'
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

