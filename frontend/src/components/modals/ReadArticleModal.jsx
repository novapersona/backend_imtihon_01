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
    <div
      id="read-article-modal"
      className="modal"
      style={{ display: 'flex' }}
      onClick={handleClose}
    >
      <div
        className="modal-content modal-reading-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-modal-btn" aria-label="Yopish" onClick={handleClose}>
          &times;
        </button>

        <div className="reading-toolbar">
          <div className="toolbar-left">
            <span id="reading-cat-badge" className="article-badge">
              {typeof article.category === 'object' && article.category !== null ? article.category.name : (article.category || "Ilm-ma'rifat")}
            </span>
            <span id="reading-date-badge" className="reading-date">
              <i className="far fa-calendar-alt"></i> {article.date || 'Bugun'}
            </span>
            <span id="reading-views-badge" className="reading-views">
              <i className="far fa-eye"></i> {article.views || 0} marta o'qildi
            </span>
          </div>
          <div className="toolbar-right">
            <button
              id="reading-tts-btn"
              className="tool-btn"
              title="Maqolani audio tarzda tinglash"
              onClick={handleSpeak}
            >
              <i className="fas fa-volume-up"></i>
            </button>
            <button
              id="reading-fav-btn"
              className={`tool-btn tool-fav ${isFav ? 'active' : ''}`}
              title="Saralanganlarga saqlash"
              onClick={() => toggleFavorite(article.id)}
            >
              <i className="fas fa-heart"></i>
            </button>
          </div>
        </div>

        <h1 id="reading-title" className="reading-title">
          {article.title}
        </h1>

        {article.image && (
          <div className="reading-image-box" id="reading-image-box">
            <img id="reading-image" src={article.image} alt={article.title} />
          </div>
        )}

        <div
          id="reading-content-body"
          className="reading-body"
          style={{ whiteSpace: 'pre-line' }}
        >
          {article.content}
        </div>

        <div className="reading-comments-wrap">
          <h3>
            <i className="fas fa-comments"></i> Fikr va Izohlar (
            <span id="comments-count">{articleComments.length}</span>)
          </h3>

          <div id="comments-list" className="comments-list">
            {articleComments.map((com, i) => (
              <div key={i} className="comment-item">
                <div className="comment-meta">
                  <strong>{com.user}</strong>
                  <span>{com.date}</span>
                </div>
                <p>{com.text}</p>
              </div>
            ))}
          </div>

          <form
            id="add-comment-form"
            className="comment-form"
            onSubmit={handleAddComment}
          >
            <div className="form-group">
              <label htmlFor="comment-text">Fikringizni qoldiring:</label>
              <textarea
                id="comment-text"
                rows="3"
                placeholder="Maqola bo'yicha fikr yoki mulohazangiz..."
                required
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-paper-plane"></i> Izoh qoldirish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
