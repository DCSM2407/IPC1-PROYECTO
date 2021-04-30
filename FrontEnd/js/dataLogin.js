
//PARA VALIDAR LOS DATOS PARA INICIAR SESION
function Login() {
  var usuario = document.getElementById("user");
  var pass = document.getElementById("pass");

  fetch(`http://uhospitalproyectoback.herokuapp.com/sesion/${usuario.value}/${pass.value}`)
    .then(response => response.json())
    .then(data => {
      console.log(data.data)
      if (data.data == 'admin') {
        sessionStorage.setItem("data", usuario.value)
        window.location.href = 'Administracion/administracion.html'
      }
      else if (data.data == 'doctor') {
        sessionStorage.setItem("data",usuario.value)
        window.location.href = 'Doctor/doctor.html'
      }
      else if (data.data == 'enfermera') {
        sessionStorage.setItem("data",usuario.value)
        window.location.href = 'Enfermera/enfermera.html'
      }
      else if (data.data == 'paciente') {
        sessionStorage.setItem("data",usuario.value)
        window.location.href = 'Paciente/paciente.html'
      }
      else {
        alert('Usuario/Contraseña Invalidos')
        pass.value = '';
        usuario.value = '';
      }
    });
}




