import React from 'react';
import { useApp } from '../../context/AppContext';

export const OrdersModal = () => {
  const { activeModal, setActiveModal, orders, currentUser, playSound } = useApp();

  if (activeModal !== 'orders') return null;

  const handleClose = () => {
    playSound('click');
    setActiveModal(null);
  };

  const userOrders = currentUser?.role === 'admin'
    ? orders
    : orders.filter((o) => o.buyer === currentUser?.username);

  return (
    <div className="modal active" style={{ display: 'flex' }} onClick={handleClose}>
      <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={handleClose}>
          &times;
        </button>

        <h3>
          <i className="fas fa-shopping-bag" style={{ color: 'var(--secondary)' }}></i> Buyurtmalar Tarixi
        </h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
          Do'kondan Coin orqali xarid qilingan mahsulotlaringiz holati
        </p>

        {userOrders.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {userOrders.map((ord) => (
              <div
                key={ord.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'var(--surface-2)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                }}
              >
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '1rem' }}>{ord.productTitle}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <i className="fas fa-coins" style={{ color: 'var(--secondary)' }}></i> {ord.price} Coin &bull;{' '}
                    <i className="fas fa-calendar"></i> {ord.date}
                    {currentUser?.role === 'admin' && ` • Xaridor: ${ord.buyer}`}
                  </span>
                </div>
                <div>
                  <span className="badge-pill" style={{ background: '#dcfce7', color: '#15803d' }}>
                    <i className="fas fa-truck"></i> {ord.status || 'Qabul qilindi'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            <i className="fas fa-box-open" style={{ fontSize: '3rem', marginBottom: '12px' }}></i>
            <p>Hozircha birorta xarid amalga oshirilmagan.</p>
          </div>
        )}
      </div>
    </div>
  );
};
