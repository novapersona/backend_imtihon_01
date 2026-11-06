import React from 'react';
import { useApp } from '../context/AppContext';

export const ResourcesSection = () => {
  const { setActiveModal, setModalData, playSound } = useApp();

  const handleOpenResource = (type) => {
    playSound('click');
    setModalData(type);
    setActiveModal('resource');
  };

  return (
    <section id="resources" className="section section-light">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fas fa-layer-group"></i> Foydali
          </div>
          <h2>
            <i className="fas fa-graduation-cap" style={{ color: 'var(--primary)' }}></i> Foydali Manbalar va Qo'llanmalar
          </h2>
          <p>O'qish va til o'rganishda asqotadigan maxsus tanlangan metodik materiallar</p>
        </div>

        <div className="resources-grid">
          {/* Card 1 */}
          <div className="resource-card">
            <div className="resource-icon-wrap" style={{ background: '#e0f2fe', color: '#0284c7' }}>
              <i className="fas fa-spell-check"></i>
            </div>
            <h3>Arab Alifbosi va Maxrojlar</h3>
            <p>
              28 ta arab harflarining talaffuzi, boshida, o'rtasida va oxirida yozilishi bo'yicha
              interaktiv jadval va audio ko'rsatmalar.
            </p>
            <button
              className="btn btn-primary-outline btn-block"
              onClick={() => handleOpenResource('alphabet')}
            >
              <i className="fas fa-eye"></i> Jadvalni ko'rish
            </button>
          </div>

          {/* Card 2 */}
          <div className="resource-card">
            <div className="resource-icon-wrap" style={{ background: '#fef3c7', color: '#d97706' }}>
              <i className="fas fa-book-reader"></i>
            </div>
            <h3>Kitob Mutolaasi Madaniyati</h3>
            <p>
              Tez o'qish, o'qilgan ma'lumotlarni yodda saqlash va konspekt olish bo'yicha amaliy 5 ta
              oltin qoida to'plami.
            </p>
            <button
              className="btn btn-primary-outline btn-block"
              onClick={() => handleOpenResource('reading')}
            >
              <i className="fas fa-eye"></i> Qo'llanmani o'qish
            </button>
          </div>

          {/* Card 3 */}
          <div className="resource-card">
            <div className="resource-icon-wrap" style={{ background: '#dcfce7', color: '#16a34a' }}>
              <i className="fas fa-headphones"></i>
            </div>
            <h3>Audio Lug'atlar To'plami</h3>
            <p>
              Kundalik hayotda eng ko'p ishlatiladigan zaruriy arabcha so'z va iboralarning to'liq ovozli
              ro'yxati.
            </p>
            <button
              className="btn btn-primary-outline btn-block"
              onClick={() => handleOpenResource('audio')}
            >
              <i className="fas fa-eye"></i> Ro'yxatni ochish
            </button>
          </div>

          {/* Card 4 */}
          <div className="resource-card">
            <div className="resource-icon-wrap" style={{ background: '#f3e8ff', color: '#9333ea' }}>
              <i className="fas fa-brain"></i>
            </div>
            <h3>Xotirani Charxlash Usullari</h3>
            <p>
              Ebbinghaus egri chizig'i va oraliqli takrorlash (Spaced Repetition) orqali so'zlarni
              umrbod eslab qolish texnikasi.
            </p>
            <button
              className="btn btn-primary-outline btn-block"
              onClick={() => handleOpenResource('memory')}
            >
              <i className="fas fa-eye"></i> Texnikani ko'rish
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
