import React from 'react';
import { useApp } from '../context/AppContext';

export const LeaderboardSection = () => {
  const { users, currentUser } = useApp();

  const sorted = [...users].sort((a, b) => (b.coins || 0) - (a.coins || 0));
  const top1 = sorted[0];
  const top2 = sorted[1];
  const top3 = sorted[2];

  return (
    <section id="leaderboard" className="section section-light">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fas fa-crown"></i> Musobaqa
          </div>
          <h2>
            <i className="fas fa-trophy" style={{ color: 'var(--secondary)' }}></i> Bilimdonlar Reytingi (Leaderboard)
          </h2>
          <p>Eng ko'p test topshirib, yuqori natijalarga erishgan talabalar peshqadami</p>
        </div>

        {/* Top 3 Podium */}
        <div className="podium-wrap">
          {/* 2nd Place */}
          <div className="podium-card podium-silver" id="podium-2">
            <div className="podium-crown">
              <i className="fas fa-medal"></i>
            </div>
            <div className="podium-avatar">🥈</div>
            <div className="podium-name" id="podium-2-name">
              {top2?.username || 'Madina'}
            </div>
            <div className="podium-coins" id="podium-2-coins">
              🪙 {top2?.coins || 0} coin
            </div>
            <div className="podium-place">2-O'rin</div>
          </div>

          {/* 1st Place */}
          <div className="podium-card podium-gold" id="podium-1">
            <div className="podium-crown">
              <i className="fas fa-crown"></i>
            </div>
            <div className="podium-avatar">👑</div>
            <div className="podium-name" id="podium-1-name">
              {top1?.username || 'Nodirbek'}
            </div>
            <div className="podium-coins" id="podium-1-coins">
              🪙 {top1?.coins || 0} coin
            </div>
            <div className="podium-place">Chempion • 1-O'rin</div>
          </div>

          {/* 3rd Place */}
          <div className="podium-card podium-bronze" id="podium-3">
            <div className="podium-crown">
              <i className="fas fa-award"></i>
            </div>
            <div className="podium-avatar">🥉</div>
            <div className="podium-name" id="podium-3-name">
              {top3?.username || 'Dilshod'}
            </div>
            <div className="podium-coins" id="podium-3-coins">
              🪙 {top3?.coins || 0} coin
            </div>
            <div className="podium-place">3-O'rin</div>
          </div>
        </div>

        {/* Full Leaderboard Table */}
        <div className="leaderboard-table-card">
          <div className="leaderboard-header-row">
            <span className="col-rank">O'rin</span>
            <span className="col-user">Foydalanuvchi</span>
            <span className="col-tests">Ishlangan Testlar</span>
            <span className="col-coins">Jami Coinlar</span>
            <span className="col-badge">Daraja</span>
          </div>
          <div id="leaderboard-rows" className="leaderboard-body">
            {sorted.map((u, i) => {
              let rankMedal = `${i + 1}`;
              if (i === 0) rankMedal = '🥇';
              if (i === 1) rankMedal = '🥈';
              if (i === 2) rankMedal = '🥉';

              let badge = 'Talaba';
              if ((u.coins || 0) >= 40) badge = 'Ustoz ⭐';
              else if ((u.coins || 0) >= 20) badge = 'Bilimdon';

              const isMe = currentUser && currentUser.username === u.username;

              return (
                <div
                  key={u.username || i}
                  className="leaderboard-row"
                  style={
                    isMe
                      ? { background: '#fefce8', borderLeft: '4px solid var(--secondary)' }
                      : {}
                  }
                >
                  <span className="col-rank rank-medal">{rankMedal}</span>
                  <span className="col-user">
                    <strong>{u.username}</strong>{' '}
                    {isMe && <small style={{ color: 'var(--primary)' }}>(Siz)</small>}
                  </span>
                  <span className="col-tests">{u.testsDone || 1} ta test</span>
                  <span
                    className="col-coins"
                    style={{ fontWeight: 700, color: 'var(--secondary-dark)' }}
                  >
                    🪙 {u.coins || 0}
                  </span>
                  <span className="col-badge">
                    <span className="article-badge">{badge}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
