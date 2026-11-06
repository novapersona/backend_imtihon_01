// =====================================================================
// ILM CHASHMASI — ZAMONAVIY VA KENGAYTIRILGAN FRONTEND ILOVASI
// =====================================================================

// ==================== 1. CONSTANTS & INITIAL DATA ====================
const API_BASE = (window.location.protocol.startsWith('http') && window.location.port === '3333') 
    ? '' 
    : 'http://localhost:3333';
const MAX_ATTEMPTS = 1;
const COINS_PER_OK = 1;

const DEFAULT_ARTICLES = [
    {
        id: 1,
        title: "Ilm o'rganishning 5 ta fazilati va foydasi",
        category: "Ilm-ma'rifat",
        readTime: "4 daqiqa",
        views: 342,
        date: "2026-10-28",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1173",
        content: `Ilm o'rganish insonning dunyoqarashini kengaytiradi, unga yangi imkoniyatlar eshigini ochadi va jamiyatda mustahkam o'z o'rnini topishga ko'maklashadi.

1. Fikrni charxlaydi va idrokni o'stiradi: Muntazam yangi bilim olish miya neyronlari faoliyatini kuchaytiradi va tanqidiy fikrlashni rivojlantiradi.
2. Muammolarni yechish qobiliyatini oshiradi: Ilmli inson har qanday murakkab vaziyatda his-tuyg'ularga emas, aql va mantiqqa tayanadi.
3. O'ziga bo'lgan ishonchni mustahkamlaydi: Har bir yangi o'rganilgan mavzu insonga ruhiy kuch va o'z qadr-qimmatini his etish hissini baxsh etadi.
4. Qimmatli bilimlarni boshqalar bilan ulashish imkoniyati: Haqiqiy ilm — boshqalarga o'rgatilganda ko'payadi va jamiyatni yoritadi.
5. Dunyo va oxirat saodati: Ilm yo'lida sarflangan har bir daqiqa inson hayotini mazmunli qiladi.`,
    },
    {
        id: 2,
        title: "Kitob mutolaasi — ruh ozig'i va tafakkur parvozi",
        category: "Kitobxonlik",
        readTime: "3 daqiqa",
        views: 285,
        date: "2026-10-29",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1174",
        content: `Kitob o'qish nafaqat quruq axborot beradi, balki insonning ruhiy olamini boyitib, qalbini xotirjamlikka to'ldiradi.

Zamonaviy neyrobiologik tadqiqotlarga ko'ra, kuniga atigi 15-20 daqiqa kitob o'qish asab tizimidagi stressni 68% ga kamaytiradi. Kitob sahifalari orqali biz o'tgan asrlarga, buyuk allomalar suhbatiga sayohat qilamiz.

Muntazam mutolaa qiluvchi insonning so'z boyligi boshqalarga qaraganda 3 barobar tezroq boyiydi, nutqi ravonlashadi va insonlar bilan muloqot qilish mahorati yuksak darajaga yetadi. Har kuni kamida 10 bet kitob o'qishni odatga aylantiring!`,
    },
    {
        id: 3,
        title: "Arab tili grammatikasiga kirish: So'z turlari",
        category: "Arab tili",
        readTime: "5 daqiqa",
        views: 520,
        date: "2026-10-30",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1074",
        content: `Arab tili — dunyodagi eng boy, nozik va musiqiy tillardan biridir. Bu tilni o'rganishni boshlagan kishi eng avvalo so'z tuzilishini bilishi lozim.

Arab tilida barcha so'zlar 3 ta asosiy turkumga ajratiladi:
1. Ism (الإِسْمُ): O'zida mustaqil ma'noga ega bo'lgan va zamon bilan bog'liq bo'lmagan so'zlar (masalan: كِتَابٌ - kitob, رَجُلٌ - kishi).
2. Fe'l (الفِعْلُ): Harakat yoki holatni ifodalab, uch zamondan biriga (o'tgan, hozirgi-kelasi) bog'liq bo'lgan so'zlar (masalan: كَتَبَ - yozdi, يَكْتُبُ - yozyapti).
3. Harf (الحَرْفُ): Mustaqil ma'no anglatmay, ism va fe'llarni bir-biriga bog'lash uchun xizmat qiladigan ko'makchi so'zlar (masalan: فِي - ichida, عَلَى - ustida).

Ushbu uchlikni puxta o'zlashtirish orqali arab tili sintaksisi poydevoriga ilk qadam qo'yiladi.`,
    },
    {
        id: 4,
        title: "Taym-menejment: Vaqtni to'g'ri rejalashtirish san'ati",
        category: "Shaxsiy rivojlanish",
        readTime: "4 daqiqa",
        views: 198,
        date: "2026-10-27",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1168",
        content: `Vaqt — inson ixtiyoridagi eng qimmatli va qaytarib bo'lmaydigan resursdir. Kunni rejalashtirish ish unumdorligini 40% ga oshiradi.

1. Pomodoro texnikasi: 25 daqiqa to'liq diqqat bilan ishlash va 5 daqiqa dam olish. 4 ta tsikldan so'ng 20 daqiqa tanaffus qiling.
2. Eyzenxauer matritsasi: Ishlaringizni to'rtga ajrating: Muhim va shoshilinch, Muhim ammo shoshilinch emas, Muhim emas ammo shoshilinch, Muhim ham emas shoshilinch ham emas.
3. Chalg'ituvchi omillarni cheklash: O'qish yoki ishlash vaqtida bildirishnomalarni o'chiring.`,
    },
    {
        id: 5,
        title: "Sun'iy intellekt va zamonaviy ta'lim inqilobi",
        category: "Texnologiya",
        readTime: "4 daqiqa",
        views: 410,
        date: "2026-10-25",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1170",
        content: `Sun'iy intellekt (AI) ta'lim sohasida inqilobiy o'zgarishlarni amalga oshirmoqda. Shaxsiylashtirilgan ta'lim algoritmlari har bir o'quvchining qobiliyati va o'zlashtirish tezligiga qarab dasturni avtomatik moslashtiradi.

Interaktiv til o'rganish vositalari, nutqni taniy oluvchi modellar talabaning arabcha talaffuzini real vaqt rejimida tahlil qilib, xatolarini tuzatishga yordam beradi. Kelajak ta'limi — inson aqli va sun'iy intellekt hamkorligida!`,
    }
];

const DEFAULT_USERS = [
    { username: 'nodir_bek', password: 'user123', coins: 45, testsDone: 8, quizAttempts: { 1: 1, 2: 1, 3: 1 }, purchased: [] },
    { username: 'madina', password: 'user123', coins: 30, testsDone: 6, quizAttempts: { 1: 1, 2: 1 }, purchased: [] },
    { username: 'dilshod', password: 'user123', coins: 22, testsDone: 4, quizAttempts: { 1: 1 }, purchased: [] },
    { username: 'anvar_ilm', password: 'user123', coins: 18, testsDone: 3, quizAttempts: {}, purchased: [] },
    { username: 'laylo_qori', password: 'user123', coins: 15, testsDone: 2, quizAttempts: {}, purchased: [] },
];

const DEFAULT_QUIZZES = [
    {
        id: 1,
        title: "1-dars: Kundalik zaruriy so'zlar",
        level: "easy",
        words: [
            { arabic: "كِتَابٌ", uzbek: "Kitob", wrong_opt1: "Qalam", wrong_opt2: "Daftar", wrong_opt3: "Parta" },
            { arabic: "قَلَمٌ", uzbek: "Qalam", wrong_opt1: "Kitob", wrong_opt2: "Doska", wrong_opt3: "Stul" },
            { arabic: "بَابٌ", uzbek: "Eshik", wrong_opt1: "Deraza", wrong_opt2: "Devor", wrong_opt3: "Xona" },
            { arabic: "مَدْرَسَةٌ", uzbek: "Maktab", wrong_opt1: "Masjid", wrong_opt2: "Kutubxona", wrong_opt3: "Bozor" },
            { arabic: "طَالِبٌ", uzbek: "Talaba / O'quvchi", wrong_opt1: "O'qituvchi", wrong_opt2: "Shifokor", wrong_opt3: "Muhandis" }
        ]
    },
    {
        id: 2,
        title: "2-dars: Tabiat va Atrof-muhit",
        level: "easy",
        words: [
            { arabic: "شَمْسٌ", uzbek: "Quyosh", wrong_opt1: "Oy", wrong_opt2: "Yulduz", wrong_opt3: "Bulut" },
            { arabic: "قَمَرٌ", uzbek: "Oy", wrong_opt1: "Quyosh", wrong_opt2: "Daryo", wrong_opt3: "Tog'" },
            { arabic: "مَاءٌ", uzbek: "Suv", wrong_opt1: "Olov", wrong_opt2: "Tuproq", wrong_opt3: "Havo" },
            { arabic: "سَمَاءٌ", uzbek: "Osmon", wrong_opt1: "Yer", wrong_opt2: "Yomg'ir", wrong_opt3: "Shamol" },
            { arabic: "شَجَرَةٌ", uzbek: "Daraxt", wrong_opt1: "Gul", wrong_opt2: "O't", wrong_opt3: "Barg" }
        ]
    },
    {
        id: 3,
        title: "3-dars: Oila va Qarindoshlik",
        level: "medium",
        words: [
            { arabic: "أَبٌ", uzbek: "Ota", wrong_opt1: "Ona", wrong_opt2: "Aka", wrong_opt3: "Opa" },
            { arabic: "أُمٌّ", uzbek: "Ona", wrong_opt1: "Ota", wrong_opt2: "Singil", wrong_opt3: "Xola" },
            { arabic: "أَخٌ", uzbek: "Aka / Uka", wrong_opt1: "Opa", wrong_opt2: "Tog'a", wrong_opt3: "Bobo" },
            { arabic: "أُخْتٌ", uzbek: "Opa / Singil", wrong_opt1: "Aka", wrong_opt2: "Amaki", wrong_opt3: "Ona" },
            { arabic: "جَدٌّ", uzbek: "Bobo", wrong_opt1: "Buvi", wrong_opt2: "Amaki", wrong_opt3: "Jiyan" }
        ]
    },
    {
        id: 4,
        title: "4-dars: Ta'lim va Idora so'zlari",
        level: "medium",
        words: [
            { arabic: "أُسْتَاذٌ", uzbek: "O'qituvchi / Ustoz", wrong_opt1: "Talaba", wrong_opt2: "Direktor", wrong_opt3: "Navbatchi" },
            { arabic: "دَفْتَرٌ", uzbek: "Daftar", wrong_opt1: "Kitob", wrong_opt2: "Lug'at", wrong_opt3: "Qalamdon" },
            { arabic: "مَكْتَبَةٌ", uzbek: "Kutubxona", wrong_opt1: "Oshxona", wrong_opt2: "Xona", wrong_opt3: "Bino" },
            { arabic: "مِمْحَاةٌ", uzbek: "O'chirg'ich", wrong_opt1: "Chizg'ich", wrong_opt2: "Bo'r", wrong_opt3: "Doska" }
        ]
    }
];

const DEFAULT_PRODUCTS = [
    {
        id: 1,
        title: "Ajoyib Bloknot va Qalam to'plami",
        category: "aksessuar",
        description: "Chiroyli charm muqovali kundalik mutolaa daftari va maxsus sharikli qalam to'plami.",
        image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=400",
        price: 15,
        stock: 20
    },
    {
        id: 2,
        title: "Arab tili lug'at kitobi (10 000 so'z)",
        category: "kitob",
        description: "Boshlang'ich va o'rta darajadagilar uchun eng ko'p qo'llaniladigan arabcha–o'zbekcha so'zlik.",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400",
        price: 25,
        stock: 12
    },
    {
        id: 3,
        title: "Ilm Chashmasi Termos Krujkasi",
        category: "aksessuar",
        description: "Sifatli issiq saqlovchi metall termos. Mutolaa va dars paytida choy uchun ayni muddao.",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400",
        price: 35,
        stock: 8
    },
    {
        id: 4,
        title: "Elektron Zikr va Tasbeh Hisoblagich",
        category: "aksessuar",
        description: "Qulay, zamonaviy va raqamli displeyli barmoq hisoblagichi.",
        image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=400",
        price: 10,
        stock: 30
    },
    {
        id: 5,
        title: "Tajvid qoidalari qo'llanmasi (Rangli)",
        category: "kitob",
        description: "Arabcha to'g'ri o'qish qoidalari, maxrojlar va mashqlar jamlangan darslik kitob.",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
        price: 20,
        stock: 15
    }
];

const DEFAULT_FLASHCARDS = [
    { id: 1, category: "daily", categoryName: "Kundalik zaruriy", arabic: "كِتَابٌ", translit: "[ kitaabun ]", uzbek: "Kitob", exampleAr: "قَرَأْتُ كِتَابًا مُفِيدًا", exampleUz: "Men foydali kitob o'qidim" },
    { id: 2, category: "daily", categoryName: "Kundalik zaruriy", arabic: "قَلَمٌ", translit: "[ qalamun ]", uzbek: "Qalam", exampleAr: "كَتَبْتُ بِالقَلَمِ", exampleUz: "Qalam bilan yozdim" },
    { id: 3, category: "daily", categoryName: "Kundalik zaruriy", arabic: "بَابٌ", translit: "[ baabun ]", uzbek: "Eshik", exampleAr: "فَتَحْتُ البَابَ", exampleUz: "Eshikni ochdim" },
    { id: 4, category: "daily", categoryName: "Kundalik zaruriy", arabic: "مَاءٌ", translit: "[ maa'un ]", uzbek: "Suv", exampleAr: "شَرِبْتُ مَاءً بَارِدًا", exampleUz: "Muzdek suv ichdim" },
    { id: 5, category: "nature", categoryName: "Tabiat", arabic: "شَمْسٌ", translit: "[ shamsun ]", uzbek: "Quyosh", exampleAr: "الشَّمْسُ مُشْرِقَةٌ", exampleUz: "Quyosh charoqlamoqda" },
    { id: 6, category: "nature", categoryName: "Tabiat", arabic: "قَمَرٌ", translit: "[ qamarun ]", uzbek: "Oy", exampleAr: "القَمَرُ جَمِيلٌ اللَّيْلَةَ", exampleUz: "Bu oqshom oy juda go'zal" },
    { id: 7, category: "nature", categoryName: "Tabiat", arabic: "سَمَاءٌ", translit: "[ samaa'un ]", uzbek: "Osmon", exampleAr: "السَّمَاءُ صَافِيَةٌ", exampleUz: "Osmon musaffodir" },
    { id: 8, category: "family", categoryName: "Oila", arabic: "أَبٌ", translit: "[ abun ]", uzbek: "Ota", exampleAr: "أَبِي يُحِبُّنِي", exampleUz: "Otam meni yaxshi ko'radi" },
    { id: 9, category: "family", categoryName: "Oila", arabic: "أُمٌّ", translit: "[ ummun ]", uzbek: "Ona", exampleAr: "الجَنَّةُ تَحْتَ أَقْدَامِ الأُمَّهَاتِ", exampleUz: "Jannat onalar oyog'i ostidadir" },
    { id: 10, category: "family", categoryName: "Oila", arabic: "أَخٌ", translit: "[ axun ]", uzbek: "Aka / Uka", exampleAr: "أَخِي طَالِبٌ مُجْتَهِدٌ", exampleUz: "Akam tirishqoq talabadir" },
    { id: 11, category: "study", categoryName: "Ta'lim & Maktab", arabic: "مَدْرَسَةٌ", translit: "[ madrasatun ]", uzbek: "Maktab", exampleAr: "أَذْهَبُ إِلَى المَدْرَسَةِ", exampleUz: "Maktabga boryapman" },
    { id: 12, category: "study", categoryName: "Ta'lim & Maktab", arabic: "أُسْتَاذٌ", translit: "[ ustaadhun ]", uzbek: "Ustoz / O'qituvchi", exampleAr: "الأُسْتَاذُ يَشْرَحُ الدَّرْسَ", exampleUz: "Ustoz darsni tushuntiryapti" },
    { id: 13, category: "study", categoryName: "Ta'lim & Maktab", arabic: "دَفْتَرٌ", translit: "[ daftarun ]", uzbek: "Daftar", exampleAr: "هَذَا دَفْتَرِي", exampleUz: "Bu mening daftarim" },
    { id: 14, category: "study", categoryName: "Ta'lim & Maktab", arabic: "مَكْتَبَةٌ", translit: "[ maktabatun ]", uzbek: "Kutubxona", exampleAr: "فِي المَكْتَبَةِ كُتُبٌ كَثِيرَةٌ", exampleUz: "Kutubxonada kitoblar ko'p" },
    { id: 15, category: "daily", categoryName: "Kundalik zaruriy", arabic: "شُكْرًا", translit: "[ shukran ]", uzbek: "Rahmat / Tashakkur", exampleAr: "شُكْرًا جَزِيلًا لَكَ", exampleUz: "Sizga katta rahmat" },
];

const WISDOM_QUOTES = [
    { ar: "مَنْ جَدَّ وَجَدَ ، وَمَنْ زَرَعَ حَصَدَ", uz: "«Kim qattiq harakat qilsa — topadi, kim ekkan bo'lsa — o'radi.»" },
    { ar: "طَلَبُ العِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ", uz: "«Ilm izlash har bir musulmon uchun farzdir.»" },
    { ar: "العِلْمُ فِي الصِّغَرِ كَالنَّقْشِ عَلَى الحَجَرِ", uz: "«Yoshlikda o'rganilgan ilm — toshga o'yilgan naqsh kabidir.»" },
    { ar: "خَيْرُ جَلِيسٍ فِي الزَّمَانِ كِتَابُ", uz: "«Zamonadagi eng yaxshi hamsuhbat — kitobdir.»" },
    { ar: "رَأْسُ الحِكْمَةِ مَخَافَةُ اللَّهِ", uz: "«Hikmatning boshi — Allohdan qo'rqishdir.»" },
    { ar: "الصَّبْرُ مِفْتَاحُ الفَرَجِ", uz: "«Sabr — yutuq va quvonchning kalitidir.»" }
];

// ==================== 2. APPLICATION STATE ====================
let state = {
    currentUser: JSON.parse(sessionStorage.getItem('ilm_current_user')) || null,
    articles: JSON.parse(localStorage.getItem('ilm_articles')) || DEFAULT_ARTICLES,
    users: JSON.parse(localStorage.getItem('ilm_users')) || DEFAULT_USERS,
    quizzes: JSON.parse(localStorage.getItem('ilm_quizzes')) || DEFAULT_QUIZZES,
    products: JSON.parse(localStorage.getItem('ilm_products')) || DEFAULT_PRODUCTS,
    favorites: JSON.parse(localStorage.getItem('ilm_favorites')) || [1, 3],
    flashcards: DEFAULT_FLASHCARDS,
    learnedCards: JSON.parse(localStorage.getItem('ilm_learned_cards')) || [],
    comments: JSON.parse(localStorage.getItem('ilm_comments')) || {
        1: [
            { user: "nodir_bek", text: "Juda foydali va qimmatli maqola bo'libdi. Muallifga tashakkur!", date: "2026-10-29" },
            { user: "madina", text: "Har kuni o'qish uchun ajoyib tavsiyalar ekan.", date: "2026-10-30" }
        ],
        2: [
            { user: "dilshod", text: "Kitob mutolaasini rejalashtirish haqidagi fikrlar juda to'g'ri.", date: "2026-10-30" }
        ]
    },

    // UI state
    soundEnabled: localStorage.getItem('ilm_sound') !== 'false',
    theme: localStorage.getItem('ilm_theme') || 'light',
    
    // Filters
    articleCategory: 'all',
    articleSearch: '',
    articleSort: 'newest',
    flashcardCategory: 'all',
    flashcardIndex: 0,
    quizFilter: 'all',
    shopCategory: 'all',

    // Active reading modal
    activeReadingArticleId: null,
    readingFontSize: 1.1, // rem

    // Active quiz session
    activeQuiz: null,
    quizCurrent: 0,
    quizAnswers: [],
};

// ==================== 3. SOUND SYNTHESIZER (WEB AUDIO API) ====================
class SoundFX {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
    }

    play(type) {
        if (!state.soundEnabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            if (this.ctx.state === 'suspended') this.ctx.resume();

            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            if (type === 'click') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(450, now);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
            } else if (type === 'correct') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(523.25, now); // C5
                osc.frequency.setValueAtTime(659.25, now + 0.09); // E5
                osc.frequency.setValueAtTime(783.99, now + 0.18); // G5
                gain.gain.setValueAtTime(0.12, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                osc.start(now);
                osc.stop(now + 0.35);
            } else if (type === 'wrong') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(240, now);
                osc.frequency.linearRampToValueAtTime(160, now + 0.2);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                osc.start(now);
                osc.stop(now + 0.25);
            } else if (type === 'coin') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(987.77, now); // B5
                osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
            } else if (type === 'flip') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
            }
        } catch (e) {
            // Audio error silenced
        }
    }
}
const sound = new SoundFX();

// ==================== 4. ARABIC TEXT-TO-SPEECH ====================
function speakText(text, lang = 'ar-SA') {
    if (!('speechSynthesis' in window)) {
        showToast("Qurilmangizda ovozli o'qish qo'llab-quvvatlanmaydi", "info");
        return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85;

    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
    if (arabicVoice) utterance.voice = arabicVoice;

    window.speechSynthesis.speak(utterance);
    sound.play('click');
}

// ==================== 5. TOAST NOTIFICATION SYSTEM ====================
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'fas fa-check-circle';
    if (type === 'error') icon = 'fas fa-exclamation-circle';
    if (type === 'info')  icon = 'fas fa-info-circle';

    toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 20);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 350);
    }, 3200);
}

// ==================== 6. PERSISTENCE HELPERS ====================
function saveArticles()   { localStorage.setItem('ilm_articles', JSON.stringify(state.articles)); }
function saveUsers()      { localStorage.setItem('ilm_users', JSON.stringify(state.users)); }
function saveQuizzes()    { localStorage.setItem('ilm_quizzes', JSON.stringify(state.quizzes)); }
function saveProducts()   { localStorage.setItem('ilm_products', JSON.stringify(state.products)); }
function saveFavorites()  { localStorage.setItem('ilm_favorites', JSON.stringify(state.favorites)); }
function saveComments()   { localStorage.setItem('ilm_comments', JSON.stringify(state.comments)); }
function saveLearned()    { localStorage.setItem('ilm_learned_cards', JSON.stringify(state.learnedCards)); }

function getCurrentUserRecord() {
    if (!state.currentUser || state.currentUser.role === 'admin') return null;
    return state.users.find(u => u.username === state.currentUser.username) || null;
}

function addCoins(amount) {
    const rec = getCurrentUserRecord();
    if (!rec) return;
    rec.coins = (rec.coins || 0) + amount;
    saveUsers();
    updateUserNav();
    sound.play('coin');
    showToast(`+${amount} Coin hisobingizga qo'shildi! 🪙`, 'success');
}

// ==================== 7. THEME & SOUND CONTROLS ====================
function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.innerHTML = state.theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('ilm_theme', state.theme);
    initTheme();
    sound.play('click');
    showToast(state.theme === 'dark' ? 'Tun rejimi yoqildi 🌙' : 'Kun rejimi yoqildi ☀️', 'info');
}

function initSound() {
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
        soundBtn.innerHTML = state.soundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
    }
}

function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    localStorage.setItem('ilm_sound', state.soundEnabled);
    initSound();
    sound.play('click');
    showToast(state.soundEnabled ? 'Ovoz effektlari yoqildi 🔊' : 'Ovoz effektlari o\'chirildi 🔇', 'info');
}

// ==================== 8. NAVBAR & USER AUTH STATE ====================
function updateUserNav() {
    const guestZone = document.getElementById('nav-guest-zone');
    const userZone = document.getElementById('nav-user-zone');
    const navCoinBadge = document.getElementById('nav-coin-badge');
    const favCountBadge = document.getElementById('nav-fav-count');
    const usernameDisplay = document.getElementById('nav-username-display');
    const adminBtn = document.getElementById('admin-login-btn');
    const shopBalance = document.getElementById('shop-user-balance');

    // Update favorites count badge
    if (favCountBadge) favCountBadge.textContent = state.favorites.length;

    if (state.currentUser) {
        if (guestZone) guestZone.style.display = 'none';
        if (userZone) userZone.style.display = 'inline-flex';

        if (state.currentUser.role === 'admin') {
            if (usernameDisplay) usernameDisplay.textContent = 'ADMIN';
            if (navCoinBadge) navCoinBadge.style.display = 'none';
            if (adminBtn) adminBtn.style.display = 'inline-block';
            if (shopBalance) shopBalance.textContent = 'Admin (Cheksiz 🪙)';
        } else {
            const rec = getCurrentUserRecord();
            const coins = rec ? (rec.coins || 0) : 0;
            if (usernameDisplay) usernameDisplay.textContent = state.currentUser.username;
            if (navCoinBadge) {
                navCoinBadge.style.display = 'inline-flex';
                navCoinBadge.textContent = `🪙 ${coins}`;
            }
            if (adminBtn) adminBtn.style.display = 'none';
            if (shopBalance) shopBalance.textContent = `${coins} 🪙`;
        }
    } else {
        if (guestZone) guestZone.style.display = 'inline-flex';
        if (userZone) userZone.style.display = 'none';
        if (navCoinBadge) navCoinBadge.style.display = 'none';
        if (adminBtn) adminBtn.style.display = 'none';
        if (shopBalance) shopBalance.textContent = '0 🪙 (Kirish kerak)';
    }

    updateStatsStrip();
}

function updateStatsStrip() {
    const artCount = document.getElementById('stats-articles-count');
    const wordCount = document.getElementById('stats-words-count');
    const userCount = document.getElementById('stats-users-count');
    const coinCount = document.getElementById('stats-coins-count');

    if (artCount) artCount.textContent = `${state.articles.length}+`;
    if (wordCount) wordCount.textContent = `${state.flashcards.length * 80}+`;
    if (userCount) userCount.textContent = `${state.users.length * 150 + 20}+`;
    
    let totalCoins = 18400;
    state.users.forEach(u => totalCoins += (u.coins || 0));
    if (coinCount) coinCount.textContent = `${totalCoins.toLocaleString()}+`;
}

// ==================== 9. DAILY WISDOM ====================
let currentWisdomIdx = 0;
function renderDailyWisdom() {
    const item = WISDOM_QUOTES[currentWisdomIdx];
    const arEl = document.getElementById('daily-wisdom-arabic');
    const uzEl = document.getElementById('daily-wisdom-uzbek');
    if (arEl) arEl.textContent = item.ar;
    if (uzEl) uzEl.textContent = item.uz;
}

window.speakDailyWisdom = () => {
    const item = WISDOM_QUOTES[currentWisdomIdx];
    speakText(item.ar);
};

window.refreshDailyWisdom = () => {
    currentWisdomIdx = (currentWisdomIdx + 1) % WISDOM_QUOTES.length;
    renderDailyWisdom();
    sound.play('click');
};

window.copyWisdom = () => {
    const quote = "طَلَبُ العِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ - Ilm izlash har bir musulmon uchun farzdir.";
    navigator.clipboard.writeText(quote).then(() => {
        showToast("Hikmat nusxalandi! 📋", "success");
    });
};

// ==================== 10. ARTICLES MODULE ====================
function getFilteredArticles() {
    let list = [...state.articles];

    // Category filter
    if (state.articleCategory !== 'all') {
        list = list.filter(a => (a.category || "Ilm-ma'rifat") === state.articleCategory);
    }

    // Search query
    if (state.articleSearch.trim()) {
        const q = state.articleSearch.toLowerCase().trim();
        list = list.filter(a => 
            a.title.toLowerCase().includes(q) || 
            (a.content && a.content.toLowerCase().includes(q))
        );
    }

    // Sorting
    if (state.articleSort === 'newest') {
        list.sort((a, b) => b.id - a.id);
    } else if (state.articleSort === 'popular') {
        list.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (state.articleSort === 'title') {
        list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
}

function renderArticles() {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;

    const list = getFilteredArticles();
    if (list.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 15px;"></i>
                <p class="empty-msg">Kechirasiz, so'rovingizga mos maqola topilmadi.</p>
                <button class="btn btn-primary-outline" onclick="resetArticleFilters()" style="margin-top: 10px;">Barcha maqolalarni ko'rsatish</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = list.map(art => {
        const isFav = state.favorites.includes(art.id);
        const snippet = art.content.length > 130 ? art.content.substring(0, 130) + '...' : art.content;
        return `
            <article class="article-card" onclick="openArticleReader(${art.id})">
                <div class="article-image">
                    <img src="${art.image || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1073'}" alt="${art.title}" loading="lazy">
                </div>
                <div class="article-info">
                    <div class="article-meta-row">
                        <span class="article-badge">${art.category || "Ilm-ma'rifat"}</span>
                        <span class="article-read-time"><i class="far fa-clock"></i> ${art.readTime || "3 daqiqa"}</span>
                    </div>
                    <h3>${art.title}</h3>
                    <p>${snippet}</p>
                    <div class="article-footer-actions">
                        <span class="article-views"><i class="far fa-eye"></i> ${art.views || 100} o'qildi</span>
                        <div style="display:flex;align-items:center;gap:12px;">
                            <button class="btn-fav-card ${isFav ? 'active' : ''}" onclick="toggleFavorite(event, ${art.id})" title="${isFav ? 'Saralanganlardan o\'chirish' : 'Saralanganlarga saqlash'}">
                                <i class="${isFav ? 'fas fa-heart' : 'far fa-heart'}"></i>
                            </button>
                            <span class="btn-read-more" style="color:var(--primary);font-weight:700;font-size:0.85rem;">O'qish →</span>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

window.resetArticleFilters = () => {
    state.articleCategory = 'all';
    state.articleSearch = '';
    const searchInput = document.getElementById('article-search-input');
    if (searchInput) searchInput.value = '';
    const clearBtn = document.getElementById('article-search-clear');
    if (clearBtn) clearBtn.style.display = 'none';

    document.querySelectorAll('#article-category-filters .chip').forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-cat') === 'all');
    });

    renderArticles();
};

// ==================== 11. ARTICLE READER MODAL & COMMENTS ====================
window.openArticleReader = (id) => {
    const art = state.articles.find(a => a.id === id);
    if (!art) return;

    state.activeReadingArticleId = id;
    art.views = (art.views || 0) + 1;
    saveArticles();

    const modal = document.getElementById('read-article-modal');
    document.getElementById('reading-title').textContent = art.title;
    document.getElementById('reading-cat-badge').textContent = art.category || "Ilm-ma'rifat";
    document.getElementById('reading-date-badge').innerHTML = `<i class="far fa-calendar-alt"></i> ${art.date || "Bugun"}`;
    document.getElementById('reading-views-badge').innerHTML = `<i class="far fa-eye"></i> ${art.views} marta o'qildi`;

    const img = document.getElementById('reading-image');
    if (art.image) {
        img.src = art.image;
        document.getElementById('reading-image-box').style.display = 'block';
    } else {
        document.getElementById('reading-image-box').style.display = 'none';
    }

    const contentEl = document.getElementById('reading-content-body');
    contentEl.textContent = art.content;
    contentEl.style.fontSize = `${state.readingFontSize}rem`;

    // Favorite button
    updateReaderFavBtn(id);

    // Comments
    renderComments(id);

    modal.style.display = 'flex';
    sound.play('click');
};

function updateReaderFavBtn(id) {
    const favBtn = document.getElementById('reading-fav-btn');
    if (!favBtn) return;
    const isFav = state.favorites.includes(id);
    favBtn.className = `tool-btn tool-fav ${isFav ? 'active' : ''}`;
    favBtn.innerHTML = `<i class="${isFav ? 'fas fa-heart' : 'far fa-heart'}"></i>`;
}

window.toggleFavorite = (e, id) => {
    if (e) e.stopPropagation();
    const idx = state.favorites.indexOf(id);
    if (idx !== -1) {
        state.favorites.splice(idx, 1);
        showToast("Maqola saralanganlardan olib tashlandi", "info");
    } else {
        state.favorites.push(id);
        sound.play('coin');
        showToast("Maqola saralanganlarga saqlandi! ❤️", "success");
    }
    saveFavorites();
    updateUserNav();
    renderArticles();
    if (state.activeReadingArticleId === id) updateReaderFavBtn(id);
};

// Font size in reader
document.getElementById('reading-font-inc')?.addEventListener('click', () => {
    state.readingFontSize = Math.min(1.6, state.readingFontSize + 0.1);
    const body = document.getElementById('reading-content-body');
    if (body) body.style.fontSize = `${state.readingFontSize}rem`;
    sound.play('click');
});

document.getElementById('reading-font-dec')?.addEventListener('click', () => {
    state.readingFontSize = Math.max(0.9, state.readingFontSize - 0.1);
    const body = document.getElementById('reading-content-body');
    if (body) body.style.fontSize = `${state.readingFontSize}rem`;
    sound.play('click');
});

// TTS audio read in article
document.getElementById('reading-tts-btn')?.addEventListener('click', () => {
    const art = state.articles.find(a => a.id === state.activeReadingArticleId);
    if (!art) return;
    const excerpt = art.title + ". " + art.content.slice(0, 300);
    speakText(excerpt, 'uz-UZ');
    showToast("Maqola o'qib eshittirilmoqda...", "info");
});

document.getElementById('reading-fav-btn')?.addEventListener('click', () => {
    if (state.activeReadingArticleId) {
        toggleFavorite(null, state.activeReadingArticleId);
    }
});

// Comments logic
function renderComments(artId) {
    const list = state.comments[artId] || [];
    const countEl = document.getElementById('comments-count');
    const container = document.getElementById('comments-list');
    if (countEl) countEl.textContent = list.length;
    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = `<p style="color:var(--text-muted);font-size:0.9rem;font-style:italic;">Hozircha izohlar yo'q. Birinchi bo'lib fikr qoldiring!</p>`;
        return;
    }

    container.innerHTML = list.map(c => `
        <div class="comment-item">
            <div class="comment-header">
                <span class="comment-user"><i class="fas fa-user-circle" style="color:var(--primary);"></i> ${c.user}</span>
                <span class="comment-time">${c.date}</span>
            </div>
            <div class="comment-body">${c.text}</div>
        </div>
    `).join('');
}

document.getElementById('add-comment-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const textInput = document.getElementById('comment-text');
    const text = textInput.value.trim();
    if (!text || !state.activeReadingArticleId) return;

    const user = state.currentUser ? state.currentUser.username : "Mehmon o'quvchi";
    if (!state.comments[state.activeReadingArticleId]) {
        state.comments[state.activeReadingArticleId] = [];
    }

    state.comments[state.activeReadingArticleId].unshift({
        user,
        text,
        date: new Date().toLocaleDateString()
    });

    saveComments();
    renderComments(state.activeReadingArticleId);
    textInput.value = '';
    sound.play('click');
    showToast("Fikringiz muvaffaqiyatli saqlandi!", "success");
});

// ==================== 12. FLASHCARDS MODULE ====================
function getFilteredFlashcards() {
    if (state.flashcardCategory === 'all') return state.flashcards;
    return state.flashcards.filter(c => c.category === state.flashcardCategory);
}

function renderFlashcard() {
    const list = getFilteredFlashcards();
    if (list.length === 0) return;

    if (state.flashcardIndex >= list.length) state.flashcardIndex = 0;
    if (state.flashcardIndex < 0) state.flashcardIndex = list.length - 1;

    const card = list[state.flashcardIndex];
    const cardEl = document.getElementById('main-flashcard');
    if (cardEl) cardEl.classList.remove('flipped');

    document.getElementById('fc-category-badge').textContent = card.categoryName;
    document.getElementById('fc-arabic-word').textContent = card.arabic;
    document.getElementById('fc-translit-text').textContent = card.translit;
    document.getElementById('fc-uzbek-word').textContent = card.uzbek;
    document.getElementById('fc-example-sentence').innerHTML = `
        <span class="fc-example-ar" dir="rtl">${card.exampleAr}</span>
        <span class="fc-example-uz">«${card.exampleUz}»</span>
    `;

    document.getElementById('fc-counter').textContent = `${state.flashcardIndex + 1} / ${list.length}`;
    const pct = Math.round(((state.flashcardIndex + 1) / list.length) * 100);
    document.getElementById('fc-progress-fill').style.width = `${pct}%`;

    // Learned status
    const isLearned = state.learnedCards.includes(card.id);
    const learnedBtn = document.getElementById('fc-learned-btn');
    if (learnedBtn) {
        learnedBtn.innerHTML = isLearned ? '<i class="fas fa-check-double"></i> Yodlangan' : '<i class="fas fa-check"></i> Yod oldim';
        learnedBtn.className = isLearned ? 'btn btn-secondary-outline btn-sm' : 'btn btn-success btn-sm';
    }
    document.getElementById('fc-learned-num').textContent = state.learnedCards.length;
}

function setupFlashcardsEvents() {
    const cardEl = document.getElementById('main-flashcard');
    cardEl?.addEventListener('click', () => {
        cardEl.classList.toggle('flipped');
        sound.play('flip');
    });

    document.getElementById('fc-flip-btn')?.addEventListener('click', () => {
        cardEl?.classList.toggle('flipped');
        sound.play('flip');
    });

    document.getElementById('fc-prev-btn')?.addEventListener('click', () => {
        state.flashcardIndex--;
        renderFlashcard();
        sound.play('click');
    });

    document.getElementById('fc-next-btn')?.addEventListener('click', () => {
        state.flashcardIndex++;
        renderFlashcard();
        sound.play('click');
    });

    document.getElementById('fc-audio-front-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const list = getFilteredFlashcards();
        const card = list[state.flashcardIndex];
        if (card) speakText(card.arabic);
    });

    document.getElementById('fc-learned-btn')?.addEventListener('click', () => {
        const list = getFilteredFlashcards();
        const card = list[state.flashcardIndex];
        if (!card) return;

        const idx = state.learnedCards.indexOf(card.id);
        if (idx !== -1) {
            state.learnedCards.splice(idx, 1);
            showToast("Yodlanganlar ro'yxatidan chiqarildi", "info");
        } else {
            state.learnedCards.push(card.id);
            sound.play('coin');
            showToast("Ajoyib! Yangi so'z yodlandi 🎉", "success");
        }
        saveLearned();
        renderFlashcard();
    });

    // Category tabs
    document.querySelectorAll('#flashcard-category-tabs .chip').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#flashcard-category-tabs .chip').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            state.flashcardCategory = btn.getAttribute('data-fc-cat');
            state.flashcardIndex = 0;
            renderFlashcard();
            sound.play('click');
        });
    });
}

// ==================== 13. QUIZZES MODULE ====================
function getAttempts(quizId) {
    const rec = getCurrentUserRecord();
    if (!rec) return 0;
    if (!rec.quizAttempts) rec.quizAttempts = {};
    return rec.quizAttempts[quizId] || 0;
}

function recordAttempt(quizId) {
    const rec = getCurrentUserRecord();
    if (!rec) return;
    if (!rec.quizAttempts) rec.quizAttempts = {};
    rec.quizAttempts[quizId] = (rec.quizAttempts[quizId] || 0) + 1;
    rec.testsDone = (rec.testsDone || 0) + 1;
    saveUsers();
}

function getFilteredQuizzes() {
    if (state.quizFilter === 'all') return state.quizzes;
    return state.quizzes.filter(q => (q.level || 'easy') === state.quizFilter);
}

function renderQuizzes() {
    const grid = document.getElementById('tests-grid');
    if (!grid) return;

    const list = getFilteredQuizzes();
    if (list.length === 0) {
        grid.innerHTML = '<p class="empty-msg">Bu toifada hozircha testlar yo\'q.</p>';
        return;
    }

    grid.innerHTML = list.map(q => {
        const attempts = getAttempts(q.id);
        const locked = attempts >= MAX_ATTEMPTS;
        return `
            <div class="test-card ${locked ? 'test-card-locked' : ''}">
                <div class="test-card-icon">
                    <i class="fas ${locked ? 'fa-lock' : 'fa-brain'}"></i>
                </div>
                <h3>${q.title}</h3>
                <p class="test-meta"><i class="fas fa-list-ul"></i> ${q.words.length} ta so'z &nbsp;|&nbsp; 🪙 ${q.words.length} coin</p>
                <p class="test-attempts ${locked ? 'attempts-done' : ''}">
                    ${locked ? '<i class="fas fa-check-circle"></i> Bajarilgan' : '<i class="fas fa-play-circle"></i> Bajarilmagan'}
                </p>
                ${locked
                    ? '<button class="btn btn-disabled" disabled>Yakunlangan</button>'
                    : `<button class="btn btn-primary" onclick="startQuizSession(${q.id})"><i class="fas fa-play"></i> Testni boshlash</button>`}
            </div>
        `;
    }).join('');
}

window.startQuizSession = (id) => {
    if (!state.currentUser) {
        showToast("Test topshirish va coin ishlash uchun profilingizga kiring!", "info");
        document.getElementById('login-modal').style.display = 'flex';
        return;
    }

    const quiz = state.quizzes.find(q => q.id === id);
    if (!quiz || quiz.words.length === 0) return;

    const attempts = getAttempts(id);
    if (attempts >= MAX_ATTEMPTS) {
        showToast("Siz bu testni topshirib bo'lgansiz!", "info");
        return;
    }

    state.activeQuiz = quiz;
    state.quizCurrent = 0;
    state.quizAnswers = new Array(quiz.words.length).fill(null);

    document.getElementById('take-quiz-modal').style.display = 'flex';
    sound.play('click');
    renderQuizQuestion();
};

function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
}

function renderQuizQuestion() {
    const quiz = state.activeQuiz;
    const idx = state.quizCurrent;
    const word = quiz.words[idx];
    const total = quiz.words.length;
    const body = document.getElementById('quiz-body');
    const opts = shuffle([word.uzbek, word.wrong_opt1 || word.wrong?.[0] || 'A', word.wrong_opt2 || word.wrong?.[1] || 'B', word.wrong_opt3 || word.wrong?.[2] || 'C']);
    const pct = Math.round((idx / total) * 100);

    body.innerHTML = `
        <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width:${pct}%"></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;">
            <p class="quiz-counter">Savol: ${idx + 1} / ${total}</p>
            <span style="font-size:0.85rem;color:var(--secondary);font-weight:700;"><i class="fas fa-coins"></i> +1 coin</span>
        </div>
        <div class="quiz-question">
            <div style="display:flex;align-items:center;justify-content:center;gap:12px;">
                <span class="arabic-word" dir="rtl">${word.arabic}</span>
                <button class="quiz-speaker-btn" onclick="speakText('${word.arabic}')" title="So'zni eshitish"><i class="fas fa-volume-up"></i></button>
            </div>
            <p class="quiz-sub">Ushbu arabcha so'zning to'g'ri o'zbekcha tarjimasini tanlang:</p>
        </div>
        <div class="quiz-options">
            ${opts.map((opt, i) => `
                <button class="quiz-option" onclick="handleQuizAnswer('${opt.replace(/'/g, "\\'")}')">
                    <span class="opt-letter">${['A','B','C','D'][i]}</span>
                    ${opt}
                </button>
            `).join('')}
        </div>
    `;
}

window.handleQuizAnswer = (chosen) => {
    const quiz = state.activeQuiz;
    const idx = state.quizCurrent;
    const word = quiz.words[idx];
    const correct = word.uzbek;
    const body = document.getElementById('quiz-body');

    state.quizAnswers[idx] = chosen;

    const isRight = chosen === correct;
    if (isRight) {
        sound.play('correct');
    } else {
        sound.play('wrong');
    }

    body.querySelectorAll('.quiz-option').forEach(btn => {
        btn.disabled = true;
        const label = btn.textContent.trim().slice(1).trim();
        if (label === correct) btn.classList.add('correct');
        else if (label === chosen && !isRight) btn.classList.add('wrong');
    });

    setTimeout(() => {
        if (idx + 1 < quiz.words.length) {
            state.quizCurrent++;
            renderQuizQuestion();
        } else {
            finishQuiz();
        }
    }, 1100);
};

function finishQuiz() {
    const quiz = state.activeQuiz;
    const correctCnt = state.quizAnswers.filter((ans, i) => ans === quiz.words[i].uzbek).length;
    const earned = correctCnt * COINS_PER_OK;

    recordAttempt(quiz.id);
    if (earned > 0) addCoins(earned);
    renderQuizzes();
    renderLeaderboard();

    showQuizResult(correctCnt, earned);
}

function showQuizResult(correctCnt, earned) {
    const quiz = state.activeQuiz;
    const total = quiz.words.length;
    const pct = Math.round((correctCnt / total) * 100);
    const body = document.getElementById('quiz-body');

    let emoji = '📚', msg = "Ko'proq mashq qiling!";
    if (pct === 100)    { emoji = '🏆'; msg = 'Mukammal natija!'; }
    else if (pct >= 70) { emoji = '🎉'; msg = 'Zo\'r natija!'; }
    else if (pct >= 40) { emoji = '💪'; msg = 'Yaxshi, davom eting!'; }

    body.innerHTML = `
        <div class="quiz-result">
            <div class="result-emoji">${emoji}</div>
            <h2>${msg}</h2>
            <div class="result-score">${correctCnt} / ${total} ta to'g'ri</div>
            <div class="result-pct">${pct}%</div>
            <div class="coin-earned-badge">🪙 +${earned} coin ishlandingiz!</div>
            <p class="attempts-info"><i class="fas fa-check-circle"></i> Ushbu test muvaffaqiyatli yakunlandi</p>
            
            <div class="result-detail" style="max-height: 200px; overflow-y: auto;">
                ${quiz.words.map((w, i) => `
                    <div class="result-row ${state.quizAnswers[i] === w.uzbek ? 'r-correct' : 'r-wrong'}">
                        <span class="r-arabic" dir="rtl">${w.arabic}</span>
                        <span class="r-arrow">→</span>
                        <span class="r-uzbek">${w.uzbek}</span>
                        <span class="r-icon">${state.quizAnswers[i] === w.uzbek ? '✓' : '✗'}</span>
                    </div>
                `).join('')}
            </div>

            <div style="display:flex;gap:10px;justify-content:center;margin-top:20px;">
                <a href="#shop" class="btn btn-primary" onclick="document.getElementById('take-quiz-modal').style.display='none'">
                    <i class="fas fa-store"></i> Do'konda ishlatish
                </a>
                <button class="btn btn-secondary-outline" onclick="document.getElementById('take-quiz-modal').style.display='none'">
                    Yopish
                </button>
            </div>
        </div>
    `;
}

// ==================== 14. LEADERBOARD MODULE ====================
function renderLeaderboard() {
    const podium1Name = document.getElementById('podium-1-name');
    const podium1Coins = document.getElementById('podium-1-coins');
    const podium2Name = document.getElementById('podium-2-name');
    const podium2Coins = document.getElementById('podium-2-coins');
    const podium3Name = document.getElementById('podium-3-name');
    const podium3Coins = document.getElementById('podium-3-coins');
    const tbody = document.getElementById('leaderboard-rows');

    if (!tbody) return;

    // Sort users by coins
    const sorted = [...state.users].sort((a, b) => (b.coins || 0) - (a.coins || 0));

    // Update podium
    if (sorted[0]) {
        if (podium1Name) podium1Name.textContent = sorted[0].username;
        if (podium1Coins) podium1Coins.textContent = `🪙 ${sorted[0].coins || 0} coin`;
    }
    if (sorted[1]) {
        if (podium2Name) podium2Name.textContent = sorted[1].username;
        if (podium2Coins) podium2Coins.textContent = `🪙 ${sorted[1].coins || 0} coin`;
    }
    if (sorted[2]) {
        if (podium3Name) podium3Name.textContent = sorted[2].username;
        if (podium3Coins) podium3Coins.textContent = `🪙 ${sorted[2].coins || 0} coin`;
    }

    // Render list
    tbody.innerHTML = sorted.map((u, i) => {
        let rankMedal = `${i + 1}`;
        if (i === 0) rankMedal = '🥇';
        if (i === 1) rankMedal = '🥈';
        if (i === 2) rankMedal = '🥉';

        let badge = 'Talaba';
        if ((u.coins || 0) >= 40) badge = 'Ustoz ⭐';
        else if ((u.coins || 0) >= 20) badge = 'Bilimdon';

        const isMe = state.currentUser && state.currentUser.username === u.username;

        return `
            <div class="leaderboard-row" style="${isMe ? 'background: #fefce8; border-left: 4px solid var(--secondary);' : ''}">
                <span class="col-rank rank-medal">${rankMedal}</span>
                <span class="col-user"><strong>${u.username}</strong> ${isMe ? '<small style="color:var(--primary);">(Siz)</small>' : ''}</span>
                <span class="col-tests">${u.testsDone || 1} ta test</span>
                <span class="col-coins" style="font-weight:700;color:var(--secondary-dark);">🪙 ${u.coins || 0}</span>
                <span class="col-badge"><span class="article-badge">${badge}</span></span>
            </div>
        `;
    }).join('');
}

// ==================== 15. SHOP MODULE ====================
function getFilteredProducts() {
    if (state.shopCategory === 'all') return state.products;
    return state.products.filter(p => (p.category || 'kitob') === state.shopCategory);
}

function renderShop() {
    const grid = document.getElementById('shop-grid');
    if (!grid) return;

    const list = getFilteredProducts();
    if (list.length === 0) {
        grid.innerHTML = '<p class="empty-msg">Bu toifada mahsulot topilmadi.</p>';
        return;
    }

    grid.innerHTML = list.map(p => `
        <article class="article-card">
            <div class="article-image" style="position:relative;">
                <img src="${p.image}" alt="${p.title}" style="height:210px;object-fit:cover;width:100%;">
                <span class="stock-badge"><i class="fas fa-boxes"></i> Qolgan: ${p.stock || 10} ta</span>
            </div>
            <div class="article-info">
                <h3>${p.title}</h3>
                <p style="font-size:0.88rem;color:var(--text-muted);">${p.description || "Yuqori sifatli ta'limiy mahsulot."}</p>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;">
                    <span style="font-weight:800;font-size:1.15rem;color:var(--secondary-dark);"><i class="fas fa-coins" style="color:#f59e0b;"></i> ${p.price} coin</span>
                    <button class="btn btn-primary" onclick="buyProduct(${p.id})">
                        <i class="fas fa-shopping-cart"></i> Xarid qilish
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

window.buyProduct = (id) => {
    if (!state.currentUser) {
        showToast("Xarid qilish uchun profilingizga kiring!", "info");
        document.getElementById('login-modal').style.display = 'flex';
        return;
    }

    const p = state.products.find(x => x.id === id);
    if (!p) return;

    const rec = getCurrentUserRecord();
    if (!rec) {
        showToast("Faqat o'quvchilar xarid qila oladi.", "error");
        return;
    }

    if ((rec.coins || 0) < p.price) {
        showToast(`Hisobingizda coin yetarli emas! Sizda ${rec.coins || 0} coin, narxi: ${p.price} coin.`, "error");
        sound.play('wrong');
        return;
    }

    if (confirm(`Rostdan ham "${p.title}" mahsulotini ${p.price} coin evaziga xarid qilmoqchimisiz?`)) {
        rec.coins -= p.price;
        if (!rec.purchased) rec.purchased = [];
        rec.purchased.push({
            id: p.id,
            title: p.title,
            price: p.price,
            image: p.image,
            date: new Date().toISOString(),
            completed: false
        });

        p.stock = Math.max(0, (p.stock || 10) - 1);
        saveUsers();
        saveProducts();
        updateUserNav();
        renderShop();
        renderAdminOrders();
        sound.play('coin');
        showToast("Xarid muvaffaqiyatli amalga oshirildi! 🎉 Admin tez orada sizga topshiradi.", "success");
    }
};

// ==================== 16. FAVORITES MODAL ====================
function openFavoritesModal() {
    const listEl = document.getElementById('favorites-list');
    if (!listEl) return;

    const favArticles = state.articles.filter(a => state.favorites.includes(a.id));
    if (favArticles.length === 0) {
        listEl.innerHTML = `<p class="empty-msg" style="padding:20px;">Hali hech qanday maqolani saralanganlarga qo'shmadingiz. Maqola ustidagi ❤️ belgisini bosing!</p>`;
    } else {
        listEl.innerHTML = favArticles.map(art => `
            <div class="admin-article-item" style="border-left:4px solid var(--danger);cursor:pointer;" onclick="openArticleReader(${art.id})">
                <div style="display:flex;align-items:center;gap:14px;">
                    <img src="${art.image}" style="width:50px;height:50px;border-radius:10px;object-fit:cover;">
                    <div>
                        <strong>${art.title}</strong>
                        <p style="font-size:0.8rem;color:var(--text-muted);"><i class="far fa-clock"></i> ${art.readTime || '3 daqiqa'}</p>
                    </div>
                </div>
                <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); toggleFavorite(null, ${art.id}); openFavoritesModal();" title="O'chirish">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    document.getElementById('favorites-modal').style.display = 'flex';
    sound.play('click');
}

// ==================== 17. ORDERS MODAL (USER VIEW) ====================
function openOrdersModal() {
    const container = document.getElementById('user-orders-list');
    if (!container) return;

    const rec = getCurrentUserRecord();
    const orders = rec && rec.purchased ? rec.purchased : [];

    if (orders.length === 0) {
        container.innerHTML = `<p class="empty-msg" style="padding:20px;">Sizda hali xaridlar yo'q. Coinlar to'plab "Do'kon" bo'limidan sovg'a tanlang!</p>`;
    } else {
        container.innerHTML = orders.map(ord => `
            <div class="admin-article-item" style="border-left:4px solid ${ord.completed ? 'var(--success)' : '#f59e0b'};">
                <div style="display:flex;align-items:center;gap:14px;">
                    <img src="${ord.image || 'https://via.placeholder.com/50'}" style="width:50px;height:50px;border-radius:10px;object-fit:cover;">
                    <div>
                        <strong>${ord.title}</strong>
                        <p style="font-size:0.82rem;color:var(--text-muted);">🪙 ${ord.price} coin • ${new Date(ord.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <div>
                    <span class="article-badge" style="background:${ord.completed ? 'var(--ok-bg)' : '#fef3c7'};color:${ord.completed ? 'var(--ok-fg)' : '#92400e'};">
                        ${ord.completed ? 'Yetkazildi ✅' : 'Kutilmoqda ⏳'}
                    </span>
                </div>
            </div>
        `).join('');
    }

    document.getElementById('orders-modal').style.display = 'flex';
    sound.play('click');
}

// ==================== 18. USER PROFILE MODAL ====================
function openProfileModal() {
    if (!state.currentUser) return;

    const usernameEl = document.getElementById('profile-modal-username');
    const roleEl = document.getElementById('profile-modal-role');
    const coinsEl = document.getElementById('profile-coins-val');
    const testsEl = document.getElementById('profile-tests-val');
    const favsEl = document.getElementById('profile-favs-val');
    const ordersEl = document.getElementById('profile-orders-val');
    const badgeShelf = document.getElementById('profile-badge-shelf');

    usernameEl.textContent = state.currentUser.username;
    roleEl.textContent = state.currentUser.role === 'admin' ? 'Bosh Administrator' : 'O\'quvchi / Talaba';

    const rec = getCurrentUserRecord();
    const coins = rec ? (rec.coins || 0) : (state.currentUser.role === 'admin' ? 999 : 0);
    const testsCount = rec ? (rec.testsDone || Object.keys(rec.quizAttempts || {}).length) : 0;
    const ordersCount = rec && rec.purchased ? rec.purchased.length : 0;

    coinsEl.textContent = `🪙 ${coins}`;
    testsEl.textContent = `${testsCount} ta`;
    favsEl.textContent = `${state.favorites.length} ta`;
    ordersEl.textContent = `${ordersCount} ta`;

    // Badges
    const badges = [
        { icon: 'fas fa-seedling', label: 'Birinchi qadam', active: true },
        { icon: 'fas fa-book-reader', label: 'Kitobxon', active: state.favorites.length >= 1 },
        { icon: 'fas fa-brain', label: 'Bilimdon', active: testsCount >= 1 },
        { icon: 'fas fa-coins', label: 'Boy o\'quvchi', active: coins >= 20 },
        { icon: 'fas fa-medal', label: 'Ustoz darajasi', active: coins >= 40 },
    ];

    badgeShelf.innerHTML = badges.map(b => `
        <span class="achievement-badge" style="opacity:${b.active ? '1' : '0.4'};border-color:${b.active ? 'var(--primary)' : 'var(--border)'};">
            <i class="${b.icon}" style="color:${b.active ? 'var(--primary)' : 'var(--text-muted)'};"></i> ${b.label}
        </span>
    `).join('');

    document.getElementById('profile-modal').style.display = 'flex';
    sound.play('click');
}

// ==================== 19. RESOURCE VIEWER MODAL ====================
window.openResourceModal = (type) => {
    const modal = document.getElementById('resource-modal');
    const body = document.getElementById('resource-modal-body');
    if (!modal || !body) return;

    if (type === 'alphabet') {
        body.innerHTML = `
            <h2><i class="fas fa-spell-check" style="color:var(--primary);"></i> Arab Alifbosi va Maxrojlar Jadvali</h2>
            <p style="color:var(--text-muted);margin-bottom:20px;">Arab alifbosi 28 ta harfdan iborat bo'lib, o'ngdan chapga qarab yoziladi va o'qiladi.</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px;text-align:center;">
                ${[
                    { ar: "ا", name: "Alif", sound: "a / i / u" },
                    { ar: "ب", name: "Baa", sound: "b" },
                    { ar: "ت", name: "Taa", sound: "t" },
                    { ar: "ث", name: "Saa", sound: "s (til uchi)" },
                    { ar: "ج", name: "Jiym", sound: "j" },
                    { ar: "ح", name: "Haa", sound: "h (halqum)" },
                    { ar: "خ", name: "Xoo", sound: "x (qattiq)" },
                    { ar: "د", name: "Daal", sound: "d" },
                    { ar: "ر", name: "Roo", sound: "r" },
                    { ar: "ز", name: "Zaay", sound: "z" },
                    { ar: "س", name: "Siyn", sound: "s" },
                    { ar: "ش", name: "Shiyn", sound: "sh" },
                    { ar: "ص", name: "Sood", sound: "s (yo'g'on)" },
                    { ar: "ض", name: "Dood", sound: "d (yon tish)" },
                    { ar: "ط", name: "Too", sound: "t (yo'g'on)" },
                    { ar: "ع", name: "'Ayn", sound: "halqum o'rtasi" },
                    { ar: "ف", name: "Faa", sound: "f" },
                    { ar: "ق", name: "Qoof", sound: "q" },
                    { ar: "ك", name: "Kaaf", sound: "k" },
                    { ar: "م", name: "Miym", sound: "m" },
                    { ar: "ن", name: "Nuun", sound: "n" },
                    { ar: "ه", name: "Haa", sound: "h (ko'krak)" },
                    { ar: "و", name: "Vaav", sound: "v / u / oo" },
                    { ar: "ي", name: "Yaa", sound: "y / i / ee" }
                ].map(h => `
                    <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:12px;cursor:pointer;" onclick="speakText('${h.ar}')">
                        <div style="font-family:var(--font-arabic);font-size:2rem;color:var(--primary);">${h.ar}</div>
                        <strong>${h.name}</strong>
                        <div style="font-size:0.75rem;color:var(--text-muted);">${h.sound}</div>
                        <button class="btn btn-sm btn-primary-outline" style="margin-top:6px;width:100%;font-size:0.7rem;"><i class="fas fa-volume-up"></i></button>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (type === 'reading') {
        body.innerHTML = `
            <h2><i class="fas fa-book-reader" style="color:var(--secondary);"></i> Kitob Mutolaasi Madaniyati va 5 Oltin Qoida</h2>
            <div style="margin-top:20px;line-height:1.8;">
                <p><strong>1. Kunlik me'yor belgilang:</strong> Har kuni kamida 15-20 sahifa o'qishni odat qiling. Yiliga 20 dan ortiq sara kitob tugatgan bo'lasiz!</p>
                <p><strong>2. Qalam bilan o'qing:</strong> Muhim jumlalarni belgilab, o'z fikrlaringizni chetiga yozib boring. Bu xotirani 3 barobar mustahkamlaydi.</p>
                <p><strong>3. Chalg'imaslik maydoni yarating:</strong> Mutolaa paytida telefonni boshqa xonaga qo'ying yoki parvoz rejimiga o'tkazing.</p>
                <p><strong>4. O'qiganingizni boshqalarga aytib bering:</strong> Faynman texnikasiga ko'ra, ma'lumotni kimgadir tushuntirib berish — uni to'liq tushunish garovidir.</p>
                <p><strong>5. Amaliyotga tadbiq eting:</strong> Kitobdan olgan kamida bitta foydali fikrni o'sha kunning o'zida hayotingizda qo'llang.</p>
            </div>
        `;
    } else if (type === 'audio') {
        body.innerHTML = `
            <h2><i class="fas fa-headphones" style="color:var(--success);"></i> Audio Lug'at va Nutq Mashqlari</h2>
            <p style="color:var(--text-muted);margin-bottom:15px;">Tinglab takrorlang va talaffuzingizni charxlang:</p>
            <div style="display:flex;flex-direction:column;gap:10px;">
                ${[
                    { ar: "السَّلَامُ عَلَيْكُمْ", uz: "Assalomu alaykum (Sizga tinchlik bo'lsin)" },
                    { ar: "صَبَاحَ الخَيْرِ", uz: "Xayrli tong" },
                    { ar: "مَسَاءَ الخَيْرِ", uz: "Xayrli kech" },
                    { ar: "كَيْفَ حَالُكَ؟", uz: "Ahvolingiz qanday?" },
                    { ar: "أَنَا بِخَيْرٍ ، الحَمْدُ لِلَّهِ", uz: "Men yaxshiman, Allohga shukr" },
                    { ar: "مَا اسْمُكَ؟", uz: "Ismingiz nima?" },
                    { ar: "اسْمِي عَبْدُ اللَّهِ", uz: "Ismim Abdulloh" },
                    { ar: "أَهْلًا وَسَهْلًا", uz: "Xush kelibsiz" },
                    { ar: "إِلَى اللِّقَاءِ", uz: "Ko'rishguncha" }
                ].map(item => `
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 18px;background:var(--surface-2);border-radius:12px;border:1px solid var(--border);">
                        <div>
                            <span style="font-family:var(--font-arabic);font-size:1.4rem;color:var(--primary);margin-right:15px;" dir="rtl">${item.ar}</span>
                            <span style="color:var(--text);">${item.uz}</span>
                        </div>
                        <button class="btn btn-primary-outline btn-sm" onclick="speakText('${item.ar}')"><i class="fas fa-volume-up"></i> Tinglash</button>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (type === 'memory') {
        body.innerHTML = `
            <h2><i class="fas fa-brain" style="color:var(--primary);"></i> Xotirani Charxlash va Oraliqli Takrorlash (SRS)</h2>
            <div style="margin-top:20px;line-height:1.8;">
                <p>Yangi o'rganilgan so'zlarning 80%i 48 soat ichida unutilishi ilmiy isbotlangan. Buning oldini olish uchun oraliqli takrorlash usulidan foydalaning:</p>
                <div style="background:var(--primary-soft);padding:16px 20px;border-radius:12px;margin:15px 0;">
                    <strong>Takrorlash grafigi:</strong>
                    <ul style="margin-left:20px;margin-top:8px;">
                        <li>1-kun: So'zni o'rgangandan so'ng darhol va 20 daqiqadan keyin.</li>
                        <li>2-kun: Ertasi kuni ertalab 1 marta.</li>
                        <li>7-kun: Bir haftadan so'ng 1 marta.</li>
                        <li>30-kun: Bir oydan so'ng yana bir bor takrorlash.</li>
                    </ul>
                </div>
                <p>Bizning <strong>«Lug'at & Kartochkalar»</strong> bo'limimiz aynan shu tizim asosida ishlab chiqilgan!</p>
            </div>
        `;
    }

    modal.style.display = 'flex';
    sound.play('click');
};

// ==================== 20. FAQ ACCORDION ====================
function setupFaqAccordion() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const wasActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
            sound.play('click');
        });
    });
}

// ==================== 21. FEEDBACK & NEWSLETTER ====================
function setupFeedback() {
    const stars = document.querySelectorAll('#feedback-stars .star');
    let rating = 5;
    stars.forEach(star => {
        star.addEventListener('click', () => {
            rating = parseInt(star.getAttribute('data-val'));
            stars.forEach(s => {
                s.classList.toggle('active', parseInt(s.getAttribute('data-val')) <= rating);
            });
            sound.play('click');
        });
    });

    document.getElementById('feedback-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('fb-name').value.trim();
        const msg = document.getElementById('fb-message').value.trim();
        if (!name || !msg) return;

        showToast(`Tashakkur, ${name}! Fikringiz qabul qilindi 🙏`, "success");
        sound.play('correct');
        e.target.reset();
    });

    document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('nl-email').value.trim();
        if (!email) return;
        showToast("Obuna muvaffaqiyatli rasmiylashtirildi! 📧", "success");
        sound.play('coin');
        e.target.reset();
    });
}

// ==================== 22. AUTHENTICATION MODULE ====================
async function login(username, password) {
    const errorMsg = document.getElementById('login-error');

    if (username === 'ADMIN' && password === 'dreambig@!') {
        state.currentUser = { username: 'ADMIN', role: 'admin' };
        sessionStorage.setItem('ilm_current_user', JSON.stringify(state.currentUser));
        document.getElementById('login-modal').style.display = 'none';
        errorMsg.style.display = 'none';
        document.getElementById('login-form').reset();
        updateUserNav();
        sound.play('correct');
        showToast("Admin boshqaruv paneliga xush kelibsiz!", "success");
        showAdmin();
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok && data.user) {
            state.currentUser = { id: data.user.id, username: data.user.username, role: data.user.role || 'user' };
            sessionStorage.setItem('ilm_current_user', JSON.stringify(state.currentUser));
            
            // Sync user locally if not present
            let localUser = state.users.find(u => u.username === data.user.username);
            if (!localUser) {
                localUser = {
                    id: data.user.id,
                    username: data.user.username,
                    coins: data.user.coins !== undefined ? data.user.coins : 10,
                    testsDone: 0,
                    quizAttempts: {},
                    purchased: []
                };
                state.users.push(localUser);
                saveUsers();
            } else {
                localUser.id = data.user.id;
                localUser.coins = data.user.coins !== undefined ? data.user.coins : localUser.coins;
                saveUsers();
            }

            document.getElementById('login-modal').style.display = 'none';
            errorMsg.style.display = 'none';
            document.getElementById('login-form').reset();
            updateUserNav();
            renderQuizzes();
            renderLeaderboard();
            sound.play('correct');
            showToast(`Xush kelibsiz, ${data.user.username}! Bilim olishga marhamat! 🎓`, "success");
            return;
        } else if (!res.ok && res.status === 401) {
            errorMsg.textContent = data.message || "Login yoki parol noto'g'ri!";
            errorMsg.style.display = 'block';
            sound.play('wrong');
            return;
        }
    } catch (e) {
        console.warn("Backend login offline, falling back to local:", e);
    }

    const user = state.users.find(u => u.username === username && u.password === password);
    if (user) {
        state.currentUser = { username: user.username, role: 'user' };
        sessionStorage.setItem('ilm_current_user', JSON.stringify(state.currentUser));
        document.getElementById('login-modal').style.display = 'none';
        errorMsg.style.display = 'none';
        document.getElementById('login-form').reset();
        updateUserNav();
        renderQuizzes();
        renderLeaderboard();
        sound.play('correct');
        showToast(`Xush kelibsiz, ${user.username}! Bilim olishga marhamat! 🎓`, "success");
        return;
    }

    errorMsg.textContent = 'Login yoki parol noto\'g\'ri!';
    errorMsg.style.display = 'block';
    sound.play('wrong');
}

async function registerUser(username, password) {
    const regError = document.getElementById('reg-error');
    if (!username || !password) return;

    try {
        const res = await fetch(`${API_BASE}/api/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, coins: 10 })
        });
        const data = await res.json();
        if (!res.ok) {
            regError.textContent = data.message || 'Xatolik yuz berdi!';
            regError.style.display = 'block';
            sound.play('wrong');
            return;
        }

        const newUser = {
            id: data.id,
            username: data.username,
            password,
            coins: data.coins !== undefined ? data.coins : 10,
            testsDone: 0,
            quizAttempts: {},
            purchased: []
        };

        const existIdx = state.users.findIndex(u => u.username === data.username);
        if (existIdx >= 0) {
            state.users[existIdx] = { ...state.users[existIdx], ...newUser };
        } else {
            state.users.push(newUser);
        }
        saveUsers();

        state.currentUser = { id: data.id, username: data.username, role: data.role || 'user' };
        sessionStorage.setItem('ilm_current_user', JSON.stringify(state.currentUser));

        document.getElementById('login-modal').style.display = 'none';
        regError.style.display = 'none';
        document.getElementById('register-form').reset();

        updateUserNav();
        renderQuizzes();
        renderLeaderboard();
        sound.play('coin');
        showToast(`Ro'yxatdan o'tdingiz! Backendga muvaffaqiyatli saqlandi. Sizga +10 🪙 coin taqdim etildi! 🎓`, "success");
        return;
    } catch (e) {
        console.warn("Backend register offline, saving locally:", e);
    }

    if (state.users.find(u => u.username === username) || username === 'ADMIN') {
        regError.textContent = 'Bu login band! Boshqa nom tanlang.';
        regError.style.display = 'block';
        sound.play('wrong');
        return;
    }

    const newUser = {
        username,
        password,
        coins: 10, // 10 welcome coins!
        testsDone: 0,
        quizAttempts: {},
        purchased: []
    };

    state.users.push(newUser);
    saveUsers();

    state.currentUser = { username: newUser.username, role: 'user' };
    sessionStorage.setItem('ilm_current_user', JSON.stringify(state.currentUser));

    document.getElementById('login-modal').style.display = 'none';
    regError.style.display = 'none';
    document.getElementById('register-form').reset();

    updateUserNav();
    renderQuizzes();
    renderLeaderboard();
    sound.play('coin');
    showToast(`Ro'yxatdan o'tdingiz! Sizga +10 🪙 tabrik coini sovg'a qilindi!`, "success");
}

async function syncUsersFromBackend() {
    try {
        const res = await fetch(`${API_BASE}/api/users`);
        if (!res.ok) return;
        const backendUsers = await res.json();
        if (Array.isArray(backendUsers)) {
            backendUsers.forEach(bu => {
                const existing = state.users.find(u => u.username === bu.username || u.id === bu.id);
                if (existing) {
                    existing.id = bu.id;
                    if (bu.coins !== undefined) existing.coins = bu.coins;
                } else {
                    state.users.push({
                        id: bu.id,
                        username: bu.username,
                        coins: bu.coins || 0,
                        testsDone: 0,
                        quizAttempts: {},
                        purchased: []
                    });
                }
            });
            saveUsers();
            renderLeaderboard();
            if (document.getElementById('admin-users-list')) {
                renderAdminUsers();
            }
        }
    } catch (e) {
        console.warn("Backend users sync offline:", e);
    }
}

window.logout = () => {
    state.currentUser = null;
    sessionStorage.removeItem('ilm_current_user');
    document.getElementById('admin-view').classList.add('view-hidden');
    document.getElementById('profile-modal').style.display = 'none';
    updateUserNav();
    renderQuizzes();
    renderLeaderboard();
    sound.play('click');
    showToast("Tizimdan chiqildi. Yana kutamiz!", "info");
};

// Setup Auth Tabs
function setupAuthTabs() {
    const tabLogin = document.getElementById('tab-login-btn');
    const tabReg = document.getElementById('tab-register-btn');
    const formLogin = document.getElementById('login-form');
    const formReg = document.getElementById('register-form');

    tabLogin?.addEventListener('click', () => {
        tabLogin.classList.add('active');
        tabReg.classList.remove('active');
        formLogin.classList.add('active');
        formReg.classList.remove('active');
        sound.play('click');
    });

    tabReg?.addEventListener('click', () => {
        tabReg.classList.add('active');
        tabLogin.classList.remove('active');
        formReg.classList.add('active');
        formLogin.classList.remove('active');
        sound.play('click');
    });

    document.getElementById('switch-to-register')?.addEventListener('click', (e) => {
        e.preventDefault();
        tabReg.click();
    });

    document.getElementById('switch-to-login')?.addEventListener('click', (e) => {
        e.preventDefault();
        tabLogin.click();
    });

    formLogin?.addEventListener('submit', (e) => {
        e.preventDefault();
        login(
            document.getElementById('username').value.trim(),
            document.getElementById('password').value
        );
    });

    formReg?.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = document.getElementById('reg-username').value.trim();
        const p1 = document.getElementById('reg-password').value;
        const p2 = document.getElementById('reg-password-confirm').value;
        const err = document.getElementById('reg-error');

        if (p1 !== p2) {
            err.textContent = 'Parollar mos kelmadi!';
            err.style.display = 'block';
            sound.play('wrong');
            return;
        }
        if (p1.length < 4) {
            err.textContent = 'Parol kamida 4 belgidan iborat bo\'lsin!';
            err.style.display = 'block';
            sound.play('wrong');
            return;
        }

        registerUser(u, p1);
    });
}

// ==================== 23. ADMIN VIEW LOGIC ====================
function showAdmin() {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('admin-view').classList.remove('view-hidden');
    renderAdminArticles();
    renderAdminUsers();
    renderAdminQuizzes();
    renderAdminProducts();
    renderAdminOrders();
}

function hideAdmin() {
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('admin-view').classList.add('view-hidden');
}

function renderAdminArticles() {
    const list = document.getElementById('admin-articles-list');
    if (!list) return;
    if (state.articles.length === 0) {
        list.innerHTML = '<p class="empty-msg">Hali maqolalar yo\'q.</p>';
        return;
    }
    list.innerHTML = state.articles.map(art => `
        <div class="admin-article-item">
            <div>
                <strong>${art.title}</strong>
                <p style="font-size:0.8rem;color:#666;">${art.category || "Ilm"} • ${art.date}</p>
            </div>
            <div class="admin-actions">
                <button onclick="editArticle(${art.id})" class="btn btn-primary-outline"><i class="fas fa-edit"></i></button>
                <button onclick="deleteArticle(${art.id})" class="btn btn-danger"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function renderAdminUsers() {
    const list = document.getElementById('admin-users-list');
    if (!list) return;
    if (state.users.length === 0) {
        list.innerHTML = '<p class="empty-msg">Hali foydalanuvchilar yo\'q.</p>';
        return;
    }
    list.innerHTML = state.users.map((u, i) => `
        <div class="admin-article-item">
            <div>
                <strong><i class="fas fa-user"></i> ${u.username}</strong>
                <p style="font-size:0.8rem;color:#666;">🪙 ${u.coins || 0} coin • ${u.testsDone || 0} test</p>
            </div>
            <div class="admin-actions">
                <button onclick="openCoinModal(${i})" class="btn btn-coin"><i class="fas fa-coins"></i> Coin</button>
                <button onclick="deleteUser(${i})" class="btn btn-danger"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function renderAdminQuizzes() {
    const list = document.getElementById('admin-quizzes-list');
    if (!list) return;
    if (state.quizzes.length === 0) {
        list.innerHTML = '<p class="empty-msg">Hali testlar yo\'q.</p>';
        return;
    }
    list.innerHTML = state.quizzes.map(q => `
        <div class="admin-article-item">
            <div>
                <strong><i class="fas fa-brain"></i> ${q.title}</strong>
                <p style="font-size:0.8rem;color:#666;">${q.words.length} ta so'z • 🪙 ${q.words.length} coin</p>
            </div>
            <div class="admin-actions">
                <button onclick="deleteQuiz(${q.id})" class="btn btn-danger"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function renderAdminProducts() {
    const list = document.getElementById('admin-products-list');
    if (!list) return;
    if (state.products.length === 0) {
        list.innerHTML = '<p class="empty-msg">Hali mahsulotlar yo\'q.</p>';
        return;
    }
    list.innerHTML = state.products.map(p => `
        <div class="admin-article-item">
            <div style="display:flex;align-items:center;gap:15px;">
                <img src="${p.image}" style="width:50px;height:50px;object-fit:cover;border-radius:8px;">
                <div>
                    <strong>${p.title}</strong>
                    <p style="font-size:0.8rem;color:#666;">🪙 ${p.price} coin • Qolgan: ${p.stock || 10}</p>
                </div>
            </div>
            <div class="admin-actions">
                <button onclick="deleteProduct(${p.id})" class="btn btn-danger"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function renderAdminOrders() {
    const list = document.getElementById('admin-orders-list');
    if (!list) return;
    let html = '';
    state.users.forEach((u, uIndex) => {
        if (!u.purchased) return;
        u.purchased.forEach((buy, pIndex) => {
            if (buy.completed) return;
            html += `
                <div class="admin-article-item" style="border-left: 4px solid #f59e0b;">
                    <div>
                        <strong><i class="fas fa-user-circle"></i> ${u.username}</strong>
                        <p style="margin:5px 0;">🎁 ${buy.title} (🪙 ${buy.price})</p>
                        <p style="font-size:0.8rem;color:#666;"><i class="far fa-clock"></i> ${new Date(buy.date).toLocaleString()}</p>
                    </div>
                    <div class="admin-actions">
                        <button onclick="completeOrder(${uIndex}, ${pIndex})" class="btn btn-success"><i class="fas fa-check"></i> Berildi</button>
                    </div>
                </div>
            `;
        });
    });
    if (!html) html = '<p class="empty-msg">Hozircha kutilayotgan buyurtmalar yo\'q.</p>';
    list.innerHTML = html;
}

window.completeOrder = (uIndex, pIndex) => {
    if (confirm("Mahsulotni foydalanuvchiga topshirdingizmi?")) {
        state.users[uIndex].purchased[pIndex].completed = true;
        saveUsers();
        renderAdminOrders();
        showToast("Buyurtma topshirilgan deb belgilandi! ✅", "success");
    }
};

window.openCoinModal = (userIndex) => {
    const u = state.users[userIndex];
    if (!u) return;
    document.getElementById('coin-target-index').value = userIndex;
    document.getElementById('coin-target-name').textContent = u.username;
    document.getElementById('coin-current').textContent = u.coins || 0;
    document.getElementById('coin-amount').value = '';
    document.getElementById('coin-error').style.display = 'none';
    document.getElementById('coin-modal').style.display = 'flex';
};

window.deleteUser = (index) => {
    if (confirm('Foydalanuvchini o\'chirmoqchimisiz?')) {
        state.users.splice(index, 1);
        saveUsers();
        renderAdminUsers();
        renderLeaderboard();
        showToast("Foydalanuvchi o'chirildi.", "info");
    }
};

window.deleteArticle = (id) => {
    if (confirm('Maqolani o\'chirmoqchimisiz?')) {
        state.articles = state.articles.filter(a => a.id !== id);
        saveArticles();
        renderAdminArticles();
        renderArticles();
        showToast("Maqola o'chirildi.", "info");
    }
};

window.editArticle = (id) => {
    const art = state.articles.find(a => a.id === id);
    if (!art) return;
    document.getElementById('edit-id').value = art.id;
    document.getElementById('art-title').value = art.title;
    document.getElementById('art-category').value = art.category || "Ilm-ma'rifat";
    document.getElementById('art-image').value = art.image || '';
    document.getElementById('art-content').value = art.content;
    document.getElementById('modal-title').textContent = 'Maqolani tahrirlash';
    document.getElementById('article-modal').style.display = 'flex';
};

window.deleteQuiz = (id) => {
    if (confirm('Testni o\'chirmoqchimisiz?')) {
        state.quizzes = state.quizzes.filter(q => q.id !== id);
        saveQuizzes();
        renderAdminQuizzes();
        renderQuizzes();
        showToast("Test o'chirildi.", "info");
    }
};

window.deleteProduct = (id) => {
    if (confirm("Mahsulotni o'chirmoqchimisiz?")) {
        state.products = state.products.filter(p => p.id !== id);
        saveProducts();
        renderAdminProducts();
        renderShop();
        showToast("Mahsulot o'chirildi.", "info");
    }
};

function buildWordRow(arabic = '', uzbek = '', w1 = '', w2 = '', w3 = '') {
    const row = document.createElement('div');
    row.className = 'word-row';
    row.innerHTML = `
        <div class="word-row-inputs">
            <input type="text" class="wr-arabic" placeholder="عَرَبِيٌّ" value="${arabic}" dir="rtl" required>
            <input type="text" class="wr-uzbek"  placeholder="To'g'ri tarjima" value="${uzbek}" required>
            <input type="text" class="wr-w1" placeholder="Noto'g'ri 1" value="${w1}" required>
            <input type="text" class="wr-w2" placeholder="Noto'g'ri 2" value="${w2}" required>
            <input type="text" class="wr-w3" placeholder="Noto'g'ri 3" value="${w3}" required>
        </div>
        <button type="button" class="btn btn-danger btn-remove-word" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;
    return row;
}

function getWordRows() {
    return Array.from(document.querySelectorAll('#word-rows .word-row')).map(row => ({
        arabic: row.querySelector('.wr-arabic').value.trim(),
        uzbek:  row.querySelector('.wr-uzbek').value.trim(),
        wrong_opt1: row.querySelector('.wr-w1').value.trim(),
        wrong_opt2: row.querySelector('.wr-w2').value.trim(),
        wrong_opt3: row.querySelector('.wr-w3').value.trim(),
    })).filter(w => w.arabic && w.uzbek);
}

// ==================== 24. FORMS & EVENT LISTENERS ====================
function setupEventListeners() {
    // Theme & Sound
    document.getElementById('theme-toggle-btn')?.addEventListener('click', toggleTheme);
    document.getElementById('sound-toggle-btn')?.addEventListener('click', toggleSound);

    // Nav Auth buttons
    document.getElementById('nav-login-btn')?.addEventListener('click', () => {
        document.getElementById('tab-login-btn').click();
        document.getElementById('login-modal').style.display = 'flex';
        sound.play('click');
    });

    document.getElementById('nav-register-btn')?.addEventListener('click', () => {
        document.getElementById('tab-register-btn').click();
        document.getElementById('login-modal').style.display = 'flex';
        sound.play('click');
    });

    document.getElementById('nav-fav-btn')?.addEventListener('click', openFavoritesModal);
    document.getElementById('nav-orders-btn')?.addEventListener('click', openOrdersModal);
    document.getElementById('nav-profile-btn')?.addEventListener('click', openProfileModal);
    document.getElementById('nav-coin-badge')?.addEventListener('click', openProfileModal);

    // Admin toggle
    document.getElementById('admin-login-btn')?.addEventListener('click', () => {
        if (!state.currentUser || state.currentUser.role !== 'admin') return;
        showAdmin();
    });

    document.getElementById('admin-back-btn')?.addEventListener('click', hideAdmin);
    document.getElementById('logout-btn')?.addEventListener('click', logout);
    document.getElementById('nav-logout-btn')?.addEventListener('click', logout);

    // Mobile navigation menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    mobileMenuBtn?.addEventListener('click', () => {
        navLinks?.classList.toggle('show');
        sound.play('click');
    });

    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            navLinks?.classList.remove('show');
            if (link.getAttribute('href')?.startsWith('#')) {
                hideAdmin();
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Article search input
    const searchInput = document.getElementById('article-search-input');
    const clearBtn = document.getElementById('article-search-clear');
    searchInput?.addEventListener('input', (e) => {
        state.articleSearch = e.target.value;
        if (clearBtn) clearBtn.style.display = state.articleSearch ? 'block' : 'none';
        renderArticles();
    });

    clearBtn?.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        state.articleSearch = '';
        clearBtn.style.display = 'none';
        renderArticles();
    });

    // Article Category chips
    document.querySelectorAll('#article-category-filters .chip').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#article-category-filters .chip').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            state.articleCategory = btn.getAttribute('data-cat');
            renderArticles();
            sound.play('click');
        });
    });

    // Article Sort
    document.getElementById('article-sort-select')?.addEventListener('change', (e) => {
        state.articleSort = e.target.value;
        renderArticles();
        sound.play('click');
    });

    // Quiz Filter
    document.querySelectorAll('#quiz-level-filters .chip').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#quiz-level-filters .chip').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            state.quizFilter = btn.getAttribute('data-quiz-filter');
            renderQuizzes();
            sound.play('click');
        });
    });

    // Shop Category
    document.querySelectorAll('#shop-category-filters .chip').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#shop-category-filters .chip').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            state.shopCategory = btn.getAttribute('data-shop-cat');
            renderShop();
            sound.play('click');
        });
    });

    // Admin Modals
    document.getElementById('new-article-btn')?.addEventListener('click', () => {
        document.getElementById('article-form').reset();
        document.getElementById('edit-id').value = '';
        document.getElementById('modal-title').textContent = 'Yangi Maqola';
        document.getElementById('article-modal').style.display = 'flex';
    });

    document.getElementById('new-user-btn')?.addEventListener('click', () => {
        document.getElementById('user-form')?.reset();
        document.getElementById('user-modal').style.display = 'flex';
    });

    document.getElementById('new-quiz-btn')?.addEventListener('click', () => {
        document.getElementById('quiz-form')?.reset();
        const wordRows = document.getElementById('word-rows');
        if (wordRows) {
            wordRows.innerHTML = '';
            wordRows.appendChild(buildWordRow());
            wordRows.appendChild(buildWordRow());
        }
        document.getElementById('quiz-modal').style.display = 'flex';
    });

    document.getElementById('add-word-row')?.addEventListener('click', () => {
        document.getElementById('word-rows')?.appendChild(buildWordRow());
    });

    document.getElementById('new-product-btn')?.addEventListener('click', () => {
        document.getElementById('product-form')?.reset();
        document.getElementById('product-modal').style.display = 'flex';
    });

    // Article Form Submit (Admin)
    document.getElementById('article-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-id').value;
        const title = document.getElementById('art-title').value.trim();
        const category = document.getElementById('art-category').value;
        const image = document.getElementById('art-image').value.trim();
        const content = document.getElementById('art-content').value.trim();

        if (id) {
            const idx = state.articles.findIndex(a => a.id == id);
            if (idx !== -1) state.articles[idx] = { ...state.articles[idx], title, category, image, content };
        } else {
            state.articles.unshift({
                id: Date.now(),
                title,
                category,
                image: image || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1073",
                content,
                readTime: "3 daqiqa",
                views: 1,
                date: new Date().toLocaleDateString()
            });
        }
        saveArticles();
        renderArticles();
        renderAdminArticles();
        document.getElementById('article-modal').style.display = 'none';
        showToast("Maqola muvaffaqiyatli saqlandi! 📖", "success");
    });

    // User Form Submit (Admin)
    document.getElementById('user-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const u = document.getElementById('new-username').value.trim();
        const p = document.getElementById('new-password').value;
        const err = document.getElementById('user-error');

        if (state.users.find(x => x.username === u) || u === 'ADMIN') {
            err.textContent = 'Bu login allaqachon mavjud!';
            err.style.display = 'block';
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/api/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: u, password: p, coins: 0 })
            });
            const data = await res.json();
            if (!res.ok) {
                err.textContent = data.message || 'Xatolik yuz berdi!';
                err.style.display = 'block';
                return;
            }

            state.users.push({
                id: data.id,
                username: data.username,
                password: p,
                coins: data.coins || 0,
                testsDone: 0,
                quizAttempts: {},
                purchased: []
            });
            saveUsers();
            renderAdminUsers();
            renderLeaderboard();
            document.getElementById('user-modal').style.display = 'none';
            e.target.reset();
            err.style.display = 'none';
            showToast("Yangi foydalanuvchi backendga muvaffaqiyatli qo'shildi! 👤", "success");
            return;
        } catch (fetchErr) {
            console.warn("Backend user creation offline, saving locally:", fetchErr);
        }

        state.users.push({ username: u, password: p, coins: 0, testsDone: 0, quizAttempts: {}, purchased: [] });
        saveUsers();
        renderAdminUsers();
        renderLeaderboard();
        document.getElementById('user-modal').style.display = 'none';
        e.target.reset();
        err.style.display = 'none';
        showToast("Yangi foydalanuvchi qo'shildi! 👤", "success");
    });

    // Quiz Form Submit (Admin)
    document.getElementById('quiz-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('quiz-title').value.trim();
        const words = getWordRows();

        if (!title || words.length === 0) {
            alert('Sarlavha va kamida 1 ta so\'z kiriting!');
            return;
        }

        state.quizzes.unshift({ id: Date.now(), title, level: "medium", words });
        saveQuizzes();
        renderAdminQuizzes();
        renderQuizzes();
        document.getElementById('quiz-modal').style.display = 'none';
        showToast("Yangi test saqlandi! 🧠", "success");
    });

    // Product Form Submit (Admin)
    document.getElementById('product-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('prod-title').value.trim();
        const image = document.getElementById('prod-image').value.trim();
        const price = parseInt(document.getElementById('prod-price').value, 10);

        if (!title || !price) return;

        state.products.unshift({
            id: Date.now(),
            title,
            category: "kitob",
            image: image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
            price,
            stock: 15
        });

        saveProducts();
        renderAdminProducts();
        renderShop();
        document.getElementById('product-modal').style.display = 'none';
        e.target.reset();
        showToast("Yangi mahsulot do'konga qo'shildi! 🎁", "success");
    });

    // Coin Form Submit (Admin)
    document.getElementById('coin-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const idx = parseInt(document.getElementById('coin-target-index').value);
        const amount = parseInt(document.getElementById('coin-amount').value);
        const err = document.getElementById('coin-error');

        if (isNaN(amount) || amount <= 0) {
            err.textContent = 'To\'g\'ri miqdor kiriting!';
            err.style.display = 'block';
            return;
        }

        state.users[idx].coins = (state.users[idx].coins || 0) + amount;
        saveUsers();
        renderAdminUsers();
        renderLeaderboard();
        document.getElementById('coin-modal').style.display = 'none';
        showToast(`Foydalanuvchiga +${amount} coin qo'shildi! 🪙`, "success");
    });

    // Close Modals (Event delegation)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-modal-btn')) {
            const modal = e.target.closest('.modal');
            if (modal) modal.style.display = 'none';
        }
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
        }
    });
}

// ==================== 25. INITIALIZATION ====================
function init() {
    initTheme();
    initSound();
    setupAuthTabs();
    setupEventListeners();
    setupFlashcardsEvents();
    setupFaqAccordion();
    setupFeedback();

    renderDailyWisdom();
    renderArticles();
    renderFlashcard();
    renderQuizzes();
    renderLeaderboard();
    renderShop();
    updateUserNav();
    syncUsersFromBackend();

    // Ensure main content is visible by default (Guest friendly!)
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('admin-view').classList.add('view-hidden');

    console.log("✅ Ilm Chashmasi — Yangilangan interaktiv platforma to'liq ishga tushirildi!");
}

// Start
document.addEventListener('DOMContentLoaded', init);
