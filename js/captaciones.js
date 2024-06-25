function volver() {
    // Obtener el valor del parámetro "source" de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');

    if (source === 'admin') {
      // Redireccionar a la página de admin
      window.location.href = 'administrador.html';
    } else if (source === 'asesor') {
      // Redireccionar a la página de asesor
      window.location.href = 'asesor.html';
    } else {
      // Si no se proporciona un valor válido para "source", redireccionar a una página predeterminada
      window.location.href = 'index.html';
    }
}


// Función para obtener la fecha y hora actual
function getCurrentTimestamp() {
  var now = new Date();
  return now.toISOString();
}

// Asignar la fecha y hora actual al campo oculto antes de enviar el formulario
document.getElementById('formulario').addEventListener('submit', function(e) {
  var timestampField = document.getElementById('timestamp');
  var timestamp = getCurrentTimestamp();
  timestampField.value = timestamp;

  // Imprimir la fecha y hora en la consola del navegador
  console.log('Fecha y hora de envío:', timestamp);
});