import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const getCategoryString = (cat) => {
  if (!cat) return "Ilm-ma'rifat";
  if (typeof cat === 'object') return cat.name || cat.title || "Ilm-ma'rifat";
  return String(cat);
};

export const ArticlesSection = () => {
  const { articles, favorites, toggleFavorite, setActiveModal, setModalData, playSound } = useApp();

  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: "Ilm-ma'rifat", label: "Ilm-ma'rifat" },
    { id: 'Kitobxonlik', label: 'Kitobxonlik' },
    { id: 'Arab tili', label: 'Arab tili' },
    { id: 'Shaxsiy rivojlanish', label: 'Shaxsiy rivojlanish' },
    { id: 'Texnologiya', label: 'Texnologiya' },
  ];

  const filteredArticles = articles
    .filter((art) => {
      const catStr = getCategoryString(art.category);
      if (category !== 'all' && catStr !== category) return false;
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        return (
          (art.title || '').toLowerCase().includes(query) ||
          (art.content || '').toLowerCase().includes(query) ||
          catStr.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.views || 0) - (a.views || 0);
      }
      if (sortBy === 'title') {
        return (a.title || '').localeCompare(b.title || '');
      }
      return new Date(b.date || 0) - new Date(a.date || 0);
    });

  const handleRead = (art) => {
    playSound('click');
    setModalData(art);
    setActiveModal('readArticle');
  };

  return (
    <section id="articles" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fas fa-book-open"></i> Mutolaa
          </div>
          <h2>Ilmiy va Ma'rifiy Maqolalar</h2>
          <p>Dunyoqarashingizni boyituvchi sara maqolalar, tavsiyalar va qo'llanmalar</p>
        </div>

        {/* Search and Filters Bar */}
        <div className="filter-controls-wrap">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              id="article-search-input"
              placeholder="Maqolalarni sarlavha yoki matn bo'yicha qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                id="article-search-clear"
                className="btn-clear"
                title="Tozalash"
                onClick={() => setSearchTerm('')}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>

          <div className="filter-row">
            <div className="category-chips" id="article-category-filters">
              {categories.map((c) => (
                <button
                  key={c.id}
                  className={`chip ${category === c.id ? 'active' : ''}`}
                  onClick={() => {
                    playSound('click');
                    setCategory(c.id);
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="sort-box">
              <label htmlFor="article-sort-select">
                <i className="fas fa-sort-amount-down"></i> Saralash:
              </label>
              <select
                id="article-sort-select"
                className="custom-select"
                value={sortBy}
                onChange={(e) => {
                  playSound('click');
                  setSortBy(e.target.value);
                }}
              >
                <option value="newest">Eng yangi</option>
                <option value="popular">Eng ko'p o'qilgan</option>
                <option value="title">Alifbo bo'yicha</option>
              </select>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div id="articles-grid" className="articles-grid">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((art) => {
              const isFav = favorites.includes(art.id);
              const snippet =
                art.content?.length > 130
                  ? art.content.substring(0, 130) + '...'
                  : art.content;

              return (
                <article
                  key={art.id}
                  className="article-card"
                  onClick={() => handleRead(art)}
                >
                  <div className="article-image">
                    <img
                      src={
                        art.image ||
                        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1073'
                      }
                      alt={art.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="article-info">
                    <div className="article-meta-row">
                      <span className="article-badge">{getCategoryString(art.category)}</span>
                      <span className="article-read-time">
                        <i className="far fa-clock"></i> {art.readTime || '3 daqiqa'}
                      </span>
                    </div>
                    <h3>{art.title}</h3>
                    <p>{snippet}</p>
                    <div className="article-footer-actions">
                      <span className="article-views">
                        <i className="far fa-eye"></i> {art.views || 100} o'qildi
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                          className={`btn-fav-card ${isFav ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(art.id);
                          }}
                          title={
                            isFav
                              ? "Saralanganlardan o'chirish"
                              : "Saralanganlarga saqlash"
                          }
                        >
                          <i className={isFav ? 'fas fa-heart' : 'far fa-heart'}></i>
                        </button>
                        <span
                          className="btn-read-more"
                          style={{
                            color: 'var(--primary)',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                          }}
                        >
                          O'qish →
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
              <i
                className="fas fa-search"
                style={{ fontSize: '2.5rem', color: 'var(--text-muted)', marginBottom: '15px' }}
              ></i>
              <p className="empty-msg">Kechirasiz, so'rovingizga mos maqola topilmadi.</p>
              <button
                className="btn btn-primary-outline"
                style={{ marginTop: '10px' }}
                onClick={() => {
                  setCategory('all');
                  setSearchTerm('');
                }}
              >
                Barcha maqolalarni ko'rsatish
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
