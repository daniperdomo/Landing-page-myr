document.addEventListener('DOMContentLoaded', function() {
  var formSelection = document.getElementById('form-selection');
  var ofertaForm = document.getElementById('oferta-form');
  var consultaForm = document.getElementById('consulta-form');

  formSelection.addEventListener('change', function() {
    if (formSelection.value === 'oferta') {
      ofertaForm.classList.remove('hidden');
      consultaForm.classList.add('hidden');
    } else if (formSelection.value === 'consulta') {
      consultaForm.classList.remove('hidden');
      ofertaForm.classList.add('hidden');
    } else {
      ofertaForm.classList.add('hidden');
      consultaForm.classList.add('hidden');
    }
  });
});