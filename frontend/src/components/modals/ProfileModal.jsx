import React from 'react';
import { useApp } from '../../context/AppContext';

export const ProfileModal = () => {
  const { activeModal, setActiveModal, currentUser, getCurrentUserRecord, logout, playSound } = useApp();

  if (activeModal !== 'profile' || !currentUser) return null;

  const userRec = getCurrentUserRecord();

  const handleClose = () => {
    playSound('click');
    setActiveModal(null);
  };

  const handleOpenOrders = () => {
    playSound('click');
    setActiveModal('orders');
  };

  return (
    <div className="modal active" style={{ display: 'flex' }} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={handleClose}>
          &times;
        </button>

        <div className="profile-header-wrap">
          <div className="avatar-circle-lg">
            <span>{currentUser.username.charAt(0).toUpperCase()}</span>
          </div>
          <h3>{currentUser.username}</h3>
          <span className="user-role-badge">
            {currentUser.role === 'admin' ? 'Bosh Ma\'mur (Admin)' : 'O\'quvchi'}
          </span>
        </div>

        <div className="profile-stats-grid">
          <div className="profile-stat-box">
            <div className="profile-stat-val" style={{ color: 'var(--secondary)' }}>
              <i className="fas fa-coins"></i> {userRec?.coins || 0}
            </div>
            <div className="profile-stat-lbl">Hisobdagi Tangalar</div>
          </div>

          <div className="profile-stat-box">
            <div className="profile-stat-val" style={{ color: 'var(--primary)' }}>
              <i className="fas fa-check-circle"></i> {userRec?.testsDone || 0}
            </div>
            <div className="profile-stat-lbl">Yechilgan Testlar</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <button className="btn btn-secondary-outline btn-block" onClick={handleOpenOrders}>
            <i className="fas fa-shopping-bag"></i> Buyurtmalar va Xaridlar
          </button>
          <button className="btn btn-danger-outline btn-block" onClick={logout}>
            <i className="fas fa-sign-out-alt"></i> Tizimdan chiqish
          </button>
        </div>
      </div>
    </div>
  );
};
