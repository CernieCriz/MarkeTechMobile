// API route for single phone operations
import { getPhoneById, updatePhone, deletePhone } from '../../../lib/data';

export default function handler(req, res) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    // Get phone by ID
    try {
      const phone = getPhoneById(id);
      if (phone) {
        res.status(200).json({
          success: true,
          data: phone
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Phone not found'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error reading phone data'
      });
    }
  } else if (req.method === 'PUT') {
    // Update phone
    try {
      const updatedPhone = updatePhone(id, req.body);
      if (updatedPhone) {
        res.status(200).json({
          success: true,
          message: 'Phone updated successfully',
          data: updatedPhone
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Phone not found'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating phone'
      });
    }
  } else if (req.method === 'DELETE') {
    // Delete phone
    try {
      const deletedPhone = deletePhone(id);
      if (deletedPhone) {
        res.status(200).json({
          success: true,
          message: 'Phone deleted successfully',
          data: deletedPhone
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Phone not found'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting phone'
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

