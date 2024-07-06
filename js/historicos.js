const ws = new WebSocket('ws://localhost:8080');
var captaciones = []

ws.onopen = () => {
  console.log('Conectado al servidor');
  ws.send('historico');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  captaciones = data;
  console.log(captaciones)

  const historicoList = document.getElementById("historico-list")
  historicoList.innerHTML = ''

  captaciones.forEach(captacion => {
    const item = document.createElement("div")
    item.classList.add("historico-item")
    item.innerHTML = `
      <div class="historico-content">
        <h3>${captacion.contactname}</h3>
        <p>${captacion.sector}, ${captacion.residentialcomplex}</p>
      </div>
      <div class="historico-actions">
        <button onclick="verCaptacion(${captacion.contactname})">Ver</button>
        <button onclick="editarCaptacion(${captacion.contactname})">Editar</button>
        <button onclick="eliminarCaptacion(${captacion.contactname})">Eliminar</button>
        <button onclick="cargarCaptacion(${captacion.contactname})">Cargar</button>
      </div>
    `;

    historicoList.appendChild(item)
  });
};



function verCaptacion(nombre) {
  // Lógica para ver la captación
  alert(`Ver captación ${nombre}`);
  // Aquí podrías redirigir a una página de detalles, por ejemplo:
  // location.href = `/captacion/${id}`;
}

function editarCaptacion(nombre) {
  // Lógica para editar la captación
  alert(`Editar captación ${nombre}`);
  // Aquí podrías redirigir a una página de edición, por ejemplo:
  // location.href = `/captacion/editar/${id}`;
}

function eliminarCaptacion(nombre) {
  // Lógica para eliminar la captación
  const confirmacion = confirm(`¿Estás seguro de que deseas eliminar la captación ${nombre}?`);
  if (confirmacion) {
    alert(`Captación ${nombre} eliminada`);
    // Aquí podrías hacer una llamada a la API para eliminar la captación, por ejemplo:
    // fetch(`/api/captaciones/${id}`, { method: 'DELETE' })
    //   .then(response => {
    //     if (response.ok) {
    //       alert('Captación eliminada');
    //       // Elimina el elemento del DOM si es necesario
    //       document.querySelector(`.captacion-item[data-id="${id}"]`).remove();
    //     } else {
    //       alert('Error al eliminar la captación');
    //     }
    //   });
  }
}

function cargarCaptacion(nombre) {
  alert(`Cargar captación ${nombre}`);
}