import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard = () => {
  const {
    activeModal,
    setActiveModal,
    currentUser,
    articles,
    saveArticle,
    deleteArticle,
    users,
    saveUser,
    deleteUser,
    quizzes,
    saveQuiz,
    deleteQuiz,
    products,
    saveProduct,
    deleteProduct,
    orders,
    logout,
    playSound,
  } = useApp();

  // Sub-modal state inside admin
  const [subModal, setSubModal] = useState(null); // 'article' | 'user' | 'quiz' | 'product'
  const [editingItem, setEditingItem] = useState(null);

  // Forms state
  const [articleForm, setArticleForm] = useState({
    title: '',
    category: "Ilm-ma'rifat",
    readTime: '3 daqiqa',
    image: '',
    content: '',
  });

  const [userForm, setUserForm] = useState({
    username: '',
    password: '',
    coins: 10,
    role: 'user',
  });

  const [productForm, setProductForm] = useState({
    title: '',
    category: 'aksessuar',
    description: '',
    image: '',
    price: 15,
    stock: 10,
  });

  const [quizForm, setQuizForm] = useState({
    title: '',
    level: 'easy',
    words: [{ arabic: '', uzbek: '', wrong_opt1: '', wrong_opt2: '', wrong_opt3: '' }],
  });

  if (activeModal !== 'admin' || currentUser?.role !== 'admin') return null;

  const handleClose = () => {
    playSound('click');
    setActiveModal(null);
  };

  // --- Article handlers ---
  const handleOpenArticleModal = (art = null) => {
    playSound('click');
    if (art) {
      setEditingItem(art);
      setArticleForm({
        title: art.title,
        category: art.category,
        readTime: art.readTime || '3 daqiqa',
        image: art.image || '',
        content: art.content || '',
      });
    } else {
      setEditingItem(null);
      setArticleForm({
        title: '',
        category: "Ilm-ma'rifat",
        readTime: '3 daqiqa',
        image: '',
        content: '',
      });
    }
    setSubModal('article');
  };

  const handleSaveArticle = (e) => {
    e.preventDefault();
    saveArticle({
      ...(editingItem || {}),
      ...articleForm,
    });
    setSubModal(null);
  };

  // --- User handlers ---
  const handleOpenUserModal = () => {
    playSound('click');
    setUserForm({ username: '', password: '', coins: 10, role: 'user' });
    setSubModal('user');
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    saveUser(userForm);
    setSubModal(null);
  };

  // --- Quiz handlers ---
  const handleOpenQuizModal = (q = null) => {
    playSound('click');
    if (q) {
      setEditingItem(q);
      setQuizForm({
        title: q.title,
        level: q.level,
        words: q.words?.length ? [...q.words] : [{ arabic: '', uzbek: '', wrong_opt1: '', wrong_opt2: '', wrong_opt3: '' }],
      });
    } else {
      setEditingItem(null);
      setQuizForm({
        title: '',
        level: 'easy',
        words: [{ arabic: '', uzbek: '', wrong_opt1: '', wrong_opt2: '', wrong_opt3: '' }],
      });
    }
    setSubModal('quiz');
  };

  const handleAddQuizWordRow = () => {
    setQuizForm((prev) => ({
      ...prev,
      words: [...prev.words, { arabic: '', uzbek: '', wrong_opt1: '', wrong_opt2: '', wrong_opt3: '' }],
    }));
  };

  const handleQuizWordChange = (idx, field, value) => {
    setQuizForm((prev) => {
      const nextWords = [...prev.words];
      nextWords[idx] = { ...nextWords[idx], [field]: value };
      return { ...prev, words: nextWords };
    });
  };

  const handleRemoveQuizWord = (idx) => {
    setQuizForm((prev) => ({
      ...prev,
      words: prev.words.filter((_, i) => i !== idx),
    }));
  };

  const handleSaveQuiz = (e) => {
    e.preventDefault();
    saveQuiz({
      ...(editingItem || {}),
      ...quizForm,
    });
    setSubModal(null);
  };

  // --- Product handlers ---
  const handleOpenProductModal = (prod = null) => {
    playSound('click');
    if (prod) {
      setEditingItem(prod);
      setProductForm({
        title: prod.title,
        category: prod.category,
        description: prod.description || '',
        image: prod.image || '',
        price: prod.price || 15,
        stock: prod.stock || 10,
      });
    } else {
      setEditingItem(null);
      setProductForm({
        title: '',
        category: 'aksessuar',
        description: '',
        image: '',
        price: 15,
        stock: 10,
      });
    }
    setSubModal('product');
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    saveProduct({
      ...(editingItem || {}),
      ...productForm,
    });
    setSubModal(null);
  };

  return (
    <div className="admin-portal-overlay">
      <header className="admin-header">
        <div className="container admin-nav">
          <h2>
            <i className="fas fa-user-shield"></i> Admin Boshqaruv Paneli
          </h2>
          <div className="admin-top-actions">
            <button className="btn btn-primary-outline" onClick={handleClose}>
              <i className="fas fa-arrow-left"></i> Saytga qaytish
            </button>
            <button className="btn btn-danger" onClick={logout}>
              <i className="fas fa-sign-out-alt"></i> Chiqish
            </button>
          </div>
        </div>
      </header>

      <div className="container admin-container" style={{ padding: '30px 20px' }}>
        {/* Sidebar Actions */}
        <div className="admin-sidebar">
          <button
            className="btn btn-success btn-block"
            style={{ marginBottom: '10px' }}
            onClick={() => handleOpenArticleModal()}
          >
            <i className="fas fa-plus"></i> Yangi Maqola
          </button>
          <button
            className="btn btn-primary btn-block"
            style={{ marginBottom: '10px' }}
            onClick={handleOpenUserModal}
          >
            <i className="fas fa-user-plus"></i> Yangi Foydalanuvchi
          </button>
          <button
            className="btn btn-quiz btn-block"
            style={{ marginBottom: '10px' }}
            onClick={() => handleOpenQuizModal()}
          >
            <i className="fas fa-brain"></i> Yangi Test
          </button>
          <button
            className="btn btn-secondary-outline btn-block"
            onClick={() => handleOpenProductModal()}
          >
            <i className="fas fa-gift"></i> Yangi Mahsulot
          </button>
        </div>

        {/* Admin Content Area */}
        <div className="admin-content">
          {/* 1. Articles */}
          <div className="admin-section-box">
            <h3><i className="fas fa-newspaper" style={{ color: 'var(--primary)' }}></i> Mavjud Maqolalar ({articles.length})</h3>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Sarlavha</th>
                    <th>Turkum</th>
                    <th>Ko'rishlar</th>
                    <th style={{ textAlign: 'right' }}>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((art) => (
                    <tr key={art.id}>
                      <td><strong>{art.title}</strong></td>
                      <td>{typeof art.category === 'object' && art.category !== null ? art.category.name : (art.category || "Ilm-ma'rifat")}</td>
                      <td>{art.views || 0}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          className="btn btn-sm btn-primary-outline"
                          style={{ marginRight: '6px' }}
                          onClick={() => handleOpenArticleModal(art)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-danger-outline"
                          onClick={() => deleteArticle(art.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Users */}
          <div className="admin-section-box" style={{ marginTop: '30px' }}>
            <h3><i className="fas fa-users" style={{ color: 'var(--success)' }}></i> Foydalanuvchilar ({users.length})</h3>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Tangalar</th>
                    <th>Rol</th>
                    <th style={{ textAlign: 'right' }}>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={u.id || i}>
                      <td><strong>{u.username}</strong></td>
                      <td><i className="fas fa-coins" style={{ color: 'var(--secondary)' }}></i> {u.coins || 0}</td>
                      <td>{u.role || 'user'}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          className="btn btn-sm btn-danger-outline"
                          onClick={() => deleteUser(u.username)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Quizzes */}
          <div className="admin-section-box" style={{ marginTop: '30px' }}>
            <h3><i className="fas fa-brain" style={{ color: '#d97706' }}></i> Testlar ({quizzes.length})</h3>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nomi</th>
                    <th>Darajasi</th>
                    <th>Savollar soni</th>
                    <th style={{ textAlign: 'right' }}>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {quizzes.map((q) => (
                    <tr key={q.id}>
                      <td><strong>{q.title}</strong></td>
                      <td>{q.level}</td>
                      <td>{q.words?.length || 0} ta so'z</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          className="btn btn-sm btn-primary-outline"
                          style={{ marginRight: '6px' }}
                          onClick={() => handleOpenQuizModal(q)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-danger-outline"
                          onClick={() => deleteQuiz(q.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Products */}
          <div className="admin-section-box" style={{ marginTop: '30px' }}>
            <h3><i className="fas fa-store" style={{ color: 'var(--secondary)' }}></i> Mahsulotlar ({products.length})</h3>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nomi</th>
                    <th>Narxi (Coin)</th>
                    <th>Qoldiq</th>
                    <th style={{ textAlign: 'right' }}>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td><strong>{p.title}</strong></td>
                      <td>{p.price} Coin</td>
                      <td>{p.stock} dona</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          className="btn btn-sm btn-primary-outline"
                          style={{ marginRight: '6px' }}
                          onClick={() => handleOpenProductModal(p)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-danger-outline"
                          onClick={() => deleteProduct(p.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Orders */}
          <div className="admin-section-box" style={{ marginTop: '30px' }}>
            <h3><i className="fas fa-shopping-cart" style={{ color: '#f59e0b' }}></i> Buyurtmalar ({orders.length})</h3>
            {orders.length > 0 ? (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Xaridor</th>
                      <th>Mahsulot</th>
                      <th>Narxi</th>
                      <th>Sana</th>
                      <th>Holat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id}>
                        <td><strong>{o.buyer}</strong></td>
                        <td>{o.productTitle}</td>
                        <td>{o.price} Coin</td>
                        <td>{o.date}</td>
                        <td>
                          <span className="badge-pill" style={{ background: '#dcfce7', color: '#15803d' }}>
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Hozircha buyurtmalar yo'q.</p>
            )}
          </div>
        </div>
      </div>

      {/* Sub-modal: Article Editor */}
      {subModal === 'article' && (
        <div className="modal active" style={{ display: 'flex' }} onClick={() => setSubModal(null)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSubModal(null)}>
              &times;
            </button>
            <h3>{editingItem ? "Maqolani Tahrirlash" : "Yangi Maqola Qo'shish"}</h3>
            <form onSubmit={handleSaveArticle} style={{ marginTop: '20px' }}>
              <div className="form-group">
                <label>Sarlavha</label>
                <input
                  type="text"
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Turkum</label>
                <select
                  value={articleForm.category}
                  onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                >
                  <option value="Ilm-ma'rifat">Ilm-ma'rifat</option>
                  <option value="Kitobxonlik">Kitobxonlik</option>
                  <option value="Arab tili">Arab tili</option>
                  <option value="Shaxsiy rivojlanish">Shaxsiy rivojlanish</option>
                  <option value="Texnologiya">Texnologiya</option>
                </select>
              </div>
              <div className="form-group">
                <label>Rasm URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={articleForm.image}
                  onChange={(e) => setArticleForm({ ...articleForm, image: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Matn</label>
                <textarea
                  rows="6"
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Saqlash
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sub-modal: User Editor */}
      {subModal === 'user' && (
        <div className="modal active" style={{ display: 'flex' }} onClick={() => setSubModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSubModal(null)}>
              &times;
            </button>
            <h3>Yangi Foydalanuvchi</h3>
            <form onSubmit={handleSaveUser} style={{ marginTop: '20px' }}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={userForm.username}
                  onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Parol</label>
                <input
                  type="password"
                  value={userForm.password}
                  onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Boshlang'ich Coin</label>
                <input
                  type="number"
                  value={userForm.coins}
                  onChange={(e) => setUserForm({ ...userForm, coins: parseInt(e.target.value) || 0 })}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Qo'shish
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sub-modal: Quiz Editor */}
      {subModal === 'quiz' && (
        <div className="modal active" style={{ display: 'flex' }} onClick={() => setSubModal(null)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSubModal(null)}>
              &times;
            </button>
            <h3>{editingItem ? "Testni Tahrirlash" : "Yangi Test Yaratish"}</h3>
            <form onSubmit={handleSaveQuiz} style={{ marginTop: '20px' }}>
              <div className="form-group">
                <label>Test Nomi</label>
                <input
                  type="text"
                  value={quizForm.title}
                  onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Darajasi</label>
                <select
                  value={quizForm.level}
                  onChange={(e) => setQuizForm({ ...quizForm, level: e.target.value })}
                >
                  <option value="easy">Oson</option>
                  <option value="medium">O'rta</option>
                  <option value="hard">Murakkab</option>
                </select>
              </div>

              <h4>Savollar va So'zlar</h4>
              {quizForm.words.map((w, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--surface-2)',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Arabcha so'z"
                      value={w.arabic}
                      onChange={(e) => handleQuizWordChange(idx, 'arabic', e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="To'g'ri o'zbekcha tarjima"
                      value={w.uzbek}
                      onChange={(e) => handleQuizWordChange(idx, 'uzbek', e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '8px' }}>
                    <input
                      type="text"
                      placeholder="Noto'g'ri 1"
                      value={w.wrong_opt1}
                      onChange={(e) => handleQuizWordChange(idx, 'wrong_opt1', e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Noto'g'ri 2"
                      value={w.wrong_opt2}
                      onChange={(e) => handleQuizWordChange(idx, 'wrong_opt2', e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Noto'g'ri 3"
                      value={w.wrong_opt3}
                      onChange={(e) => handleQuizWordChange(idx, 'wrong_opt3', e.target.value)}
                      required
                    />
                  </div>
                  {quizForm.words.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-danger-outline"
                      style={{ marginTop: '8px' }}
                      onClick={() => handleRemoveQuizWord(idx)}
                    >
                      O'chirish
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="btn btn-secondary-outline btn-sm"
                style={{ marginBottom: '16px' }}
                onClick={handleAddQuizWordRow}
              >
                <i className="fas fa-plus"></i> Yana savol qo'shish
              </button>

              <button type="submit" className="btn btn-primary btn-block">
                Saqlash
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sub-modal: Product Editor */}
      {subModal === 'product' && (
        <div className="modal active" style={{ display: 'flex' }} onClick={() => setSubModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSubModal(null)}>
              &times;
            </button>
            <h3>{editingItem ? "Mahsulotni Tahrirlash" : "Yangi Mahsulot Qo'shish"}</h3>
            <form onSubmit={handleSaveProduct} style={{ marginTop: '20px' }}>
              <div className="form-group">
                <label>Nomi</label>
                <input
                  type="text"
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Turkum</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                >
                  <option value="aksessuar">Aksessuar</option>
                  <option value="kitob">Kitob</option>
                </select>
              </div>
              <div className="form-group">
                <label>Tavsif</label>
                <textarea
                  rows="3"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Rasm URL</label>
                <input
                  type="text"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Narxi (Coin)</label>
                <input
                  type="number"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: parseInt(e.target.value) || 1 })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Qoldiq (dona)</label>
                <input
                  type="number"
                  value={productForm.stock}
                  onChange={(e) => setProductForm({ ...productForm, stock: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Saqlash
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
