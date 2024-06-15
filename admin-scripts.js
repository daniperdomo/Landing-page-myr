document.addEventListener('DOMContentLoaded', function() {
  const username = localStorage.getItem('username');
  if (username) {
    document.getElementById('welcome-message').textContent = `Bienvenido, ${username}`;
  }

  document.getElementById('card-ingresar-propiedades').addEventListener('click', function() {
    const subCards = document.getElementById('sub-cards-propiedades');
    subCards.classList.toggle('show');
    if (subCards.classList.contains('show')) {
      subCards.style.maxHeight = subCards.scrollHeight + 'px';
    } else {
      subCards.style.maxHeight = '0';
    }
  });

  document.getElementById('card-ingresar-captacion').addEventListener('click', function() {
    const subCards = document.getElementById('sub-cards-captacion');
    subCards.classList.toggle('show');
    if (subCards.classList.contains('show')) {
      subCards.style.maxHeight = subCards.scrollHeight + 'px';
    } else {
      subCards.style.maxHeight = '0';
    }
  });
});

