import React from 'react';
import { useApp } from '../../context/AppContext';

export const CoinModal = () => {
  const {
    activeModal,
    setActiveModal,
    modalData,
    getCurrentUserRecord,
    users,
    currentUser,
    playSound,
    showToast,
  } = useApp();

  if (activeModal !== 'coin' || !modalData) return null;

  const { quiz, cost = 10 } = modalData;
  const userRec = getCurrentUserRecord();

  const handleClose = () => {
    playSound('click');
    setActiveModal(null);
  };

  const handleConfirm = () => {
    if ((userRec?.coins || 0) < cost) {
      playSound('wrong');
      showToast("Hisobingizda Coin yetarli emas!", "error");
      return;
    }

    // Deduct coins
    const updatedUser = users.find((u) => u.username === currentUser?.username);
    if (updatedUser) {
      updatedUser.coins -= cost;
    }

    playSound('coin');
    showToast(`-${cost} Coin yechildi. Qayta topshirishga marhamat!`, "info");
    setActiveModal('quiz');
  };

  return (
    <div className="modal active" style={{ display: 'flex' }} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={handleClose}>
          &times;
        </button>

        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '12px' }}>
            <i className="fas fa-coins"></i>
          </div>
          <h3>Qayta topshirish</h3>
          <p style={{ color: 'var(--text-muted)', margin: '12px 0 24px' }}>
            Siz ushbu testni oldin topshirgansiz. Qayta topshirish uchun hisobingizdan{' '}
            <strong style={{ color: 'var(--secondary)' }}>{cost} Coin</strong> sarflanadi.
            Hozirgi balansingiz: <strong>{userRec?.coins || 0} Coin</strong>.
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary-outline btn-block" onClick={handleClose}>
              Bekor qilish
            </button>
            <button className="btn btn-primary btn-block" onClick={handleConfirm}>
              Davom etish ({cost} Coin)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
