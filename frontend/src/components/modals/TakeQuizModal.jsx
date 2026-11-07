import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { speakText } from '../../utils/speech';

export const TakeQuizModal = () => {
  const {
    activeModal,
    setActiveModal,
    modalData: quiz,
    recordQuizAttempt,
    addCoins,
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
  const total = words.length;

  useEffect(() => {
    if (currentWord) {
      const opts = [
        currentWord.uzbek,
        currentWord.wrong_opt1 || currentWord.wrong?.[0] || 'A',
        currentWord.wrong_opt2 || currentWord.wrong?.[1] || 'B',
        currentWord.wrong_opt3 || currentWord.wrong?.[2] || 'C',
      ].filter(Boolean);

      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }

      setShuffledOptions(opts);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  }, [currentIndex, currentWord]);

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

  const handleAnswer = (opt) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isRight = opt === currentWord.uzbek;
    if (isRight) {
      playSound('correct');
      setCorrectCount((prev) => prev + 1);
    } else {
      playSound('wrong');
    }

    setTimeout(() => {
      if (currentIndex + 1 < total) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        const finalCorrect = isRight ? correctCount + 1 : correctCount;
        setQuizFinished(true);
        playSound('coin');
        recordQuizAttempt(quiz.id, finalCorrect, finalCorrect);
        if (finalCorrect > 0) {
          addCoins(finalCorrect);
        }
        showToast(`Test yakunlandi! +${finalCorrect} Coin hisobingizga qo'shildi! 🪙`, 'success');
      }
    }, 1100);
  };

  const handleSpeak = (e) => {
    e.stopPropagation();
    playSound('click');
    if (currentWord) {
      speakText(currentWord.arabic, 'ar-SA', (msg) => showToast(msg, 'info'));
    }
  };

  const pct = total > 0 ? Math.round((currentIndex / total) * 100) : 0;
  const scorePct = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  let emoji = '📚';
  let resultMsg = "Ko'proq mashq qiling!";
  if (scorePct === 100) {
    emoji = '🏆';
    resultMsg = 'Mukammal natija!';
  } else if (scorePct >= 70) {
    emoji = '🎉';
    resultMsg = "Zo'r natija!";
  } else if (scorePct >= 40) {
    emoji = '💪';
    resultMsg = 'Yaxshi, davom eting!';
  }

  return (
    <div
      id="take-quiz-modal"
      className="modal"
      style={{ display: 'flex' }}
      onClick={handleClose}
    >
      <div
        className="modal-content modal-quiz-take"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-modal-btn" onClick={handleClose}>
          &times;
        </button>
        <div id="quiz-body">
          {!quizFinished && currentWord ? (
            <>
              <div className="quiz-progress-bar">
                <div className="quiz-progress-fill" style={{ width: `${pct}%` }}></div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <p className="quiz-counter">
                  Savol: {currentIndex + 1} / {total}
                </p>
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--secondary)',
                    fontWeight: 700,
                  }}
                >
                  <i className="fas fa-coins"></i> +1 coin
                </span>
              </div>

              <div className="quiz-question">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                  }}
                >
                  <span className="arabic-word" dir="rtl">
                    {currentWord.arabic}
                  </span>
                  <button
                    className="quiz-speaker-btn"
                    onClick={handleSpeak}
                    title="So'zni eshitish"
                  >
                    <i className="fas fa-volume-up"></i>
                  </button>
                </div>
                <p className="quiz-sub">
                  Ushbu arabcha so'zning to'g'ri o'zbekcha tarjimasini tanlang:
                </p>
              </div>

              <div className="quiz-options">
                {shuffledOptions.map((opt, i) => {
                  let optClass = 'quiz-option';
                  if (isAnswered) {
                    if (opt === currentWord.uzbek) optClass += ' correct';
                    else if (opt === selectedOption) optClass += ' wrong';
                  }

                  return (
                    <button
                      key={i}
                      className={optClass}
                      disabled={isAnswered}
                      onClick={() => handleAnswer(opt)}
                    >
                      <span className="opt-letter">{['A', 'B', 'C', 'D'][i]}</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div
              className="quiz-result-card"
              style={{ textAlign: 'center', padding: '20px' }}
            >
              <div style={{ fontSize: '3.5rem', marginBottom: '10px' }}>{emoji}</div>
              <h3>{resultMsg}</h3>
              <p style={{ margin: '10px 0' }}>
                Natija: <strong>{correctCount} / {total}</strong>
              </p>
              <p
                style={{
                  color: 'var(--secondary)',
                  fontWeight: 700,
                  margin: '10px 0 20px',
                }}
              >
                🪙 +{correctCount} Coin hisobingizga qo'shildi!
              </p>
              <button className="btn btn-primary" onClick={handleClose}>
                Tugatish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
