import React, { useState } from 'react';
import { WISDOM_QUOTES } from '../data/initialData';
import { speakText } from '../utils/speech';
import { useApp } from '../context/AppContext';

export const DailyWisdomBanner = () => {
  const { playSound, showToast } = useApp();
  const [index, setIndex] = useState(0);

  const quote = WISDOM_QUOTES[index % WISDOM_QUOTES.length];

  const handleSpeak = () => {
    playSound('click');
    speakText(quote.ar, 'ar-SA', (msg) => showToast(msg, 'info'));
  };

  const handleRefresh = () => {
    playSound('click');
    setIndex((prev) => (prev + 1) % WISDOM_QUOTES.length);
  };

  return (
    <section className="section-sm">
      <div className="container">
        <div className="wisdom-banner">
          <div className="wisdom-icon-box">
            <i className="fas fa-quote-right"></i>
          </div>
          <div className="wisdom-content">
            <span className="wisdom-tag">Bugungi Kun Hikmati</span>
            <h3 className="wisdom-arabic-text" dir="rtl">
              {quote.ar}
            </h3>
            <p className="wisdom-uzbek-text">{quote.uz}</p>
          </div>
          <div className="wisdom-actions">
            <button
              className="btn btn-icon-round"
              onClick={handleSpeak}
              title="Arabcha talaffuzni eshitish"
            >
              <i className="fas fa-volume-up"></i>
            </button>
            <button
              className="btn btn-icon-round"
              onClick={handleRefresh}
              title="Boshqa hikmat ko'rish"
            >
              <i className="fas fa-random"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
