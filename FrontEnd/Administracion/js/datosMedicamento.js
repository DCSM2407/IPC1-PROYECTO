
// PARA MODIFICAR EL ENFERMERA EN EL CRU
function modificarMed(){
      var nombre = document.getElementById("nombre");
      var precio = document.getElementById("precio");
      var descripcion = document.getElementById("descripcion");
      var cantidad = document.getElementById("cantidad")
    let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  
    let requests = `{
            "nombre":"${nombre.value}",
            "precio":"${precio.value}",
            "descripcion":"${descripcion.value}",
            "cantidad":"${cantidad.value}"
      }`
      console.log(requests)
      fetch('http://localhost:8000/modificarMed/'+nombre.value, {
        method: 'PUT',
        headers,
        body: requests,
      })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
        nombre.value=''
        precio.value=''
        descripcion.value=''
        cantidad.value=''
         alert("Cambio Realizado")
         window.location.href='medicamento.html'
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  //PARA VALIDAR LOS DATOS PARA INICIAR SESION
  function MostrarMed(){
      var medical= sessionStorage.dato2
      var nombre = document.getElementById("nombre");
      var precio = document.getElementById("precio");
      var descripcion = document.getElementById("descripcion");
      var cantidad = document.getElementById("cantidad")
  
    fetch(`http://localhost:8000/mostrarMed/${medical}`)
    .then(response => response.json())
    .then(data =>{
          nombre.value = data.nombre;
          precio.value = data.precio;
          descripcion.value = data.descripcion;
          cantidad.value = data.cantidad;
    
    });
  }
  
  MostrarMed()