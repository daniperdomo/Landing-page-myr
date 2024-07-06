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

const ws = new WebSocket('ws://localhost:8080');
var propiedadesweb = []

ws.onopen = () => {
  console.log('Conectado al servidor');
  ws.send('propiedades')
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data)
  propiedadesweb = data

  const container = document.getElementById("property-container")
  container.innerHTML = ''

  propiedadesweb.forEach(propiedad => {
    const slider = document.createElement("div")
    slider.classList.add("slider")
    //modificar para que se puedan colocar las imagenes
    slider.innerHTML = `<div class="slides">
                <div class="slide"><img src="imagenes/casa.jpg" alt="Foto del inmueble 1"></div>
                <div class="slide"><img src="imagenes/Fondo.png" alt="Foto del inmueble 2"></div>
                <div class="slide"><img src="imagenes/pzo.png" alt="Foto del inmueble 3"></div>
            </div>
            <div class="controls">
                <button id="prev">&#10094;</button>
                <button id="next">&#10095;</button>
            </div>`

    container.appendChild(slider)

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
  });

};