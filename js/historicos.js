function verCaptacion(id) {
  // Lógica para ver la captación
  alert(`Ver captación ${id}`);
  // Aquí podrías redirigir a una página de detalles, por ejemplo:
  // location.href = `/captacion/${id}`;
}

function editarCaptacion(id) {
  // Lógica para editar la captación
  alert(`Editar captación ${id}`);
  // Aquí podrías redirigir a una página de edición, por ejemplo:
  // location.href = `/captacion/editar/${id}`;
}

function eliminarCaptacion(id) {
  // Lógica para eliminar la captación
  const confirmacion = confirm(`¿Estás seguro de que deseas eliminar la captación ${id}?`);
  if (confirmacion) {
    alert(`Captación ${id} eliminada`);
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

function cargarCaptacion(id) {
  alert(`Cargar captación ${id}`);
}