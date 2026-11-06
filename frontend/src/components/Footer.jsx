import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Footer = () => {
  const { playSound, showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleNavClick = (e, targetId) => {
    playSound('click');
    const el = document.getElementById(targetId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    playSound('coin');
    showToast("Obuna muvaffaqiyatli rasmiylashtirildi! 📧", "success");
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top-grid">
          <div className="footer-col footer-brand-col">
            <a
              href="#home"
              className="logo footer-logo"
              onClick={(e) => handleNavClick(e, 'home')}
            >
              <span className="logo-icon">
                <i className="fas fa-book-open"></i>
              </span>
              <span className="logo-text">Ilm Chashmasi</span>
            </a>
            <p className="footer-desc">
              Ilm va hikmatlar bulog'idan bahra oling. Dunyoqarashingizni kengaytiruvchi bepul ta'limiy platforma.
            </p>
            <div className="social-links">
              <a href="#" className="social-btn" title="Telegram" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-telegram"></i>
              </a>
              <a href="#" className="social-btn" title="YouTube" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="social-btn" title="Instagram" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-btn" title="Facebook" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Tezkor Havolalar</h4>
            <ul className="footer-nav-list">
              <li>
                <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>
                  Bosh sahifa
                </a>
              </li>
              <li>
                <a href="#articles" onClick={(e) => handleNavClick(e, 'articles')}>
                  Maqolalar
                </a>
              </li>
              <li>
                <a href="#tests" onClick={(e) => handleNavClick(e, 'tests')}>
                  Interaktiv Testlar
                </a>
              </li>
              <li>
                <a href="#flashcards" onClick={(e) => handleNavClick(e, 'flashcards')}>
                  So'z kartochkalari
                </a>
              </li>
              <li>
                <a href="#shop" onClick={(e) => handleNavClick(e, 'shop')}>
                  Coin Do'koni
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Foydali</h4>
            <ul className="footer-nav-list">
              <li>
                <a href="#leaderboard" onClick={(e) => handleNavClick(e, 'leaderboard')}>
                  O'quvchilar Reytingi
                </a>
              </li>
              <li>
                <a href="#resources" onClick={(e) => handleNavClick(e, 'resources')}>
                  Foydali Resurslar
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>
                  Biz haqimizda
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')}>
                  Ko'p so'raladigan savollar
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>
                  Bog'lanish
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Kun Hikmati Obunasi</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Yangi maqolalar va darslardan birinchilardan bo'lib xabardor bo'ling:
            </p>
            <form id="newsletter-form" className="newsletter-box" onSubmit={handleNewsletter}>
              <input
                type="email"
                id="nl-email"
                placeholder="Elektron pochtangiz..."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" aria-label="Obuna bo'lish">
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom-wrap">
          <div className="footer-copy">
            &copy; 2026 <strong>Ilm Chashmasi</strong>. Barcha huquqlar himoyalangan.
          </div>
          <div className="footer-legal">
            <span>Fidokorona ta'lim loyihasi</span> • <span>Toshkent, O'zbekiston</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
