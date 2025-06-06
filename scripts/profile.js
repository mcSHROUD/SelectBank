// scripts/profile.js
document.addEventListener('DOMContentLoaded', function() {
    // Проверка авторизации
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    document.getElementById('user-name').textContent = user.name || 'Пользователь';
    
    // Загрузка избранных банков
    loadFavoriteBanks();
    
    // Выход из системы
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
    
    // Поиск банков
    document.getElementById('search-banks').addEventListener('input', function(e) {
        filterBanks(e.target.value);
    });
    
    // Сортировка банков
    document.getElementById('sort-banks').addEventListener('change', function(e) {
        sortBanks(e.target.value);
    });
});

function loadFavoriteBanks() {
    const favorites = JSON.parse(localStorage.getItem('favoriteBanks')) || [];
    const container = document.getElementById('favorites-container');
    const emptyState = document.getElementById('empty-favorites');
    
    if (favorites.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    container.innerHTML = '';
    
    favorites.forEach(bank => {
        const bankCard = document.createElement('div');
        bankCard.className = 'bank-card';
        bankCard.innerHTML = `
            <h3>${bank.name}</h3>
            <div class="bank-meta">
                <span class="rating">★ ${bank.rating}</span>
                <button class="remove-btn" data-id="${bank.id}">Удалить</button>
            </div>
            <p>${bank.description || 'Нет описания'}</p>
            <ul class="bank-features">
                ${bank.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
        `;
        container.appendChild(bankCard);
    });
    
    // Добавляем обработчики для кнопок удаления
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            removeFromFavorites(this.dataset.id);
        });
    });
}

function removeFromFavorites(bankId) {
    let favorites = JSON.parse(localStorage.getItem('favoriteBanks')) || [];
    favorites = favorites.filter(bank => bank.id !== bankId);
    localStorage.setItem('favoriteBanks', JSON.stringify(favorites));
    loadFavoriteBanks();
}

function filterBanks(searchTerm) {
    const banks = document.querySelectorAll('.bank-card');
    searchTerm = searchTerm.toLowerCase();
    
    banks.forEach(bank => {
        const name = bank.querySelector('h3').textContent.toLowerCase();
        bank.style.display = name.includes(searchTerm) ? 'block' : 'none';
    });
}

function sortBanks(criteria) {
    const container = document.getElementById('favorites-container');
    const banks = Array.from(document.querySelectorAll('.bank-card'));
    
    banks.sort((a, b) => {
        if (criteria === 'rating') {
            const ratingA = parseFloat(a.querySelector('.rating').textContent.replace('★ ', ''));
            const ratingB = parseFloat(b.querySelector('.rating').textContent.replace('★ ', ''));
            return ratingB - ratingA;
        } else {
            const nameA = a.querySelector('h3').textContent.toLowerCase();
            const nameB = b.querySelector('h3').textContent.toLowerCase();
            return nameA.localeCompare(nameB);
        }
    });
    
    // Очищаем и пересобираем контейнер
    container.innerHTML = '';
    banks.forEach(bank => container.appendChild(bank));
}