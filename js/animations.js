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

// Оптимизированная анимация счетчиков с requestAnimationFrame
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const countTo = parseInt(target.getAttribute('data-count'));
            const duration = 1500; // 1.5 секунды
            const startTime = performance.now();
            const startValue = 0;
            
            target.classList.add('animate');
            
            const animateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out)
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(startValue + (countTo - startValue) * easeProgress);
                
                target.textContent = currentValue;
                
                if (progress < 1) {
                    requestAnimationFrame(animateCount);
                } else {
                    target.textContent = countTo;
                }
            };
            
            requestAnimationFrame(animateCount);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(number => {
    statObserver.observe(number);
});

// Оптимизированное изменение стиля хедера с throttle
const header = document.getElementById('header');
let lastScroll = 0;
let ticking = false;

const updateHeader = () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
    ticking = false;
};

const onScroll = () => {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
};

window.addEventListener('scroll', onScroll, { passive: true });

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

// Оптимизированный параллакс эффект с requestAnimationFrame и throttle
let rafId = null;
const parallaxElements = document.querySelectorAll('.float-animation');

const updateParallax = () => {
    const scrolled = window.pageYOffset;
    
    // Отключаем параллакс после прокрутки более 100px для предотвращения рывков
    if (scrolled > 100) {
        parallaxElements.forEach(element => {
            element.classList.add('parallax-active');
            element.style.transform = '';
        });
    } else {
        const speed = 0.3;
        const yPos = -(scrolled * speed);
        
        parallaxElements.forEach(element => {
            element.classList.remove('parallax-active');
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    rafId = null;
};

window.addEventListener('scroll', () => {
    if (!rafId) {
        rafId = requestAnimationFrame(updateParallax);
    }
}, { passive: true });

// Инициализация при загрузке
updateParallax();