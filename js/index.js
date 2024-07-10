document.addEventListener("DOMContentLoaded", function() {
    // Carrusel de equipo
    const teamCarousel = document.querySelector('.team-carousel');
    let isDown = false;
    let startX;
    let scrollLeft;
  
    teamCarousel.addEventListener('mousedown', (e) => {
      isDown = true;
      teamCarousel.classList.add('active');
      startX = e.pageX - teamCarousel.offsetLeft;
      scrollLeft = teamCarousel.scrollLeft;
    });
    teamCarousel.addEventListener('mouseleave', () => {
      isDown = false;
      teamCarousel.classList.remove('active');
    });
    teamCarousel.addEventListener('mouseup', () => {
      isDown = false;
      teamCarousel.classList.remove('active');
    });
    teamCarousel.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - teamCarousel.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      teamCarousel.scrollLeft = scrollLeft - walk;
    });
  
    // Contador animado
    const propertyCounter = document.querySelector('.property-counter');
    if (propertyCounter) {
      let count = 0;
      const target = 350;
      const speed = 10; // Aumentar la velocidad
  
      const updateCount = () => {
        if (count < target) {
          count++;
          propertyCounter.textContent = `+${count} propiedades`;
          setTimeout(updateCount, speed);
        } else {
          propertyCounter.textContent = `+${target} propiedades`;
        }
      };
      updateCount();
    }
  });
  