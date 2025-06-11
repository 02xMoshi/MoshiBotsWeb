document.addEventListener('DOMContentLoaded', () => {
    // Mobil Menü
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Daktilo Efekti
    const typedTextSpan = document.getElementById("typed-text");
    if (typedTextSpan && siteConfig.heroTypedTexts && siteConfig.heroTypedTexts.length > 0) {
        const texts = siteConfig.heroTypedTexts;
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            typedTextSpan.style.borderRight = '2px solid var(--text-muted-color)';
            const currentText = texts[textIndex];
            if (isDeleting) {
                typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            let typeSpeed = 150;
            if (isDeleting) { typeSpeed /= 2; }
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // --- ANASAYFA İÇERİK YÜKLEME ---
    const botsContainer = document.getElementById('bots-container');
    const packagesContainer = document.getElementById('packages-container');
    const faqContainer = document.getElementById('faq-container');
    const teamContainer = document.getElementById('team-container');

    if (botsContainer) { 
        siteConfig.bots.forEach(bot => { 
            botsContainer.innerHTML += `<div class="bot-card"><div class="bot-icon"><i class='bx ${bot.icon}'></i></div><h3 class="bot-name">${bot.name}</h3><p class="bot-description">${bot.description}</p><button class="btn btn-secondary modal-trigger" data-id="${bot.id}" data-type="bot">Detaylar</button></div>`; 
        }); 
    }
    if (packagesContainer) { 
        siteConfig.packages.forEach(pkg => { 
            packagesContainer.innerHTML += `<div class="package-card"><h3 class="package-name">${pkg.name}</h3><div class="package-price">${pkg.price} <span>/ ${pkg.priceType}</span></div><ul class="package-features">${pkg.features.map(f => `<li>${f}</li>`).join('')}</ul><button class="btn btn-primary modal-trigger" data-id="${pkg.id}" data-type="package">Detaylar & Satın Al</button></div>`; 
        }); 
    }
    if (faqContainer) { siteConfig.faq.forEach(f => { faqContainer.innerHTML += `<details class="faq-item"><summary class="faq-question">${f.question}</summary><p class="faq-answer">${f.answer}</p></details>`; }); }
    
    if (teamContainer) {
        siteConfig.team.forEach(member => {
            const socialsHTML = member.socials.map(social => `<a href="${social.url}" target="_blank" rel="noopener noreferrer"><i class='bx ${social.icon}'></i></a>`).join('');
            teamContainer.innerHTML += `<div class="team-card"><img src="${member.avatarUrl}" alt="${member.name}" class="team-avatar"><h3 class="team-name">${member.name}</h3><p class="team-role">${member.role}</p><div class="team-socials">${socialsHTML}</div></div>`;
        });
    }

    // --- MODAL (POP-UP) MANTIĞI ---
    const modal = document.getElementById('details-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const itemListModal = document.getElementById('item-list-modal');
    const itemContentModal = document.getElementById('item-content-modal');
    const showBotsBtnModal = document.getElementById('show-bots-modal');
    const showPackagesBtnModal = document.getElementById('show-packages-modal');
    
    const populateSidebar = (type) => {
        itemListModal.innerHTML = '';
        const data = (type === 'bot') ? siteConfig.bots : siteConfig.packages;
        data.forEach(item => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = item.name;
            link.dataset.id = item.id;
            link.addEventListener('click', (e) => { e.preventDefault(); displayContent(item.id, type); });
            itemListModal.appendChild(link);
        });
    };

    const displayContent = (id, type) => {
        const data = (type === 'bot') ? siteConfig.bots : siteConfig.packages;
        const item = data.find(i => i.id === id);
        if (!item) { itemContentModal.innerHTML = `<p>İstenen içerik bulunamadı.</p>`; return; }
        let contentHTML = '';
        if (type === 'bot') {
            contentHTML = `<h1>${item.name}</h1><p>${item.longDescription}</p><h3>Öne Çıkan Özellikler</h3><ul>${item.features.map(f => `<li><i class='bx bx-check-shield'></i>${f}</li>`).join('')}</ul><a href="${item.purchaseUrl}" class="btn btn-primary">${item.purchaseButtonText}</a>`;
        } else {
            contentHTML = `<h1>${item.name}</h1><div class="price">${item.price} <span>/ ${item.priceType}</span></div><h3>Paket İçeriği</h3><ul>${item.features.map(f => `<li><i class='bx bx-check'></i>${f}</li>`).join('')}</ul><a href="${item.purchaseUrl}" class="btn btn-primary" target="_blank">${item.purchaseButtonText}</a>`;
        }
        itemContentModal.innerHTML = contentHTML;
        document.querySelectorAll('#item-list-modal a').forEach(a => a.classList.remove('active'));
        document.querySelector(`#item-list-modal a[data-id="${id}"]`).classList.add('active');
    };

    showBotsBtnModal.addEventListener('click', () => {
        showBotsBtnModal.classList.add('active');
        showPackagesBtnModal.classList.remove('active');
        populateSidebar('bot');
        if (siteConfig.bots.length > 0) displayContent(siteConfig.bots[0].id, 'bot');
    });
    showPackagesBtnModal.addEventListener('click', () => {
        showPackagesBtnModal.classList.add('active');
        showBotsBtnModal.classList.remove('active');
        populateSidebar('package');
        if (siteConfig.packages.length > 0) displayContent(siteConfig.packages[0].id, 'package');
    });

    const openModal = (id, type) => {
        if (type === 'package') {
            showPackagesBtnModal.click();
        } else {
            showBotsBtnModal.click();
        }
        displayContent(id, type);
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Arka plan kaydırmayı engelle
    };
    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Kaydırmayı geri aç
    };

    document.body.addEventListener('click', function(event) {
        if (event.target.closest('.modal-trigger')) {
             const trigger = event.target.closest('.modal-trigger');
             const id = trigger.dataset.id;
             const type = trigger.dataset.type;
             openModal(id, type);
        }
    });
    
    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === "Escape") closeModal(); });


    // --- YORUMLAR SLIDER MANTIĞI (DÜZELTİLMİŞ) ---
    const testimonialsWrapper = document.getElementById('testimonials-wrapper');
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    if (track && siteConfig.testimonials.length > 0) {
        const ITEMS_PER_SLIDE = 3;
        const slides = [];
        for (let i = 0; i < siteConfig.testimonials.length; i += ITEMS_PER_SLIDE) {
            slides.push(siteConfig.testimonials.slice(i, i + ITEMS_PER_SLIDE));
        }

        slides.forEach(slideContent => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'testimonial-slide';
            slideContent.forEach(t => {
                slideDiv.innerHTML += `<div class="testimonial-card"><p class="testimonial-text">"${t.text}"</p><div class="testimonial-author"><img src="${t.avatarUrl}" alt="${t.author}" class="author-avatar"><div class="author-info"><span class="author-name">${t.author}</span><span class="author-role">${t.role}</span></div></div></div>`;
            });
            track.appendChild(slideDiv);
        });

        let currentPage = 0;
        const totalPages = slides.length;
        let autoPlayInterval;

        const showPage = (pageIndex) => {
            if (track.querySelector('.testimonial-slide')) {
                const slideWidth = track.querySelector('.testimonial-slide').offsetWidth;
                const offset = -pageIndex * slideWidth;
                track.style.transform = `translateX(${offset}px)`;
            }
        };

        const next = () => { currentPage = (currentPage + 1) % totalPages; showPage(currentPage); };
        const prev = () => { currentPage = (currentPage - 1 + totalPages) % totalPages; showPage(currentPage); };
        const startAutoPlay = () => { stopAutoPlay(); autoPlayInterval = setInterval(next, 5000); };
        const stopAutoPlay = () => clearInterval(autoPlayInterval);

        nextBtn.addEventListener('click', next);
        prevBtn.addEventListener('click', prev);
        testimonialsWrapper.addEventListener('mouseenter', stopAutoPlay);
        testimonialsWrapper.addEventListener('mouseleave', startAutoPlay);

        if (totalPages > 1) {
             startAutoPlay();
        } else {
             prevBtn.style.display = 'none';
             nextBtn.style.display = 'none';
        }
    }
});