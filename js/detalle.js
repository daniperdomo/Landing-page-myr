let currentIndex = 0;

document.getElementById('next').addEventListener('click', () => {
    const slides = document.querySelector('.slides');
    const totalSlides = slides.children.length;
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition(slides);
});

document.getElementById('prev').addEventListener('click', () => {
    const slides = document.querySelector('.slides');
    const totalSlides = slides.children.length;
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlidePosition(slides);
});

function updateSlidePosition(slides) {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}