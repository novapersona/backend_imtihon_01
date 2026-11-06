import React from 'react';

export const AboutSection = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-content">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000"
              alt="Ilm Chashmasi kutubxona"
              loading="lazy"
            />
            <div className="about-image-badge">
              <i className="fas fa-certificate"></i>
              <span>Zamonaviy Ta'lim Ekotizimi</span>
            </div>
          </div>

          <div className="about-text">
            <div className="section-badge">
              <i className="fas fa-landmark"></i> Missiyamiz
            </div>
            <h2>Ilm Chashmasi haqida</h2>
            <p className="lead-p">
              <strong>«Ilm Chashmasi»</strong> — bu yoshlar, talabalar va bilimga tashna insonlarni bir maqsad sari birlashtiruvchi zamonaviy ma'rifiy platforma.
            </p>
            <p>
              Bizning bosh maqsadimiz — sharq madaniyati, arab tili xazinasi va jahon ilm-fan yutuqlarini sodda, qiziqarli va zamonaviy raqamli uslubda har bir o'quvchiga yetkazishdir.
            </p>

            <div className="about-features-list">
              <div className="about-feat-item">
                <div className="feat-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div>
                  <strong>Mutlaqo bepul bilim</strong>
                  <p>Har bir maqola, lug'at va testlar barcha uchun erkin va bepul.</p>
                </div>
              </div>

              <div className="about-feat-item">
                <div className="feat-icon">
                  <i className="fas fa-gamepad"></i>
                </div>
                <div>
                  <strong>O'yinlashtirilgan ta'lim (Gamification)</strong>
                  <p>Testlar topshirib coin yig'ing va qiziqarli sovg'alarga almashtiring.</p>
                </div>
              </div>

              <div className="about-feat-item">
                <div className="feat-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div>
                  <strong>Qulay va zamonaviy interfeys</strong>
                  <p>Har qanday telefon, planshet yoki kompyuterda mukammal ishlaydi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
