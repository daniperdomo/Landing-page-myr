const ws = new WebSocket("ws://localhost:8080");
var propiedadesweb = [];

ws.onopen = () => {
  console.log("Conectado al servidor");
  ws.send(JSON.stringify(["propiedades"]));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
  propiedadesweb = data;

  const container = document.getElementById("container");
  container.innerHTML = "";

  propiedadesweb.forEach((propiedad) => {
    if (propiedad.cargado != 0) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `<div class="card-content">
              <a href="detalle-propiedad.html"><img src="imagenes/casa.jpg" alt="Propiedad en Venta" class="property-image"></a>
              <h5>Propiedad en ${propiedad.tipo_oferta}</h5>
              <p>${propiedad.sector}, ${propiedad.residentialcomplex}</p>
              <div class="datos-propiedad">
                <div class="dato">
                  <i class="fa-solid fa-dollar-sign"></i>
                  ${propiedad.precio}
                </div>
                <div class="dato">
                  <i class="fa-solid fa-ruler-combined"></i>
                  ${propiedad.tamano_terreno} m²
                </div>
                <div class="dato">
                  <i class="fa-solid fa-bed"></i>
                  ${propiedad.hab}
                </div>
                <div class="dato">
                  <i class="fa-solid fa-bath"></i>
                  ${propiedad.bano}
                </div>
                <div class="dato">
                  <i class="fa-solid fa-car"></i> 
                  ${propiedad.pe}
                </div>
              </div>
              <br>
              <center><a class="btn btn-primary" href="detalle-propiedad.html">Ver Propiedad</a></center>
            </div>`;

      container.appendChild(card);
    }
  });
};
