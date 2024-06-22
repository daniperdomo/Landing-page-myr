window.addEventListener("load", (event) => {
    if(window.performance.getEntries()[0].responseStatus != 200){
        Swal.fire({
            position: "top-end",
            icon: "error",
            toast: true,
            title: "Usuario o contraseña incorrecta",
            showConfirmButton: false,
            timer: 1500
          });
    }
  });