// API route for analytics
import { getAnalytics } from '../../lib/data';

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const analytics = getAnalytics();
      res.status(200).json({
        success: true,
        data: analytics
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error generating analytics'
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

