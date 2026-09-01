// Auto-rotate carousel
(function() {
  const slides = document.querySelectorAll('.carousel-input');
  if (!slides.length) return;
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  const rotateInterval = 4000; // 4 seconds
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    slides[currentSlide].checked = true;
  }
  
  setInterval(nextSlide, rotateInterval);
})();
