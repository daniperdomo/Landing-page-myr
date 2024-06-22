document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('welcome-message').textContent = `Bienvenido, ${username}`;
    }

    // Función para manejar el clic en las tarjetas principales
    function toggleSubCards(cardId, subCardsId) {
        const card = document.getElementById(cardId);
        const subCards = document.getElementById(subCardsId);

        card.addEventListener('click', function() {
            subCards.classList.toggle('show');
            if (subCards.classList.contains('show')) {
                subCards.style.maxHeight = subCards.scrollHeight + 'px';
            } else {
                subCards.style.maxHeight = '0';
            }
        });
    }

    // Manejar el clic en la tarjeta "Ingresar Propiedades"
    toggleSubCards('card-ingresar-propiedades', 'sub-cards-propiedades');

    // Manejar el clic en la tarjeta "Ingresar Captación"
    toggleSubCards('card-ingresar-captacion', 'sub-cards-captacion');

    // Manejar el clic en la tarjeta "Ver Captaciones"
    toggleSubCards('card-ver-captaciones', 'sub-cards-ver-captaciones');

    // Manejar el clic en la tarjeta "Ver Solicitud de carga de inmueble"
    toggleSubCards('card-ver-solicitudes', 'sub-cards-ver-solicitudes');
});