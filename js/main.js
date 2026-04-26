// Мобильное меню
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Фильтрация портфолио с использованием делегирования событий и DocumentFragment
const filterButtonsContainer = document.querySelector('.portfolio-filters');
const portfolioGrid = document.querySelector('.portfolio-grid');

if (filterButtonsContainer && portfolioGrid) {
    const filterButtons = filterButtonsContainer.querySelectorAll('.filter-btn');
    const portfolioItems = portfolioGrid.querySelectorAll('.portfolio-item');
    
    // Делегирование событий для кнопок фильтрации
    filterButtonsContainer.addEventListener('click', (e) => {
        const button = e.target.closest('.filter-btn');
        if (!button) return;
        
        // Убираем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс к текущей кнопке
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                // Force reflow
                void item.offsetWidth;
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (item.style.opacity === '0') {
                        item.style.display = 'none';
                    }
                }, 300);
            }
        });
    });
}

// Форма контактов
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Валидация формы
        const formData = new FormData(contactForm);
        
        // Здесь можно добавить отправку на сервер
        alert('Сообщение отправлено! Спасибо за обращение.');
        
        // Очистка формы
        contactForm.reset();
    });
}

// Плавная прокрутка к якорям с оптимизацией
let scrollTimeout = null;
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Очищаем предыдущий таймер
            if (scrollTimeout) {
                scrollTimeout = null;
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});