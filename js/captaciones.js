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


const input = document.getElementById('hab');
const divsContainer = document.getElementById('divs_container');

input.addEventListener('input', createDivs);

function createDivs() {
const count = parseInt(input.value);
divsContainer.innerHTML = ''; // Limpiar los divs existentes

for (let i = 1; i <= count; i++) {
  const div = document.createElement('div');
  div.className = 'form-group';
  div.innerHTML = `
    <label for="dormitorio_cu${i}" class="checkbox-label">Cuarto ${i}:</label>
    <div class="checkbox-group">
      <label for="cama_cu${i}">
      <input type="checkbox" id="cama_cu${i}" name="cama_cu${i}">
        Camas
      </label>
      <label for="colchon_cu${i}">
        <input type="checkbox" id="colchon_cu${i}" name="colchon_cu${i}">
        Colchón
      </label>
      <label for="peinadora_cu${i}">
        <input type="checkbox" id="peinadora_cu${i}" name="peinadora_cu${i}">
        Peinadora
      </label>
      <label for="vestier_cu${i}">
        <input type="checkbox" id="vestier_cu${i}" name="vestier_cu${i}">
        Vestier
      </label>
      <label for="aire_cu${i}">
        <input type="checkbox" id="aire_cu${i}" name="aire_cu${i}">
        A/A
      </label>
      <label for="tv_cu${i}">
        <input type="checkbox" id="tv_cu${i}" name="tv_cu${i}">
        Televisor
      </label>
      <label for="mesa_noche_cu${i}">
        <input type="checkbox" id="mesa_noche_cu${i}" name="mesa_noche_cu${i}">
        Mesa de noche
      </label>
      <label for="poltrona_cu${i}">
        <input type="checkbox" id="poltrona_cu${i}" name="poltrona_cu${i}">
        Poltrona
      </label>
      <label for="directv_cu${i}">
        <input type="checkbox" id="directv_cu${i}" name="directv_cu${i}">
        Directv
      </label>
      <label for="closet_cu${i}">
        <input type="checkbox" id="closet_cu${i}" name="closet_cu${i}">
        Closet
      </label>
      <label for="lamparas_cu${i}">
        <input type="checkbox" id="lamparas_cu${i}" name="lamparas_cu${i}">
        Lámparas
      </label>
      <label for="espejo_cu${i}">
        <input type="checkbox" id="espejo_cu${i}" name="espejo_cu${i}">
        Espejo
      </label>
      <label for="perchero_cu${i}">
        <input type="checkbox" id="perchero_cu${i}" name="perchero_cu${i}">
        Perchero
      </label>
    </div>
  `;
  divsContainer.appendChild(div);
}
}