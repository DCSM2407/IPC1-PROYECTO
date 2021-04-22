// ENVIAR DATO AL OTRO JS
var userData = document.getElementById("user").value

//PARA VALIDAR LOS DATOS PARA INICIAR SESION
function Login(){
    var usuario = document.getElementById("user");
    var pass = document.getElementById("pass");

  fetch(`http://localhost:8000/sesion/${usuario.value}/${pass.value}`)
  .then(response => response.json())
  .then(data =>{
      console.log(data.data)
    if(data.data=='admin'){
        window.location.href='Administracion/Administracion.html'
    }
    else if (data.data=='doctor') {
      window.location.href='Doctor/doctor.html'
    } 
    else if (data.data=='enfermera') {
      window.location.href='Enfermera/enfemera.html'
    } 
    else if (data.data=='paciente') {
      window.location.href='Paciente/paciente.html'
    } 
    else{
        alert('Usuario/Contraseña Invalidos')
        pass.value='';
        usuario.value='';
    }
  });
}




