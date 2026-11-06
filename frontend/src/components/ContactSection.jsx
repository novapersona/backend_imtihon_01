import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ContactSection = () => {
  const { playSound, showToast } = useApp();
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    playSound('correct');
    showToast("Fikr-mulohazangiz uchun tashakkur! 🌟", "success");
    setName('');
    setMessage('');
    setRating(5);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info-card">
            <div className="section-badge">
              <i className="fas fa-envelope-open-text"></i> Aloqa
            </div>
            <h2>Biz bilan bog'laning</h2>
            <p>
              Savollaringiz, takliflaringiz yoki hamkorlik bo'yicha fikrlaringiz bormi? Biz doimo muloqotga tayyormiz.
            </p>

            <div className="contact-channels">
              <div className="channel-item">
                <div className="channel-icon">
                  <i className="fas fa-paper-plane"></i>
                </div>
                <div>
                  <strong>Telegram kanal</strong>
                  <p>
                    <a
                      href="https://t.me/ilmchashmasi"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @ilmchashmasi_rasmiy
                    </a>
                  </p>
                </div>
              </div>

              <div className="channel-item">
                <div className="channel-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <strong>Elektron pochta</strong>
                  <p>info@ilmchashmasi.uz</p>
                </div>
              </div>

              <div className="channel-item">
                <div className="channel-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <strong>Manzil</strong>
                  <p>Toshkent shahri, O'zbekiston</p>
                </div>
              </div>
            </div>
          </div>

          <div className="feedback-form-card">
            <h3>
              <i className="fas fa-comment-dots" style={{ color: 'var(--primary)' }}></i> Fikr va Mulohaza Qoldiring
            </h3>
            <p>Platformamizni yanada mukammal qilishda sizning fikringiz biz uchun muhim!</p>
            <form id="feedback-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fb-name">Ismingiz</label>
                <input
                  type="text"
                  id="fb-name"
                  placeholder="Masalan: Azizbek"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Platformani baholang</label>
                <div className="rating-stars" id="feedback-stars">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <span
                      key={val}
                      className={`star ${rating >= val ? 'active' : ''}`}
                      onClick={() => setRating(val)}
                      style={{ cursor: 'pointer' }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="fb-message">Taklif yoki fikringiz</label>
                <textarea
                  id="fb-message"
                  rows="4"
                  placeholder="Platformada yana qanday imkoniyatlar bo'lishini xohlaysiz?.."
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                <i className="fas fa-paper-plane"></i> Yuborish
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
