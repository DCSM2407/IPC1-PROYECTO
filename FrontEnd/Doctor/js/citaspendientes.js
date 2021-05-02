
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
    fetch(`http://uhospitalproyectoback.herokuapp.com/modificarCita/${idpaciente}/${fecha}/${hora}`, {
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
    fetch(`http://uhospitalproyectoback.herokuapp.com/modificarCita/${idpaciente}/${fecha}/${hora}`, {
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
    fetch(`http://uhospitalproyectoback.herokuapp.com/modificarCita/${idpaciente}/${fecha}/${hora}`, {
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
    fetch(`http://uhospitalproyectoback.herokuapp.com/citas`)
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
    fetch(`http://uhospitalproyectoback.herokuapp.com/citasAsignada/${dato}`)
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
    fetch(`http://uhospitalproyectoback.herokuapp.com/citasComplete/${dato}`)
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




function AbrirReceta(idpaciente, iddoctor) {
    sessionStorage.setItem("data1", idpaciente)
    sessionStorage.setItem("data2", iddoctor)
    window.location.href = 'receta.html'
}

function datosReceta() {
    var pacient = sessionStorage.data1
    var docto = sessionStorage.data2

    fetch(`http://uhospitalproyectoback.herokuapp.com/getDatoNombre/${pacient}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("nombre").value = data.name + " " + data.last


        });
}

datosReceta()

// PARA REGUSTRAR RECETA EN LA LISTA
function RegistroReceta() {
    var nombre = document.getElementById("nombre");
    var paciente = sessionStorage.data1;
    var docto = sessionStorage.data2
    var padecimiento = document.getElementById("padecimiento").value;
    var p = padecimiento.toString().toLowerCase();
    var descripcion = document.getElementById("descripcion");
    var fecha = document.getElementById("fecha")
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    fetch('http://uhospitalproyectoback.herokuapp.com/receta', {
        method: 'POST',
        headers,
        body: `{
            "idpaciente":"${paciente}",
            "nombre":"${nombre.value}",
            "padecimiento":"${p}",
            "descripcion":"${descripcion.value}",
            "iddoctor":"${docto}",
            "fecha":"${fecha.value}"
          }`,
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            alert(result.estado)
            window.location.href = 'listarecetas.html'
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error creando usuario')
        });
}

//PARA ELIMINAR RECETA
function eliminarReceta(paciente, padecimiento, fecha, doctor) {
    fetch(`http://uhospitalproyectoback.herokuapp.com/citaDelete/${paciente}/${padecimiento}/${fecha}/${doctor}`, {
        method: 'DELETE',
    })
        .then(res => res.text()) // or res.json()
        .then(res => {
            alert("Receta Eliminada")
            actualizarReceta()
        })
}

//ABRIR RECETA PA MOSTRAR
function abrirReceta(paciente, padecimiento, date, doctor) {
    sessionStorage.setItem("valor1", paciente)
    sessionStorage.setItem("valor2", padecimiento)
    sessionStorage.setItem("valor3", date)
    sessionStorage.setItem("valor4", doctor)
    window.location.href = 'mostrarReceta.html'
}

//ABRIR RECETA PA MODIFICAR
function abrirRecetaMOD(paciente, padecimiento, date, doctor) {
    sessionStorage.setItem("valor1", paciente)
    sessionStorage.setItem("valor2", padecimiento)
    sessionStorage.setItem("valor3", date)
    sessionStorage.setItem("valor4", doctor)
    window.location.href = 'modificarReceta.html'
}

//ACTUALIZAR RECETA
function actualizarReceta() {
    document.getElementById("tablausers").innerHTML = '';
    let text2 = `<table class="table">
                                <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Paciente</th>
                                <th scope="col">Padecimiento</th>
                                <th scope="col">ID Doctor</th>
                                <th scope="col">opciones</th>
                                </tr>
                            </thead>
                            <tbody>`;
    var doc = sessionStorage.data
    fetch(`http://uhospitalproyectoback.herokuapp.com/recetasC/${doc}`)
        .then(response => response.json())
        .then(data => {
            var i;
            for (i = 0; i < data.length; i++) {
                text2 += `
                                    <tr>
                                    <th scope="row">${i + 1}</th>
                                    <td>${data[i].fecha}</td>
                                    <td>${data[i].paciente}</td>
                                    <td>${data[i].padecimiento}</td>
                                    <td>${data[i].iddoctor}</td>
									<td><button onclick=" abrirReceta('${data[i].idpaciente}','${data[i].padecimiento}','${data[i].fecha}','${data[i].iddoctor}')"  style="background-color:green"><h4><i class="fa fa-eye"  style="color:white"></i></h4></button>
										<button onclick=" abrirRecetaMOD('${data[i].idpaciente}','${data[i].padecimiento}','${data[i].fecha}','${data[i].iddoctor}')" style="background-color:blue"><h4><i class="fa fa-pencil"  style="color:white"></i></h4></button>
										<button onclick=" eliminarReceta('${data[i].idpaciente}','${data[i].padecimiento}','${data[i].fecha}','${data[i].iddoctor}')"  style="background-color:red"><h4><i class="fa fa-trash-o"  style="color:white"></i></h4></button></td>
                                    </tr>
                                    `
                console.log(data[i].nombre, 'prueba')
            }
            text2 += `</tbody>
                                </table>`
            document.getElementById("tablausers").innerHTML = text2;
        });
}
