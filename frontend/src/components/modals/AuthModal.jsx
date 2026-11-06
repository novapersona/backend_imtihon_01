import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AuthModal = () => {
  const { activeModal, setActiveModal, login, register, playSound } = useApp();
  const [tab, setTab] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (activeModal !== 'login') return null;

  const handleClose = () => {
    playSound('click');
    setActiveModal(null);
    setError('');
    setUsername('');
    setPassword('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(username, password);
    if (!res.success) {
      setError(res.message || "Login yoki parol noto'g'ri!");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await register(username, password);
    if (!res.success) {
      setError(res.message || "Ro'yxatdan o'tishda xatolik!");
    }
  };

  return (
    <div id="login-modal" className="modal" style={{ display: 'flex' }} onClick={handleClose}>
      <div
        className="modal-content modal-auth-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-modal-btn" aria-label="Yopish" onClick={handleClose}>
          &times;
        </button>
        <div className="auth-header">
          <div className="auth-icon">
            <i className="fas fa-book-open"></i>
          </div>
          <h3>Ilm Chashmasiga Xush Kelibsiz</h3>
          <p>Bilim olish va natijalaringizni saqlash uchun profilingizga kiring</p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab-btn ${tab === 'login' ? 'active' : ''}`}
            id="tab-login-btn"
            onClick={() => {
              playSound('click');
              setTab('login');
              setError('');
            }}
          >
            Kirish
          </button>
          <button
            className={`auth-tab-btn ${tab === 'register' ? 'active' : ''}`}
            id="tab-register-btn"
            onClick={() => {
              playSound('click');
              setTab('register');
              setError('');
            }}
          >
            Ro'yxatdan o'tish
          </button>
        </div>

        {/* Login Form */}
        {tab === 'login' && (
          <form
            id="login-form"
            className="auth-form-view active"
            onSubmit={handleLoginSubmit}
          >
            <div className="form-group">
              <label htmlFor="username">
                <i className="fas fa-user"></i> Login
              </label>
              <input
                type="text"
                id="username"
                placeholder="Login nomingizni kiriting"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                <i className="fas fa-lock"></i> Parol
              </label>
              <input
                type="password"
                id="password"
                placeholder="Parolingizni kiriting"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div id="login-error" className="error-msg" style={{ display: 'block' }}>
                {error}
              </div>
            )}
            <button type="submit" className="btn btn-primary btn-block btn-lg">
              <i className="fas fa-sign-in-alt"></i> Tizimga Kirish
            </button>
            <div className="auth-switch-note">
              Hisobingiz yo'qmi?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setTab('register');
                  setError('');
                }}
              >
                Ro'yxatdan o'tish
              </a>
            </div>
          </form>
        )}

        {/* Register Form */}
        {tab === 'register' && (
          <form
            id="register-form"
            className="auth-form-view active"
            onSubmit={handleRegisterSubmit}
          >
            <div className="form-group">
              <label htmlFor="reg-username">
                <i className="fas fa-user-plus"></i> Yangi Login
              </label>
              <input
                type="text"
                id="reg-username"
                placeholder="Foydalanuvchi nomi tanlang"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="reg-password">
                <i className="fas fa-lock"></i> Parol
              </label>
              <input
                type="password"
                id="reg-password"
                placeholder="Kamida 4 ta belgi"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div id="reg-error" className="error-msg" style={{ display: 'block' }}>
                {error}
              </div>
            )}
            <button type="submit" className="btn btn-success btn-block btn-lg">
              <i className="fas fa-user-check"></i> Yangi Hisob Ochish (+10 Coin)
            </button>
            <div className="auth-switch-note">
              Profilingiz bormi?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setTab('login');
                  setError('');
                }}
              >
                Kirish
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
