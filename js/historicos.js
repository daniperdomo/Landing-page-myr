const ws = new WebSocket('ws://localhost:8080');
var captaciones = []

ws.onopen = () => {
  console.log('Conectado al servidor');
  ws.send(JSON.stringify(["historico"]));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data)
  if (data[0]== 'historico'){
    captaciones = data[1];

    const historicoList = document.getElementById("historico-list")
    historicoList.innerHTML = ''

    captaciones.forEach(captacion => {
      const item = document.createElement("div")
      item.classList.add("historico-item")
      item.innerHTML = `
        <div class="historico-content">
          <h3>Ref. Catastral: ${captacion.ref_catastral} / Cliente: ${captacion.contactname}</h3>
          <p>${captacion.sector}, ${captacion.residentialcomplex}</p>
        </div>
        <div class="historico-actions">
          <button onclick="verCaptacion('${captacion.ref_catastral}')">Ver</button>
          <button onclick="cargarCaptacion('${captacion.ref_catastral}')">Cargar</button>
        </div>
      `;

      historicoList.appendChild(item)
    });
  }
  if(data[0] == 'detalle'){
    data.shift()  
    const contenedorHistorico = document.getElementById("contenedor-historico")
    contenedorHistorico.innerHTML = ''

    const detalleCaptacion = document.createElement("div")
    detalleCaptacion.innerHTML = `
          <div class="form-container">
          <h2>Información de Cliente</h2>
              <fieldset>
                <legend>Datos Generales del Cliente</legend>
                <div class="form-grid">
                    <!--Tipo de identificacion-->
                    <label>Tipo de Identificación:</label>
                    <div class="box">${data[0].tipo_id}</div>
                    
                    <!--Cedula-->
                    <label>Cédula de Identidad:</label>
                    <div class="box">${data[0].cedula}</div>
                    
                    <!--RIF-->
                    <label>Registro de Información Fiscal (R.I.F):</label>
                    <div class="box">${data[0].rif}</div>
                    
                    <!--Asiento registral-->
                    <label>Asiento registral:</label>
                    <div class="box">${data[0].asiento}</div>

                    <!--Numero de protocolo-->
                    <label>Número de protocolo:</label>
                    <div class="box">${data[0].n_protocolo}</div>

                    <!--Folio real-->
                    <label>Folio real:</label>
                    <div class="box">${data[0].f_real}</div>

                    <!--Referencia Catastral-->
                    <label>Referencia Catastral:</label>
                    <div class="box">${data[0].ref_catastral}</div>

                    
                  </div>
            </fieldset>
        </div>
        <div class="form-container">
          <h2>Información de Inmuebles</h2>
            <fieldset>
              <legend>Datos Generales del Inmueble</legend>
              <div class="info">
                <div class="field-group">

                  <!--Sector-->
                  <div class="field-row">
                    <label for="sector">Sector:</label>
                    <div class="box">${data[0].sector}</div>
                  </div>
                  <!--Conjunto residencial-->
                  <div class="field-row">
                    <label for="residential_complex">Conjunto Residencial:</label>
                    <div class="box">${data[0].residentialcomplex}</div>
                  </div>

                  <!--Nombre de contacto-->
                  <div class="field-row">
                    <label for="contact_name">Nombre de Contacto:</label>
                    <div class="box">${data[0].contactname}</div>
                  </div>

                  <!--Telefono-->
                  <div class="field-row">
                    <label for="phone">Teléfono:</label>
                    <div class="box">${data[0].phone}</div>
                  </div>

                  <!--Precio (USD)-->
                  <div class="field-row">
                    <label for="precio">Precio (USD):</label>
                    <div class="box">${data[0].precio}</div>
                  </div>

                  <!--Tipo de oferta (venta o alquiler)-->
                  <div class="field-row">
                    <!--Seleccionar-->
                    <label for="tipo_oferta" class="mr-2">Tipo de oferta:</label>
                    <div class="box">${data[0].tipo_oferta}</div>   
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <div class="info form-inline">

                  <!--Tipo de inmueble-->
                  <div class="contenedor">
                    <label>Tipo:</label>
                    <div class="box">${data[0].tipo}</div>
                  </div>
                  <br>

                  <!--Niveles de inmueble-->
                  <div class="contenedor">
                    <label>Niveles:</label>
                    <div class="box">${data[0].niveles}</div>
                  </div>
                  <br>

                  <!--Terreno-->
                  <div class="contenedor">
                    <label>Terreno:</label>
                    <div class="box">${data[0].tamano_terreno}</div> 
                  </div>           
                  <br>

                  <!--Construccion-->
                  <div class="contenedor">
                    <label>Construcción:</label>
                    <div class="box">${data[0].tamanoconst}</div>
                  </div>            
                  <br>

                  <!--Habitaciones-->
                  <div class="contenedor">
                    <label>Hab:</label>
                    <div class="box">${data[0].hab}</div> 
                  </div>           
                  <br>

                  <!--Baños-->
                  <div class="contenedor">
                    <label>Baños:</label>
                    <div class="box">${data[0].bano}</div>
                  </div>

                  <!--Medio baño-->
                  <div class="contenedor">
                    <label>1/2 Baños:</label>
                    <div class="box">${data[0].mediobano}</div>
                  </div>

                  <!--Servicio-->
                  <div class="contenedor">
                    <label>Servicio:</label>
                    <div class="box">${data[0].servicio}</div>
                  </div>

                  <!--Maletero-->
                  <div class="contenedor">
                    <label>Maletero:</label>
                    <div class="box">${data[0].maletero > 0 ? 'Sí' : 'No'}</div>
                  </div>
                  <!--Terraza-->
                  <div class="contenedor">
                    <label>Terraza:</label>
                    <div class="box">${data[0].terraza > 0 ? 'Sí' : 'No'}</div>
                  </div>

                  <!--Oficina-->
                  <div class="contenedor">
                    <label>Oficina:</label>
                    <div class="box">${data[0].oficina === 'oficina_si' ? 'Sí' : 'No'}</div> 
                  </div>              

                  <!--Puestos de estacionamiento-->
                  <div class="contenedor">
                    <label>P/E:</label>
                    <div class="box">${data[0].pe}</div>
                  </div>
              </div>
              <br>
              <div class="form-group form-inline">
                <div id="container">
                  <label>Escaleras: </label>
                  <div class="box">${data[0].escaleras}</div>
                </div>
                
                <div id="container">
                  <label>Piso: </label>
                  <div class="box">${data[0].piso}</div>
                </div>
                
            </div>
              <!--Cocina/servicio-->
              <div class="form-group">
                  <label for="cocina-servicio" class="checkbox-label">Cocina/Servicio:</label>
                  <div class="checkbox-group">
                    <label for="vitroceramica">Vitrocerámica: ${data[1].vitroceramica === 1 ? 'Sí' : 'No'}</label>
                    <label for="electrica">Eléctrica: ${data[1].electrica === 1 ? 'Sí' : 'No'}</label>
                    <label for="gas">Gas: ${data[1].gas === 1 ? 'Sí' : 'No'}</label>
                    <label for="encimera">Encimera: ${data[1].encimera === 1 ? 'Sí' : 'No'}</label>
                    <label for="mamposteria">Mampostería: ${data[1].mamposteria === 1 ? 'Sí' : 'No'}</label>
                    <label for="horno">Horno: ${data[1].horno === 1 ? 'Sí' : 'No'}</label>
                    <label for="microondas">Microondas: ${data[1].microondas === 1 ? 'Sí' : 'No'}</label>
                    <label for="salpicadero">Salpicadero: ${data[1].salpicadero === 1 ? 'Sí' : 'No'}</label>
                    <label for="filtro_agua">Filtro de agua: ${data[1].filtro_agua === 1 ? 'Sí' : 'No'}</label>
                    <label for="campana">Campana: ${data[1].campana === 1 ? 'Sí' : 'No'}</label>
                    <label for="freezer">Freezer: ${data[1].freezer === 1 ? 'Sí' : 'No'}</label>
                    <label for="nevera">Nevera: ${data[1].nevera === 1 ? 'Sí' : 'No'}</label>
                    <label for="lavadora">Lavadora: ${data[1].lavadora === 1 ? 'Sí' : 'No'}</label>
                    <label for="secadora">Secadora: ${data[1].secadora === 1 ? 'Sí' : 'No'}</label>
                  </div>
              </div>
              <!--Sala/comedor-->
              <div class="form-group">
                  <label for="sala-comedor" class="checkbox-label">Sala/Comedor:</label>
                  <div class="checkbox-group">
                    <label for="mesa_sala">Mesa: ${data[2].mesa_sala === 1 ? 'Sí' : 'No'}</label>
                    <label for="sillas_sala">Sillas: ${data[2].sillas === 1 ? 'Sí' : 'No'}</label>
                    <label for="aire_sala">A/A: ${data[2].aire_sala === 1 ? 'Sí' : 'No'}</label>
                    <label for="vitrina_sala">Vitrina: ${data[2].vitrina_sala === 1 ? 'Sí' : 'No'}</label>
                    <label for="cantv_sala">Cantv: ${data[2].cantv_sala === 1 ? 'Sí' : 'No'}</label>
                    <label for="internet_sala">Internet: ${data[2].internet_sala === 1 ? 'Sí' : 'No'}</label>
                    <label for="tv_sala">Televisor: ${data[2].tv_sala === 1 ? 'Sí' : 'No'}</label>
                    <label for="directv_sala">Directv: ${data[2].directv_sala === 1 ? 'Sí' : 'No'}</label>
                    <label for="sofa_sala">Sofá: ${data[2].sofa_sala === 1 ? 'Sí' : 'No'}</label>
                    <label for="poltrona_sala">Poltrona: ${data[2].poltrona_sala === 1 ? 'Sí' : 'No'}</label>
                    <label for="biblioteca_sala">Biblioteca: ${data[2].biblioteca_sala === 1 ? 'Sí' : 'No'}</label>
                    <label for="ceibo_sala">Ceibo: ${data[2].ceibo_sala === 1 ? 'Sí' : 'No'}</label>
                    <label for="htheater_sala">Cine: ${data[2].htheater_sala === 1 ? 'Sí' : 'No'}</label>
                    <label for="lamparas_sala">Lámparas: ${data[2].lamparas_sala === 1 ? 'Sí' : 'No'}</label>
                  </div>
              </div>

              <div id="divs_container"></div>

              <!--Area externa-->
              <div class="form-group">
                  <label for="area-externa" class="checkbox-label">Área externa:</label>
                  <div class="checkbox-group">
                    <label for="patio_externa">Patio: ${data[3].patio_externa === 1 ? 'Sí' : 'No'}</label>
                    <label for="piscina_externa">Piscina: ${data[3].piscina_externa === 1 ? 'Sí' : 'No'}</label>
                    <label for="parrillera_externa">Parrillera: ${data[3].parillera_externa === 1 ? 'Sí' : 'No'}</label>
                    <label for="jardinera_externa">Jardinera: ${data[3].jardinera_externa === 1 ? 'Sí' : 'No'}</label>
                    <label for="gimnasio_externa">Gimnasio: ${data[3].gimnasio_externa === 1 ? 'Sí' : 'No'}</label>
                    <label for="fuente_externa">Fuente: ${data[3].fuente_externa === 1 ? 'Sí' : 'No'}</label>
                    <label for="tanque_agua_externa">Tanque de Agua: ${data[3].tanque_agua_externa === 1 ? 'Sí' : 'No'}</label>
                    <label for="lavandero_externa">Lavandero: ${data[3].lavandero_externa === 1 ? 'Sí' : 'No'}</label>
                    <label for="reflector_externa">Reflector: ${data[3].reflector_externa === 1 ? 'Sí' : 'No'}</label>
                  </div>
              </div>
              <!--Seguridad-->
              <div class="form-group">
                  <label for="seguridad" class="checkbox-label">Seguridad:</label>
                  <div class="checkbox-group">
                    <label for="camara">Cámara: ${data[4].camara === 1 ? 'Sí' : 'No'}</label>
                    <label for="dvr">DVR: ${data[4].dvr === 1 ? 'Sí' : 'No'}</label>
                    <label for="alarma">Alarma: ${data[4].alarma === 1 ? 'Sí' : 'No'}</label>
                    <label for="vigilancia">Vigilancia: ${data[4].vigilancia === 1 ? 'Sí' : 'No'}</label>
                    <label for="cerca_electrica">Cerca Eléc.: ${data[4].cerca_electrica === 1 ? 'Sí' : 'No'}</label>
                    <label for="monitor">Monitor: ${data[4].monitor === 1 ? 'Sí' : 'No'}</label>
                    <label for="boton_panico">Botón Pánico: ${data[4].boton_panico === 1 ? 'Sí' : 'No'}</label>
                    <label for="sirena">Sirena: ${data[4].sirena === 1 ? 'Sí' : 'No'}</label>
                  </div>
                </div>

                <!--Observaciones-->
                <label>Observaciones:</label>
                <div class="box">${data[0].observaciones}</div>
                <br>
                
                <!--Referido-->
                <label>Referido:</label>
                <div class="box">${data[0].referido}</div>
                <br>
                
                <label>Fecha de realizacion:</label>
                <div class="box">${data[0].timestamp.substring(0, 10)}</div>
                <br>    
      </div>
    `
    contenedorHistorico.appendChild(detalleCaptacion)

    //En esta seccion haces la tarjeta con la informacion en data
    //Es un arreglo de objetos como el anterior, donde cada objeto
    //es una tabla de la BD, organizados casi como en captacion
    //La informacion que no esta en propiedad son unicamente de las que usan check
    //La primera es Propiedad (data[0]), la segunda Cocina(data[1])
    //La tercera es Sala(data[2]), la cuarta es AreaExterna(data[3])
    //Y por ultimo seguridad(data[4])
    //Antes de usar la informacion dentro de cada campo
    //Verifica es es distinto a null, no todas las propiedades van a tener checks
    //Entonces es probable que ese campo sea null (data[0] != null)


  }

  if(data[0]== 'carga'){
    Swal.fire({
      position: "top-end",
      icon: "success",
      toast: true,
      title: "Propiedad cargada",
      showConfirmButton: false,
      timer: 1500
    });
  }
};



function verCaptacion(ref_catastral) {
  // Lógica para ver la captación
  // Aquí podrías redirigir a una página de detalles, por ejemplo:
  ws.send(JSON.stringify(['detalle',ref_catastral]))
  // location.href = `/captacion/${id}`;
}

function editarCaptacion(ref_catastral) {
  // Lógica para editar la captación
  alert(`Editar captación ${ref_catastral}`);
  // Aquí podrías redirigir a una página de edición, por ejemplo:
  // location.href = `/captacion/editar/${id}`;
}

function eliminarCaptacion(ref_catastral) {
  // Lógica para eliminar la captación
  const confirmacion = confirm(`¿Estás seguro de que deseas eliminar la captación ${ref_catastral}?`);
  if (confirmacion) {
    alert(`Captación ${ref_catastral} eliminada`);
    // Aquí podrías hacer una llamada a la API para eliminar la captación, por ejemplo:
     fetch(`/api/captaciones/${id}`, { method: 'DELETE' })
       .then(response => {
         if (response.ok) {
           alert('Captación eliminada');
           // Elimina el elemento del DOM si es necesario
           document.querySelector(`.captacion-item[data-id="${id}"]`).remove();
         } else {
           alert('Error al eliminar la captación');
         }
       });
  }
}

function cargarCaptacion(ref_catastral) {
  ws.send(JSON.stringify(['carga',ref_catastral]))
}