
// Para empezar no existe algun elemento con id 'prev' en el DOM.
// Ahora bien, si la dejo la pagina se ejecuta pero da un error de 'Cannot read properties of null'
// (lo que no permite mostrar la info del inmueble).
// Sin embargo, si lo quito da el error que te pase por WhatsApp y todo deja de funcionar



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
  console.log(propiedadesweb)

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

};