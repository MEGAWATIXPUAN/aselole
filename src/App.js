import React, { useState, useEffect } from 'react';

// CSS sebagai string (dalam praktik nyata, ini akan dipisah ke file .css)
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }

  .app-container {
    min-height: 100vh;
    padding: 20px;
  }

  /* Login Page */
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .login-card {
    background: white;
    padding: 50px;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    text-align: center;
    max-width: 400px;
    width: 100%;
  }

  .login-card h1 {
    color: #333;
    margin-bottom: 10px;
    font-size: 32px;
  }

  .login-card p {
    color: #666;
    margin-bottom: 40px;
    font-size: 16px;
  }

  .google-login-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    background: white;
    color: #333;
    border: 2px solid #ddd;
    padding: 15px 30px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
  }

  .google-login-btn:hover {
    background: #f8f9fa;
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .google-icon {
    width: 24px;
    height: 24px;
  }

  /* Navbar */
  .navbar {
    background: white;
    padding: 20px 40px;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  .navbar-brand {
    font-size: 28px;
    font-weight: bold;
    color: #667eea;
  }

  .navbar-user {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .user-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 3px solid #667eea;
  }

  .user-info {
    text-align: right;
  }

  .user-name {
    font-weight: 600;
    color: #333;
    font-size: 16px;
  }

  .user-email {
    font-size: 12px;
    color: #666;
  }

  .logout-btn {
    background: #ff4757;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    margin-left: 15px;
    transition: all 0.3s ease;
  }

  .logout-btn:hover {
    background: #ff3838;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 71, 87, 0.3);
  }

  /* Car Grid */
  .car-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
    margin-top: 30px;
  }

  .car-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .car-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }

  .car-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 48px;
  }

  .car-info {
    padding: 20px;
  }

  .car-name {
    font-size: 22px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }

  .car-details {
    color: #666;
    font-size: 14px;
    margin-bottom: 15px;
  }

  .car-price {
    font-size: 24px;
    font-weight: bold;
    color: #667eea;
    margin-bottom: 15px;
  }

  .buy-btn {
    width: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 12px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .buy-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  .section-title {
    color: white;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
`;

// Data mobil dummy
const carsData = [
  { id: 1, name: 'Toyota Avanza', year: 2022, price: 'Rp 250.000.000', type: 'MPV' },
  { id: 2, name: 'Honda CR-V', year: 2023, price: 'Rp 550.000.000', type: 'SUV' },
  { id: 3, name: 'Mitsubishi Xpander', year: 2022, price: 'Rp 280.000.000', type: 'MPV' },
  { id: 4, name: 'Suzuki Ertiga', year: 2023, price: 'Rp 230.000.000', type: 'MPV' },
  { id: 5, name: 'Daihatsu Xenia', year: 2022, price: 'Rp 220.000.000', type: 'MPV' },
  { id: 6, name: 'Toyota Fortuner', year: 2023, price: 'Rp 650.000.000', type: 'SUV' },
];

export default function CarMarketplace() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Konfigurasi Google OAuth (akan dibaca dari .env)
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID';
  const REDIRECT_URI = window.location.origin;

  useEffect(() => {
    // Inject CSS
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Cek apakah ada user yang sudah login (dari localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Handle OAuth callback
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    if (code && !savedUser) {
      handleOAuthCallback(code);
    } else {
      setIsLoading(false);
    }

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const handleGoogleLogin = () => {
    // URL untuk Google OAuth 2.0
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;
    
    window.location.href = googleAuthUrl;
  };

  const handleOAuthCallback = async (code) => {
    try {
      // Dalam implementasi nyata, Anda perlu backend untuk menukar code dengan access token
      // Untuk demo ini, kita simulasikan dengan data dummy
      console.log('OAuth code received:', code);
      
      // Simulasi user data (dalam praktik nyata, ini dari Google API)
      const demoUser = {
        name: 'Demo User',
        email: 'demo@example.com',
        picture: 'https://via.placeholder.com/45'
      };
      
      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
      
      // Bersihkan URL dari parameter code
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (error) {
      console.error('OAuth error:', error);
      alert('Login gagal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleBuyCar = (car) => {
    alert(`Anda tertarik dengan ${car.name}? Fitur pembelian akan segera hadir!`);
  };

  if (isLoading) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  // Login Page
  if (!user) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h1>🚗 Car Market</h1>
          <p>Silakan login untuk mengakses marketplace mobil</p>
          <button onClick={handleGoogleLogin} className="google-login-btn">
            <svg className="google-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Login dengan Google
          </button>
        </div>
      </div>
    );
  }

  // Main App (setelah login)
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-brand">🚗 Car Market</div>
        <div className="navbar-user">
          <img src={user.picture} alt={user.name} className="user-avatar" />
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-email">{user.email}</div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <h2 className="section-title">Mobil Pilihan Kami</h2>

      <div className="car-grid">
        {carsData.map((car) => (
          <div key={car.id} className="car-card">
            <div className="car-image">🚗</div>
            <div className="car-info">
              <h3 className="car-name">{car.name}</h3>
              <p className="car-details">
                Tahun: {car.year} | Tipe: {car.type}
              </p>
              <div className="car-price">{car.price}</div>
              <button 
                onClick={() => handleBuyCar(car)} 
                className="buy-btn"
              >
                Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}