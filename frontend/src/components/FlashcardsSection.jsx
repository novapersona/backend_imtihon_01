import React, { useState } from 'react';
import { DEFAULT_FLASHCARDS } from '../data/initialData';
import { speakText } from '../utils/speech';
import { useApp } from '../context/AppContext';

export const FlashcardsSection = () => {
  const { learnedCards, markCardLearned, playSound, showToast } = useApp();

  const [category, setCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const categories = [
    { id: 'all', label: 'Barcha mavzular' },
    { id: 'daily', label: 'Kundalik zaruriy' },
    { id: 'nature', label: 'Tabiat' },
    { id: 'family', label: 'Oila' },
    { id: 'study', label: "Ta'lim & Maktab" },
  ];

  const filteredCards = DEFAULT_FLASHCARDS.filter((card) => {
    if (category === 'all') return true;
    return card.category === category;
  });

  const activeCard = filteredCards[currentIndex] || filteredCards[0];
  const isLearned = activeCard ? learnedCards.includes(activeCard.id) : false;

  const handleFlip = () => {
    playSound('flip');
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    playSound('click');
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    playSound('click');
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleSpeak = (e) => {
    e.stopPropagation();
    playSound('click');
    if (activeCard) {
      speakText(activeCard.arabic, 'ar-SA', (msg) => showToast(msg, 'info'));
    }
  };

  const handleCategoryChange = (catId) => {
    playSound('click');
    setCategory(catId);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const learnedCount = filteredCards.filter((c) => learnedCards.includes(c.id)).length;
  const progressPercent =
    filteredCards.length > 0 ? ((currentIndex + 1) / filteredCards.length) * 100 : 0;

  return (
    <section id="flashcards" className="section section-light">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fas fa-clone"></i> Interaktiv Mashq
          </div>
          <h2>
            <i className="fas fa-language" style={{ color: 'var(--primary)' }}></i> Arabcha So'z Kartochkalari (Flashcards)
          </h2>
          <p>Kartani aylantirib yangi so'zlarni xotirangizda muhrlang va talaffuzini tinglang</p>
        </div>

        {/* Category selector */}
        <div className="flashcard-category-tabs" id="flashcard-category-tabs">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`chip ${category === c.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* 3D Flashcard Container */}
        {activeCard ? (
          <div className="flashcard-wrapper">
            <div className="flashcard-scene" id="flashcard-scene">
              <div
                className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}
                id="main-flashcard"
                onClick={handleFlip}
              >
                {/* FRONT */}
                <div className="flashcard-face flashcard-front">
                  <div className="fc-badge" id="fc-category-badge">
                    {activeCard.categoryName}
                  </div>
                  <button
                    className="fc-audio-btn"
                    id="fc-audio-front-btn"
                    title="Talaffuzni tinglash"
                    onClick={handleSpeak}
                  >
                    <i className="fas fa-volume-up"></i>
                  </button>
                  <div className="fc-arabic" id="fc-arabic-word" dir="rtl">
                    {activeCard.arabic}
                  </div>
                  <div className="fc-translit" id="fc-translit-text">
                    {activeCard.translit}
                  </div>
                  <div className="fc-hint">
                    <i className="fas fa-sync-alt"></i> Tarjimasini ko'rish uchun bosing
                  </div>
                </div>

                {/* BACK */}
                <div className="flashcard-face flashcard-back">
                  <div className="fc-badge">O'zbekcha Ma'nosi</div>
                  <div className="fc-translation" id="fc-uzbek-word">
                    {activeCard.uzbek}
                  </div>
                  <div className="fc-example" id="fc-example-sentence">
                    <span className="fc-example-ar" dir="rtl">
                      {activeCard.exampleAr}
                    </span>
                    <span className="fc-example-uz">{activeCard.exampleUz}</span>
                  </div>
                  <div className="fc-hint">
                    <i className="fas fa-undo"></i> Qaytarish uchun bosing
                  </div>
                </div>
              </div>
            </div>

            {/* Flashcard Controls */}
            <div className="flashcard-controls">
              <button
                id="fc-prev-btn"
                className="btn btn-secondary-outline"
                onClick={handlePrev}
              >
                <i className="fas fa-arrow-left"></i> Oldingisi
              </button>
              <button id="fc-flip-btn" className="btn btn-primary" onClick={handleFlip}>
                <i className="fas fa-sync-alt"></i> Aylantirish
              </button>
              <button
                id="fc-next-btn"
                className="btn btn-secondary-outline"
                onClick={handleNext}
              >
                Keyingisi <i className="fas fa-arrow-right"></i>
              </button>
            </div>

            {/* Flashcard Tracker */}
            <div className="flashcard-tracker">
              <span id="fc-counter">
                {currentIndex + 1} / {filteredCards.length}
              </span>
              <div className="fc-progress-bar">
                <div
                  id="fc-progress-fill"
                  className="fc-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="fc-action-tags">
                <button
                  id="fc-learned-btn"
                  className={`btn ${isLearned ? 'btn-success' : 'btn-secondary-outline'} btn-sm`}
                  onClick={() => markCardLearned(activeCard.id)}
                >
                  <i className="fas fa-check"></i> {isLearned ? 'Yodlandi' : 'Yod oldim'}
                </button>
                <span className="fc-learned-count">
                  Yodlangan: <strong id="fc-learned-num">{learnedCount}</strong> ta
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};
