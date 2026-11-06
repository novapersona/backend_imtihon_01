import React, { useState } from 'react';
import { WISDOM_QUOTES } from '../data/initialData';
import { speakText } from '../utils/speech';
import { useApp } from '../context/AppContext';

export const Hero = () => {
  const { playSound, showToast } = useApp();
  const [quoteIndex, setQuoteIndex] = useState(0);

  const currentQuote = WISDOM_QUOTES[quoteIndex % WISDOM_QUOTES.length];

  const handleSpeak = () => {
    playSound('click');
    speakText(currentQuote.ar, 'ar-SA', (msg) => showToast(msg, 'info'));
  };

  const handleCopy = () => {
    playSound('click');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${currentQuote.ar} - ${currentQuote.uz}`);
      showToast("Kun hikmati nusxalandi!", "success");
    }
  };

  const handleNavClick = (e, targetId) => {
    playSound('click');
    const el = document.getElementById(targetId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-text">
            <div className="hero-badge animate-up">
              <span className="badge-dot"></span> Bilimlar va Hikmatlar Buloqi
            </div>
            <h1 className="animate-up delay-1">
              Bilimlar Buloqi — <span className="highlight">Ilm Chashmasi</span>
            </h1>
            <p className="animate-up delay-2">
              Dunyoqarashingizni bitmas-tuganmas ma'rifat bilan boyiting. Arab tili so'z boyligini oshiring, testlar topshirib coin yig'ing va qimmatli sovg'alarga ega bo'ling!
            </p>
            <div className="hero-actions animate-up delay-3">
              <a
                href="#articles"
                className="btn btn-primary btn-lg"
                onClick={(e) => handleNavClick(e, 'articles')}
              >
                <i className="fas fa-book-reader"></i> O'qishni boshlash
              </a>
              <a
                href="#tests"
                className="btn btn-secondary-outline btn-lg"
                onClick={(e) => handleNavClick(e, 'tests')}
              >
                <i className="fas fa-brain"></i> Testlar
              </a>
              <a
                href="#flashcards"
                className="btn btn-secondary-outline btn-lg"
                onClick={(e) => handleNavClick(e, 'flashcards')}
              >
                <i className="fas fa-clone"></i> So'z kartalari
              </a>
            </div>
          </div>

          <div className="hero-card-col animate-fade-in">
            <div className="hero-visual-card">
              <div className="visual-card-header">
                <span className="visual-badge">
                  <i className="fas fa-sparkles"></i> Kun taklifi
                </span>
                <span className="visual-time">
                  <i className="far fa-clock"></i> Bugun
                </span>
              </div>
              <div className="visual-arabic" dir="rtl">
                {currentQuote.ar}
              </div>
              <p className="visual-translit">
                «Talabul 'ilmi fariydatun 'ala kulli muslim»
              </p>
              <p className="visual-meaning">{currentQuote.uz}</p>
              <div className="visual-card-footer">
                <button className="btn btn-sm btn-primary-outline" onClick={handleSpeak}>
                  <i className="fas fa-volume-up"></i> Tinglash
                </button>
                <button className="btn btn-sm btn-secondary-outline" onClick={handleCopy}>
                  <i className="fas fa-copy"></i> Nusxalash
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
