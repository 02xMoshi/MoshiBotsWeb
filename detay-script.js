document.addEventListener('DOMContentLoaded', () => {
    const itemList = document.getElementById('item-list');
    const itemContent = document.getElementById('item-content');
    const showBotsBtn = document.getElementById('show-bots');
    const showPackagesBtn = document.getElementById('show-packages');

    let currentType = 'bot';

    const populateSidebar = (type) => {
        itemList.innerHTML = '';
        const data = (type === 'bot') ? siteConfig.bots : siteConfig.packages;
        data.forEach(item => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = item.name;
            link.dataset.id = item.id;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                displayContent(item.id, type);
            });
            itemList.appendChild(link);
        });
    };

    const displayContent = (id, type) => {
        const data = (type === 'bot') ? siteConfig.bots : siteConfig.packages;
        const item = data.find(i => i.id === id);
        if (!item) {
            itemContent.innerHTML = `<p>İstenen içerik bulunamadı.</p>`;
            return;
        }

        let contentHTML = '';
        // DEĞİŞİKLİK: HTML oluşturma kısımları artık config'den gelen link ve metni kullanıyor.
        if (type === 'bot') {
            contentHTML = `
                <h1>${item.name}</h1>
                <p>${item.longDescription}</p>
                <h3>Öne Çıkan Özellikler</h3>
                <ul>
                    ${item.features.map(f => `<li><i class='bx bx-check-shield'></i>${f}</li>`).join('')}
                </ul>
                <a href="${item.purchaseUrl}" class="btn btn-primary">${item.purchaseButtonText}</a>
            `;
        } else { // package
            contentHTML = `
                <h1>${item.name}</h1>
                <div class="price">${item.price} <span>/ ${item.priceType}</span></div>
                <h3>Paket İçeriği</h3>
                <ul>
                    ${item.features.map(f => `<li><i class='bx bx-check'></i>${f}</li>`).join('')}
                </ul>
                <a href="${item.purchaseUrl}" class="btn btn-primary" target="_blank">${item.purchaseButtonText}</a>
            `;
        }
        itemContent.innerHTML = contentHTML;

        document.querySelectorAll('.item-list a').forEach(a => a.classList.remove('active'));
        document.querySelector(`.item-list a[data-id="${id}"]`).classList.add('active');
    };

    showBotsBtn.addEventListener('click', () => {
        currentType = 'bot';
        showBotsBtn.classList.add('active');
        showPackagesBtn.classList.remove('active');
        populateSidebar('bot');
        // Sayfa ilk yüklendiğinde ilk botu göster
        if (siteConfig.bots.length > 0) {
            displayContent(siteConfig.bots[0].id, 'bot');
        }
    });

    showPackagesBtn.addEventListener('click', () => {
        currentType = 'package';
        showPackagesBtn.classList.add('active');
        showBotsBtn.classList.remove('active');
        populateSidebar('package');
        // Sayfa ilk yüklendiğinde ilk paketi göster
        if (siteConfig.packages.length > 0) {
            displayContent(siteConfig.packages[0].id, 'package');
        }
    });

    // Sayfa ilk yüklendiğinde URL'yi kontrol et
    const params = new URLSearchParams(window.location.search);
    const initialId = params.get('id');
    const initialType = params.get('type') || 'bot';

    if (initialType === 'package') {
        showPackagesBtn.click();
    } else {
        showBotsBtn.click();
    }
    
    // URL'de belirli bir ID varsa onu göster
    if (initialId) {
        displayContent(initialId, initialType);
    }
});