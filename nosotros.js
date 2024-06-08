document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggle-button');
    const textContainer = document.querySelector('.text-container');
  
    toggleButton.addEventListener('click', function () {
      if (textContainer.classList.contains('expanded')) {
        textContainer.classList.remove('expanded');
        toggleButton.textContent = 'Leer más';
      } else {
        textContainer.classList.add('expanded');
        toggleButton.textContent = 'Leer menos';
      }
    });
  });
  
    