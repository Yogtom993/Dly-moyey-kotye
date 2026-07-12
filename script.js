document.addEventListener('DOMContentLoaded', () => {
    const playerPanel = document.getElementById('player-panel');
    const playlistMenu = document.getElementById('playlist-menu');
    
    if (playerPanel) playerPanel.classList.add('hidden');
    if (playlistMenu) playlistMenu.classList.add('hidden');
});

// === ЗОРЯНЕ НЕБО ТА ПАДАЮЧІ ЗІРКИ ===
const starContainer = document.getElementById('starry-background');
if (starContainer) {
    const starsCount = Math.floor(Math.random() * 90 + 110);
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = (Math.random() * 2 + 1) + 'px';
        star.style.width = size;
        star.style.height = size;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = (Math.random() * 5) + 's';
        starContainer.appendChild(star);
    }

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        starContainer.style.transform = `scale(1.05) translate(${-x}px, ${-y}px)`;
        
        if (Math.random() > 0.5) {
            const cStar = document.createElement('div');
            cStar.classList.add('cursor-star');
            cStar.style.left = (e.pageX - 3) + 'px';
            cStar.style.top = (e.pageY - 3) + 'px';
            document.body.appendChild(cStar);
            setTimeout(() => cStar.remove(), 600);
        }
    });

    const allWishes = [
        "Твое желание обязательно сбудется ✨", "Я безумно тебя люблю, котя ❤️", "Ты успела поймать! 🥰", "Загадывай скорее! 🌠",
        "Моя умничка 😘", "Расстояние ничего не значит 🌌", "Уже скучаю по тебе...", "Ты — моё лучшее приключение 🎮",
        "1000 поцелуев отправлены к тебе! 💋", "Ты самая-самая! 💜", "Думаю о тебе прямо сейчас...", "Обожаю твой голос 🎧",
        "Мы со всем справимся 🤞", "Спасибо, что ты у меня есть", "Крепко-крепко обнимаю! 🤗"
    ];

    let availableWishes = [...allWishes];

    function createShootingStars() {
        const count = Math.floor(Math.random() * 3) + 2; 
        for(let i = 0; i < count; i++) {
            const shStar = document.createElement('div');
            shStar.classList.add('shooting-star');
            shStar.style.left = (Math.random() * 60 + 40) + '%';
            shStar.style.top = (Math.random() * 30) + '%';
            shStar.style.animationDuration = (Math.random() * 1.2 + 0.8) + 's';
            shStar.style.animationDelay = (Math.random() * 2) + 's';
            
            shStar.addEventListener('click', (e) => {
                e.stopPropagation(); 
                shStar.remove(); 
                if (availableWishes.length === 0) availableWishes = [...allWishes];
                const randomIndex = Math.floor(Math.random() * availableWishes.length);
                const selectedWish = availableWishes.splice(randomIndex, 1)[0];
                
                const wishMsg = document.createElement('div');
                wishMsg.textContent = selectedWish;
                wishMsg.style.cssText = `
                    position: absolute; left: ${e.pageX}px; top: ${e.pageY - 10}px; color: #ff6fa8; font-size: 15px; font-weight: bold; pointer-events: none; z-index: 10000; text-shadow: 0 0 10px rgba(255, 111, 168, 0.8); opacity: 1; transform: translate(-50%, -50%); transition: all 1.5s ease-out;
                `;
                document.body.appendChild(wishMsg);
                setTimeout(() => { wishMsg.style.top = (e.pageY - 60) + 'px'; wishMsg.style.opacity = '0'; }, 10);
                setTimeout(() => wishMsg.remove(), 1500);
            });
            starContainer.appendChild(shStar);
            setTimeout(() => shStar.remove(), 4000);
        }
    }
    setInterval(createShootingStars, 6000);
}

// === ПАСХАЛКИ (КЛІКИ ПО СЕРЦЮ ТА ВВІД СЛОВА) ===
const mainHeart = document.querySelector('.heart');
if (mainHeart) {
    let hClicks = 0;
    mainHeart.addEventListener('click', () => {
        hClicks++;
        if (hClicks === 10) {
            const msg = document.createElement('div');
            msg.textContent = "Я всё ещё люблю тебя ❤️";
            msg.style.cssText = 'position:absolute;top:10%;left:50%;transform:translateX(-50%);color:#ff6fa8;font-size:18px;z-index:100;opacity:0;transition:opacity 1s;';
            document.body.appendChild(msg);
            setTimeout(() => msg.style.opacity = '1', 10);
            setTimeout(() => { msg.style.opacity = '0'; setTimeout(() => msg.remove(), 1000); }, 3000);
            hClicks = 0;
        }
    });
}

let secWord = "";
document.addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    if (["k", "o", "t", "y", "a"].includes(k)) {
        secWord += k;
        if (secWord.endsWith("kotya")) {
            const ovr = document.createElement('div');
            ovr.textContent = "✨ Секретный код активирован! 1000 поцелуев отправляются к тебе! 💖 ✨";
            ovr.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(139,92,246,0.95);color:#fff;padding:12px 24px;border-radius:25px;box-shadow:0 0 25px rgba(139,92,246,0.7);z-index:10000;font-size:14px;text-align:center;opacity:0;transition:opacity 0.4s;';
            document.body.appendChild(ovr);
            setTimeout(() => ovr.style.opacity = '1', 10);
            setTimeout(() => { ovr.style.opacity = '0'; setTimeout(() => ovr.remove(), 400); }, 4500);
            secWord = "";
        }
    } else { 
        secWord = ""; 
    }
});

// === МУЗИЧНИЙ ПЛЕЄР ===
const bgMusic = document.getElementById('bg-music');
const vinylCenter = document.getElementById('vinyl-center');
const seekBar = document.getElementById('seek-bar');
const timeDisplay = document.getElementById('time-display');
const playerPanel = document.getElementById('player-panel');
const mainMusicBtn = document.getElementById('main-music-btn');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevTrackBtn = document.getElementById('prev-track-btn');
const nextTrackBtn = document.getElementById('next-track-btn');
const plBtn = document.getElementById('playlist-btn');
const plMenu = document.getElementById('playlist-menu');
const plList = document.getElementById('playlist-list');
const vinyl = document.getElementById('vinyl');

let playlist = [
    { src: 'music/track1.mp3', cover: 'img/cover1.jpg', title: 'Cold Siemens', artist: 'Pharaoh', album: 'Сингл' },
    { src: 'music/track2.mp3', cover: 'img/cover2.jpg', title: '9 жизней', artist: 'Pharaoh', album: 'Сингл' },
    { src: 'music/track3.mp3', cover: 'img/cover3.jpg', title: 'He\'s My Man', artist: 'Luvcat', album: 'Сингл' },
    { src: 'music/track4.mp3', cover: 'img/cover4.jpg', title: 'Лиза', artist: 'Фейс', album: 'Сингл' },
    { src: 'music/track5.mp3', cover: 'img/cover5.jpg', title: 'Глаза не врут', artist: 'Кореш', album: 'Сингл' }
];

const secretPlaylist = [
{ src: 'music/10-13/10 13   PHARAOH.mp3', cover: 'music/10-13/cover.jpg', title: '10 13', artist: 'PHARAOH', album: '10-13' },
{ src: 'music/10-13/SUPERIOR.CAT.PROTEUS – Omega (feat. Pharaoh) (Remix).m4a', cover: 'music/10-13/cover.jpg', title: 'Omega (Remix)', artist: 'SUPERIOR.CAT.PROTEUS feat. PHARAOH', album: '10-13' },
{ src: 'music/10-13/Бóльшая Цель.m4a', cover: 'music/10-13/cover.jpg', title: 'Бóльшая Цель', artist: 'PHARAOH', album: '10-13' },
{ src: 'music/10-13/Бензобак (feat. JEEMBO).m4a', cover: 'music/10-13/cover.jpg', title: 'Бензобак', artist: 'PHARAOH feat. JEEMBO', album: '10-13' },
{ src: 'music/10-13/Для Насилия.m4a', cover: 'music/10-13/cover.jpg', title: 'Для Насилия', artist: 'PHARAOH', album: '10-13' },
{ src: 'music/10-13/Добро Пожаловать На Луну   PHARAOH.mp3', cover: 'music/10-13/cover.jpg', title: 'Добро Пожаловать На Луну', artist: 'PHARAOH', album: '10-13' },
{ src: 'music/10-13/Запах Лилий   PHARAOH.mp3', cover: 'music/10-13/cover.jpg', title: 'Запах Лилий', artist: 'PHARAOH', album: '10-13' },
{ src: 'music/10-13/Москва (Не Про).m4a', cover: 'music/10-13/cover.jpg', title: 'Москва (Не Про)', artist: 'PHARAOH', album: '10-13' },
{ src: 'music/10-13/Москва 2.m4a', cover: 'music/10-13/cover.jpg', title: 'Москва 2', artist: 'PHARAOH', album: '10-13' },
{ src: 'music/10-13/На Крышах   PHARAOH.mp3', cover: 'music/10-13/cover.jpg', title: 'На Крышах', artist: 'PHARAOH', album: '10-13' },
{ src: 'music/10-13/На Убийство (Ради Тебя)   PHARAOH.mp3', cover: 'music/10-13/cover.jpg', title: 'На Убийство (Ради Тебя)', artist: 'PHARAOH', album: '10-13' },
{ src: 'music/10-13/Не По-Христиански (Bonus).m4a', cover: 'music/10-13/cover.jpg', title: 'Не По-Христиански (Bonus)', artist: 'PHARAOH', album: '10-13' },
{ src: 'music/10-13/НЛО   PHARAOH.mp3', cover: 'music/10-13/cover.jpg', title: 'НЛО', artist: 'PHARAOH', album: '10-13' },
{ src: 'music/10-13/Родная Душа   PHARAOH.mp3', cover: 'music/10-13/cover.jpg', title: 'Родная Душа', artist: 'PHARAOH', album: '10-13' },
{ src: 'music/10-13/Рок Стар Sh.m4a', cover: 'music/10-13/cover.jpg', title: 'Рок Стар Sh', artist: 'PHARAOH', album: '10-13' },
{ src: 'music/10-13/Своя У Каждого   PHARAOH.mp3', cover: 'music/10-13/cover.jpg', title: 'Своя У Каждого', artist: 'PHARAOH', album: '10-13' },
{ src: 'music/10-13/Солнце (Bonus).m4a', cover: 'music/10-13/cover.jpg', title: 'Солнце (Bonus)', artist: 'PHARAOH', album: '10-13' },
{ src: 'music/10-13/Танцы На Останках   PHARAOH.mp3', cover: 'music/10-13/cover.jpg', title: 'Танцы На Останках', artist: 'PHARAOH', album: '10-13' },
{ src: 'music/10-13/Факты.m4a', cover: 'music/10-13/cover.jpg', title: 'Факты', artist: 'PHARAOH', album: '10-13' },
{ src: 'music/10-13/Чисто Символически.m4a', cover: 'music/10-13/cover.jpg', title: 'Чисто Символически', artist: 'PHARAOH', album: '10-13' },
{ src: 'music/Dolor/PHARAOH - Cold Siemens.mp3', cover: 'music/Dolor/cover.jpg', title: 'Cold Siemens', artist: 'PHARAOH', album: 'Dolor' },
{ src: 'music/Dolor/PHARAOH - Беги от меня.mp3', cover: 'music/Dolor/cover.jpg', title: 'Беги от меня', artist: 'PHARAOH', album: 'Dolor' },
{ src: 'music/Dolor/PHARAOH - В ванной.mp3', cover: 'music/Dolor/cover.jpg', title: 'В ванной', artist: 'PHARAOH', album: 'Dolor' },
{ src: 'music/Dolor/PHARAOH - Голое дерево.mp3', cover: 'music/Dolor/cover.jpg', title: 'Голое дерево', artist: 'PHARAOH', album: 'Dolor' },
{ src: 'music/Dolor/PHARAOH - Идол.mp3', cover: 'music/Dolor/cover.jpg', title: 'Идол', artist: 'PHARAOH', album: 'Dolor' },
{ src: 'music/Dolor/PHARAOH - Клуб 18. До тла.mp3', cover: 'music/Dolor/cover.jpg', title: 'Клуб 18. До тла', artist: 'PHARAOH', album: 'Dolor' },
{ src: 'music/Dolor/PHARAOH - Клуб 18. Начало.mp3', cover: 'music/Dolor/cover.jpg', title: 'Клуб 18. Начало', artist: 'PHARAOH', album: 'Dolor' },
{ src: 'music/Dolor/PHARAOH - Козловский.mp3', cover: 'music/Dolor/cover.jpg', title: 'Козловский', artist: 'PHARAOH', album: 'Dolor' },
{ src: 'music/Dolor/PHARAOH - На твоём теле.mp3', cover: 'music/Dolor/cover.jpg', title: 'На твоём теле', artist: 'PHARAOH', album: 'Dolor' },
{ src: 'music/Dolor/PHARAOH - Новая эра.mp3', cover: 'music/Dolor/cover.jpg', title: 'Новая эра', artist: 'PHARAOH', album: 'Dolor' },
{ src: 'music/Dolor/PHARAOH - Передай привет.mp3', cover: 'music/Dolor/cover.jpg', title: 'Передай привет', artist: 'PHARAOH', album: 'Dolor' },
{ src: 'music/Dolor/PHARAOH - Пожар.mp3', cover: 'music/Dolor/cover.jpg', title: 'Пожар', artist: 'PHARAOH', album: 'Dolor' },
{ src: 'music/Dolor/PHARAOH feat. Acid Drop King - RUSTRELL.mp3', cover: 'music/Dolor/cover.jpg', title: 'RUSTRELL', artist: 'PHARAOH feat. Acid Drop King', album: 'Dolor' },
{ src: 'music/Dolor/PHARAOH feat. Mnogoznaal - Пекло.mp3', cover: 'music/Dolor/cover.jpg', title: 'Пекло', artist: 'PHARAOH feat. Mnogoznaal', album: 'Dolor' },
{ src: 'music/Dolor/PHARAOH feat. Superior.cat.proteus. - Невыносимая.mp3', cover: 'music/Dolor/cover.jpg', title: 'Невыносимая', artist: 'PHARAOH feat. Superior.cat.proteus', album: 'Dolor' },
{ src: 'music/Million Dollar Depression/PHARAOH - 1 из Легенд.mp3', cover: 'music/Million Dollar Depression/cover.jpg', title: '1 из Легенд', artist: 'PHARAOH', album: 'Million Dollar Depression' },
{ src: 'music/Million Dollar Depression/PHARAOH - Route 333 OST.mp3', cover: 'music/Million Dollar Depression/cover.jpg', title: 'Route 333 OST', artist: 'PHARAOH', album: 'Million Dollar Depression' },
{ src: 'music/Million Dollar Depression/PHARAOH - Silence !.mp3', cover: 'music/Million Dollar Depression/cover.jpg', title: 'Silence !', artist: 'PHARAOH', album: 'Million Dollar Depression' },
{ src: 'music/Million Dollar Depression/PHARAOH - The Real Unplugged (Acceptance of Darkne.mp3', cover: 'music/Million Dollar Depression/cover.jpg', title: 'The Real Unplugged (Acceptance of Darkness)', artist: 'PHARAOH', album: 'Million Dollar Depression' },
{ src: 'music/Million Dollar Depression/PHARAOH - Во Имя Тьмы.mp3', cover: 'music/Million Dollar Depression/cover.jpg', title: 'Во Имя Тьмы', artist: 'PHARAOH', album: 'Million Dollar Depression' },
{ src: 'music/Million Dollar Depression/PHARAOH - Всему Свое Время.mp3', cover: 'music/Million Dollar Depression/cover.jpg', title: 'Всему Свое Время', artist: 'PHARAOH', album: 'Million Dollar Depression' },
{ src: 'music/Million Dollar Depression/PHARAOH - ДНМП.mp3', cover: 'music/Million Dollar Depression/cover.jpg', title: 'ДНМП', artist: 'PHARAOH', album: 'Million Dollar Depression' },
{ src: 'music/Million Dollar Depression/PHARAOH - Нет Сердца.mp3', cover: 'music/Million Dollar Depression/cover.jpg', title: 'Нет Сердца', artist: 'PHARAOH', album: 'Million Dollar Depression' },
{ src: 'music/Million Dollar Depression/PHARAOH - Ода Сочиненная Изнанкой.mp3', cover: 'music/Million Dollar Depression/cover.jpg', title: 'Ода Сочиненная Изнанкой', artist: 'PHARAOH', album: 'Million Dollar Depression' },
{ src: 'music/Million Dollar Depression/PHARAOH - Перед Смертью Все Равны.mp3', cover: 'music/Million Dollar Depression/cover.jpg', title: 'Перед Смертью Все Равны', artist: 'PHARAOH', album: 'Million Dollar Depression' },
{ src: 'music/Million Dollar Depression/PHARAOH - Печаль Cо Знаком 8.mp3', cover: 'music/Million Dollar Depression/cover.jpg', title: 'Печаль Cо Знаком 8', artist: 'PHARAOH', album: 'Million Dollar Depression' },
{ src: 'music/Million Dollar Depression/PHARAOH - Эми.mp3', cover: 'music/Million Dollar Depression/cover.jpg', title: 'Эми', artist: 'PHARAOH', album: 'Million Dollar Depression' },
{ src: 'music/Million Dollar Depression/PHARAOH feat. 39 - Рискк.mp3', cover: 'music/Million Dollar Depression/cover.jpg', title: 'Рискк', artist: 'PHARAOH feat. 39', album: 'Million Dollar Depression' },
{ src: 'music/Million Dollar Depression/PHARAOH feat. 39 - Судный День.mp3', cover: 'music/Million Dollar Depression/cover.jpg', title: 'Судный День', artist: 'PHARAOH feat. 39', album: 'Million Dollar Depression' },
{ src: 'music/Million Dollar Depression/PHARAOH feat. noa - Никогда Опять.mp3', cover: 'music/Million Dollar Depression/cover.jpg', title: 'Никогда Опять', artist: 'PHARAOH feat. noa', album: 'Million Dollar Depression' },
{ src: 'music/Paywall/PHARAOH, Boulevard Depo - Tearz.mp3', cover: 'music/Paywall/cover.jpg', title: 'Tearz', artist: 'PHARAOH, Boulevard Depo', album: 'Paywall' },
{ src: 'music/Paywall/PHARAOH, Boulevard Depo - Tekken Thug.mp3', cover: 'music/Paywall/cover.jpg', title: 'Tekken Thug', artist: 'PHARAOH, Boulevard Depo', album: 'Paywall' },
{ src: 'music/Paywall/PHARAOH, Boulevard Depo - Zatoichi.mp3', cover: 'music/Paywall/cover.jpg', title: 'Zatoichi', artist: 'PHARAOH, Boulevard Depo', album: 'Paywall' },
{ src: 'music/Paywall/PHARAOH, Boulevard Depo - Ведьмин дом.mp3', cover: 'music/Paywall/cover.jpg', title: 'Ведьмин дом', artist: 'PHARAOH, Boulevard Depo', album: 'Paywall' },
{ src: 'music/Paywall/PHARAOH, Boulevard Depo feat. I61 - POKENAV.mp3', cover: 'music/Paywall/cover.jpg', title: 'POKENAV', artist: 'PHARAOH, Boulevard Depo feat. i61', album: 'Paywall' },
{ src: 'music/Paywall/PHARAOH,_Boulevard_Depo_feat_Jeembo_Внутренност.mp3', cover: 'music/Paywall/cover.jpg', title: 'Внутренности', artist: 'PHARAOH, Boulevard Depo feat. Jeembo', album: 'Paywall' },
{ src: 'music/PHILARMONIA/PHARAOH - Белые Нити (Незабываема).mp3', cover: 'music/PHILARMONIA/cover.jpg', title: 'Белые Нити (Незабываема)', artist: 'PHARAOH', album: 'PHILARMONIA' },
{ src: 'music/PHILARMONIA/PHARAOH - Вечеринка В Холмах.mp3', cover: 'music/PHILARMONIA/cover.jpg', title: 'Вечеринка В Холмах', artist: 'PHARAOH', album: 'PHILARMONIA' },
{ src: 'music/PHILARMONIA/PHARAOH - Колыбель На Судный День.mp3', cover: 'music/PHILARMONIA/cover.jpg', title: 'Колыбель На Судный День', artist: 'PHARAOH', album: 'PHILARMONIA' },
{ src: 'music/PHILARMONIA/PHARAOH - Океан Бассейн Вид.mp3', cover: 'music/PHILARMONIA/cover.jpg', title: 'Океан Бассейн Вид', artist: 'PHARAOH', album: 'PHILARMONIA' },
{ src: 'music/PHILARMONIA/PHARAOH - Соната Ей.mp3', cover: 'music/PHILARMONIA/cover.jpg', title: 'Соната Ей', artist: 'PHARAOH', album: 'PHILARMONIA' },
{ src: 'music/PHILARMONIA/PHARAOH - Я Потратил Ночь На Поиск.mp3', cover: 'music/PHILARMONIA/cover.jpg', title: 'Я Потратил Ночь На Поиск', artist: 'PHARAOH', album: 'PHILARMONIA' },
{ src: 'music/PHILARMONIA/PHARAOH - Я Смотрел Как Ты Танцуешь.mp3', cover: 'music/PHILARMONIA/cover.jpg', title: 'Я Смотрел Как Ты Танцуешь', artist: 'PHARAOH', album: 'PHILARMONIA' },
{ src: 'music/PHILARMONIA/PHARAOH feat. Ilya Konoplev - Идиот (feat. Ilya Ko.mp3', cover: 'music/PHILARMONIA/cover.jpg', title: 'Идиот', artist: 'PHARAOH feat. Ilya Konoplev', album: 'PHILARMONIA' },
{ src: 'music/PHILARMONIA/PHARAOH_feat_Dima_Roux_Драгоценный_Металл_feat.mp3', cover: 'music/PHILARMONIA/cover.jpg', title: 'Драгоценный Металл', artist: 'PHARAOH feat. Dima Roux', album: 'PHILARMONIA' },
{ src: 'music/PHILARMONIA/PHARAOH_Кто_Нибудь_Знает,_О_Чем_Эта_Песня.mp3', cover: 'music/PHILARMONIA/cover.jpg', title: 'Кто Нибудь Знает, О Чем Эта Песня', artist: 'PHARAOH', album: 'PHILARMONIA' },
{ src: 'music/PHILARMONIA/PHARAOH_Может_Расскажешь,_Что_Ты_Чувствуешь_Гла.mp3', cover: 'music/PHILARMONIA/cover.jpg', title: 'Может Расскажешь, Что Ты Чувствуешь', artist: 'PHARAOH', album: 'PHILARMONIA' },
{ src: 'music/PHILARMONIA/PHARAOH_Такими,_Как_Сейчас_Время_Гасить_Свечи.mp3', cover: 'music/PHILARMONIA/cover.jpg', title: 'Такими, Как Сейчас Время Гасить Свечи', artist: 'PHARAOH', album: 'PHILARMONIA' },
{ src: 'music/PHLORA/PHARAOH - RAW.mp3', cover: 'music/PHLORA/cover.jpg', title: 'RAW', artist: 'PHARAOH', album: 'PHLORA' },
{ src: 'music/PHLORA/PHARAOH - Листопад.mp3', cover: 'music/PHLORA/cover.jpg', title: 'Листопад', artist: 'PHARAOH', album: 'PHLORA' },
{ src: 'music/PHLORA/PHARAOH - Нет сети.mp3', cover: 'music/PHLORA/cover.jpg', title: 'Нет сети', artist: 'PHARAOH', album: 'PHLORA' },
{ src: 'music/PHLORA/PHARAOH - Ртуть.mp3', cover: 'music/PHLORA/cover.jpg', title: 'Ртуть', artist: 'PHARAOH', album: 'PHLORA' },
{ src: 'music/PHLORA/PHARAOH - Слякоть.mp3', cover: 'music/PHLORA/cover.jpg', title: 'Слякоть', artist: 'PHARAOH', album: 'PHLORA' },
{ src: 'music/PHLORA/PHARAOH - Феникс.mp3', cover: 'music/PHLORA/cover.jpg', title: 'Феникс', artist: 'PHARAOH', album: 'PHLORA' },
{ src: 'music/PHLORA/PHARAOH - Флора.mp3', cover: 'music/PHLORA/cover.jpg', title: 'Флора', artist: 'PHARAOH', album: 'PHLORA' },
{ src: 'music/PHLORA/PHARAOH - Фруктовый.mp3', cover: 'music/PHLORA/cover.jpg', title: 'Фруктовый', artist: 'PHARAOH', album: 'PHLORA' },
{ src: 'music/PHLORA/PHARAOH - Чёрный плащ.mp3', cover: 'music/PHLORA/cover.jpg', title: 'Чёрный плащ', artist: 'PHARAOH', album: 'PHLORA' },
{ src: 'music/PHLORA/PHARAOH feat. Acid Drop King - Digital капотня.mp3', cover: 'music/PHLORA/cover.jpg', title: 'Digital капотня', artist: 'PHARAOH feat. Acid Drop King', album: 'PHLORA' },
{ src: 'music/PHLORA/PHARAOH feat. Ca$$xttx - Бойсбэнд.mp3', cover: 'music/PHLORA/cover.jpg', title: 'Бойсбэнд', artist: 'PHARAOH feat. Ca$$xttx', album: 'PHLORA' },
{ src: 'music/PHLORA/PHARAOH feat. Ca$$xttx - Посейдон.mp3', cover: 'music/PHLORA/cover.jpg', title: 'Посейдон', artist: 'PHARAOH feat. Ca$$xttx', album: 'PHLORA' },
{ src: 'music/PHLORA/PHARAOH feat. I61 - Phlow.iso.mp3', cover: 'music/PHLORA/cover.jpg', title: 'Phlow.iso', artist: 'PHARAOH feat. i61', album: 'PHLORA' },
{ src: 'music/Phosphor/PHARAOH - Вспоминая о светлом.mp3', cover: 'music/Phosphor/cover.jpg', title: 'Вспоминая о светлом', artist: 'PHARAOH', album: 'Phosphor' },
{ src: 'music/Phosphor/PHARAOH - Выродок.mp3', cover: 'music/Phosphor/cover.jpg', title: 'Выродок', artist: 'PHARAOH', album: 'Phosphor' },
{ src: 'music/Phosphor/PHARAOH - Давай останемся дома.mp3', cover: 'music/Phosphor/cover.jpg', title: 'Давай останемся дома', artist: 'PHARAOH', album: 'Phosphor' },
{ src: 'music/Phosphor/PHARAOH - Клюква.mp3', cover: 'music/Phosphor/cover.jpg', title: 'Клюква', artist: 'PHARAOH', album: 'Phosphor' },
{ src: 'music/Phosphor/PHARAOH - ММ.mp3', cover: 'music/Phosphor/cover.jpg', title: 'ММ', artist: 'PHARAOH', album: 'Phosphor' },
{ src: 'music/Phosphor/PHARAOH - Морион.mp3', cover: 'music/Phosphor/cover.jpg', title: 'Морион', artist: 'PHARAOH', album: 'Phosphor' },
{ src: 'music/Phosphor/PHARAOH - Позволив молодости жить.mp3', cover: 'music/Phosphor/cover.jpg', title: 'Позволив молодости жить', artist: 'PHARAOH', album: 'Phosphor' },
{ src: 'music/Phosphor/PHARAOH - Разложение.mp3', cover: 'music/Phosphor/cover.jpg', title: 'Разложение', artist: 'PHARAOH', album: 'Phosphor' },
{ src: 'music/Phosphor/PHARAOH - Сфагнум.mp3', cover: 'music/Phosphor/cover.jpg', title: 'Сфагнум', artist: 'PHARAOH', album: 'Phosphor' },
{ src: 'music/Phosphor/PHARAOH feat. Jeembo - Мой мрак.mp3', cover: 'music/Phosphor/cover.jpg', title: 'Мой мрак', artist: 'PHARAOH feat. Jeembo', album: 'Phosphor' },
{ src: 'music/Phosphor/PHARAOH feat. Techno - Мотая на кисть.mp3', cover: 'music/Phosphor/cover.jpg', title: 'Мотая на кисть', artist: 'PHARAOH feat. Techno', album: 'Phosphor' },
{ src: 'music/Phosphor/PHARAOH feat. Скриптонит - Вальс.mp3', cover: 'music/Phosphor/cover.jpg', title: 'Вальс', artist: 'PHARAOH feat. Скриптонит', album: 'Phosphor' },
{ src: 'music/Phosphor/PHARAOH_feat_Acid_Drop_King_Псы_всегда_попадают.mp3', cover: 'music/Phosphor/cover.jpg', title: 'Псы всегда попадают', artist: 'PHARAOH feat. Acid Drop King', album: 'Phosphor' },
{ src: 'music/Phosphor/PHARAOH_Зачем_ты_это_слушаешь,_выключи.mp3', cover: 'music/Phosphor/cover.jpg', title: 'Зачем ты это слушаешь, выключи', artist: 'PHARAOH', album: 'Phosphor' },
{ src: 'music/Phosphor/PHARAOH_Конечно_оригинал,_заказывал_из_штатов.mp3', cover: 'music/Phosphor/cover.jpg', title: 'Конечно оригинал, заказывал из штатов', artist: 'PHARAOH', album: 'Phosphor' },
{ src: 'music/Phosphor/PHARAOH_Надеюсь_у_тебя_нет_аллергии_на_клубнику.mp3', cover: 'music/Phosphor/cover.jpg', title: 'Надеюсь у тебя нет аллергии на клубнику', artist: 'PHARAOH', album: 'Phosphor' },
{ src: 'music/Phosphor/PHARAOH_Ты,_на_луне,_забери_меня_нах_й_отсюда.mp3', cover: 'music/Phosphor/cover.jpg', title: 'Ты, на луне, забери меня нах й отсюда', artist: 'PHARAOH', album: 'Phosphor' },
{ src: 'music/Phosphor/PHARAOH_Я_помню,_как_мы_сожгли_письма_у_канала.mp3', cover: 'music/Phosphor/cover.jpg', title: 'Я помню, как мы сожгли письма у канала', artist: 'PHARAOH', album: 'Phosphor' },
{ src: 'music/PHREQUENCY/PHARAOH - В Огне.mp3', cover: 'music/PHREQUENCY/cover.jpg', title: 'В Огне', artist: 'PHARAOH', album: 'PHREQUENCY' },
{ src: 'music/PHREQUENCY/PHARAOH - В Прошлых Жизнях.mp3', cover: 'music/PHREQUENCY/cover.jpg', title: 'В Прошлых Жизнях', artist: 'PHARAOH', album: 'PHREQUENCY' },
{ src: 'music/PHREQUENCY/PHARAOH - Взглянем В Глаза Правде.mp3', cover: 'music/PHREQUENCY/cover.jpg', title: 'Взглянем В Глаза Правде', artist: 'PHARAOH', album: 'PHREQUENCY' },
{ src: 'music/PHREQUENCY/PHARAOH - Лазарь.mp3', cover: 'music/PHREQUENCY/cover.jpg', title: 'Лазарь', artist: 'PHARAOH', album: 'PHREQUENCY' },
{ src: 'music/PHREQUENCY/PHARAOH - На Одну Улыбку Больше.mp3', cover: 'music/PHREQUENCY/cover.jpg', title: 'На Одну Улыбку Больше', artist: 'PHARAOH', album: 'PHREQUENCY' },
{ src: 'music/PHREQUENCY/PHARAOH - Пост Фактум.mp3', cover: 'music/PHREQUENCY/cover.jpg', title: 'Пост Фактум', artist: 'PHARAOH', album: 'PHREQUENCY' },
{ src: 'music/PHREQUENCY/PHARAOH - Снайпер.mp3', cover: 'music/PHREQUENCY/cover.jpg', title: 'Снайпер', artist: 'PHARAOH', album: 'PHREQUENCY' },
{ src: 'music/PHREQUENCY/PHARAOH, Ilya Konoplev - Другие Души.mp3', cover: 'music/PHREQUENCY/cover.jpg', title: 'Другие Души', artist: 'PHARAOH, Ilya Konoplev', album: 'PHREQUENCY' },
{ src: 'music/PHREQUENCY/PHARAOH, Ilya Konoplev - Не Могу.mp3', cover: 'music/PHREQUENCY/cover.jpg', title: 'Не Могу', artist: 'PHARAOH, Ilya Konoplev', album: 'PHREQUENCY' },
{ src: 'music/PHREQUENCY/PHARAOH, Ilya Konoplev - Чья Вина.mp3', cover: 'music/PHREQUENCY/cover.jpg', title: 'Чья Вина', artist: 'PHARAOH, Ilya Konoplev', album: 'PHREQUENCY' },
{ src: 'music/PHREQUENCY/PHARAOH, Loc-Dog - Время Вспять.mp3', cover: 'music/PHREQUENCY/cover.jpg', title: 'Время Вспять', artist: 'PHARAOH, Loc-Dog', album: 'PHREQUENCY' },
{ src: 'music/PHUNERAL/PHARAOH - 10 0 фристайл.mp3', cover: 'music/PHUNERAL/cover.jpg', title: '10 0 фристайл', artist: 'PHARAOH', album: 'PHUNERAL' },
{ src: 'music/PHUNERAL/PHARAOH - 1996.mp3', cover: 'music/PHUNERAL/cover.jpg', title: '1996', artist: 'PHARAOH', album: 'PHUNERAL' },
{ src: 'music/PHUNERAL/PHARAOH - RAW 2.mp3', cover: 'music/PHUNERAL/cover.jpg', title: 'RAW 2', artist: 'PHARAOH', album: 'PHUNERAL' },
{ src: 'music/PHUNERAL/PHARAOH - Дефект.mp3', cover: 'music/PHUNERAL/cover.jpg', title: 'Дефект', artist: 'PHARAOH', album: 'PHUNERAL' },
{ src: 'music/PHUNERAL/PHARAOH - Лантана.mp3', cover: 'music/PHUNERAL/cover.jpg', title: 'Лантана', artist: 'PHARAOH', album: 'PHUNERAL' },
{ src: 'music/PHUNERAL/PHARAOH - Мой кайф.mp3', cover: 'music/PHUNERAL/cover.jpg', title: 'Мой кайф', artist: 'PHARAOH', album: 'PHUNERAL' },
{ src: 'music/PHUNERAL/PHARAOH - Омертвение.mp3', cover: 'music/PHUNERAL/cover.jpg', title: 'Омертвение', artist: 'PHARAOH', album: 'PHUNERAL' },
{ src: 'music/PHUNERAL/PHARAOH - Пломбир (Bonus).mp3', cover: 'music/PHUNERAL/cover.jpg', title: 'Пломбир (Bonus)', artist: 'PHARAOH', album: 'PHUNERAL' },
{ src: 'music/PHUNERAL/PHARAOH - Последний трек на стене.mp3', cover: 'music/PHUNERAL/cover.jpg', title: 'Последний трек на стене', artist: 'PHARAOH', album: 'PHUNERAL' },
{ src: 'music/PHUNERAL/PHARAOH - Смарт.mp3', cover: 'music/PHUNERAL/cover.jpg', title: 'Смарт', artist: 'PHARAOH', album: 'PHUNERAL' },
{ src: 'music/PHUNERAL/PHARAOH feat. Big Baby Tape - Шипучка.mp3', cover: 'music/PHUNERAL/cover.jpg', title: 'Шипучка', artist: 'PHARAOH feat. Big Baby Tape', album: 'PHUNERAL' },
{ src: 'music/PHUNERAL/PHARAOH feat. РУБЛЬ - Флешгроб.mp3', cover: 'music/PHUNERAL/cover.jpg', title: 'Флешгроб', artist: 'PHARAOH feat. РУБЛЬ', album: 'PHUNERAL' },
{ src: 'music/PHUNERAL/PHARAOH feat. Сергей Шнуров - Солярис.mp3', cover: 'music/PHUNERAL/cover.jpg', title: 'Солярис', artist: 'PHARAOH feat. Сергей Шнуров', album: 'PHUNERAL' },
{ src: 'music/PHUNERAL/PHARAOH_feat_Noa_Пэрис_Хилтон_хоум_видео.mp3', cover: 'music/PHUNERAL/cover.jpg', title: 'Пэрис Хилтон хоум видео', artist: 'PHARAOH feat. Noa', album: 'PHUNERAL' },
{ src: 'music/PHUNERAL/PHARAOH_Откровение_успешного_человека.mp3', cover: 'music/PHUNERAL/cover.jpg', title: 'Откровение успешного человека', artist: 'PHARAOH', album: 'PHUNERAL' },
{ src: 'music/Pink Phloyd/PHARAOH - Pink Phloyd.mp3', cover: 'music/Pink Phloyd/cover.jpg', title: 'Pink Phloyd', artist: 'PHARAOH', album: 'Pink Phloyd' },
{ src: 'music/Pink Phloyd/PHARAOH - Дико, например.mp3', cover: 'music/Pink Phloyd/cover.jpg', title: 'Дико, например', artist: 'PHARAOH', album: 'Pink Phloyd' },
{ src: 'music/Pink Phloyd/PHARAOH - Лаллипап.mp3', cover: 'music/Pink Phloyd/cover.jpg', title: 'Лаллипап', artist: 'PHARAOH', album: 'Pink Phloyd' },
{ src: 'music/Pink Phloyd/PHARAOH - Мелисса  Моя сука.mp3', cover: 'music/Pink Phloyd/cover.jpg', title: 'Мелисса  Моя сука', artist: 'PHARAOH', album: 'Pink Phloyd' },
{ src: 'music/Pink Phloyd/PHARAOH - Много дел.mp3', cover: 'music/Pink Phloyd/cover.jpg', title: 'Много дел', artist: 'PHARAOH', album: 'Pink Phloyd' },
{ src: 'music/Pink Phloyd/PHARAOH - Одинокая звезда.mp3', cover: 'music/Pink Phloyd/cover.jpg', title: 'Одинокая звезда', artist: 'PHARAOH', album: 'Pink Phloyd' },
{ src: 'music/Pink Phloyd/PHARAOH - Одним целым.mp3', cover: 'music/Pink Phloyd/cover.jpg', title: 'Одним целым', artist: 'PHARAOH', album: 'Pink Phloyd' },
{ src: 'music/Pink Phloyd/PHARAOH - Реквием по эго (Interlude).mp3', cover: 'music/Pink Phloyd/cover.jpg', title: 'Реквием по эго (Interlude)', artist: 'PHARAOH', album: 'Pink Phloyd' },
{ src: 'music/Pink Phloyd/PHARAOH - Спроси моих друзей.mp3', cover: 'music/Pink Phloyd/cover.jpg', title: 'Спроси моих друзей', artist: 'PHARAOH', album: 'Pink Phloyd' },
{ src: 'music/Pink Phloyd/PHARAOH feat. 39, Morty Mort - Школа.mp3', cover: 'music/Pink Phloyd/cover.jpg', title: 'Школа', artist: 'PHARAOH feat. 39, Morty Mort', album: 'Pink Phloyd' },
{ src: 'music/Pink Phloyd/PHARAOH feat. Acid Drop King - Твоё место.mp3', cover: 'music/Pink Phloyd/cover.jpg', title: 'Твоё место', artist: 'PHARAOH feat. Acid Drop King', album: 'Pink Phloyd' },
{ src: 'music/Pink Phloyd/PHARAOH feat. Boulevard Depo - Louis Vuitton Kiss.mp3', cover: 'music/Pink Phloyd/cover.jpg', title: 'Louis Vuitton Kiss', artist: 'PHARAOH feat. Boulevard Depo', album: 'Pink Phloyd' },
{ src: 'music/Pink Phloyd/PHARAOH feat. Mnogoznaal - Без меня.mp3', cover: 'music/Pink Phloyd/cover.jpg', title: 'Без меня', artist: 'PHARAOH feat. Mnogoznaal', album: 'Pink Phloyd' },
{ src: 'music/Pink Phloyd/PHARAOH feat. NOA - Порнозвезда (Remix).mp3', cover: 'music/Pink Phloyd/cover.jpg', title: 'Порнозвезда (Remix)', artist: 'PHARAOH feat. NOA', album: 'Pink Phloyd' },
{ src: 'music/Pink Phloyd/PHARAOH feat. The Chemodan - Проблемы.mp3', cover: 'music/Pink Phloyd/cover.jpg', title: 'Проблемы', artist: 'PHARAOH feat. The Chemodan', album: 'Pink Phloyd' },
{ src: 'music/Rage Mode/PHARAOH, i61 - 1-800-Siemensixone.mp3', cover: 'music/Rage Mode/cover.jpg', title: '1-800-Siemensixone', artist: 'PHARAOH, i61', album: 'Rage Mode' },
{ src: 'music/Rage Mode/PHARAOH, i61 - Call the Ambulance.mp3', cover: 'music/Rage Mode/cover.jpg', title: 'Call the Ambulance', artist: 'PHARAOH, i61', album: 'Rage Mode' },
{ src: 'music/Rage Mode/PHARAOH, i61 - Crackhouse.mp3', cover: 'music/Rage Mode/cover.jpg', title: 'Crackhouse', artist: 'PHARAOH, i61', album: 'Rage Mode' },
{ src: 'music/Rage Mode/PHARAOH, i61 - Empire Strikes Back.mp3', cover: 'music/Rage Mode/cover.jpg', title: 'Empire Strikes Back', artist: 'PHARAOH, i61', album: 'Rage Mode' },
{ src: 'music/Rage Mode/PHARAOH, i61 - Enemy of the State.mp3', cover: 'music/Rage Mode/cover.jpg', title: 'Enemy of the State', artist: 'PHARAOH, i61', album: 'Rage Mode' },
{ src: 'music/Rage Mode/PHARAOH, i61 - From Dusk Till Dawn.mp3', cover: 'music/Rage Mode/cover.jpg', title: 'From Dusk Till Dawn', artist: 'PHARAOH, i61', album: 'Rage Mode' },
{ src: 'music/Rage Mode/PHARAOH, i61 - Rage Mode (Killing Spree).mp3', cover: 'music/Rage Mode/cover.jpg', title: 'Rage Mode (Killing Spree)', artist: 'PHARAOH, i61', album: 'Rage Mode' },
{ src: 'music/REDЯUM/PHARAOH - УБИЙЦА.mp3', cover: 'music/REDЯUM/cover.jpg', title: 'УБИЙЦА', artist: 'PHARAOH', album: 'REDЯUM' },
{ src: 'music/REDЯUM/PHARAOH - УЗЫ МОБА.mp3', cover: 'music/REDЯUM/cover.jpg', title: 'УЗЫ МОБА', artist: 'PHARAOH', album: 'REDЯUM' },
{ src: 'music/REDЯUM/Pharaoh_-_Nikakojj_lyubvi_71173507.mp3', cover: 'music/REDЯUM/cover.jpg', title: 'Nikakojj lyubvi', artist: 'PHARAOH', album: 'REDЯUM' },
{ src: 'music/REDЯUM/Pharaoh_Enfants_Riches_Deprimes_ili_poshel_ty_naui_FrozenGangBeatz.mp3', cover: 'music/REDЯUM/cover.jpg', title: 'Enfants Riches Deprimes ili poshel ty naui', artist: 'PHARAOH, FrozenGangBeatz', album: 'REDЯUM' },
{ src: 'music/REDЯUM/Бентли - PHARAOH  a678q.mp3', cover: 'music/REDЯUM/cover.jpg', title: 'Бентли', artist: 'PHARAOH', album: 'REDЯUM' },
{ src: 'music/REDЯUM/Фул Клип - PHARAOH  a678r.mp3', cover: 'music/REDЯUM/cover.jpg', title: 'Фул Клип', artist: 'PHARAOH', album: 'REDЯUM' },
{ src: 'music/Singles/39_PHARAOH_-_Bljessd.mp3', cover: 'music/Singles/cover.jpg', title: 'Bljessd', artist: 'PHARAOH, 39', album: 'Singles' },
{ src: 'music/Singles/Boulevard_Depo_Coldiemens_-_Otricala_64374714.mp3', cover: 'music/Singles/cover.jpg', title: 'Otricala', artist: 'Boulevard Depo, Cold$iemens', album: 'Singles' },
{ src: 'music/Singles/Boulevard_Depo_x_PHARAOH_-_NO_WAR.mp3', cover: 'music/Singles/cover.jpg', title: 'NO WAR', artist: 'PHARAOH, Boulevard Depo', album: 'Singles' },
{ src: 'music/Singles/Dima Roux feat. PHARAOH - Не Сегодня (feat. PHARAO.mp3', cover: 'music/Singles/cover.jpg', title: 'Не Сегодня', artist: 'Dima Roux feat. PHARAOH', album: 'Singles' },
{ src: 'music/Singles/DOPECLVB_feat._Pharaoh_-_Tamagotchi_(Pesni.CC).mp3', cover: 'music/Singles/cover.jpg', title: 'Tamagotchi', artist: 'DOPECLVB feat. PHARAOH', album: 'Singles' },
{ src: 'music/Singles/DOPECLVB_PHARAOH_-_Ghost.mp3', cover: 'music/Singles/cover.jpg', title: 'Ghost', artist: 'DOPECLVB, PHARAOH', album: 'Singles' },
{ src: 'music/Singles/FD_Vadim_PHARAOH_-_Molekuj.mp3', cover: 'music/Singles/cover.jpg', title: 'Molekuj', artist: 'FD Vadim, PHARAOH', album: 'Singles' },
{ src: 'music/Singles/FD_Vadim_PHARAOH_-_Tuvac.mp3', cover: 'music/Singles/cover.jpg', title: 'Tuvac', artist: 'FD Vadim, PHARAOH', album: 'Singles' },
{ src: 'music/Singles/i61_feat_Basic_Boy_Pharaoh_Boulevard_Depo_FRESH_SOFT.mp3', cover: 'music/Singles/cover.jpg', title: 'FRESH SOFT', artist: 'i61 feat. Basic Boy, PHARAOH, Boulevard Depo', album: 'Singles' },
{ src: 'music/Singles/i61_x_stereo_ryze_feat_pharaoh_-_mne_ochen_veselo_67244280.mp3', cover: 'music/Singles/cover.jpg', title: 'mne ochen veselo', artist: 'i61, stereo ryze feat. PHARAOH', album: 'Singles' },
{ src: 'music/Singles/Loc-Dog, PHARAOH - Лекарство.mp3', cover: 'music/Singles/cover.jpg', title: 'Лекарство', artist: 'Loc-Dog, PHARAOH', album: 'Singles' },
{ src: 'music/Singles/Loc-Dog, PHARAOH - Топь.mp3', cover: 'music/Singles/cover.jpg', title: 'Топь', artist: 'Loc-Dog, PHARAOH', album: 'Singles' },
{ src: 'music/Singles/LSP_-_Bullet_.mp3', cover: 'music/Singles/cover.jpg', title: 'Bullet', artist: 'ЛСП, PHARAOH', album: 'Singles' },
{ src: 'music/Singles/PHARAOH - 404.mp3', cover: 'music/Singles/cover.jpg', title: '404', artist: 'PHARAOH', album: 'Singles' },
{ src: 'music/Singles/PHARAOH - Black Siemens.mp3', cover: 'music/Singles/cover.jpg', title: 'Black Siemens', artist: 'PHARAOH', album: 'Singles' },
{ src: 'music/Singles/PHARAOH - X-Ray.mp3', cover: 'music/Singles/cover.jpg', title: 'X-Ray', artist: 'PHARAOH', album: 'Singles' },
{ src: 'music/Singles/PHARAOH - ООО.mp3', cover: 'music/Singles/cover.jpg', title: 'ООО', artist: 'PHARAOH', album: 'Singles' },
{ src: 'music/Singles/PHARAOH - Халливуд Хоус.mp3', cover: 'music/Singles/cover.jpg', title: 'Халливуд Хоус', artist: 'PHARAOH', album: 'Singles' },
{ src: 'music/Singles/PHARAOH feat. Destroy Lonely - Omega.mp3', cover: 'music/Singles/cover.jpg', title: 'Omega', artist: 'PHARAOH feat. Destroy Lonely', album: 'Singles' },
{ src: 'music/Singles/PHARAOH feat. Mnogoznaal - Акид.mp3', cover: 'music/Singles/cover.jpg', title: 'Акид', artist: 'PHARAOH feat. Mnogoznaal', album: 'Singles' },
{ src: 'music/Singles/PHARAOH – R.I.P..m4a', cover: 'music/Singles/cover.jpg', title: 'R.I.P.', artist: 'PHARAOH', album: 'Singles' },
{ src: 'music/Singles/PHARAOH – Шум.mp3', cover: 'music/Singles/cover.jpg', title: 'Шум', artist: 'PHARAOH', album: 'Singles' },
{ src: 'music/Singles/Pharaoh-RELOADED.mp3', cover: 'music/Singles/cover.jpg', title: 'RELOADED', artist: 'PHARAOH', album: 'Singles' },
{ src: 'music/Singles/Pharaoh_-_LIQUID_DEATH.mp3', cover: 'music/Singles/cover.jpg', title: 'LIQUID DEATH', artist: 'PHARAOH', album: 'Singles' },
{ src: 'music/Singles/pharaoh_feat_-_Bogi_KHranyat_Zlodeev.mp3', cover: 'music/Singles/cover.jpg', title: 'Bogi KHranyat Zlodeev', artist: 'PHARAOH', album: 'Singles' },
{ src: 'music/Singles/PHARAOH_feat_Cold_Hart_-_On_My_Own.mp3', cover: 'music/Singles/cover.jpg', title: 'On My Own', artist: 'PHARAOH feat. Cold Hart', album: 'Singles' },
{ src: 'music/Singles/PHARAOH_Цвет_Золотаmp3.mp3', cover: 'music/Singles/cover.jpg', title: 'Цвет Золота', artist: 'PHARAOH', album: 'Singles' },
{ src: 'music/Singles/Мне плевать - Superior.Cat.Proteus, PHARAOH  4Ebr4.mp3', cover: 'music/Singles/cover.jpg', title: 'Мне плевать', artist: 'Superior.Cat.Proteus, PHARAOH', album: 'Singles' },
{ src: 'music/Кондитерская/PHARAOH, ЛСП - 9 жизней.mp3', cover: 'music/Кондитерская/cover.jpg', title: '9 жизней', artist: 'PHARAOH, ЛСП', album: 'Кондитерская' },
{ src: 'music/Кондитерская/PHARAOH, ЛСП - PiT.mp3', cover: 'music/Кондитерская/cover.jpg', title: 'PiT', artist: 'PHARAOH, ЛСП', album: 'Кондитерская' },
{ src: 'music/Кондитерская/PHARAOH, ЛСП - Золотые рыбки.mp3', cover: 'music/Кондитерская/cover.jpg', title: 'Золотые рыбки', artist: 'PHARAOH, ЛСП', album: 'Кондитерская' },
{ src: 'music/Кондитерская/PHARAOH, ЛСП - Кекс.mp3', cover: 'music/Кондитерская/cover.jpg', title: 'Кекс', artist: 'PHARAOH, ЛСП', album: 'Кондитерская' },
{ src: 'music/Кондитерская/PHARAOH, ЛСП - Неон.mp3', cover: 'music/Кондитерская/cover.jpg', title: 'Неон', artist: 'PHARAOH, ЛСП', album: 'Кондитерская' },
{ src: 'music/Кондитерская/PHARAOH, ЛСП - Порнозвезда.mp3', cover: 'music/Кондитерская/cover.jpg', title: 'Порнозвезда', artist: 'PHARAOH, ЛСП', album: 'Кондитерская' },
{ src: 'music/Плакшери/PHARAOH, Boulevard Depo - 5 минут назад.mp3', cover: 'music/Плакшери/cover.jpg', title: '5 минут назад', artist: 'PHARAOH, Boulevard Depo', album: 'Плакшери' },
{ src: 'music/Плакшери/PHARAOH, Boulevard Depo - Cabernet Sauvignon.mp3', cover: 'music/Плакшери/cover.jpg', title: 'Cabernet Sauvignon', artist: 'PHARAOH, Boulevard Depo', album: 'Плакшери' },
{ src: 'music/Плакшери/PHARAOH, Boulevard Depo - В сердце тьмы.mp3', cover: 'music/Плакшери/cover.jpg', title: 'В сердце тьмы', artist: 'PHARAOH, Boulevard Depo', album: 'Плакшери' },
{ src: 'music/Плакшери/PHARAOH, Boulevard Depo - До харвеста.mp3', cover: 'music/Плакшери/cover.jpg', title: 'До харвеста', artist: 'PHARAOH, Boulevard Depo', album: 'Плакшери' },
{ src: 'music/Плакшери/PHARAOH, Boulevard Depo - Плакшери.mp3', cover: 'music/Плакшери/cover.jpg', title: 'Плакшери', artist: 'PHARAOH, Boulevard Depo', album: 'Плакшери' },
{ src: 'music/Плакшери/PHARAOH, Boulevard Depo - Сюр.mp3', cover: 'music/Плакшери/cover.jpg', title: 'Сюр', artist: 'PHARAOH, Boulevard Depo', album: 'Плакшери' },
{ src: 'music/Плакшери/PHARAOH, Boulevard Depo feat. Bootychaaain - Просн.mp3', cover: 'music/Плакшери/cover.jpg', title: 'Проснись', artist: 'PHARAOH, Boulevard Depo feat. Bootychaaain', album: 'Плакшери' },
{ src: 'music/Плакшери/PHARAOH, Boulevard Depo feat. Preachernicky - Max.mp3', cover: 'music/Плакшери/cover.jpg', title: 'Max', artist: 'PHARAOH, Boulevard Depo feat. Preachernicky', album: 'Плакшери' },
{ src: 'music/Плакшери/PHARAOH,_Boulevard_Depo_feat_I61_Послушай_сука.mp3', cover: 'music/Плакшери/cover.jpg', title: 'Послушай сука', artist: 'PHARAOH, Boulevard Depo feat. i61', album: 'Плакшери' },
{ src: 'music/Правило/PHARAOH - AMG.mp3', cover: 'music/Правило/cover.jpg', title: 'AMG', artist: 'PHARAOH', album: 'Правило' },
{ src: 'music/Правило/PHARAOH - Баллада.mp3', cover: 'music/Правило/cover.jpg', title: 'Баллада', artist: 'PHARAOH', album: 'Правило' },
{ src: 'music/Правило/PHARAOH - Без ключа.mp3', cover: 'music/Правило/cover.jpg', title: 'Без ключа', artist: 'PHARAOH', album: 'Правило' },
{ src: 'music/Правило/PHARAOH - За решёткой.mp3', cover: 'music/Правило/cover.jpg', title: 'За решёткой', artist: 'PHARAOH', album: 'Правило' },
{ src: 'music/Правило/PHARAOH - Из-за тебя.mp3', cover: 'music/Правило/cover.jpg', title: 'Из-за тебя', artist: 'PHARAOH', album: 'Правило' },
{ src: 'music/Правило/PHARAOH - Лоулайф.mp3', cover: 'music/Правило/cover.jpg', title: 'Лоулайф', artist: 'PHARAOH', album: 'Правило' },
{ src: 'music/Правило/PHARAOH - Ночь пятницы.mp3', cover: 'music/Правило/cover.jpg', title: 'Ночь пятницы', artist: 'PHARAOH', album: 'Правило' },
{ src: 'music/Правило/PHARAOH - Призрак.mp3', cover: 'music/Правило/cover.jpg', title: 'Призрак', artist: 'PHARAOH', album: 'Правило' },
{ src: 'music/Правило/PHARAOH - То, чего нет.mp3', cover: 'music/Правило/cover.jpg', title: 'То, чего нет', artist: 'PHARAOH', album: 'Правило' },
{ src: 'music/Правило/PHARAOH feat. Dima Roux - Чувствую.mp3', cover: 'music/Правило/cover.jpg', title: 'Чувствую', artist: 'PHARAOH feat. Dima Roux', album: 'Правило' },
{ src: 'music/Правило/PHARAOH feat. Mishaal, Dima Roux - Не хочу.mp3', cover: 'music/Правило/cover.jpg', title: 'Не хочу', artist: 'PHARAOH feat. Mishaal, Dima Roux', album: 'Правило' },
{ src: 'music/Правило/PHARAOH feat. Mnogoznaal - Семейные узы.mp3', cover: 'music/Правило/cover.jpg', title: 'Семейные узы', artist: 'PHARAOH feat. Mnogoznaal', album: 'Правило' },
{ src: 'music/Правило/PHARAOH feat. Молодой Платон - Тост.mp3', cover: 'music/Правило/cover.jpg', title: 'Тост', artist: 'PHARAOH feat. Молодой Платон', album: 'Правило' },
{ src: 'music/УАДЖЕТ/Pharaoh - 2002.mp3', cover: 'music/УАДЖЕТ/cover.jpg', title: '2002', artist: 'PHARAOH', album: 'УАДЖЕТ' },
{ src: 'music/УАДЖЕТ/Pharaoh - Cadillac.mp3', cover: 'music/УАДЖЕТ/cover.jpg', title: 'Cadillac', artist: 'PHARAOH', album: 'УАДЖЕТ' },
{ src: 'music/УАДЖЕТ/Pharaoh - В зоне.mp3', cover: 'music/УАДЖЕТ/cover.jpg', title: 'В зоне', artist: 'PHARAOH', album: 'УАДЖЕТ' },
{ src: 'music/УАДЖЕТ/Pharaoh - Виноградный день.mp3', cover: 'music/УАДЖЕТ/cover.jpg', title: 'Виноградный день', artist: 'PHARAOH', album: 'УАДЖЕТ' },
{ src: 'music/УАДЖЕТ/Pharaoh - Исход.mp3', cover: 'music/УАДЖЕТ/cover.jpg', title: 'Исход', artist: 'PHARAOH', album: 'УАДЖЕТ' },
{ src: 'music/УАДЖЕТ/Pharaoh - Ликантропия.mp3', cover: 'music/УАДЖЕТ/cover.jpg', title: 'Ликантропия', artist: 'PHARAOH', album: 'УАДЖЕТ' },
{ src: 'music/УАДЖЕТ/Pharaoh - Мёртвый сутенер.mp3', cover: 'music/УАДЖЕТ/cover.jpg', title: 'Мёртвый сутенер', artist: 'PHARAOH', album: 'УАДЖЕТ' },
{ src: 'music/УАДЖЕТ/Pharaoh - На дно.mp3', cover: 'music/УАДЖЕТ/cover.jpg', title: 'На дно', artist: 'PHARAOH', album: 'УАДЖЕТ' },
{ src: 'music/УАДЖЕТ/Pharaoh - Ничего не изменилось.mp3', cover: 'music/УАДЖЕТ/cover.jpg', title: 'Ничего не изменилось', artist: 'PHARAOH', album: 'УАДЖЕТ' },
{ src: 'music/УАДЖЕТ/Pharaoh - Уаджет.mp3', cover: 'music/УАДЖЕТ/cover.jpg', title: 'Уаджет', artist: 'PHARAOH', album: 'УАДЖЕТ' },
{ src: 'music/УАДЖЕТ/Pharaoh feat. Acid Drop King - Фак ми айм дэд.mp3', cover: 'music/УАДЖЕТ/cover.jpg', title: 'Фак ми айм дэд', artist: 'PHARAOH feat. Acid Drop King', album: 'УАДЖЕТ' }
];

let trkIdx = 0;
let isPlay = false;

function rPl(filter = '') {
    if (!plList) return;
    plList.innerHTML = '';
    
    const filtered = playlist.filter(t => 
        t.title.toLowerCase().includes(filter.toLowerCase()) || 
        (t.album && t.album.toLowerCase().includes(filter.toLowerCase()))
    );

    filtered.sort((a, b) => (a.album || '').localeCompare(b.album || ''));

    filtered.forEach((t) => {
        const li = document.createElement('li');
        const albumName = t.album ? t.album : 'Сингл';
        
        li.innerHTML = `
            <div class="item-cover" style="background-image:url('${t.cover}')"></div>
            <div class="item-info">
                <span class="item-title">${t.title}</span>
                <span class="item-artist" style="font-size: 11px; color: #a78bfa;">${t.artist} • ${albumName}</span>
            </div>
        `;
        
        li.addEventListener('click', () => {
            const originalIndex = playlist.indexOf(t);
            trkIdx = originalIndex;
            lTrk(trkIdx);
            pMus();
            rPl(filter); 
        });
        
        plList.appendChild(li);
    });
}

const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        rPl(e.target.value);
    });
}

function updControls() {
    if (!prevTrackBtn) return;
    if (trkIdx === 0) {
        prevTrackBtn.classList.add('disabled-btn');
    } else {
        prevTrackBtn.classList.remove('disabled-btn');
    }
}

function lTrk(i) {
    if (!playlist[i] || !bgMusic) return;
    bgMusic.src = playlist[i].src;
    if (vinylCenter) vinylCenter.style.backgroundImage = `url('${playlist[i].cover}')`;
    updControls();
}

function pMus() {
    if (!bgMusic) return;
    bgMusic.play();
    if (vinyl) vinyl.classList.add('spin');
    isPlay = true;
    if (playPauseBtn) playPauseBtn.textContent = '⏸️';
}

function psMus() {
    if (!bgMusic) return;
    bgMusic.pause();
    if (vinyl) vinyl.classList.remove('spin');
    isPlay = false;
    if (playPauseBtn) playPauseBtn.textContent = '▶️';
}

function nTrk() {
    trkIdx++;
    if (trkIdx >= playlist.length) trkIdx = 0;
    lTrk(trkIdx);
    if (isPlay) pMus();
}

function pTrk() {
    if (trkIdx > 0) {
        trkIdx--;
        lTrk(trkIdx);
        if (isPlay) pMus();
    }
}

if (mainMusicBtn && playerPanel && plMenu) {
    mainMusicBtn.addEventListener('click', () => {
        if (playerPanel.classList.contains('hidden')) {
            playerPanel.classList.remove('hidden');
            setTimeout(() => playerPanel.classList.add('show'), 10);
        } else {
            playerPanel.classList.remove('show');
            setTimeout(() => playerPanel.classList.add('hidden'), 300);
            plMenu.classList.remove('show');
            setTimeout(() => plMenu.classList.add('hidden'), 300);
        }
    });

    plBtn.addEventListener('click', () => {
        if (plMenu.classList.contains('hidden')) {
            plMenu.classList.remove('hidden');
            setTimeout(() => plMenu.classList.add('show'), 10);
        } else {
            plMenu.classList.remove('show');
            setTimeout(() => plMenu.classList.add('hidden'), 300);
        }
    });
}

if (playPauseBtn) playPauseBtn.addEventListener('click', () => { if (isPlay) psMus(); else pMus(); });
if (nextTrackBtn) nextTrackBtn.addEventListener('click', nTrk);
if (prevTrackBtn) prevTrackBtn.addEventListener('click', pTrk);
if (bgMusic) {
    bgMusic.addEventListener('ended', nTrk);
    bgMusic.addEventListener('timeupdate', () => {
        if (bgMusic.duration && seekBar && timeDisplay) {
            seekBar.value = (bgMusic.currentTime / bgMusic.duration) * 100;
            const m = Math.floor(bgMusic.currentTime / 60);
            const s = Math.floor(bgMusic.currentTime % 60);
            const dm = Math.floor(bgMusic.duration / 60);
            const ds = Math.floor(bgMusic.duration % 60);
            timeDisplay.textContent = `${m}:${s < 10 ? '0'+s : s} / ${dm}:${ds < 10 ? '0'+ds : ds}`;
        }
    });
}

if (seekBar) {
    seekBar.addEventListener('input', () => {
        if (bgMusic) bgMusic.currentTime = bgMusic.duration * (seekBar.value / 100);
    });
}

lTrk(trkIdx);
rPl();

// === НАВІГАЦІЯ ПО ГЛАВАХ ===
function swC(a, b) {
    if (!a || !b) return;
    a.classList.remove('visible');
    setTimeout(() => {
        a.classList.add('hidden');
        b.classList.remove('hidden');
        setTimeout(() => b.classList.add('visible'), 100);
    }, 1500);
}

const openBtn = document.getElementById('open-btn');
if (openBtn) {
    openBtn.addEventListener('click', async () => {
        const startScreen = document.getElementById('start-screen');
        const introScreen = document.getElementById('intro-screen');
        const introText = document.getElementById('intro-text');
        const ch1 = document.getElementById('chapter-1');
        
        if (startScreen) startScreen.classList.add('fade-out');
        await new Promise(r => setTimeout(r, 1000));
        if (startScreen) startScreen.classList.add('hidden');
        if (introScreen) introScreen.classList.remove('hidden');
        
        const ph = [
            "Привет, Котя ❤️", 
            "Я долго думал", 
            "Что подарить тебе на наши 3 месяца", 
            "И решил сделать этот подарок своими руками."
        ];
        
        if (introText) {
            for (let i = 0; i < ph.length; i++) {
                introText.textContent = ph[i];
                introText.style.opacity = 1;
                await new Promise(r => setTimeout(r, 2000));
                introText.style.opacity = 0;
                await new Promise(r => setTimeout(r, 1000));
            }
        }
        
        if (introScreen) introScreen.classList.add('hidden');
        if (ch1) {
            ch1.classList.remove('hidden');
            setTimeout(() => ch1.classList.add('visible'), 100);
        }
    });
}

const btn1 = document.getElementById('next-btn-1');
const btn2 = document.getElementById('next-btn-2');
const btn3 = document.getElementById('next-btn-3');
const ch1 = document.getElementById('chapter-1');
const ch2 = document.getElementById('chapter-2');
const ch3 = document.getElementById('chapter-3');
const ch4 = document.getElementById('chapter-4');

if (btn1) btn1.addEventListener('click', () => swC(ch1, ch2));
if (btn2) btn2.addEventListener('click', () => swC(ch2, ch3));
if (btn3) btn3.addEventListener('click', () => swC(ch3, ch4));

// === БЛОК ДЛЯ ГЛАВИ 4 (ПРИЧИНИ) ===
const myReasons = [
    "Мне нравится, что рядом с тобой я могу быть абсолютно собой, без масок и притворства.",
    "Я обожаю твой голос. Особенно когда мы созваниваемся поздно ночью.",
    "За то, как ты умеешь поддерживать. Одно твое сообщение способно исправить ужасный день.",
    "За наши общие игры. Даже когда мы проигрываем, с тобой это весело.",
    "За твой смех. Это мой самый любимый звук на свете.",
    "Потому что ты понимаешь мои шутки, даже самые дурацкие.",
    "За то, что расстояние для нас — не преграда, а просто временная трудность.",
    "За наши бесконечные разговоры обо всём на свете.",
    "За то, как ты мило злишься или ругаешься в катках.",
    "Потому что ты веришь в меня больше, чем я сам.",
    "За то, что с тобой я чувствую себя по-настоящему нужным.",
    "За то, как быстро пролетает время, когда мы вместе.",
    "Потому что ты — моя самая первая мысль утром и последняя мысль перед сном.",
    "За твой музыкальный вкус и треки, которыми мы делимся.",
    "За то, что мы можем просто помолчать вместе, и это не будет неловко.",
    "Потому что с тобой я забываю о тревогах.",
    "За твои кружочки и голосовые сообщения, которые я переслушиваю.",
    "Потому что ты невероятно красивая.",
    "За то, что ты искренняя и не боишься показывать свои эмоции.",
    "За твои милые привычки, о которых знаю только я.",
    "За то, как ты заботишься обо мне, даже через экран.",
    "Потому что ты умеешь слушать и по-настоящему слышать.",
    "За то, что ты уважаешь мое личное пространство, а я — твое.",
    "За каждые сладкие сны, которые ты мне желаешь.",
    "За то, что ты делаешь меня лучше.",
    "За твой характер — сильный, но в то же время такой нежный.",
    "Потому что люблю слушать твои истории и сны.",
    "За то, как мы умеем дурачиться и вести себя как дети.",
    "Потому что ты особенная. Во всем.",
    "За то, что ты делишься со мной своими переживаниями.",
    "За наши общие планы на будущее.",
    "Потому что мне хочется дарить тебе все свое время.",
    "За то, что ты никогда не даешь мне сдаваться.",
    "За уют, который я чувствую, когда вижу уведомление от тебя.",
    "Потому что ты умеешь находить правильные слова.",
    "За твою улыбку, даже если я представляю её только в мыслях.",
    "Потому что ты — моя единственная и неповторимая любимая девушка.",
    "За то, что ты всегда честна со мной.",
    "За твои советы, которые всегда помогают.",
    "За то, что ты прощаешь мне мои косяки.",
    "Потому что с тобой мир кажется невероятно светлым.",
    "За то, что ты вдохновляешь меня.",
    "За твои реакции на мои подарки и сюрпризы.",
    "Потому что мне физически не хватает тебя, когда мы не на связи.",
    "За то, что ты всегда на моей стороне.",
    "За то, как ты произносишь мое имя.",
    "Потому что мы понимаем всё с полуслова.",
    "За то, что ты учишь меня новому.",
    "За наше умение мириться, если мы случайно повздорили.",
    "За то, что ты — моя главная причина улыбаться.",
    "Потому что ты делаешь даже самый скучный день ярким.",
    "За твою поддержку в моих начинаниях.",
    "За то, что ты не смеешься над моими страхами.",
    "За твое умение сопереживать.",
    "Потому что я могу доверять тебе на 100%.",
    "За то, что ты замечаешь мелочи.",
    "За наши локальные мемы, понятные только нам двоим.",
    "За то, что с тобой легко.",
    "За твое терпение ко мне.",
    "Потому что каждый день с тобой — это подарок.",
    "За твою нежность.",
    "Потому что мне нравится делать тебя счастливой.",
    "За то, что ты не пытаешься меня переделать.",
    "За то, как мы строим теории по фильмам, аниме или играм.",
    "Потому что ты — моя тихая гавань.",
    "За то, что ты умеешь удивлять.",
    "За то, как ты смотришь на мир.",
    "Потому что ты даришь мне уверенность в себе.",
    "За твою энергетику.",
    "За то, что ты умеешь быть серьезной, когда это нужно, и абсолютно безбашенной, когда мы отдыхаем.",
    "Потому что с тобой я узнал, что такое настоящая забота.",
    "За то, что ты помнишь о важных для меня вещах.",
    "Потому что я скучаю по тебе даже тогда, когда мы только-только попрощались.",
    "За то, что мы можем спорить, но все равно оставаться самыми родными.",
    "За твою доброту и нежность.",
    "Потому что ты делаешь меня самым счастливым парнем.",
    "За то, как мы ждем наших встреч.",
    "Потому что ты стала для меня целой вселенной.",
    "За твой интеллект и умение мыслить.",
    "За то, что ты делишься со мной своими мечтами.",
    "Потому что с тобой мне ничего не страшно.",
    "За то, как ты поддерживаешь разговор, даже когда мы устали.",
    "За твою уникальность.",
    "Потому что ты — мой любимый человек.",
    "За то, что ты заставляешь мое сердце биться чаще.",
    "За то, что мы можем быть вместе, даже будучи далеко.",
    "Потому что я дорожу каждой минутой нашего общения.",
    "За твою способность любить искренне и глубоко.",
    "Потому что ты — лучшее, что случилось со мной за это время.",
    "За то, что с тобой даже банальные вещи становятся особенными.",
    "За ту теплоту, которая разливается внутри, когда я думаю о тебе.",
    "Потому что ты стала неотъемлемой частью моей жизни.",
    "И есть еще множество причин, но главная из них — я просто безумно тебя люблю, котя ❤️"
];

let currentReasonIndex = 0;
const uiReasonTitle = document.getElementById('reason-title');
const uiReasonText = document.getElementById('reason-text');
const btnNextReason = document.getElementById('next-reason-btn');
const btn4 = document.getElementById('next-btn-4');
const csad = document.getElementById('chapter-sad');

if (btnNextReason) {
    btnNextReason.addEventListener('click', () => {
        currentReasonIndex++;
        
        if (currentReasonIndex < myReasons.length) {
            uiReasonTitle.textContent = `Причина №${currentReasonIndex + 1}`;
            uiReasonText.textContent = myReasons[currentReasonIndex];
        } else {
            uiReasonTitle.textContent = "Их бесконечно";
            uiReasonText.textContent = "Потому что моя любовь к тебе не поместится ни в один список на свете ❤️";
            btnNextReason.classList.add('hidden');
            
            uiReasonTitle.style.color = "#ff6fa8"; 
            uiReasonTitle.style.marginTop = "10px";
            uiReasonText.style.fontSize = "1.2em"; 
            uiReasonText.style.opacity = "1";
        }
    });
}

if (btn4) btn4.addEventListener('click', () => swC(ch4, csad));

// === МІНІ ІГРИ ТА КНОПКИ ===
const sMsg = document.getElementById('sad-message');
const btnSadHeart = document.getElementById('sad-heart-btn');
const btnSadNext = document.getElementById('next-btn-sad');
const cblf = document.getElementById('chapter-bluff');

if (btnSadHeart && sMsg) {
    const sPhr = [
        "Я тоже безумно по тебе скучаю... ❤️", "Представь, что я сейчас крепко-крепко тебя обнимаю.", 
        "Ты всегда рядом — в моих мыслях и в моем сердце.", "Ты у меня самая любимая котя 🐱", 
        "Закрой глаза. Чувствуешь? Это я думаю о тебе. 🥰", "Километры бесят, но моя любовь к тебе сильнее любого расстояния.",
        "Хотелось бы сейчас оказаться рядом и просто прижать тебя к себе.", "Улыбнись, моя девочка. Я всегда с тобой."
    ];
    
    btnSadHeart.addEventListener('click', () => {
        sMsg.style.opacity = 0;
        sMsg.classList.remove('hidden');
        setTimeout(() => {
            sMsg.textContent = sPhr[Math.floor(Math.random() * sPhr.length)];
            sMsg.style.opacity = 1;
        }, 200);
    });
}

if (btnSadNext) btnSadNext.addEventListener('click', () => swC(csad, cblf));

const bluffCards = document.querySelectorAll('.bluff-card');
const btnBluffNext = document.getElementById('next-btn-bluff');
const csaf = document.getElementById('chapter-safe');

if (bluffCards.length > 0) {
    let cFl = false;
    bluffCards.forEach(c => {
        c.addEventListener('click', () => {
            if (!cFl) {
                c.classList.add('flipped');
                cFl = true;
                if (btnBluffNext) {
                    setTimeout(() => btnBluffNext.classList.remove('hidden'), 1000);
                }
            }
        });
    });
}

// === СИСТЕМА НАГОРОД ЗА МІНІ-ІГРИ ===
const rewardsData = [
    {   
        title: "🍿 Идеальный вечер",
        desc: "Ты выбираешь аниме, фильм или занятие на вечер. Организация полностью на мне!",
        gradient: "linear-gradient(135deg, #a18cd1, #fbc2eb)", color: "#fff"
    },
    {   
        title: "🎮 Игровая власть",
        desc: "Сделаю в нашей катке всё, что ты скажешь.",
        gradient: "linear-gradient(135deg, #84fab0, #8fd3f4)", color: "#2c3e50"
    },
    {   
        title: "⏪ Машина времени",
        desc: "Купон на отмену любой мелкой ссоры или обиды. Активируешь его — и мы мгновенно забываем про негатив и миримся.",
        gradient: "linear-gradient(135deg, #fbc2eb, #a6c1ee)", color: "#2c3e50"
    },
    {   
        title: "✅ Час слова «Да»",
        desc: "В течение целого часа я буду соглашаться и отвечать «Да» на любые твои идеи и предложения (в пределах разумного, котя!).",
        gradient: "linear-gradient(135deg, #e0c3fc, #8ec5fc)", color: "#2c3e50"
    },
    {   
        title: "✨ Золотой билет",
        desc: "Купон на одно абсолютно любое твое желание. Выполню без отговорок и вопросов.",
        gradient: "linear-gradient(135deg, #f6d365, #fda085)", color: "#fff"
    }
];

const rewardModal = document.getElementById('reward-modal');
const rewardCard = document.getElementById('reward-card');
const rewardTitle = document.getElementById('reward-title');
const rewardDesc = document.getElementById('reward-desc');
const claimRewardBtn = document.getElementById('claim-reward-btn');

let currentChapterToHide = null;
let nextChapterAfterReward = null;

function showRewardPopup(rewardIndex, currentCh, nextCh) {
    if (!rewardModal) return;
    const rew = rewardsData[rewardIndex];
    rewardTitle.textContent = rew.title;
    rewardDesc.textContent = rew.desc;
    rewardCard.style.background = rew.gradient;
    rewardCard.style.color = rew.color;
    
    currentChapterToHide = currentCh;
    nextChapterAfterReward = nextCh;
    
    rewardModal.classList.remove('hidden');
    setTimeout(() => {
        rewardModal.style.opacity = '1';
        rewardCard.style.transform = 'scale(1)';
    }, 50);
}

if (claimRewardBtn) {
    claimRewardBtn.addEventListener('click', () => {
        rewardModal.style.opacity = '0';
        rewardCard.style.transform = 'scale(0.8)';
        setTimeout(() => {
            rewardModal.classList.add('hidden');
            if (currentChapterToHide && nextChapterAfterReward) {
                swC(currentChapterToHide, nextChapterAfterReward);
            }
        }, 500);
    });
}

if (btnBluffNext) btnBluffNext.addEventListener('click', () => showRewardPopup(0, cblf, csaf));

// === МІНІ-ГРА: СЕЙФ ===
let sInt, sTL = 10.0, sTP = 0;
const sGrid = document.querySelector('.safe-grid');
const sBts = document.querySelectorAll('.safe-btn');
const sTD = document.getElementById('safe-timer');
const sSB = document.getElementById('start-safe-btn');
const sNB = document.getElementById('next-btn-safe');
const ccry = document.getElementById('chapter-cryptex');

if (sSB && sGrid && sBts.length > 0 && sTD) {
    sSB.addEventListener('click', () => {
        sSB.classList.add('hidden');
        sGrid.classList.add('active');
        sTP = 0; 
        sTL = 10.0;
        
        sBts.forEach(b => b.classList.remove('target', 'pressed'));
        
        let arr = Array.from(sBts).sort(() => 0.5 - Math.random());
        for (let i = 0; i < 5; i++) {
            arr[i].classList.add('target');
        }
        
        sInt = setInterval(() => {
            sTL -= 0.1;
            sTD.textContent = sTL.toFixed(1);
            if (sTL <= 0) {
                clearInterval(sInt); 
                sTD.textContent = "0.0";
                sGrid.classList.remove('active'); 
                sSB.classList.remove('hidden'); 
                sSB.textContent = "Попробовать снова";
            }
        }, 100);
    });

    sBts.forEach(b => {
        b.addEventListener('click', () => {
            if (b.classList.contains('target') && !b.classList.contains('pressed')) {
                b.classList.remove('target'); 
                b.classList.add('pressed'); 
                sTP++;
                
                if (sTP === 5) {
                    clearInterval(sInt); 
                    sTD.textContent = "ВЗЛОМАНО!"; 
                    sTD.style.color = "#8b5cf6";
                    sGrid.classList.remove('active'); 
                    if (sNB) sNB.classList.remove('hidden');
                }
            }
        });
    });
}

if (sNB) sNB.addEventListener('click', () => showRewardPopup(1, csaf, ccry));

// === МІНІ-ГРА: КРИПТЕКС ===
const cInp = document.querySelectorAll('.crypt-input');
const btnCryptex = document.getElementById('btn-cryptex');
const cpuz = document.getElementById('chapter-puzzle');

if (cInp.length > 0 && btnCryptex) {
    cInp.forEach((inp, i) => {
        inp.addEventListener('input', () => {
            inp.value = inp.value.trim().toLowerCase();
            if (inp.value && i < 3) {
                cInp[i + 1].focus();
            }
            if (Array.from(cInp).map(x => x.value).join('') === 'котя') {
                btnCryptex.classList.remove('hidden');
            } else {
                btnCryptex.classList.add('hidden');
            }
        });
        inp.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !inp.value && i > 0) {
                cInp[i - 1].focus();
            }
        });
    });
}

if (btnCryptex) btnCryptex.addEventListener('click', () => showRewardPopup(2, ccry, cpuz));

// === МІНІ-ГРА: ПАЗЛ (ДВІ КАРТИНКИ ПО ЧЕРЗІ) ===
const puzBoard = document.getElementById('puzzle-board');
const puzBank = document.getElementById('puzzle-bank');
const btnPuzzle = document.getElementById('btn-puzzle');
const cbre = document.getElementById('chapter-breath');

if (puzBoard && puzBank && cpuz) {
    let selPiece = null;
    const cols = 4, rows = 5, totalPieces = cols * rows;
    const puzzleImages = ['img/photo_2026-07-12_22-04-35.jpg', 'img/photo_2026-07-12_22-04-41.jpg'];
    let currentPuzzleLevel = 0;

    function checkWin() {
        let win = true;
        for (let i = 0; i < totalPieces; i++) {
            if (puzBoard.children[i].children.length === 0 || parseInt(puzBoard.children[i].children[0].dataset.correct) !== i) {
                win = false; 
                break;
            }
        }
        if (win && btnPuzzle) {
            btnPuzzle.classList.remove('hidden');
            document.querySelectorAll('.puzzle-piece').forEach(p => p.style.pointerEvents = 'none');
            
            if (currentPuzzleLevel === 0) {
                btnPuzzle.textContent = "Собрать вторую фотку 🧩";
            } else {
                btnPuzzle.textContent = "Дальше 💨";
            }
        }
    }

    function initPuzzle(level) {
        puzBoard.innerHTML = '';
        puzBank.innerHTML = '';
        selPiece = null;
        if (btnPuzzle) btnPuzzle.classList.add('hidden');
        
        const puzzleTitle = cpuz.querySelector('h2');
        if (puzzleTitle) {
            puzzleTitle.textContent = level === 0 ? "Собери картинку (1/2)" : "А теперь вторую! (2/2)";
        }

        for (let i = 0; i < totalPieces; i++) {
            const slot = document.createElement('div');
            slot.classList.add('puzzle-slot'); 
            slot.dataset.index = i;
            slot.addEventListener('click', () => {
                if (selPiece) {
                    if (slot.children.length > 0) {
                        selPiece.parentNode.appendChild(slot.children[0]);
                    }
                    slot.appendChild(selPiece);
                    selPiece.classList.remove('selected'); 
                    selPiece = null;
                    checkWin();
                }
            });
            puzBoard.appendChild(slot);
        }

        const puzOrder = Array.from({length: totalPieces}, (_, i) => i).sort(() => Math.random() - 0.5);
        const currentPuzzleImage = puzzleImages[level];

        for (let i = 0; i < totalPieces; i++) {
            const p = document.createElement('div');
            p.classList.add('puzzle-piece');
            const bgVal = puzOrder[i];
            p.style.backgroundImage = `url('${currentPuzzleImage}')`;
            p.style.backgroundSize = `240px 300px`;
            p.style.backgroundPosition = `${(bgVal % cols) * (100 / (cols - 1))}% ${Math.floor(bgVal / cols) * (100 / (rows - 1))}%`;
            p.dataset.correct = bgVal;
            
            const cRad = '14px'; 
            if (bgVal === 0) p.style.borderTopLeftRadius = cRad;
            if (bgVal === cols - 1) p.style.borderTopRightRadius = cRad;
            if (bgVal === (rows - 1) * cols) p.style.borderBottomLeftRadius = cRad;
            if (bgVal === totalPieces - 1) p.style.borderBottomRightRadius = cRad;
            
            p.addEventListener('click', (e) => {
                e.stopPropagation();
                if (selPiece === p) {
                    p.classList.remove('selected'); 
                    selPiece = null;
                } else if (selPiece) {
                    const parentA = selPiece.parentNode; 
                    const parentB = p.parentNode;
                    parentA.appendChild(p); 
                    parentB.appendChild(selPiece);
                    selPiece.classList.remove('selected'); 
                    selPiece = null;
                    checkWin();
                } else {
                    selPiece = p; 
                    p.classList.add('selected');
                }
            });
            puzBank.appendChild(p);
        }
    }

    initPuzzle(0);

    if (btnPuzzle) {
        btnPuzzle.addEventListener('click', () => {
            if (currentPuzzleLevel === 0) {
                currentPuzzleLevel++;
                initPuzzle(currentPuzzleLevel);
            } else {
                showRewardPopup(3, cpuz, cbre);
            }
        });
    }
}

// === МІНІ-ГРА: МІКРОФОН ===
const frO = document.getElementById('frost-overlay');
const bBNext = document.getElementById('btn-breath-next');
const ch5 = document.getElementById('chapter-5');

if (frO && bBNext) {
    let frOp = 1, mcTr = 0;

    frO.addEventListener('click', async () => {
        mcTr++;
        if (mcTr === 2) { 
            frO.style.display = 'none'; 
            bBNext.classList.remove('hidden'); 
            return; 
        }
        
        try {
            const str = await navigator.mediaDevices.getUserMedia({ audio: true });
            const actx = new (window.AudioContext || window.webkitAudioContext)();
            const anl = actx.createAnalyser(); 
            actx.createMediaStreamSource(str).connect(anl);
            anl.fftSize = 256; 
            const dt = new Uint8Array(anl.frequencyBinCount);
            
            setInterval(() => {
                anl.getByteFrequencyData(dt);
                if (dt.reduce((a, b) => a + b, 0) > 3000) { 
                    frOp -= 0.05; 
                    frO.style.opacity = frOp; 
                }
                if (frOp <= 0) { 
                    frO.style.display = 'none'; 
                    bBNext.classList.remove('hidden'); 
                    str.getTracks().forEach(t => t.stop()); 
                }
            }, 100);
        } catch(e) { 
            frO.innerHTML = "Нет доступа к микрофону.<br>Кликни еще раз для пропуска."; 
        }
    });
}

if (bBNext) bBNext.addEventListener('click', () => showRewardPopup(4, cbre, ch5));

// === ТАЙМЕР ТА ФІНАЛ ===
const daysEl = document.getElementById('days');
if (daysEl) {
    const sD = new Date(2026, 3, 12, 21, 21, 31);
    function uT() {
        const dff = new Date() - sD;
        if (dff > 0) {
            document.getElementById('days').textContent = Math.floor(dff / 86400000).toString().padStart(2, '0');
            document.getElementById('hours').textContent = Math.floor((dff / 3600000) % 24).toString().padStart(2, '0');
            document.getElementById('minutes').textContent = Math.floor((dff / 60000) % 60).toString().padStart(2, '0');
            document.getElementById('seconds').textContent = Math.floor((dff / 1000) % 60).toString().padStart(2, '0');
        }
    }
    uT(); 
    setInterval(uT, 1000);
}

const btn5 = document.getElementById('next-btn-5');
const passSection = document.getElementById('password-section');

if (btn5 && passSection) {
    btn5.addEventListener('click', () => {
        btn5.classList.add('hidden');
        passSection.classList.remove('hidden');
    });
}

// === ЛОГІКА ПАРОЛІВ 1204 ТА 1013 ===
const unlockBtn = document.getElementById('unlock-btn');
const ch6 = document.getElementById('chapter-6');

if (unlockBtn) {
    unlockBtn.addEventListener('click', () => {
        const codeInput = document.getElementById('secret-code');
        const errMsg = document.getElementById('error-msg');
        
        if (!codeInput || !errMsg) return;
        const code = codeInput.value;
        
        if (code === "1204") {
            errMsg.classList.add('hidden');
            swC(ch5, ch6);
            setTimeout(tWr, 1600);
        } else if (code === "1013") {
            playlist = secretPlaylist; 
            trkIdx = 0;
            lTrk(0);
            rPl(); 
            alert("🔓 Секретный плейлист Фараона активирован!");
            codeInput.value = "";
            errMsg.textContent = "Плейлист разблокирован! Введи основной код для финала.";
            errMsg.classList.remove('hidden');
        } else {
            errMsg.textContent = "Неправильный код, котя)";
            errMsg.classList.remove('hidden');
            codeInput.value = "";
        }
    });
}

// === ФІНАЛЬНИЙ ТЕКСТ ===
const lC = "Котенок, вот и пролетели наши первые 3 месяца. Знаешь, каждый раз, когда мы созваниваемся по ночам или вместе заходим в игру, я понимаю, насколько мне безумно повезло встретить тебя. Расстояние между нами сейчас — это просто условность, потому что в мыслях и в сердце я всегда рядом. Ты стала моей главной поддержкой, моей радостью и самым родным человеком. Мне хочется, чтобы ты улыбалась каждый день и чувствовала мое тепло даже через экран. Я всегда буду на твоей стороне. Спасибо тебе за каждую минуту вместе. Я очень сильно тебя люблю, котя ❤️";
let lI = 0;

function tWr() {
    const typedLetter = document.getElementById('typed-letter');
    if (!typedLetter) return;
    
    if (lI < lC.length) {
        typedLetter.innerHTML += lC.charAt(lI);
        lI++;
        setTimeout(tWr, 60);
    } else {
        setTimeout(() => {
            if (ch6) ch6.style.opacity = 0;
            const bg = document.getElementById('starry-background');
            if (bg) bg.style.opacity = 0;
            
            setTimeout(() => {
                const finalScreen = document.getElementById('final-screen');
                if (finalScreen) {
                    finalScreen.classList.remove('hidden');
                    setTimeout(() => finalScreen.classList.add('visible'), 100);
                }
            }, 1500);
        }, 4000);
    }
}