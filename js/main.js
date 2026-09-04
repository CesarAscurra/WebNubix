const header = document.getElementById('mainHeader');
const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('navMobileMenu');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.nav-mobile-link, .nav-link-item').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelectorAll('.nav-link-item, .nav-mobile-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll(`[href="${this.getAttribute('href')}"]`).forEach(l => l.classList.add('active'));

        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// Carrusel con flechas (cíclico)
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const cardGap = 24;

const cardWidth = window.innerWidth <= 576 ? 240 : 320;

let currentIndex = 0;

function getTotalCards() {
    return track.children.length;
}

function getMaxIndex() {
    const wrapperWidth = track.parentElement.clientWidth;
    const visibleCards = Math.floor((wrapperWidth + cardGap) / (cardWidth + cardGap));
    return Math.max(0, getTotalCards() - visibleCards);
}

function updateCarousel(instant = false) {
    const maxIndex = getMaxIndex();
    track.style.transition = instant ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    track.style.transform = `translateX(${-(currentIndex * (cardWidth + cardGap))}px)`;
}

nextBtn.addEventListener('click', () => {
    const maxIndex = getMaxIndex();
    if (currentIndex >= maxIndex) {
        currentIndex = 0;
        updateCarousel(true);
        setTimeout(() => updateCarousel(false), 20);
    } else {
        currentIndex++;
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex <= 0) {
        currentIndex = getMaxIndex();
        updateCarousel(true);
        setTimeout(() => updateCarousel(false), 20);
    } else {
        currentIndex--;
        updateCarousel();
    }
});

let isDragging = false;
let startX = 0;

track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    track.classList.add('dragging');
});

window.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        track.classList.remove('dragging');
    }
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    const maxIndex = getMaxIndex();
    if (delta > 50) {
        isDragging = false;
        track.classList.remove('dragging');
        if (currentIndex <= 0) {
            currentIndex = maxIndex;
            updateCarousel(true);
            setTimeout(() => updateCarousel(false), 20);
        } else {
            currentIndex--;
            updateCarousel();
        }
    } else if (delta < -50) {
        isDragging = false;
        track.classList.remove('dragging');
        if (currentIndex >= maxIndex) {
            currentIndex = 0;
            updateCarousel(true);
            setTimeout(() => updateCarousel(false), 20);
        } else {
            currentIndex++;
            updateCarousel();
        }
    }
});

window.addEventListener('resize', () => {
    updateCarousel(true);
});

updateCarousel();

// Formulario de contacto
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por contactarnos! Te responderemos a la brevedad.');
    contactForm.reset();
});
