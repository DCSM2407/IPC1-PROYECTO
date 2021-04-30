// PARA MODIFICAR EL DOCTOR EN EL CRU
function modificarDoc(){
    var usuario = document.getElementById("usuario");
    var nombre = document.getElementById("nombre");
    var apellido = document.getElementById("apellido");
    var fecha = document.getElementById("fecha");
    var telefono = document.getElementById("telefono");
    var sexo = document.getElementById("sexo");  
    var especialidad = document.getElementById("especialidad");  
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
            "especialidad":"${especialidad.value}",
            "tipo":"doctor"
      }`
      console.log(requests)
      fetch('http://localhost:8000/modificardoc/'+usuario.value, {
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
        sexo.value=''
        fecha.value=''
        telefono.value=''
        especialidad.value=''
        usuario.value=''
         alert("Cambio Realizado")
         window.location.href='doctor.html'
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  //PARA VALIDAR LOS DATOS PARA INICIAR SESION
  function MostrarDoc(){
      var dato1 = sessionStorage.data
      var usuario = document.getElementById("usuario");
      var nombre = document.getElementById("nombre");
      var apellido = document.getElementById("apellido");
      var fecha = document.getElementById("fecha");
      var sexo = document.getElementById("sexo");
      var telefono = document.getElementById("telefono");
      var especialidad = document.getElementById("especialidad");
      var pass = document.getElementById("pass")
  
    fetch(`http://localhost:8000/mostarDoc/${dato1}`)
    .then(response => response.json())
    .then(data =>{
          pass.value= data.password;
          usuario.value=data.usuario;
          nombre.value = data.nombre;
          apellido.value = data.apellido;
          fecha.value = data.fecha;
          sexo.value = data.sexo;
          telefono.value=data.telefono;
          especialidad.value = data.especialidad;
    
    });
  }
  
  MostrarDoc()