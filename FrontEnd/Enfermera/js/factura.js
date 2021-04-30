function RegistroFac(){
    var enfermera= sessionStorage.data
    var fecha = document.getElementById("fecha");
    var nombre = document.getElementById("nombre");
    var doctor = document.getElementById("doctor");
    var consulta = document.getElementById("consulta");
    var operacion = document.getElementById("operacion");
    var internado = document.getElementById("internado");
    var total = document.getElementById("total")
    let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Accept', 'application/json');
    fetch('http://localhost:8000/registrarFactura', {
        method: 'POST',
        headers,
        body: `{
            "nombre":"${nombre.value}",
            "fecha":"${fecha.value}",
            "doctor":"${doctor.value}",
            "consulta":"${consulta.value}",
            "operacion":"${operacion.value}",
            "internado":"${internado.value}",
            "total":"${total.value}",
            "enfermera":"${enfermera}"
          }`,
      })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
        alert(result.estado)
        window.location.href = 'listaFactura.html'
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error creando usuario')
      });
}
