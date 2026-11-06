import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { speakText } from '../../utils/speech';

export const TakeQuizModal = () => {
  const {
    activeModal,
    setActiveModal,
    modalData: quiz,
    recordQuizAttempt,
    playSound,
    showToast,
  } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const words = quiz?.words || [];
  const currentWord = words[currentIndex];

  // Shuffle options whenever currentIndex changes
  useEffect(() => {
    if (currentWord) {
      const opts = [
        currentWord.uzbek,
        currentWord.wrong_opt1,
        currentWord.wrong_opt2,
        currentWord.wrong_opt3,
      ].filter(Boolean);

      // Fisher-Yates shuffle
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }

      setShuffledOptions(opts);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  }, [currentIndex, currentWord]);

  // Reset state when quiz changes
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setQuizFinished(false);
  }, [quiz]);

  if (activeModal !== 'quiz' || !quiz) return null;

  const handleClose = () => {
    playSound('click');
    setActiveModal(null);
  };

  const handleSelectOption = (opt) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === currentWord.uzbek;
    if (isCorrect) {
      playSound('correct');
      setCorrectCount((prev) => prev + 1);
    } else {
      playSound('wrong');
    }

    setTimeout(() => {
      if (currentIndex + 1 < words.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Finished
        const finalCorrect = isCorrect ? correctCount + 1 : correctCount;
        setQuizFinished(true);
        playSound('coin');
        recordQuizAttempt(quiz.id, finalCorrect, finalCorrect);
        showToast(`Test yakunlandi! +${finalCorrect} Coin hisobingizga qo'shildi! 🪙`, 'success');
      }
    }, 1200);
  };

  const handleSpeak = (e) => {
    e.stopPropagation();
    playSound('click');
    if (currentWord) {
      speakText(currentWord.arabic, 'ar-SA', (msg) => showToast(msg, 'info'));
    }
  };

  return (
    <div className="modal active" style={{ display: 'flex' }} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={handleClose}>
          &times;
        </button>

        {!quizFinished ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="section-badge" style={{ margin: 0 }}>
                {quiz.title}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Savol: <strong>{currentIndex + 1}</strong> / {words.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="progress-bar-track" style={{ marginBottom: '24px' }}>
              <div
                className="progress-bar-fill"
                style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
              ></div>
            </div>

            {/* Question card */}
            {currentWord && (
              <div
                style={{
                  background: 'var(--surface-2)',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  marginBottom: '20px',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    className="btn-icon-audio"
                    title="Talaffuzni tinglash"
                    onClick={handleSpeak}
                  >
                    <i className="fas fa-volume-up"></i>
                  </button>
                </div>
                <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '3rem', color: 'var(--primary)', marginBottom: '8px' }}>
                  {currentWord.arabic}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                  Ushbu so'zning to'g'ri ma'nosini toping:
                </p>
              </div>
            )}

            {/* Options */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              {shuffledOptions.map((opt, idx) => {
                let btnClass = 'btn btn-quiz-opt';
                if (isAnswered) {
                  if (opt === currentWord.uzbek) {
                    btnClass += ' opt-correct';
                  } else if (opt === selectedOption) {
                    btnClass += ' opt-wrong';
                  }
                }

                return (
                  <button
                    key={idx}
                    className={btnClass}
                    onClick={() => handleSelectOption(opt)}
                    disabled={isAnswered}
                  >
                    <span>{opt}</span>
                    {isAnswered && opt === currentWord.uzbek && (
                      <i className="fas fa-check" style={{ color: 'var(--success)' }}></i>
                    )}
                    {isAnswered && opt === selectedOption && opt !== currentWord.uzbek && (
                      <i className="fas fa-times" style={{ color: 'var(--danger)' }}></i>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '4rem', color: '#f59e0b', marginBottom: '16px' }}>
              <i className="fas fa-trophy"></i>
            </div>
            <h2>Tabriklaymiz! Test Yakunlandi!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              Siz ushbu testdagi barcha savollarga javob berdingiz.
            </p>

            <div
              style={{
                display: 'inline-flex',
                gap: '24px',
                padding: '16px 32px',
                background: 'var(--surface-2)',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                marginBottom: '24px',
              }}
            >
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                  {correctCount} / {words.length}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>To'g'ri javoblar</div>
              </div>
              <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '24px' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
                  +{correctCount} Coin
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Yutilgan tangalar</div>
              </div>
            </div>

            <div>
              <button className="btn btn-primary btn-block" onClick={handleClose}>
                <i className="fas fa-check"></i> Tugatish va Saytga qaytish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
