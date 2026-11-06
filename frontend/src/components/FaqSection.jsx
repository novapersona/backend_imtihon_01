import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const FaqSection = () => {
  const { playSound } = useApp();
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = [
    {
      icon: 'fa-coins',
      iconColor: '#f59e0b',
      q: 'Coinlar qanday yig\'iladi va nimalarga ishlatiladi?',
      a: 'Platformamizdagi arabcha–o\'zbekcha testlarni muvaffaqiyatli topshirganingizda, har bir to\'g\'ri javob uchun hisobingizga 1 tadan oltin Coin taqdim etiladi. Yig\'ilgan coinlarni «Do\'kon» bo\'limidagi kitoblar, lug\'atlar, qalamlar va boshqa qimmatli sovg\'alarga almashtirishingiz mumkin!',
    },
    {
      icon: 'fa-redo',
      iconColor: 'var(--primary)',
      q: 'Testlarni necha marta topshirish mumkin?',
      a: 'Har bir testni halol musobaqa va adolatli natija uchun 1 marta topshirish belgilangan. Agar xatolaringizni takrorlamoqchi bo\'lsangiz, «Lug\'at & Kartochkalar» bo\'limida barcha so\'zlarni xohlagancha mashq qilishingiz mumkin.',
    },
    {
      icon: 'fa-shipping-fast',
      iconColor: 'var(--success)',
      q: 'Do\'kondagi sovg\'alarni qanday qilib qabul qilib olaman?',
      a: 'Yetarli coin to\'plab «Xarid qilish» tugmasini bosganingizdan so\'ng, adminlarimiz buyurtmangizni ko\'radi va topshirish jarayoni boshlanadi. Buyurtmangiz holatini «Xaridlarim» bo\'limida kuzatib borishingiz mumkin.',
    },
    {
      icon: 'fa-user-plus',
      iconColor: 'var(--secondary)',
      q: 'Ro\'yxatdan o\'tish majburiymi?',
      a: 'Maqolalarni o\'qish, lug\'at kartochkalaridan foydalanish va saytni ko\'rish barcha mehmonlar uchun ochiq. Biroq test natijalaringizni, to\'plangan coinlaringizni va saralangan maqolalaringizni saqlab borish uchun ro\'yxatdan o\'tishingiz tavsiya etiladi (bu 1 daqiqa vaqt oladi!).',
    },
    {
      icon: 'fa-pen-nib',
      iconColor: '#9333ea',
      q: 'Men ham maqola yoki yangi test qo\'sha olamanmi?',
      a: 'Albatta! Saytimizning quyidagi fikr-mulohaza bo\'limi yoki admin bilan bog\'lanish orqali o\'z maqolangiz yoki test savollaringizni yuborishingiz mumkin. Tekshiruvdan so\'ng ular saytga joylashtiriladi.',
    },
  ];

  const toggle = (idx) => {
    playSound('click');
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="section section-light">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fas fa-question-circle"></i> Savol-Javob
          </div>
          <h2>Ko'p So'raladigan Savollar</h2>
          <p>Platformadan foydalanish, testlar va coinlar bo'yicha batafsil ma'lumotlar</p>
        </div>

        <div className="faq-accordion-wrap">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => toggle(idx)}>
                  <span>
                    <i className={`fas ${item.icon}`} style={{ color: item.iconColor }}></i>{' '}
                    {item.q}
                  </span>
                  <i className="fas fa-chevron-down faq-arrow"></i>
                </button>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
