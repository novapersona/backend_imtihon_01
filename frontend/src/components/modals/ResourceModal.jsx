import React from 'react';
import { useApp } from '../../context/AppContext';
import { ALPHABET_DATA, AUDIO_PHRASES_DATA } from '../../data/initialData';
import { speakText } from '../../utils/speech';

export const ResourceModal = () => {
  const { activeModal, setActiveModal, modalData: type, playSound, showToast } = useApp();

  if (activeModal !== 'resource' || !type) return null;

  const handleClose = () => {
    playSound('click');
    setActiveModal(null);
  };

  const handleSpeak = (text) => {
    playSound('click');
    speakText(text, 'ar-SA', (msg) => showToast(msg, 'info'));
  };

  return (
    <div className="modal active" style={{ display: 'flex' }} onClick={handleClose}>
      <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={handleClose}>
          &times;
        </button>

        {type === 'alphabet' && (
          <div>
            <h2>
              <i className="fas fa-spell-check" style={{ color: 'var(--primary)' }}></i> Arab Alifbosi va Maxrojlar Jadvali
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
              Arab alifbosi 28 ta harfdan iborat bo'lib, o'ngdan chapga qarab yoziladi va o'qiladi. Harf ustiga bosib talaffuzini eshiting:
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                gap: '12px',
                textAlign: 'center',
              }}
            >
              {ALPHABET_DATA.map((h, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '12px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, border-color 0.2s',
                  }}
                  onClick={() => handleSpeak(h.ar)}
                >
                  <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '2.2rem', color: 'var(--primary)' }}>
                    {h.ar}
                  </div>
                  <strong>{h.name}</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{h.sound}</div>
                  <button
                    className="btn btn-sm btn-primary-outline"
                    style={{ marginTop: '6px', width: '100%', fontSize: '0.7rem' }}
                  >
                    <i className="fas fa-volume-up"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === 'reading' && (
          <div>
            <h2>
              <i className="fas fa-book-reader" style={{ color: 'var(--secondary)' }}></i> Kitob Mutolaasi Madaniyati va 5 Oltin Qoida
            </h2>
            <div style={{ marginTop: '20px', lineHeight: '1.8' }}>
              <p>
                <strong>1. Kunlik me'yor belgilang:</strong> Har kuni kamida 15-20 sahifa o'qishni odat qiling. Yiliga 20 dan ortiq sara kitob tugatgan bo'lasiz!
              </p>
              <p>
                <strong>2. Qalam bilan o'qing:</strong> Muhim jumlalarni belgilab, o'z fikrlaringizni chetiga yozib boring. Bu xotirani 3 barobar mustahkamlaydi.
              </p>
              <p>
                <strong>3. Chalg'imaslik maydoni yarating:</strong> Mutolaa paytida telefonni boshqa xonaga qo'ying yoki bildirishnomalarni o'chiring.
              </p>
              <p>
                <strong>4. O'qiganingizni boshqalarga aytib bering:</strong> Faynman texnikasiga ko'ra, ma'lumotni kimgadir tushuntirib berish — uni to'liq o'zlashtirish garovidir.
              </p>
              <p>
                <strong>5. Amaliyotga tadbiq eting:</strong> Kitobdan olgan kamida bitta foydali fikrni o'sha kunning o'zida hayotingizda qo'llang.
              </p>
            </div>
          </div>
        )}

        {type === 'audio' && (
          <div>
            <h2>
              <i className="fas fa-headphones" style={{ color: 'var(--success)' }}></i> Audio Lug'at va Nutq Mashqlari
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '15px' }}>
              Tinglab takrorlang va talaffuzingizni charxlang:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {AUDIO_PHRASES_DATA.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'var(--surface-2)',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div>
                    <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.4rem', color: 'var(--primary)', marginRight: '14px' }}>
                      {item.ar}
                    </span>
                    <span style={{ color: 'var(--text)', fontSize: '0.95rem' }}>{item.uz}</span>
                  </div>
                  <button
                    className="btn btn-sm btn-primary-outline"
                    onClick={() => handleSpeak(item.ar)}
                  >
                    <i className="fas fa-volume-up"></i> Tinglash
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === 'memory' && (
          <div>
            <h2>
              <i className="fas fa-brain" style={{ color: '#9333ea' }}></i> Xotirani Charxlash va Spaced Repetition Texnikasi
            </h2>
            <div style={{ marginTop: '20px', lineHeight: '1.8' }}>
              <p>
                Nemis psixologi Hermann Ebbinghaus tomonidan kashf etilgan <strong>«Unutish egri chizig'i»</strong>ga ko'ra, inson o'rgangan yangi so'zlarining 70% ini ilk 24 soat ichida unutadi.
              </p>
              <h4>Optimal Takrorlash Jadvali:</h4>
              <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                <li><strong>1-takrorlash:</strong> O'rgangandan so'ng darhol (10 daqiqa ichida).</li>
                <li><strong>2-takrorlash:</strong> 1 kun o'tib (ertasi kuni ertalab).</li>
                <li><strong>3-takrorlash:</strong> 3 kundan so'ng.</li>
                <li><strong>4-takrorlash:</strong> 1 haftadan so'ng.</li>
                <li><strong>5-takrorlash:</strong> 1 oydan so'ng.</li>
              </ul>
              <p style={{ marginTop: '14px' }}>
                Ushbu oraliqli takrorlash usuli orqali har qanday arabcha so'z va qoidalar uzoq muddatli xotiraga mustahkam o'rnashadi.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
