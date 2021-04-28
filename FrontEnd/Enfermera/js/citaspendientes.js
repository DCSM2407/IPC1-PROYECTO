
//AL RECHAZAR UNA CITA
function rechazo(motivo, fecha, hora, idpaciente) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let requests = `{
    "idpaciente":"${idpaciente}",
    "fecha":"${fecha}",
    "hora":"${hora}",
    "motivo":"${motivo}",
    "estado":"Rechazada",
    "iddoctor":"Ninguno"
}`
    console.log(requests)
    fetch(`http://localhost:8000/modificarCita/${idpaciente}/${fecha}/${hora}`, {
        method: 'PUT',
        headers,
        body: requests,
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            alert("Cita Rechazada")
            actualizarC()
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

//AL RECHAZAR UNA CITA
function Asignar() {
    var idP = document.getElementById("idpaciente").value
    var fec = document.getElementById("fecha").value
    var hor = document.getElementById("hora").value
    var mot = document.getElementById("motivo").value
    var doc = document.getElementById("doctor").value
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let requests = `{
    "idpaciente":"${idP}",
    "fecha":"${fec}",
    "hora":"${hor}",
    "motivo":"${mot}",
    "estado":"Aceptada",
    "iddoctor":"${doc}"
}`
    console.log(requests)
    fetch(`http://localhost:8000/modificarCita/${idP}/${fec}/${hor}`, {
        method: 'PUT',
        headers,
        body: requests,
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            alert("Cita Aceptada")
            window.location.href = 'listaCitas.html'
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function actualizarC() {
    document.getElementById("tablausers").innerHTML = '';
    let text2 = `<table class="table">
                                <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Hora</th>
                                <th scope="col">Motivo</th>
                                <th scope="col">Id Paciente</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>`;
    var enfermera = sessionStorage.data
    fetch(`http://localhost:8000/citas`)
        .then(response => response.json())
        .then(data => {
            var i;


            for (i = 0; i < data.length; i++) {
                text2 += `
                                    <tr>
                                    <th scope="row">${i + 1}</th>
                                    <td>${data[i].fecha}</td>
                                    <td>${data[i].hora}</td>
                                    <td>${data[i].motivo}</td>
                                    <td>${data[i].idpaciente}</td>
                                    <td>${data[i].estado}</td>
                                    <td><button onclick=" AbrirAsignacion('${data[i].fecha}','${data[i].hora}','${data[i].idpaciente}','${data[i].motivo}')"  style="background-color:green; color:white" ><h4><i class="fa fa-check-circle-o"  style="color:white"> </i></h4>&nbsp;Aceptar&nbsp;</button>
										<button onclick=" rechazo('${data[i].motivo}','${data[i].fecha}','${data[i].hora}','${data[i].idpaciente}')"  style="background-color:red; color:white"><h4><i class="fa fa-times-circle-o"  style="color:white"></i></h4>Rechazar</button></td>
                                    </tr>
                                    `
                console.log(data[i].nombre, 'prueba')
            }
            text2 += `</tbody>
                                </table>`
            document.getElementById("tablausers").innerHTML = text2;
        });

}

// FUNCION PARA ABRIR HTML MOSTRAR DOCTOR
function AbrirAsignacion(fecha, hora, idpaciente, motivo) {
    sessionStorage.setItem("dato1", idpaciente)
    sessionStorage.setItem("dato2", fecha)
    sessionStorage.setItem("dato3", hora)
    sessionStorage.setItem("dato4", motivo)
    window.location.href = 'asignarCita.html'
}



function MostrarDatosCita() {
    var dato1 = sessionStorage.dato1
    var dato2 = sessionStorage.dato2
    var dato3 = sessionStorage.dato3
    var dato4 = sessionStorage.dato4
    document.getElementById("idpaciente").value = dato1;
    document.getElementById("motivo").value = dato4;
    document.getElementById("fecha").value = dato2;
    document.getElementById("hora").value = dato3;
}
MostrarDatosCita()