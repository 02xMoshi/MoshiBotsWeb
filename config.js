const siteConfig = {
    // Hero bölümündeki daktilo metinleri
    heroTypedTexts: [
        "Sunucunuzu 7/24 korur.",
        "Eğlenceyi zirveye taşır.",
        "Yönetimi kolaylaştırır."
    ],
    bots: [
        {
            id: "kalkan",
            name: "Kalkan Moderasyon",
            icon: "bx-shield-quarter",
            description: "Otomatik filtreleme ve basit komutlarla sunucu güvenliğini zahmetsizce sağlayın.",
            longDescription: "Kalkan Moderasyon, sunucunuzu spam, kötü niyetli linkler ve istenmeyen davranışlardan korumak için geliştirilmiş yapay zeka destekli bir sistemdir. Kolay kurulumu ve web paneli sayesinde karmaşık komutlarla uğraşmadan, sunucunuzu 7/24 güvende tutabilirsiniz.",
            features: ["Spam Koruması", "Küfür & Argo Filtresi", "Raid Engelleme", "Otomatik Susturma/Yasaklama", "Detaylı Loglama"],
            // YENİ: Satın alma linki ve buton metni eklendi
            purchaseUrl: "index.html#packages", // Bot detayından paketlere yönlendirir
            purchaseButtonText: "Paketleri Gör ve Satın Al"
        },
        {
            id: "ritim",
            name: "Ritim Müzik",
            icon: "bx-music",
            description: "Yüksek kaliteli ve kesintisiz müzik. Sadece müziği başlatın ve keyfini çıkarın.",
            longDescription: "Ritim Müzik, en popüler platformlardan (YouTube, Spotify, SoundCloud) yüksek ses kalitesiyle (lossless) müzik çalmanızı sağlar. 7/24 aktif kalarak üyelerinize kesintisiz bir müzik deneyimi sunar. Çalma listeleri oluşturabilir ve DJ rollerini yönetebilirsiniz.",
            features: ["Yüksek Kaliteli Ses (Lossless)", "7/24 Müzik Çalma", "Spotify & YouTube Desteği", "Özel Çalma Listeleri", "DJ Rol Sistemi"],
            purchaseUrl: "index.html#packages",
            purchaseButtonText: "Paketleri Gör ve Satın Al"
        },
        {
            id: "gorev",
            name: "Görev Yöneticisi",
            icon: "bx-check-square",
            description: "Üyelerinize roller vermek veya duyuru yapmak için basit ve etkili bir yardımcı.",
            longDescription: "Görev Yöneticisi, sunucu içi etkileşimi artırmak için tasarlanmıştır. Hoş geldin mesajları, rol ödülleri, çekilişler ve anketler gibi birçok özelliği barındırır. Üyelerinizin sunucuda daha aktif olmasını sağlayacak tüm araçlar bu botta.",
            features: ["Otomatik Rol Verme", "Hoş Geldin Mesajları", "Seviye Sistemi", "Çekiliş & Anketler", "Özelleştirilebilir Komutlar"],
            purchaseUrl: "index.html#packages",
            purchaseButtonText: "Paketleri Gör ve Satın Al"
        }
    ],
    packages: [
        {
            id: "paket-temel",
            name: "Temel Paket",
            price: "₺150",
            priceType: "Tek Seferlik",
            features: ["1 Adet Bot Seçimi", "Temel Kurulum Desteği", "3 Ay Güncelleme Hakkı", "E-posta ile Destek"],
            // YENİ: Her paket için özel satın alma linki ve metin
            purchaseUrl: "https://odeme.link/temel-paket", // Örnek ödeme linki
            purchaseButtonText: "Bu Paketi Satın Al"
        },
        {
            id: "paket-pro",
            name: "Profesyonel Paket",
            price: "₺250",
            priceType: "Tek Seferlik",
            features: ["2 Adet Bot Seçimi", "Öncelikli Kurulum Desteği", "1 Yıl Güncelleme Hakkı", "Discord Üzerinden Destek", "Web Paneli Erişimi"],
            purchaseUrl: "https://odeme.link/pro-paket", // Örnek ödeme linki
            purchaseButtonText: "Bu Paketi Satın Al"
        },
        {
            id: "paket-kurumsal",
            name: "Kurumsal Paket",
            price: "₺400",
            priceType: "Tek Seferlik",
            features: ["Tüm Botlar Dahil", "Özel Kurulum & Yapılandırma", "Sınırsız Güncelleme Hakkı", "7/24 Özel Destek Hattı", "Özel Komut Geliştirme (1 adet)"],
            purchaseUrl: "https://odeme.link/kurumsal-paket", // Örnek ödeme linki
            purchaseButtonText: "Bu Paketi Satın Al"
        }
    ],
    testimonials: [
        { author: "Test Adam", role: "Test adamı", avatarUrl: "https://i.pravatar.cc/60?u=user1", text: "test için yazıyom" },

    ],
    faq: [
        { question: "Ödeme sonrası botu nasıl teslim alacağım?", answer: "Ödemeniz onaylandıktan sonra, botun davet linki ve kurulum talimatlarını içeren bir e-posta alacaksınız. Profesyonel ve Kurumsal paketlerde ise destek ekibimiz sizinle iletişime geçecektir." },
        { question: "Botlar sürekli güncelleniyor mu?", answer: "Evet, botlarımız Discord API değişikliklerine ve yeni özelliklere göre sürekli güncellenir. Aldığınız pakete göre belirli bir süre ücretsiz güncelleme hakkınız olur." }
    ],
    team: [
        {
            name: "2xMoshi",
            role: "Moshi Bot's Sahibi",
            avatarUrl: "2xmoshi.ico",
            socials: [
                { icon: 'bxl-youtube', url: 'https://youtube.com' },
                { icon: 'bxl-twitter', url: 'https://twitter.com' },
                { icon: 'bxl-discord', url: 'discord.com/users/876488783518912593' }
            ]
        }
    ]
};