import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { speakText } from '../../utils/speech';

export const ReadArticleModal = () => {
  const {
    activeModal,
    setActiveModal,
    modalData: article,
    favorites,
    toggleFavorite,
    comments,
    addComment,
    playSound,
    showToast,
  } = useApp();

  const [commentText, setCommentText] = useState('');

  if (activeModal !== 'readArticle' || !article) return null;

  const handleClose = () => {
    playSound('click');
    setActiveModal(null);
  };

  const isFav = favorites.includes(article.id);
  const articleComments = comments[article.id] || [];

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(article.id, commentText);
    setCommentText('');
  };

  const handleSpeak = () => {
    playSound('click');
    speakText(article.title + '. ' + article.content.slice(0, 150), 'ar-SA', (msg) =>
      showToast(msg, 'info')
    );
  };

  return (
    <div className="modal active" style={{ display: 'flex' }} onClick={handleClose}>
      <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={handleClose}>
          &times;
        </button>

        {/* Header */}
        <div style={{ marginBottom: '16px' }}>
          <span className="card-cat-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '8px' }}>
            {article.category}
          </span>
          <h2 style={{ fontSize: '1.6rem', marginTop: '4px', lineHeight: '1.3' }}>
            {article.title}
          </h2>
          <div className="card-meta" style={{ marginTop: '10px' }}>
            <span>
              <i className="fas fa-clock"></i> {article.readTime || '3 daqiqa'}
            </span>
            <span>
              <i className="fas fa-eye"></i> {article.views || 0}
            </span>
            <span>
              <i className="fas fa-calendar-alt"></i> {article.date}
            </span>
          </div>
        </div>

        {/* Top actions */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button className="btn btn-sm btn-primary-outline" onClick={handleSpeak}>
            <i className="fas fa-volume-up"></i> Ovozli tinglash
          </button>
          <button
            className={`btn btn-sm ${isFav ? 'btn-success' : 'btn-secondary-outline'}`}
            onClick={() => toggleFavorite(article.id)}
          >
            <i className={`fas fa-bookmark`}></i> {isFav ? "Saralangan" : "Saralash"}
          </button>
        </div>

        {/* Image */}
        {article.image && (
          <div style={{ borderRadius: '12px', overflow: 'hidden', maxHeight: '350px', marginBottom: '24px' }}>
            <img
              src={article.image}
              alt={article.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Content */}
        <div className="article-body-text" style={{ whiteSpace: 'pre-line', lineHeight: '1.8', fontSize: '1.05rem', color: 'var(--text)' }}>
          {article.content}
        </div>

        {/* Comments Section */}
        <div style={{ marginTop: '40px', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
          <h3>
            <i className="fas fa-comments" style={{ color: 'var(--primary)' }}></i> Izohlar ({articleComments.length})
          </h3>

          <form onSubmit={handleAddComment} style={{ marginTop: '16px', marginBottom: '24px' }}>
            <div className="form-group">
              <textarea
                rows="3"
                placeholder="Fikringizni qoldiring..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-sm">
              <i className="fas fa-paper-plane"></i> Izoh yozish
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {articleComments.map((com, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--surface-2)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <strong>
                    <i className="fas fa-user-circle" style={{ color: 'var(--primary)' }}></i> {com.user}
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{com.date}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text)' }}>{com.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
