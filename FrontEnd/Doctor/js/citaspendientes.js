
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


//AL COMPLETAR UNA CITA
function completitar(motivo, fecha, hora, idpaciente) {
    var dato1 = sessionStorage.data
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let requests = `{
    "idpaciente":"${idpaciente}",
    "fecha":"${fecha}",
    "hora":"${hora}",
    "motivo":"${motivo}",
    "estado":"Completada",
    "iddoctor":"${dato1}"
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
            alert("Cita Completada")
            actualizarCitAsignada()
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

//AL RECHAZAR UNA CITA
function Asignacion(motivo, fecha, hora, idpaciente) {
    var dato1 = sessionStorage.data
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let requests = `{
    "idpaciente":"${idpaciente}",
    "fecha":"${fecha}",
    "hora":"${hora}",
    "motivo":"${motivo}",
    "estado":"Aceptada",
    "iddoctor":"${dato1}"
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
            alert("Cita Aceptada")
            actualizarC()
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

//ACTUALIZAR DATOS EN TIEMPO REAL
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
                                    <td><button onclick=" Asignacion('${data[i].motivo}','${data[i].fecha}','${data[i].hora}','${data[i].idpaciente}')" style="background-color:green; color:white" ><h4><i class="fa fa-check-circle-o"  style="color:white"> </i></h4>&nbsp;Aceptar&nbsp;</button>
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

function actualizarCitAsignada() {
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
    var dato = sessionStorage.data
    fetch(`http://localhost:8000/citasAsignada/${dato}`)
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
                                    <td><button onclick=" completitar('${data[i].motivo}','${data[i].fecha}','${data[i].hora}','${data[i].idpaciente}')" style="background-color:rgb(218,165,32); color:white" ><h4><i class="fa fa-check-circle-o"  style="color:white"> </i></h4>&nbsp;Completar Cita&nbsp;</button>
									</tr>
                                    `
                console.log(data[i].nombre, 'prueba')
            }
            text2 += `</tbody>
                                </table>`
            document.getElementById("tablausers").innerHTML = text2;
        });
}

function actualizarCompleta() {
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
    var dato = sessionStorage.data
    fetch(`http://localhost:8000/citasComplete/${dato}`)
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
                                    <td><button onclick=" completitar('${data[i].motivo}','${data[i].fecha}','${data[i].hora}','${data[i].idpaciente}')" style="background-color:rgb(255,20,147); color:white" ><h4><i class="fa fa-file-text-o"  style="color:white"> </i></h4>&nbsp;Crear Receta&nbsp;</button>
									</tr>
                                    `
                console.log(data[i].nombre, 'prueba')
            }
            text2 += `</tbody>
                                </table>`
            document.getElementById("tablausers").innerHTML = text2;
        });

}

window.onload = function () {
    var fecha = new Date(); //Fecha actual
    var mes = fecha.getMonth() + 1; //obteniendo mes
    var dia = fecha.getDate(); //obteniendo dia
    var ano = fecha.getFullYear(); //obteniendo año
    if (dia < 10)
        dia = '0' + dia; //agrega cero si el menor de 10
    if (mes < 10)
        mes = '0' + mes //agrega cero si el menor de 10
    document.getElementById('fecha').value = ano + "-" + mes + "-" + dia;
}


function AbrirReceta(idpaciente, iddoctor) {
    sessionStorage.setItem("data1", idpaciente)
    sessionStorage.setItem("data2", iddoctor)
    window.location.href = 'receta.html'
}

function datosReceta() {
    var pacient = sessionStorage.data1
    var docto = sessionStorage.data2
    var da = document.getElementById("nombre").value

    fetch(`http://localhost:8000/getDatoNombre/${pacient}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("nombre").value = data.name + " " + data.last


        });
}



datosReceta()