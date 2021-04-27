
//FUNCION PARA CREAR LA CITA (PETICION)
function crearCita(){
    var paciente= sessionStorage.data
    console.log(paciente)
    var motivo = document.getElementById("motivo");
    var fecha = document.getElementById("fecha");
    var hora = document.getElementById("hora")
    let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Accept', 'application/json');
    fetch('http://localhost:8000/crearCita', {
        method: 'POST',
        headers,
        body: `{
            "motivo":"${motivo.value}",
            "fecha":"${fecha.value}",
            "hora":"${hora.value}",
            "idpaciente":"${paciente}",
            "estado":"Pendiente",
            "iddoctor":"Ninguno"
          }`,
      })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
        motivo.value=''
        fecha.value=''
        hora.value=''
        alert(result.estado)
        actualizarCita()
      })
      .catch(error => {
        console.error('Error:', error);
        motivo.value=''
        fecha.value=''
        hora.value=''
        alert('Hubo un error creando usuario')
        actualizarCita()
      });
}

function actualizarCita(){
    document.getElementById("tablausers").innerHTML = '';
    let text2=`<table class="table">
                                <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Motivo</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Hora</th>
                                <th scope="col">Doctor Asignado</th>
                                <th scope="col">Estado</th>
                                </tr>
                            </thead>
                            <tbody>`;
                    fetch(`http://localhost:8000/citas/${paciente}`)
                    .then(response => response.json())
                    .then(data =>{
                        var i;

                        
                        for(i=0;i<data.length;i++){
                            text2+= `
                            <tr>
                            <th scope="row">${i+1}</th>
                            <td>${data[i].motivo}</td>
                            <td>${data[i].fecha}</td>
                            <td>${data[i].hora}</td>
                            <td>${data[i].iddoctor}</td>
                            <td>${data[i].estado}</td>
                            </tr>
                            `
                    console.log(data[i].nombre,'prueba')
                }
                text2+=`</tbody>
                        </table>`
                document.getElementById("tablausers").innerHTML = text2;
            });

}
