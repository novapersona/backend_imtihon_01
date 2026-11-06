import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const TestsSection = () => {
  const { quizzes, currentUser, getCurrentUserRecord, setActiveModal, setModalData, playSound, showToast } =
    useApp();
  const [filter, setFilter] = useState('all');
  const userRec = getCurrentUserRecord();

  const filteredQuizzes = quizzes.filter((q) => {
    if (filter === 'all') return true;
    return q.level === filter;
  });

  const handleStartQuiz = (quiz) => {
    playSound('click');
    if (!currentUser) {
      showToast("Test topshirish va coin ishlash uchun profilingizga kiring!", "info");
      setActiveModal('login');
      return;
    }

    const attempts = userRec?.quizAttempts?.[quiz.id] || 0;
    if (attempts >= 1) {
      showToast("Siz bu testni topshirib bo'lgansiz!", "info");
      return;
    }

    setModalData(quiz);
    setActiveModal('quiz');
  };

  return (
    <section id="tests" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fas fa-puzzle-piece"></i> Sinov
          </div>
          <h2>
            <i className="fas fa-brain" style={{ color: 'var(--primary)' }}></i> Arabcha–O'zbekcha Interaktiv Testlar
          </h2>
          <p>
            Bilimingizni sinang, har bir to'g'ri javob uchun 🪙 coin ishlang va sovg'alarga almashtiring!
          </p>
        </div>

        {/* Filter for quizzes */}
        <div className="quiz-filter-row">
          <div className="category-chips" id="quiz-level-filters">
            <button
              className={`chip ${filter === 'all' ? 'active' : ''}`}
              onClick={() => {
                playSound('click');
                setFilter('all');
              }}
            >
              Barcha testlar
            </button>
            <button
              className={`chip ${filter === 'easy' ? 'active' : ''}`}
              onClick={() => {
                playSound('click');
                setFilter('easy');
              }}
            >
              Boshlang'ich
            </button>
            <button
              className={`chip ${filter === 'medium' ? 'active' : ''}`}
              onClick={() => {
                playSound('click');
                setFilter('medium');
              }}
            >
              O'rta daraja
            </button>
          </div>
          <div className="quiz-info-badge">
            <i className="fas fa-coins" style={{ color: '#f59e0b' }}></i> Har bir to'g'ri javob:{' '}
            <strong>+1 Coin</strong>
          </div>
        </div>

        {/* Tests Grid */}
        <div id="tests-grid" className="tests-grid">
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((q) => {
              const attempts = userRec?.quizAttempts?.[q.id] || 0;
              const locked = attempts >= 1;
              const wordsCount = q.words?.length || 0;

              return (
                <div key={q.id} className={`test-card ${locked ? 'test-card-locked' : ''}`}>
                  <div className="test-card-icon">
                    <i className={`fas ${locked ? 'fa-lock' : 'fa-brain'}`}></i>
                  </div>
                  <h3>{q.title}</h3>
                  <p className="test-meta">
                    <i className="fas fa-list-ul"></i> {wordsCount} ta so'z &nbsp;|&nbsp; 🪙{' '}
                    {wordsCount} coin
                  </p>
                  <p className={`test-attempts ${locked ? 'attempts-done' : ''}`}>
                    {locked ? (
                      <>
                        <i className="fas fa-check-circle"></i> Bajarilgan
                      </>
                    ) : (
                      <>
                        <i className="fas fa-play-circle"></i> Bajarilmagan
                      </>
                    )}
                  </p>
                  {locked ? (
                    <button className="btn btn-disabled" disabled>
                      Yakunlangan
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleStartQuiz(q)}
                    >
                      <i className="fas fa-play"></i> Testni boshlash
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p className="empty-msg">Bu toifada hozircha testlar yo'q.</p>
          )}
        </div>
      </div>
    </section>
  );
};
