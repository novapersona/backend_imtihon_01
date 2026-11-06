import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Navbar = () => {
  const {
    theme,
    toggleTheme,
    soundEnabled,
    toggleSound,
    currentUser,
    getCurrentUserRecord,
    favorites,
    setActiveModal,
    logout,
    playSound,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userRec = getCurrentUserRecord();

  const handleNavClick = (e, targetId) => {
    playSound('click');
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="container nav-container">
        {/* Brand Logo */}
        <a
          href="#home"
          className="logo"
          id="logo-link"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          <span className="logo-icon">
            <i className="fas fa-book-open"></i>
          </span>
          <span className="logo-text">Ilm Chashmasi</span>
        </a>

        {/* Core Navigation Links */}
        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`} id="nav-links">
          <li>
            <a href="#home" className="nav-item active" onClick={(e) => handleNavClick(e, 'home')}>
              Bosh sahifa
            </a>
          </li>
          <li>
            <a href="#articles" className="nav-item" onClick={(e) => handleNavClick(e, 'articles')}>
              Maqolalar
            </a>
          </li>
          <li>
            <a href="#flashcards" className="nav-item" onClick={(e) => handleNavClick(e, 'flashcards')}>
              Lug'at
            </a>
          </li>
          <li>
            <a href="#tests" className="nav-item" onClick={(e) => handleNavClick(e, 'tests')}>
              Testlar
            </a>
          </li>
          <li>
            <a href="#shop" className="nav-item" onClick={(e) => handleNavClick(e, 'shop')}>
              Do'kon
            </a>
          </li>
          <li>
            <a href="#leaderboard" className="nav-item" onClick={(e) => handleNavClick(e, 'leaderboard')}>
              Reyting
            </a>
          </li>
          <li>
            <a href="#about" className="nav-item" onClick={(e) => handleNavClick(e, 'about')}>
              Haqimizda
            </a>
          </li>
          <li>
            <a href="#resources" className="nav-item" onClick={(e) => handleNavClick(e, 'resources')}>
              Resurslar
            </a>
          </li>
        </ul>

        {/* Action Controls */}
        <div className="nav-actions-group">
          <button
            id="theme-toggle-btn"
            className="nav-icon-btn"
            title="Tun / Kun rejimini almashtirish"
            aria-label="Mavzu"
            onClick={toggleTheme}
          >
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          <button
            id="sound-toggle-btn"
            className="nav-icon-btn"
            title="Ovoz effektlari"
            aria-label="Ovoz"
            onClick={toggleSound}
          >
            <i className={`fas ${soundEnabled ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
          </button>

          {/* Guest Authentication Actions */}
          {!currentUser ? (
            <div id="nav-guest-zone" className="nav-auth-box">
              <button
                id="nav-login-btn"
                className="btn btn-outline-sm"
                onClick={() => {
                  playSound('click');
                  setActiveModal('login');
                }}
              >
                Kirish
              </button>
              <button
                id="nav-register-btn"
                className="btn btn-primary-sm"
                onClick={() => {
                  playSound('click');
                  setActiveModal('login');
                }}
              >
                Ro'yxat
              </button>
            </div>
          ) : (
            /* Logged-in User Actions */
            <div id="nav-user-zone" className="nav-auth-box">
              <button
                id="nav-fav-btn"
                className="nav-icon-btn"
                title="Saralangan maqolalar"
                onClick={() => {
                  playSound('click');
                  setActiveModal('favorites');
                }}
              >
                <i className="fas fa-heart"></i>
                <span id="nav-fav-count" className="badge-dot-num">
                  {favorites.length}
                </span>
              </button>
              <button
                id="nav-orders-btn"
                className="nav-icon-btn"
                title="Mening buyurtmalarim"
                onClick={() => {
                  playSound('click');
                  setActiveModal('orders');
                }}
              >
                <i className="fas fa-shopping-bag"></i>
              </button>
              <span id="nav-coin-badge" className="coin-badge" title="Sizning coin balansingiz">
                🪙 {userRec?.coins || 0}
              </span>
              <button
                id="nav-profile-btn"
                className="btn btn-outline-sm"
                title="Mening profilim"
                onClick={() => {
                  playSound('click');
                  setActiveModal('profile');
                }}
              >
                <i className="fas fa-user-circle"></i>{' '}
                <span id="nav-username-display">{currentUser.username}</span>
              </button>
              {currentUser.role === 'admin' && (
                <button
                  id="admin-login-btn"
                  className="btn btn-admin-chip btn-sm"
                  onClick={() => {
                    playSound('click');
                    setActiveModal('admin');
                  }}
                >
                  Admin
                </button>
              )}
              <button
                id="nav-logout-btn"
                className="nav-icon-btn nav-logout-btn"
                title="Tizimdan chiqish"
                onClick={logout}
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            className="mobile-menu-btn"
            id="mobile-menu-btn"
            aria-label="Menyu"
            onClick={() => {
              playSound('click');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
};
