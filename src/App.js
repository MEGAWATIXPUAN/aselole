import React, { useState, useEffect, useCallback } from 'react';

// CSS sebagai string
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

  .google-btn-container {
    margin-top: 20px;
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

  // GANTI INI DENGAN CLIENT ID ANDA
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '629945029527-u6b1f3v83odjhegvqg7d8bkehfmfgr1p.apps.googleusercontent.com';

  // Decode JWT token
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return null;
    }
  };

  // Wrap dengan useCallback untuk menghindari re-create setiap render
  const handleCredentialResponse = useCallback((response) => {
    try {
      // Decode JWT token dari Google
      const userObject = parseJwt(response.credential);
      
      if (userObject) {
        const userData = {
          name: userObject.name,
          email: userObject.email,
          picture: userObject.picture
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login gagal. Silakan coba lagi.');
    }
  }, []); // Empty dependency karena tidak bergantung pada state/props lain

  useEffect(() => {
    // Inject CSS
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Check for saved user first
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsLoading(false);
      } catch (e) {
        localStorage.removeItem('user');
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }

    return () => {
      if (styleSheet.parentNode) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  // Separate effect for Google Sign-In initialization
  useEffect(() => {
    // Only initialize if user is not logged in
    if (user) return;

    // Check if script already loaded
    if (window.google) {
      initializeGoogleSignIn();
      return;
    }

    // Load Google Identity Services Script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      initializeGoogleSignIn();
    };

    script.onerror = () => {
      console.error('Failed to load Google Identity Services');
    };

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, [user, handleCredentialResponse, GOOGLE_CLIENT_ID]);

  const initializeGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      // Render button with a small delay to ensure DOM is ready
      setTimeout(() => {
        const buttonDiv = document.getElementById('google-signin-button');
        if (buttonDiv) {
          window.google.accounts.id.renderButton(
            buttonDiv,
            { 
              theme: 'outline', 
              size: 'large',
              width: 350,
              text: 'signin_with',
              shape: 'pill',
              logo_alignment: 'left'
            }
          );
        }
      }, 100);
    }
  }; // Tambahkan handleCredentialResponse sebagai dependency

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    
    // Google Sign Out
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
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
          <div id="google-signin-button" className="google-btn-container"></div>
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