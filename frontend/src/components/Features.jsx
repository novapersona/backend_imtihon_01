import React from 'react';

export const Features = () => {
  return (
    <section className="section-sm">
      <div className="container">
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon" style={{ background: '#e0f2fe', color: '#0369a1' }}>
              <i className="fas fa-book-reader"></i>
            </div>
            <div>
              <h4>Foydali Maqolalar</h4>
              <p>Ilm, tafakkur, kitobxonlik va shaxsiy rivojlanishga oid sara maqolalar to'plami.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon" style={{ background: '#dcfce7', color: '#15803d' }}>
              <i className="fas fa-layer-group"></i>
            </div>
            <div>
              <h4>Interaktiv Lug'at</h4>
              <p>Har bir arabcha so'zning transliteratsiyasi, tarjimasi va jonli audiosi.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon" style={{ background: '#fef3c7', color: '#b45309' }}>
              <i className="fas fa-brain"></i>
            </div>
            <div>
              <h4>Sinov Testlari & Coin</h4>
              <p>Bilimingizni sinang, tangalar to'plang va do'kondan qimmatbaho kitoblar oling.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon" style={{ background: '#f3e8ff', color: '#7e22ce' }}>
              <i className="fas fa-trophy"></i>
            </div>
            <div>
              <h4>Reyting & Natijalar</h4>
              <p>Boshqa talabalar bilan bellashing va bilimdonlar yetakchilar safida bo'ling.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
