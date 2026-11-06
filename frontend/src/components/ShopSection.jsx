import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ShopSection = () => {
  const { products, buyProduct, getCurrentUserRecord, playSound } = useApp();
  const [filter, setFilter] = useState('all');
  const userRec = getCurrentUserRecord();

  const filteredProducts = products.filter((p) => {
    if (filter === 'all') return true;
    return (p.category || 'kitob') === filter;
  });

  return (
    <section id="shop" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fas fa-gift"></i> Sovg'alar
          </div>
          <h2>
            <i className="fas fa-store" style={{ color: 'var(--secondary)' }}></i> Ilm Do'koni — Sovg'alar Xazinasi
          </h2>
          <p>
            Yig'gan coinlaringiz evaziga qiziqarli kitoblar, aksessuarlar va sovg'alarni bepul xarid qiling!
          </p>
        </div>

        <div className="filter-controls-wrap">
          <div className="category-chips" id="shop-category-filters">
            <button
              className={`chip ${filter === 'all' ? 'active' : ''}`}
              onClick={() => {
                playSound('click');
                setFilter('all');
              }}
            >
              Barcha mahsulotlar
            </button>
            <button
              className={`chip ${filter === 'kitob' ? 'active' : ''}`}
              onClick={() => {
                playSound('click');
                setFilter('kitob');
              }}
            >
              Kitoblar & Lug'atlar
            </button>
            <button
              className={`chip ${filter === 'aksessuar' ? 'active' : ''}`}
              onClick={() => {
                playSound('click');
                setFilter('aksessuar');
              }}
            >
              Aksessuarlar
            </button>
          </div>

          <div className="shop-balance-alert">
            Sizning balansingiz:{' '}
            <strong id="shop-user-balance">{userRec?.coins || 0} 🪙</strong>
          </div>
        </div>

        {/* Shop Grid */}
        <div id="shop-grid" className="articles-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <article key={p.id} className="article-card">
                <div className="article-image" style={{ position: 'relative' }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ height: '210px', objectFit: 'cover', width: '100%' }}
                    loading="lazy"
                  />
                  <span className="stock-badge">
                    <i className="fas fa-boxes"></i> Qolgan: {p.stock ?? 10} ta
                  </span>
                </div>
                <div className="article-info">
                  <h3>{p.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    {p.description || "Yuqori sifatli ta'limiy mahsulot."}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '16px',
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: '1.15rem',
                        color: 'var(--secondary-dark)',
                      }}
                    >
                      <i className="fas fa-coins" style={{ color: '#f59e0b' }}></i> {p.price}{' '}
                      coin
                    </span>
                    <button className="btn btn-primary" onClick={() => buyProduct(p)}>
                      <i className="fas fa-shopping-cart"></i> Xarid qilish
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="empty-msg">Bu toifada mahsulot topilmadi.</p>
          )}
        </div>
      </div>
    </section>
  );
};
