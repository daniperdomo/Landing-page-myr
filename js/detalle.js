const ws = new WebSocket('ws://localhost:8080');
var propiedadesweb = []

const urlParams = new URLSearchParams(window.location.search);
const refCatastral = urlParams.get('source');

ws.onopen = () => {
  console.log('Conectado al servidor');
  ws.send(JSON.stringify(['propiedades']))
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  propiedadesweb = data

  const container = document.getElementById("property-container")
  container.innerHTML = ''

  propiedadesweb.forEach(propiedad => {
    if (propiedad.ref_catastral === refCatastral) {

      const detalles = document.createElement("div")
      detalles.classList.add("property-details")
      detalles.innerHTML = `<h2>Casa en ${propiedad.tipo_oferta}</h2>
              <p>Dirección: ${propiedad.sector}, ${propiedad.residentialcomplex}</p>
              <p>Precio: $${propiedad.precio}</p>
              <div class="property-features">
                  <div class="feature"><i class="fa-solid fa-bed"></i> Habitaciones: ${propiedad.hab}</div>
                  <div class="feature"><i class="fa-solid fa-bath"></i> Baños: ${propiedad.bano}</div>
                  <div class="feature"><i class="fa-solid fa-ruler-combined"></i> Área: ${propiedad.tamano_terreno} m²</div>
                  <div class="feature"><i class="fa-solid fa-car"></i> P/E: ${propiedad.pe}</div>     
                  <div class="feature"><i class="fa-solid fa-house-chimney-window"></i> Tipo: ${propiedad.tipo}</div>
                  <div class="feature"><i class="fa-solid fa-certificate"></i> Estatus: ${propiedad.tipo_oferta}</div>           
              </div>`

      container.appendChild(detalles)
    }
  });

  const form = document.getElementById('reserva-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que se envíe el formulario de forma predeterminada

    // Obtener los datos del formulario
    const formData = new FormData(form);

    // Agregar el valor de 'source' al objeto formData
    formData.append('source', refCatastral);

    // Enviar los datos al servidor utilizando fetch
    fetch('/submit-reserva', {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        console.log('Respuesta del servidor:', data);
        // Realizar cualquier acción adicional después de enviar los datos
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
        // Manejar el error de envío de datos
      });
  });

};