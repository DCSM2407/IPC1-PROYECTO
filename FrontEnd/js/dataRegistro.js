function Registro(){
    var nombre = document.getElementById("nombre");
    var apellido = document.getElementById("apellido");
    var usuario = document.getElementById("usuario");
    var pass = document.getElementById("pass");
    var fecha = document.getElementById("fecha");
    var sexo = document.getElementById("sexo");
    var telefono = document.getElementById("telefono")
    let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Accept', 'application/json');
    fetch('http://localhost:8000/registrar', {
        method: 'POST',
        headers,
        body: `{
            "nombre":"${nombre.value}",
            "apellido":"${apellido.value}",
            "usuario":"${usuario.value}",
            "password":"${pass.value}",
            "fecha":"${fecha.value}",
            "sexo":"${sexo.value}",
            "telefono":"${telefono.value}",
            "especialidad":"ninguna",
            "tipo":"paciente"
          }`,
      })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
        nombre.value=''
        apellido.value=''
        usuario.value=''
        pass.value=''
        fecha.value=''
        sexo.value=''
        telefono.value=''
        alert(result.estado)
      })
      .catch(error => {
        console.error('Error:', error);
        nombre.value=''
        apellido.value=''
        usuario.value=''
        pass.value=''
        fecha.value=''
        sexo.value=''
        telefono.value=''
        alert('Hubo un error creando usuario')
      });
}
