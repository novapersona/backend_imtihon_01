import React from 'react';
import { useApp } from '../../context/AppContext';

export const FavoritesModal = () => {
  const { activeModal, setActiveModal, articles, favorites, toggleFavorite, setModalData, playSound } = useApp();

  if (activeModal !== 'favorites') return null;

  const handleClose = () => {
    playSound('click');
    setActiveModal(null);
  };

  const favoriteArticles = articles.filter((a) => favorites.includes(a.id));

  const handleRead = (art) => {
    playSound('click');
    setModalData(art);
    setActiveModal('readArticle');
  };

  return (
    <div className="modal active" style={{ display: 'flex' }} onClick={handleClose}>
      <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={handleClose}>
          &times;
        </button>

        <h3>
          <i className="fas fa-bookmark" style={{ color: 'var(--primary)' }}></i> Saralangan Maqolalar
        </h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
          Siz saqlab qo'ygan qiziqarli maqolalar ro'yxati
        </p>

        {favoriteArticles.length > 0 ? (
          <div className="favorites-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {favoriteArticles.map((art) => (
              <div
                key={art.id}
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
                  <h4 style={{ margin: '0 0 4px', fontSize: '1rem' }}>{art.title}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <i className="fas fa-folder"></i> {art.category} &bull; <i className="fas fa-clock"></i>{' '}
                    {art.readTime || '3 daqiqa'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-sm btn-primary" onClick={() => handleRead(art)}>
                    <i className="fas fa-book-reader"></i> O'qish
                  </button>
                  <button
                    className="btn btn-sm btn-danger-outline"
                    title="Olib tashlash"
                    onClick={() => toggleFavorite(art.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            <i className="far fa-bookmark" style={{ fontSize: '3rem', marginBottom: '12px' }}></i>
            <p>Hozircha birorta maqolani saralamadingiz.</p>
          </div>
        )}
      </div>
    </div>
  );
};
