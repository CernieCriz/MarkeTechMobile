// Analytics dashboard with charts
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Analytics() {
  const [phones, setPhones] = useState([]);
  const [stats, setStats] = useState({
    totalPhones: 0,
    avgPrice: 0,
    totalValue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const response = await fetch('/api/phones');
      const result = await response.json();
      if (result.success) {
        setPhones(result.data);
        calculateStats(result.data);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error loading analytics:', err);
      setLoading(false);
    }
  };

  const cleanPrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseFloat(String(priceStr).replace(/[$,]/g, ''));
  };

  const calculateStats = (data) => {
    const prices = data.map(p => cleanPrice(p['Price ($)'])).filter(p => p > 0);
    const avgPrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
    const totalValue = prices.reduce((a, b) => a + b, 0);

    setStats({
      totalPhones: data.length,
      avgPrice: avgPrice.toFixed(2),
      totalValue: totalValue.toLocaleString()
    });
  };

  // Price Distribution Data
  const getPriceDistribution = () => {
    const prices = phones.map(p => cleanPrice(p['Price ($)'])).filter(p => p > 0);
    const ranges = {
      '$0-$200': prices.filter(p => p <= 200).length,
      '$200-$500': prices.filter(p => p > 200 && p <= 500).length,
      '$500-$1000': prices.filter(p => p > 500 && p <= 1000).length,
      '$1000+': prices.filter(p => p > 1000).length
    };

    return {
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
    };
  };

  // RAM Distribution Data
  const getRAMDistribution = () => {
    const ramCounts = {};
    phones.forEach(phone => {
      const ram = parseInt(phone.RAM);
      if (!isNaN(ram)) {
        const key = `${ram}GB`;
        ramCounts[key] = (ramCounts[key] || 0) + 1;
      }
    });

    const sortedRam = Object.entries(ramCounts).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

    return {
      labels: sortedRam.map(r => r[0]),
      datasets: [{
        label: 'Number of Phones',
        data: sortedRam.map(r => r[1]),
        backgroundColor: 'rgba(0, 212, 255, 0.7)',
        borderColor: 'rgba(0, 212, 255, 1)',
        borderWidth: 2
      }]
    };
  };

  // Storage Distribution Data
  const getStorageDistribution = () => {
    const storageCounts = {};
    phones.forEach(phone => {
      const storage = parseInt(phone.Storage);
      if (!isNaN(storage)) {
        const key = `${storage}GB`;
        storageCounts[key] = (storageCounts[key] || 0) + 1;
      }
    });

    const sortedStorage = Object.entries(storageCounts).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

    return {
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
    };
  };

  // Battery Distribution Data
  const getBatteryDistribution = () => {
    const batteries = phones.map(p => parseInt(p['Battery Capacity (mAh)'])).filter(b => !isNaN(b));
    const ranges = {
      '< 3000 mAh': batteries.filter(b => b < 3000).length,
      '3000-4000 mAh': batteries.filter(b => b >= 3000 && b < 4000).length,
      '4000-5000 mAh': batteries.filter(b => b >= 4000 && b < 5000).length,
      '5000+ mAh': batteries.filter(b => b >= 5000).length
    };

    return {
      labels: Object.keys(ranges),
      datasets: [{
        label: 'Number of Phones',
        data: Object.values(ranges),
        backgroundColor: 'rgba(0, 255, 136, 0.7)',
        borderColor: 'rgba(0, 255, 136, 1)',
        borderWidth: 2
      }]
    };
  };

  // Get insights
  const getInsights = () => {
    const prices = phones.map(p => ({ phone: p, price: cleanPrice(p['Price ($)']) })).filter(p => p.price > 0);
    
    const mostExpensive = prices.length > 0 ? prices.reduce((max, p) => p.price > max.price ? p : max) : null;
    const mostAffordable = prices.length > 0 ? prices.reduce((min, p) => p.price < min.price ? p : min) : null;

    const batteries = phones.map(p => ({ phone: p, battery: parseInt(p['Battery Capacity (mAh)']) })).filter(p => !isNaN(p.battery));
    const largestBattery = batteries.length > 0 ? batteries.reduce((max, p) => p.battery > max.battery ? p : max) : null;

    const rams = phones.map(p => ({ phone: p, ram: parseInt(p.RAM) })).filter(p => !isNaN(p.ram));
    const highestRAM = rams.length > 0 ? rams.reduce((max, p) => p.ram > max.ram ? p : max) : null;

    const topExpensive = [...prices].sort((a, b) => b.price - a.price).slice(0, 5);
    const topAffordable = [...prices].sort((a, b) => a.price - b.price).slice(0, 5);

    return {
      mostExpensive,
      mostAffordable,
      largestBattery,
      highestRAM,
      topExpensive,
      topAffordable
    };
  };

  const insights = getInsights();

  const chartOptions = {
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
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  if (loading) {
    return (
      <Layout title="Analytics - MarkeTech Mobile">
        <div style={{ textAlign: 'center', padding: '100px' }}>
          <p>Loading analytics...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Analytics - MarkeTech Mobile">
      <section className="analytics-section">
        <div className="container">
          <h1 className="page-title">Analytics Dashboard</h1>

          {/* Stats Overview */}
          <div className="stats-overview">
            <div className="stat-card">
              <h3>Total Products</h3>
              <p className="stat-number">{stats.totalPhones}</p>
            </div>
            <div className="stat-card">
              <h3>Average Price</h3>
              <p className="stat-number">${stats.avgPrice}</p>
            </div>
            <div className="stat-card">
              <h3>Inventory Value</h3>
              <p className="stat-number">${stats.totalValue}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="charts-grid">
            <div className="chart-card">
              <h3>Price Distribution</h3>
              <Bar data={getPriceDistribution()} options={chartOptions} />
            </div>
            <div className="chart-card">
              <h3>RAM Distribution</h3>
              <Bar data={getRAMDistribution()} options={chartOptions} />
            </div>
            <div className="chart-card">
              <h3>Storage Distribution</h3>
              <Pie data={getStorageDistribution()} options={pieChartOptions} />
            </div>
            <div className="chart-card">
              <h3>Battery Distribution</h3>
              <Bar data={getBatteryDistribution()} options={chartOptions} />
            </div>
          </div>

          {/* Insights */}
          <div className="insights-section">
            <h2 className="section-title">Key Insights</h2>
            <div className="insights-grid">
              <div className="insight-card">
                <h4>📱 Most Expensive</h4>
                <p>{insights.mostExpensive ? `${insights.mostExpensive.phone.Model} - $${insights.mostExpensive.price}` : 'N/A'}</p>
              </div>
              <div className="insight-card">
                <h4>💰 Most Affordable</h4>
                <p>{insights.mostAffordable ? `${insights.mostAffordable.phone.Model} - $${insights.mostAffordable.price}` : 'N/A'}</p>
              </div>
              <div className="insight-card">
                <h4>🔋 Largest Battery</h4>
                <p>{insights.largestBattery ? `${insights.largestBattery.phone.Model} - ${insights.largestBattery.battery} mAh` : 'N/A'}</p>
              </div>
              <div className="insight-card">
                <h4>🧠 Highest RAM</h4>
                <p>{insights.highestRAM ? `${insights.highestRAM.phone.Model} - ${insights.highestRAM.ram}GB` : 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Top Lists */}
          <div className="top-lists">
            <div className="list-card">
              <h3>Top 5 Most Expensive</h3>
              <table>
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {insights.topExpensive.map((p, i) => (
                    <tr key={i}>
                      <td>{p.phone.Model}</td>
                      <td>${p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="list-card">
              <h3>Top 5 Most Affordable</h3>
              <table>
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {insights.topAffordable.map((p, i) => (
                    <tr key={i}>
                      <td>{p.phone.Model}</td>
                      <td>${p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

