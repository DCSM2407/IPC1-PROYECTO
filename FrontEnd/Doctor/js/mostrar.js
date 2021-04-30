 //PARA VALIDAR LOS DATOS PARA INICIAR SESION
 function MostrarDoc(){
    var idpac = sessionStorage.valor1
    var pade = sessionStorage.valor2
    var fech = sessionStorage.valor3
    var iddoc = sessionStorage.valor4
    var nombre = document.getElementById("nombre");
    var fecha = document.getElementById("fecha");
    var descripcion = document.getElementById("descripcion");
    var padecimiento = document.getElementById("padecimiento")

  fetch(`http://localhost:8000/mostrarRecetaC/${idpac}/${fech}/${iddoc}/${pade}`)
  .then(response => response.json())
  .then(data =>{
        nombre.value = data.nombre;
        fecha.value = data.fecha;
        descripcion.value = data.descripcion;
        padecimiento.value=data.padecimiento;
  
  });
}

MostrarDoc()


// PARA MODIFICAR EL DOCTOR EN EL CRU
function modificarReceta(){
  var idpac = sessionStorage.valor1
  var pade = sessionStorage.valor2
  var fech = sessionStorage.valor3
  var iddoc = sessionStorage.valor4
  var nombre = document.getElementById("nombre");
  var fecha = document.getElementById("fecha");
  var descripcion = document.getElementById("descripcion");
  var padecimiento = document.getElementById("padecimiento")
  let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');

  let requests = `{
          "idpaciente":"${idpac}",
          "nombre":"${nombre.value}",
          "fecha":"${fecha.value}",
          "padecimiento":"${padecimiento.value}",
          "descripcion":"${descripcion.value}",
          "iddoctor":"${iddoc}"
    }`
    console.log(requests)
    fetch(`http://localhost:8000/modificarReceta/${idpac}/${fech}/${iddoc}/${pade}`, {
      method: 'PUT',
      headers,
      body: requests,
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
       alert("Cambio Realizado")
       window.location.href='listarecetas.html'
    })
    .catch(error => {
      console.error('Error:', error);
    });
}