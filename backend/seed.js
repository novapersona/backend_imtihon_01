const {
    sequelize,
    User,
    Category,
    Article,
    Favorite,
    Quiz,
    QuizWord,
    QuizAttempt,
    Product,
    Order,
    Comment,
} = require("./models");
const bcrypt = require("bcryptjs");

async function seed() {
    try {
        console.log("Ma'lumotlar bazasi sinxronlanmoqda...");
        await sequelize.sync({ force: true });
        console.log("Jadvallar tozalandi va qayta yaratildi.");

        // 1. Users
        console.log("1. Foydalanuvchilar (Users) yaratilmoqda...");
        const adminPassword = await bcrypt.hash("dreambig@!", 10);
        const userPassword = await bcrypt.hash("user123", 10);

        const admin = await User.create({
            username: "ADMIN",
            email: "admin@ilmchashmasi.uz",
            password: adminPassword,
            role: "admin",
            coins: 100,
        });

        const user1 = await User.create({
            username: "nodir_bek",
            email: "nodir@example.com",
            password: userPassword,
            role: "user",
            coins: 25,
        });

        const user2 = await User.create({
            username: "dilshod",
            email: "dilshod@example.com",
            password: userPassword,
            role: "user",
            coins: 15,
        });

        const user3 = await User.create({
            username: "madina",
            email: "madina@example.com",
            password: userPassword,
            role: "user",
            coins: 30,
        });

        // 2. Categories
        console.log("2. Kategoriyalar (Categories) yaratilmoqda...");
        const cat1 = await Category.create({
            name: "Ilm-ma'rifat",
            description: "Ilm olish fazilatlari va yangi bilimlarga oid maqolalar",
            icon: "fas fa-book-open",
        });

        const cat2 = await Category.create({
            name: "Kitobxonlik",
            description: "Kitob mutolaasi, tavsiyalar va sharhlar",
            icon: "fas fa-book",
        });

        const cat3 = await Category.create({
            name: "Arab tili",
            description: "Arab tili darslari, grammatika va lug'at",
            icon: "fas fa-language",
        });

        const cat4 = await Category.create({
            name: "Shaxsiy rivojlanish",
            description: "Vaqtni boshqarish, odatlar va rivojlanish",
            icon: "fas fa-brain",
        });

        // 3. Articles
        console.log("3. Maqolalar (Articles) yaratilmoqda...");
        const art1 = await Article.create({
            title: "Ilm o'rganishning 5 ta foydasi",
            content: "Ilm o'rganish insonning dunyoqarashini kengaytiradi, unga yangi imkoniyatlar yaratadi va jamiyatda o'z o'rnini topishga yordam beradi. 1. Fikrni charxlaydi. 2. Muammolarni yechish qobiliyatini oshiradi. 3. O'ziga bo'lgan ishonchni mustahkamlaydi. 4. Qimmatli bilimlarni boshqalar bilan ulashish imkonini beradi. 5. Insoniyat kelajagiga hissa qo'shadi.",
            image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1173",
            views_count: 142,
            author_id: admin.id,
            category_id: cat1.id,
        });

        const art2 = await Article.create({
            title: "Kitob mutolaasi - ruh ozig'i",
            content: "Kitob o'qish nafaqat bilim beradi, balki insonning ruhiy olamini ham boyitadi. Tadqiqotlarga ko'ra, kuniga 15 daqiqa kitob o'qish stressni sezilarli darajada kamaytiradi. Kitoblar orqali siz turli davrlarga sayohat qilasiz va buyuk mutafakkirlar tafakkuri bilan oshno bo'lasiz.",
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1174",
            views_count: 98,
            author_id: admin.id,
            category_id: cat2.id,
        });

        const art3 = await Article.create({
            title: "Arab tili grammatikasiga kirish",
            content: "Arab tilida so'zlar uch asosiy guruhga bo'linadi: Ism (ism), Fe'l (fe'l) va Harf (yordamchi so'zlar). Arab tilini o'rganish qiyin emas, buning uchun kunlik muntazam mashqlar va lug'at boyligini oshirish zarur.",
            image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1074",
            views_count: 215,
            author_id: admin.id,
            category_id: cat3.id,
        });

        const art4 = await Article.create({
            title: "Taym-menejment: Vaqtni to'g'ri rejalashtirish",
            content: "Kunni ertalabdan rejalashtirish ish unumdorligini 40% ga oshiradi. Pomodoro texnikasi, ustuvorliklar matritsasi va chalg'ituvchi omillarni cheklash muvaffaqiyat garovidir.",
            image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1168",
            views_count: 67,
            author_id: user1.id,
            category_id: cat4.id,
        });

        const art5 = await Article.create({
            title: "Sun'iy intellekt va zamonaviy ta'lim",
            content: "Sun'iy intellekt ta'lim sohasida inqilobiy o'zgarishlarni amalga oshirmoqda. Shaxsiylashtirilgan ta'lim dasturlari, avtomatlashtirilgan baholash tizimlari va interaktiv o'qituvchi yordamchilari o'quv jarayonini yanada samarali va qiziqarli qilmoqda.",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1170",
            views_count: 15,
            author_id: admin.id,
            category_id: cat1.id,
        });

        // 4. Favorites (Saralanganlar - key requested entity!)
        console.log("4. Saralanganlar (Favorites) yaratilmoqda...");
        await Favorite.bulkCreate([
            { user_id: user1.id, article_id: art1.id },
            { user_id: user1.id, article_id: art3.id },
            { user_id: user2.id, article_id: art1.id },
            { user_id: user3.id, article_id: art2.id },
            { user_id: user3.id, article_id: art4.id },
        ]);

        // 5. Quizzes
        console.log("5. Testlar (Quizzes) yaratilmoqda...");
        const quiz1 = await Quiz.create({
            title: "1-dars: Kundalik zaruriy so'zlar",
            description: "Eng ko'p ishlatiladigan arabcha so'zlar va ularning o'zbekcha tarjimasi",
            reward_coins: 1,
        });

        const quiz2 = await Quiz.create({
            title: "2-dars: Tabiat va Atrof-muhit",
            description: "Tabiat hodisalari va osmon jismlari nomlari",
            reward_coins: 1,
        });

        const quiz3 = await Quiz.create({
            title: "3-dars: Oila va Qarindoshlar",
            description: "Arab tilida oila a'zolari va qarindoshlik nomlari",
            reward_coins: 1,
        });

        // 6. QuizWords
        console.log("6. Test so'zlari (QuizWords) yaratilmoqda...");
        await QuizWord.bulkCreate([
            {
                quiz_id: quiz1.id,
                arabic: "كِتَابٌ",
                uzbek: "Kitob",
                wrong_opt1: "Qalam",
                wrong_opt2: "Daftar",
                wrong_opt3: "Parta",
            },
            {
                quiz_id: quiz1.id,
                arabic: "قَلَمٌ",
                uzbek: "Qalam",
                wrong_opt1: "Kitob",
                wrong_opt2: "Doska",
                wrong_opt3: "Stul",
            },
            {
                quiz_id: quiz1.id,
                arabic: "بَابٌ",
                uzbek: "Eshik",
                wrong_opt1: "Deraza",
                wrong_opt2: "Devor",
                wrong_opt3: "Xona",
            },
            {
                quiz_id: quiz1.id,
                arabic: "مَدْرَسَةٌ",
                uzbek: "Maktab",
                wrong_opt1: "Masjid",
                wrong_opt2: "Kutubxona",
                wrong_opt3: "Bozor",
            },
            {
                quiz_id: quiz1.id,
                arabic: "طَالِبٌ",
                uzbek: "Talaba / O'quvchi",
                wrong_opt1: "O'qituvchi",
                wrong_opt2: "Shifokor",
                wrong_opt3: "Muhandis",
            },
            // Quiz 2
            {
                quiz_id: quiz2.id,
                arabic: "شَمْسٌ",
                uzbek: "Quyosh",
                wrong_opt1: "Oy",
                wrong_opt2: "Yulduz",
                wrong_opt3: "Bulut",
            },
            {
                quiz_id: quiz2.id,
                arabic: "قَمَرٌ",
                uzbek: "Oy",
                wrong_opt1: "Quyosh",
                wrong_opt2: "Daryo",
                wrong_opt3: "Tog'",
            },
            {
                quiz_id: quiz2.id,
                arabic: "مَاءٌ",
                uzbek: "Suv",
                wrong_opt1: "Olov",
                wrong_opt2: "Tuproq",
                wrong_opt3: "Havo",
            },
            // Quiz 3
            {
                quiz_id: quiz3.id,
                arabic: "أَبٌ",
                uzbek: "Ota",
                wrong_opt1: "Ona",
                wrong_opt2: "Aka",
                wrong_opt3: "Opa",
            },
            {
                quiz_id: quiz3.id,
                arabic: "أُمٌّ",
                uzbek: "Ona",
                wrong_opt1: "Ota",
                wrong_opt2: "Singil",
                wrong_opt3: "Xola",
            },
            {
                quiz_id: quiz3.id,
                arabic: "أَخٌ",
                uzbek: "Aka / Uka",
                wrong_opt1: "Opa",
                wrong_opt2: "Tog'a",
                wrong_opt3: "Bobo",
            },
            {
                quiz_id: quiz3.id,
                arabic: "أُخْتٌ",
                uzbek: "Opa / Singil",
                wrong_opt1: "Aka",
                wrong_opt2: "Amaki",
                wrong_opt3: "Ona",
            },
        ]);

        // 7. QuizAttempts
        console.log("7. Test natijalari (QuizAttempts) yaratilmoqda...");
        await QuizAttempt.bulkCreate([
            {
                user_id: user1.id,
                quiz_id: quiz1.id,
                score: 5,
                total_questions: 5,
                earned_coins: 5,
            },
            {
                user_id: user3.id,
                quiz_id: quiz2.id,
                score: 3,
                total_questions: 3,
                earned_coins: 3,
            },
        ]);

        // 8. Products
        console.log("8. Mahsulotlar (Products) yaratilmoqda...");
        const prod1 = await Product.create({
            title: "Ajoyib Bloknot va Qalam to'plami",
            description: "Chiroyli charm muqovali kundalik daftari va qalam",
            image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=400",
            price: 15,
            stock: 20,
        });

        const prod2 = await Product.create({
            title: "Arab tili lug'at kitobi",
            description: "10 000 ta eng ko'p qo'llaniladigan so'zlar lug'ati",
            image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400",
            price: 25,
            stock: 12,
        });

        const prod3 = await Product.create({
            title: "Ilm Chashmasi Termos Krujkasi",
            description: "Sifatli issiq saqlovchi metall termos",
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400",
            price: 35,
            stock: 8,
        });

        const prod4 = await Product.create({
            title: "Elektron Tasbeh",
            description: "Qulay va zamonaviy raqamli hisoblagich",
            image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=400",
            price: 10,
            stock: 30,
        });

        // 9. Orders
        console.log("9. Buyurtmalar (Orders) yaratilmoqda...");
        await Order.bulkCreate([
            {
                user_id: user1.id,
                product_id: prod4.id,
                price: prod4.price,
                status: "completed",
            },
            {
                user_id: user2.id,
                product_id: prod1.id,
                price: prod1.price,
                status: "pending",
            },
            {
                user_id: user3.id,
                product_id: prod2.id,
                price: prod2.price,
                status: "pending",
            },
        ]);

        // 10. Comments
        console.log("10. Izohlar (Comments) yaratilmoqda...");
        await Comment.bulkCreate([
            {
                user_id: user1.id,
                article_id: art1.id,
                text: "Juda foydali maqola ekan, muallifga katta rahmat!",
            },
            {
                user_id: user3.id,
                article_id: art2.id,
                text: "Kitob mutolaasi haqiqatan ham inson qalbini orom oldiradi va tafakkurni o'stiradi.",
            },
            {
                user_id: user2.id,
                article_id: art3.id,
                text: "Arab tili darslarini davom ettirishingizni so'rab qolamiz!",
            },
        ]);

        console.log("\n=======================================================");
        console.log("BARCHA 10 TA JADVALGA MA'LUMOTLAR MUVAFFAQIYATLI YOZILDI!");
        console.log("=======================================================");
        console.log("1. Users (Foydalanuvchilar)");
        console.log("2. Categories (Kategoriyalar)");
        console.log("3. Articles (Maqolalar)");
        console.log("4. Favorites (Saralanganlar) -> User va Maqola bog'lanishi");
        console.log("5. Quizzes (Testlar)");
        console.log("6. QuizWords (Test so'zlari/savollari)");
        console.log("7. QuizAttempts (Foydalanuvchilarning test natijalari)");
        console.log("8. Products (Do'kon mahsulotlari)");
        console.log("9. Orders (Xaridlar / Buyurtmalar)");
        console.log("10. Comments (Maqolalarga izohlar)");
        console.log("=======================================================\n");

        process.exit(0);
    } catch (err) {
        console.error("Xatolik yuz berdi:", err);
        process.exit(1);
    }
}

seed();
