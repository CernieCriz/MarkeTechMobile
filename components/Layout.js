// Shared layout component with header and footer
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children, title = 'MarkeTech Mobile' }) {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Your trusted phone marketplace" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>

      {/* Header */}
      <header>
        <div className="container">
          <nav>
            <div className="logo-container">
              <img src="/logo.png" alt="MarkeTech Mobile" className="logo-img" />
              <span className="logo-text">MarkeTech Mobile</span>
            </div>
            <ul className="nav-links">
              <li>
                <Link href="/" className={router.pathname === '/' ? 'active' : ''}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className={router.pathname === '/products' ? 'active' : ''}>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/crud" className={router.pathname === '/crud' ? 'active' : ''}>
                  Manage Inventory
                </Link>
              </li>
              <li>
                <Link href="/analytics" className={router.pathname === '/analytics' ? 'active' : ''}>
                  Analytics
                </Link>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <div className="footer-logo">
                <img src="/logo.png" alt="MarkeTech Mobile" className="footer-logo-img" />
                <h3>MarkeTech Mobile</h3>
              </div>
              <p>Your trusted online smartphone marketplace. We make phone shopping simple, transparent, and convenient.</p>
            </div>
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/products">Products</Link></li>
                <li><Link href="/crud">Manage Inventory</Link></li>
                <li><Link href="/analytics">Analytics</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Customer Service</h3>
              <ul>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Shipping Info</a></li>
                <li><a href="#">Returns & Warranty</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Connect With Us</h3>
              <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2025 MarkeTech Mobile. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

