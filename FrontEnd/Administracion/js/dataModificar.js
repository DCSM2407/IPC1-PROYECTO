// PARA MOSTRAR DATOS
function Mostrar(){
    var usuario = document.getElementById("usuario");
    var nombre = document.getElementById("nombre");
    var apellido = document.getElementById("apellido");
    var fecha = document.getElementById("fecha");
    var sexo = document.getElementById("sexo");
    var telefono = document.getElementById("telefono");
    var pass = document.getElementById("pass")

  fetch(`http://localhost:8000/mostrarAdmin`)
  .then(response => response.json())
  .then(data =>{
      nombre.value=data.nombre;
      apellido.value=data.apellido;
      fecha.value=data.fecha;
      sexo.value=data.sexo;
      telefono.value=data.telefono;
      pass.value=data.password;
    
  });
}

Mostrar()
// MODIFICAR ADMINISTRADOR
function modifiarAdmin(){
    var usuario = document.getElementById("usuario");
    var nombre = document.getElementById("nombre");
    var apellido = document.getElementById("apellido");
    var fecha = document.getElementById("fecha");
    var sexo = document.getElementById("sexo");
    var telefono = document.getElementById("telefono");
    var pass = document.getElementById("pass")
    let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Accept', 'application/json');

    let requests = `{
            "nombre":"${nombre.value}",
            "apellido":"${apellido.value}",
            "usuario":"${usuario.value}",
            "password":"${pass.value}",
            "fecha":"${fecha.value}",
            "sexo":"${sexo.value}",
            "telefono":"${telefono.value}",
            "especialidad":"ninguna",
            "tipo":"admin"
      }`
      console.log(requests)
      fetch('http://localhost:8000/modificarAdmin/'+usuario.value, {
        method: 'PUT',
        headers,
        body: requests,
      })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
        nombre.value=''
        apellido.value=''
        pass.value=''
        fecha.value=''
        sexo.value=''
        telefono.value=''
         alert("Cambio Realizado")
      })
      .catch(error => {
        console.error('Error:', error);
      });
}