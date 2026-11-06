import React from 'react';
import { useApp } from '../context/AppContext';

export const Stats = () => {
  const { articles, users } = useApp();

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-strip">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-book"></i>
            </div>
            <div className="stat-info">
              <div className="stat-number" id="stats-articles-count">
                {articles.length || 50}+
              </div>
              <div className="stat-label">Foydali Maqolalar</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-language"></i>
            </div>
            <div className="stat-info">
              <div className="stat-number" id="stats-words-count">
                1,200+
              </div>
              <div className="stat-label">Arabcha So'zlar</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-user-graduate"></i>
            </div>
            <div className="stat-info">
              <div className="stat-number" id="stats-users-count">
                {users.length + 850}+
              </div>
              <div className="stat-label">Faol O'quvchilar</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-coins"></i>
            </div>
            <div className="stat-info">
              <div className="stat-number" id="stats-coins-count">
                25,000+
              </div>
              <div className="stat-label">Berilgan Coinlar</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
