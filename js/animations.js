// Анимация при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Наблюдаем за всеми элементами с анимациями
document.querySelectorAll('.fade-in, .fade-in-up, .slide-in-left, .slide-in-right, .slide-in-bottom, .slide-in, .scale-in').forEach(element => {
    observer.observe(element);
});

// Анимация счетчиков
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const countTo = parseInt(target.getAttribute('data-count'));
            let count = 0;
            const increment = countTo / 50;
            
            target.classList.add('animate');
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= countTo) {
                    target.textContent = countTo;
                    clearInterval(timer);
                } else {
                    target.textContent = Math.floor(count);
                }
            }, 30);
            
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(number => {
    statObserver.observe(number);
});

// Изменение стиля хедера при прокрутке
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Анимация курсора прокрутки
const scrollDown = document.querySelector('.scroll-down');
if (scrollDown) {
    scrollDown.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// Параллакс эффект для фона
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.float-animation');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});