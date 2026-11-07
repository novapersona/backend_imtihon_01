import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEFAULT_ARTICLES,
  DEFAULT_USERS,
  DEFAULT_QUIZZES,
  DEFAULT_PRODUCTS,
  DEFAULT_FLASHCARDS,
} from '../data/initialData';
import { sound } from '../utils/sound';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const normalizeArticle = (art) => {
  if (!art) return null;
  let categoryName = "Ilm-ma'rifat";
  if (art.category) {
    if (typeof art.category === 'object') {
      categoryName = art.category.name || art.category.title || "Ilm-ma'rifat";
    } else {
      categoryName = String(art.category);
    }
  }
  return {
    ...art,
    id: art.id,
    title: art.title || '',
    category: categoryName,
    content: art.content || '',
    image: art.image || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1073',
    views: art.views !== undefined ? art.views : (art.views_count || 100),
    readTime: art.readTime || '3 daqiqa',
    date: art.date || (art.createdAt ? String(art.createdAt).split('T')[0] : '2026-10-30'),
  };
};

export const normalizeQuiz = (q) => {
  if (!q) return null;
  return {
    ...q,
    id: q.id,
    title: q.title || '',
    level: q.level || 'easy',
    words: Array.isArray(q.words) ? q.words : [],
  };
};

export const normalizeProduct = (p) => {
  if (!p) return null;
  return {
    ...p,
    id: p.id,
    title: p.title || '',
    category: p.category || 'kitob',
    description: p.description || '',
    image: p.image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
    price: p.price || 15,
    stock: p.stock !== undefined ? p.stock : 10,
  };
};

export const normalizeUser = (u) => {
  if (!u) return null;
  return {
    ...u,
    username: u.username || 'user',
    coins: u.coins !== undefined ? u.coins : 10,
    testsDone: u.testsDone !== undefined ? u.testsDone : 0,
    quizAttempts: u.quizAttempts || {},
    purchased: Array.isArray(u.purchased) ? u.purchased : [],
  };
};

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ilm_theme') || 'light';
  });

  // Sound state
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('ilm_sound') !== 'false';
  });

  // Toasts state
  const [toasts, setToasts] = useState([]);

  // Data state
  const [articles, setArticles] = useState(() => {
    try {
      const stored = localStorage.getItem('ilm_articles');
      const list = stored ? JSON.parse(stored) : DEFAULT_ARTICLES;
      return Array.isArray(list) ? list.map(normalizeArticle) : DEFAULT_ARTICLES.map(normalizeArticle);
    } catch {
      return DEFAULT_ARTICLES.map(normalizeArticle);
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem('ilm_users');
      const list = stored ? JSON.parse(stored) : DEFAULT_USERS;
      return Array.isArray(list) ? list.map(normalizeUser) : DEFAULT_USERS.map(normalizeUser);
    } catch {
      return DEFAULT_USERS.map(normalizeUser);
    }
  });

  const [quizzes, setQuizzes] = useState(() => {
    try {
      const stored = localStorage.getItem('ilm_quizzes');
      const list = stored ? JSON.parse(stored) : DEFAULT_QUIZZES;
      return Array.isArray(list) ? list.map(normalizeQuiz) : DEFAULT_QUIZZES.map(normalizeQuiz);
    } catch {
      return DEFAULT_QUIZZES.map(normalizeQuiz);
    }
  });

  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem('ilm_products');
      const list = stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
      return Array.isArray(list) ? list.map(normalizeProduct) : DEFAULT_PRODUCTS.map(normalizeProduct);
    } catch {
      return DEFAULT_PRODUCTS.map(normalizeProduct);
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('ilm_favorites');
      return stored ? JSON.parse(stored) : [1, 3];
    } catch {
      return [1, 3];
    }
  });

  const [learnedCards, setLearnedCards] = useState(() => {
    try {
      const stored = localStorage.getItem('ilm_learned_cards');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [comments, setComments] = useState(() => {
    try {
      const stored = localStorage.getItem('ilm_comments');
      return stored
        ? JSON.parse(stored)
        : {
            1: [
              { user: 'nodir_bek', text: "Juda foydali va qimmatli maqola bo'libdi. Muallifga tashakkur!", date: '2026-10-29' },
              { user: 'madina', text: "Har kuni o'qish uchun ajoyib tavsiyalar ekan.", date: '2026-10-30' },
            ],
            2: [
              { user: 'dilshod', text: 'Kitob mutolaasini rejalashtirish haqidagi fikrlar juda to\'g\'ri.', date: '2026-10-30' },
            ],
          };
    } catch {
      return {};
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem('ilm_orders');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Current user state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('ilm_current_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Modal control
  const [activeModal, setActiveModal] = useState(null); // 'login', 'profile', 'favorites', 'orders', 'resource', 'readArticle', 'quiz', 'coin', 'admin'
  const [modalData, setModalData] = useState(null);

  // Sync theme with HTML document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ilm_theme', theme);
  }, [theme]);

  // Sync sound to local storage
  useEffect(() => {
    localStorage.setItem('ilm_sound', soundEnabled ? 'true' : 'false');
  }, [soundEnabled]);

  // Persistence helpers
  useEffect(() => {
    localStorage.setItem('ilm_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('ilm_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('ilm_quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem('ilm_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ilm_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('ilm_learned_cards', JSON.stringify(learnedCards));
  }, [learnedCards]);

  useEffect(() => {
    localStorage.setItem('ilm_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('ilm_orders', JSON.stringify(orders));
  }, [orders]);

  // Try fetching backend entities on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          // Backend is live, fetch articles
          const artRes = await fetch('/api/articles');
          if (artRes.ok) {
            const artData = await artRes.json();
            if (Array.isArray(artData) && artData.length > 0) {
              setArticles(artData.map(normalizeArticle));
            }
          }
          // Fetch quizzes
          const quizRes = await fetch('/api/quizzes');
          if (quizRes.ok) {
            const quizData = await quizRes.json();
            if (Array.isArray(quizData) && quizData.length > 0) {
              setQuizzes(quizData.map(normalizeQuiz));
            }
          }
          // Fetch products
          const prodRes = await fetch('/api/products');
          if (prodRes.ok) {
            const prodData = await prodRes.json();
            if (Array.isArray(prodData) && prodData.length > 0) {
              setProducts(prodData.map(normalizeProduct));
            }
          }
        }
      } catch (e) {
        // Express backend might not be currently running, localStorage fallback works perfectly
      }
    };
    fetchData();
  }, []);

  // UI Sound play helper
  const playSound = (type) => {
    sound.play(type, soundEnabled);
  };

  // Toast notifications
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    playSound('click');
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      sound.play('click', true);
    }
  };

  // Get full record for current logged-in user
  const getCurrentUserRecord = () => {
    if (!currentUser) return null;
    return users.find((u) => u.username === currentUser.username) || currentUser;
  };

  // Coins management
  const addCoins = (amount) => {
    if (!currentUser) return;
    setUsers((prev) =>
      prev.map((u) => {
        if (u.username === currentUser.username) {
          const newCoins = (u.coins || 0) + amount;
          return { ...u, coins: newCoins };
        }
        return u;
      })
    );
    playSound('coin');
    showToast(`+${amount} Coin hisobingizga qo'shildi! 🪙`, 'success');
  };

  // Authentication: Login
  const login = async (username, password) => {
    // Admin check
    if (username === 'ADMIN' && password === 'dreambig@!') {
      const adminUser = { username: 'ADMIN', role: 'admin' };
      setCurrentUser(adminUser);
      sessionStorage.setItem('ilm_current_user', JSON.stringify(adminUser));
      setActiveModal('admin');
      playSound('correct');
      showToast('Admin boshqaruv paneliga xush kelibsiz!', 'success');
      return { success: true };
    }

    // Try backend login
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        const loggedUser = {
          id: data.user.id,
          username: data.user.username,
          role: data.user.role || 'user',
        };
        setCurrentUser(loggedUser);
        sessionStorage.setItem('ilm_current_user', JSON.stringify(loggedUser));

        setUsers((prev) => {
          const exists = prev.find((u) => u.username === loggedUser.username);
          if (!exists) {
            return [
              ...prev,
              {
                id: data.user.id,
                username: data.user.username,
                coins: data.user.coins ?? 10,
                testsDone: 0,
                quizAttempts: {},
                purchased: [],
              },
            ];
          }
          return prev;
        });

        setActiveModal(null);
        playSound('correct');
        showToast(`Xush kelibsiz, ${loggedUser.username}! Bilim olishga marhamat! 🎓`, 'success');
        return { success: true };
      }
    } catch {
      // Offline fallback
    }

    // Local authentication fallback
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      const loggedUser = { username: user.username, role: user.role || 'user' };
      setCurrentUser(loggedUser);
      sessionStorage.setItem('ilm_current_user', JSON.stringify(loggedUser));
      setActiveModal(null);
      playSound('correct');
      showToast(`Xush kelibsiz, ${user.username}! Bilim olishga marhamat! 🎓`, 'success');
      return { success: true };
    }

    playSound('wrong');
    return { success: false, message: "Login yoki parol noto'g'ri!" };
  };

  // Authentication: Register
  const register = async (username, password) => {
    if (!username || !password) {
      return { success: false, message: 'Iltimos, barcha maydonlarni to\'ldiring!' };
    }

    // Check backend
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role: 'user' }),
      });
      const data = await res.json();
      if (res.ok) {
        const newUser = {
          id: data.user ? data.user.id : Date.now(),
          username,
          password,
          coins: 10,
          testsDone: 0,
          quizAttempts: {},
          purchased: [],
        };
        setUsers((prev) => [...prev, newUser]);
        setCurrentUser({ username, role: 'user' });
        sessionStorage.setItem('ilm_current_user', JSON.stringify({ username, role: 'user' }));
        setActiveModal(null);
        playSound('coin');
        showToast(`Ro'yxatdan o'tdingiz! Sizga 10 Coin bonus berildi! 🎉`, 'success');
        return { success: true };
      } else if (res.status === 400) {
        playSound('wrong');
        return { success: false, message: data.message || 'Foydalanuvchi nomi band!' };
      }
    } catch {
      // Local fallback
    }

    if (users.find((u) => u.username.toLowerCase() === username.toLowerCase())) {
      playSound('wrong');
      return { success: false, message: 'Bu foydalanuvchi nomi band!' };
    }

    const newUser = {
      username,
      password,
      coins: 10,
      testsDone: 0,
      quizAttempts: {},
      purchased: [],
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser({ username, role: 'user' });
    sessionStorage.setItem('ilm_current_user', JSON.stringify({ username, role: 'user' }));
    setActiveModal(null);
    playSound('coin');
    showToast(`Ro'yxatdan o'tdingiz! Sizga 10 Coin bonus berildi! 🎉`, 'success');
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('ilm_current_user');
    setActiveModal(null);
    playSound('click');
    showToast('Tizimdan chiqildi', 'info');
  };

  // Favorites
  const toggleFavorite = (articleId) => {
    playSound('click');
    setFavorites((prev) => {
      const exists = prev.includes(articleId);
      if (exists) {
        showToast("Maqola saralanganlardan olib tashlandi", "info");
        return prev.filter((id) => id !== articleId);
      } else {
        showToast("Maqola saralanganlarga qo'shildi! ⭐", "success");
        return [...prev, articleId];
      }
    });
  };

  // Comments
  const addComment = (articleId, text) => {
    if (!text.trim()) return;
    const author = currentUser ? currentUser.username : "Mehmon";
    const newComment = {
      user: author,
      text: text.trim(),
      date: new Date().toISOString().split('T')[0],
    };
    setComments((prev) => ({
      ...prev,
      [articleId]: [...(prev[articleId] || []), newComment],
    }));
    playSound('click');
    showToast("Fikringiz muvaffaqiyatli qoldirildi!", "success");
  };

  // Flashcards learning
  const markCardLearned = (cardId) => {
    playSound('coin');
    setLearnedCards((prev) => {
      if (prev.includes(cardId)) {
        return prev.filter((id) => id !== cardId);
      } else {
        showToast("So'z o'rganilgan deb belgilandi! 🌟", "success");
        return [...prev, cardId];
      }
    });
  };

  // Quizzes
  const recordQuizAttempt = (quizId, score, earnedCoins) => {
    if (!currentUser) return;
    setUsers((prev) =>
      prev.map((u) => {
        if (u.username === currentUser.username) {
          const attempts = { ...(u.quizAttempts || {}) };
          attempts[quizId] = (attempts[quizId] || 0) + 1;
          return {
            ...u,
            coins: (u.coins || 0) + earnedCoins,
            testsDone: (u.testsDone || 0) + 1,
            quizAttempts: attempts,
          };
        }
        return u;
      })
    );
  };

  // Shop purchase
  const buyProduct = (product) => {
    const userRec = getCurrentUserRecord();
    if (!currentUser || !userRec) {
      playSound('wrong');
      showToast("Xarid qilish uchun avval tizimga kiring!", "info");
      setActiveModal('login');
      return;
    }

    if ((userRec.coins || 0) < product.price) {
      playSound('wrong');
      showToast("Hisobingizda Coin yetarli emas!", "error");
      return;
    }

    // Deduct coins & add order
    setUsers((prev) =>
      prev.map((u) => {
        if (u.username === currentUser.username) {
          return {
            ...u,
            coins: u.coins - product.price,
            purchased: [...(u.purchased || []), product.id],
          };
        }
        return u;
      })
    );

    // Decrement stock
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === product.id) {
          return { ...p, stock: Math.max(0, (p.stock || 1) - 1) };
        }
        return p;
      })
    );

    const newOrder = {
      id: Date.now(),
      productTitle: product.title,
      price: product.price,
      buyer: currentUser.username,
      date: new Date().toISOString().split('T')[0],
      status: "Yetkazilmoqda",
    };

    setOrders((prev) => [newOrder, ...prev]);
    playSound('coin');
    showToast(`Tabriklaymiz! "${product.title}" xarid qilindi! 🎁`, "success");
  };

  // Admin CRUD operations
  const saveArticle = (article) => {
    if (article.id) {
      setArticles((prev) => prev.map((a) => (a.id === article.id ? article : a)));
      showToast("Maqola tahrirlandi!", "success");
    } else {
      const newArt = {
        ...article,
        id: Date.now(),
        views: 0,
        date: new Date().toISOString().split('T')[0],
      };
      setArticles((prev) => [newArt, ...prev]);
      showToast("Yangi maqola qo'shildi!", "success");
    }
  };

  const deleteArticle = (id) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    showToast("Maqola o'chirildi!", "info");
  };

  const saveQuiz = (quiz) => {
    if (quiz.id) {
      setQuizzes((prev) => prev.map((q) => (q.id === quiz.id ? quiz : q)));
      showToast("Test tahrirlandi!", "success");
    } else {
      const newQuiz = { ...quiz, id: Date.now() };
      setQuizzes((prev) => [...prev, newQuiz]);
      showToast("Yangi test yaratildi!", "success");
    }
  };

  const deleteQuiz = (id) => {
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
    showToast("Test o'chirildi!", "info");
  };

  const saveProduct = (product) => {
    if (product.id) {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
      showToast("Mahsulot yangilandi!", "success");
    } else {
      const newProd = { ...product, id: Date.now() };
      setProducts((prev) => [...prev, newProd]);
      showToast("Yangi mahsulot qo'shildi!", "success");
    }
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast("Mahsulot o'chirildi!", "info");
  };

  const saveUser = (user) => {
    if (user.id) {
      setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
      showToast("Foydalanuvchi ma'lumotlari yangilandi!", "success");
    } else {
      const newUser = {
        ...user,
        id: Date.now(),
        coins: user.coins || 10,
        testsDone: 0,
        quizAttempts: {},
        purchased: [],
      };
      setUsers((prev) => [...prev, newUser]);
      showToast("Yangi foydalanuvchi qo'shildi!", "success");
    }
  };

  const deleteUser = (username) => {
    setUsers((prev) => prev.filter((u) => u.username !== username));
    showToast("Foydalanuvchi o'chirildi!", "info");
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        soundEnabled,
        toggleSound,
        playSound,
        toasts,
        showToast,
        articles,
        users,
        quizzes,
        products,
        favorites,
        learnedCards,
        comments,
        orders,
        currentUser,
        getCurrentUserRecord,
        activeModal,
        setActiveModal,
        modalData,
        setModalData,
        login,
        register,
        logout,
        addCoins,
        toggleFavorite,
        addComment,
        markCardLearned,
        recordQuizAttempt,
        buyProduct,
        saveArticle,
        deleteArticle,
        saveQuiz,
        deleteQuiz,
        saveProduct,
        deleteProduct,
        saveUser,
        deleteUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
