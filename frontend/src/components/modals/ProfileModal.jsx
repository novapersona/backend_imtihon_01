import React from 'react';
import { useApp } from '../../context/AppContext';

export const ProfileModal = () => {
  const {
    activeModal,
    setActiveModal,
    currentUser,
    getCurrentUserRecord,
    favorites,
    orders,
    logout,
    playSound,
  } = useApp();

  if (activeModal !== 'profile' || !currentUser) return null;

  const userRec = getCurrentUserRecord();
  const userOrders =
    currentUser?.role === 'admin'
      ? orders
      : orders.filter((o) => o.buyer === currentUser?.username);

  const handleClose = () => {
    playSound('click');
    setActiveModal(null);
  };

  return (
    <div
      id="profile-modal"
      className="modal"
      style={{ display: 'flex' }}
      onClick={handleClose}
    >
      <div
        className="modal-content modal-profile-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-modal-btn" aria-label="Yopish" onClick={handleClose}>
          &times;
        </button>
        <div className="profile-avatar-wrap">
          <div className="profile-avatar-circle">
            <i className="fas fa-user-graduate"></i>
          </div>
          <h3 id="profile-modal-username">{currentUser.username}</h3>
          <span id="profile-modal-role" className="user-role-badge">
            {currentUser.role === 'admin' ? "Bosh Ma'mur (Admin)" : "O'quvchi"}
          </span>
        </div>

        <div className="profile-stats-grid">
          <div className="p-stat-box">
            <div className="p-stat-val" id="profile-coins-val">
              🪙 {userRec?.coins || 0}
            </div>
            <div className="p-stat-lbl">Hisobdagi Coinlar</div>
          </div>
          <div className="p-stat-box">
            <div className="p-stat-val" id="profile-tests-val">
              {userRec?.testsDone || 0}
            </div>
            <div className="p-stat-lbl">Topshirilgan Testlar</div>
          </div>
          <div className="p-stat-box">
            <div className="p-stat-val" id="profile-favs-val">
              {favorites.length}
            </div>
            <div className="p-stat-lbl">Saralangan Maqolalar</div>
          </div>
          <div className="p-stat-box">
            <div className="p-stat-val" id="profile-orders-val">
              {userOrders.length}
            </div>
            <div className="p-stat-lbl">Do'kon Xaridlari</div>
          </div>
        </div>

        <button
          className="btn btn-danger btn-block"
          onClick={logout}
          style={{ marginTop: '20px' }}
        >
          <i className="fas fa-sign-out-alt"></i> Tizimdan chiqish
        </button>
      </div>
    </div>
  );
};
