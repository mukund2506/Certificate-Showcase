const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let slideCount = slides.length;
let currentIndex = 1; // start at first real slide after clone
let slideWidth = slider.clientWidth / 3; // 3 at a time

// Clone first and last few slides for infinite effect
const firstClones = [];
const lastClones = [];

for (let i = 0; i < 3; i++) {
    let firstClone = slides[i].cloneNode(true);
    firstClone.classList.add('clone');
    let lastClone = slides[slideCount - 1 - i].cloneNode(true);
    lastClone.classList.add('clone');

    firstClones.push(firstClone);
    lastClones.unshift(lastClone);
}

lastClones.forEach(clone => slider.insertBefore(clone, slider.firstChild));
firstClones.forEach(clone => slider.appendChild(clone));

// Update variables after cloning
const allSlides = document.querySelectorAll('.slide');
let totalSlides = allSlides.length;

// Set initial position
slider.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

// Handle slide movement
function moveToSlide(index) {
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(-${slideWidth * index}px)`;
    currentIndex = index;
}

// Loop check
slider.addEventListener('transitionend', () => {
    if (allSlides[currentIndex].classList.contains('clone')) {
        slider.style.transition = 'none';
        if (currentIndex <= 2) {
            currentIndex = slideCount + currentIndex;
        } else if (currentIndex >= totalSlides - 3) {
            currentIndex = currentIndex - slideCount;
        }
        slider.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
});

// Buttons
next.addEventListener('click', () => moveToSlide(currentIndex + 1));
prev.addEventListener('click', () => moveToSlide(currentIndex - 1));

// Auto slide
setInterval(() => moveToSlide(currentIndex + 1), 3000);

// Zoom modal
const modal = document.getElementById('zoomModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');

// Function to open modal
function openModal(type, src) {
    modal.style.display = 'flex';
    modalContent.innerHTML = type === 'video'
        ? `<video src="${src}" controls autoplay></video>`
        : `<img src="${src}" alt="Zoomed Content">`;
}

// Handle .slide items (certificates/videos)
document.querySelectorAll('.slide').forEach(slide => {
    slide.addEventListener('click', () => {
        let type = slide.getAttribute('data-type');
        let src = slide.getAttribute('data-src');
        openModal(type, src);
    });
});

// Handle resume
document.querySelectorAll('.resume').forEach(resume => {
    resume.addEventListener('click', () => {
        let type = resume.getAttribute('data-type');
        let src = resume.getAttribute('data-src');
        openModal(type, src);
    });
});

// Handle letter
document.querySelectorAll('.internship').forEach(letter => {
    letter.addEventListener('click', () => {
        let type = letter.getAttribute('data-type');
        let src = letter.getAttribute('data-src');
        openModal(type, src);
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    modalContent.innerHTML = '';
});
const goTopBtn = document.getElementById("goTopBtn");

window.addEventListener("scroll", function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        goTopBtn.classList.add("show");
    } else {
        goTopBtn.classList.remove("show");
    }
});

goTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior:"smooth" // Smooth scroll up
    });
});
