
//FUNCION PARA ELIMINAR DOCTORES
function eliminarDoctor(usuario){
    fetch('http://uhospitalproyectoback.herokuapp.com/user/'+usuario, {
        method: 'DELETE',
      })
      .then(res => res.text()) // or res.json()
      .then(res => {
        alert("Doctor Eliminado")
        ActualizarDoctor()
    })
}

//FUNCION PARA ELIMINAR ENFERMERAS
function eliminarEnfermera(usuario){
    fetch('http://uhospitalproyectoback.herokuapp.com/user/'+usuario, {
        method: 'DELETE',
      })
      .then(res => res.text()) // or res.json()
      .then(res => {
        alert("Enfermera Eliminada")
        ActualizarEnfermera()
    })
}

//FUNCION PARA ELIMINAR ENFERMERAS
function eliminarPaciente(usuario){
    fetch('http://uhospitalproyectoback.herokuapp.com/user/'+usuario, {
        method: 'DELETE',
      })
      .then(res => res.text()) // or res.json()
      .then(res => {
        alert("Paciente Eliminado")
        ActualizarPaciente()
    })
}

//FUNCION PARA ELIMINAR MEDICAMENTOS
function eliminarMedicamento(medicamento){
    fetch('http://uhospitalproyectoback.herokuapp.com/medicamento/'+medicamento, {
        method: 'DELETE',
      })
      .then(res => res.text()) // or res.json()
      .then(res => {
        alert(res)
        ActualizarMedicamento()
    })
}

// ACTUALIZAR LA LISTA DOCTORES EN TIEMPO REAL
function ActualizarDoctor(){
    document.getElementById("tablausers").innerHTML ='';
    let text2=`<table class="table">
                                <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Sexo</th>
                                <th scope="col">Especialidad</th>
								<th scope="col">Usuario</th>
                                <th scope="col">Tipo Usuario</th>
								<th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>`;
                    fetch('http://uhospitalproyectoback.herokuapp.com/doctores')
                    .then(response => response.json())
                    .then(data =>{
                        var i;

                        for(i=0;i<data.length;i++){
                            text2+= `
                                    <tr>
                                    <th scope="row">${i+1}</th>
                                    <td>${data[i].nombre}</td>
                                    <td>${data[i].apellido}</td>
                                    <td>${data[i].sexo}</td>
                                    <td>${data[i].especialidad}</td>
                                    <td>${data[i].usuario}</td>
                                    <td>${data[i].tipo}</td>
									<td><button onclick=" AbrirDoctor('${data[i].usuario}')"  style="background-color:green"><h4><i class="fa fa-eye"  style="color:white"></i></h4></button>
										<button onclick=" ModificarDoctor('${data[i].usuario}')"  style="background-color:blue"><h4><i class="fa fa-pencil"  style="color:white"></i></h4></button>
										<button onclick=" eliminarDoctor('${data[i].usuario}')"  style="background-color:red"><h4><i class="fa fa-trash-o"  style="color:white"></i></h4></button></td>
									</tr>
                                    `
                            console.log(data[i].nombre,'prueba')
                        }
                        text2+=`</tbody>
                                </table>`
                        document.getElementById("tablausers").innerHTML = text2;
                    });

}

// ACTUALIZAR LISTA DE ENFERMERAS EN TIEMPO REAL
// ACTUALIZAR LISTA DE MEDICAMENTOS EN TIEMPO REAL
function ActualizarMedicamento(){
    document.getElementById("tablausers").innerHTML = '';
    let text2=`<table class="table">
                                <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>`;
                    fetch('http://uhospitalproyectoback.herokuapp.com/medicamento')
                    .then(response => response.json())
                    .then(data =>{
                        var i;

                        for(i=0;i<data.length;i++){
                            text2+= `
                                    <tr>
                                    <th scope="row">${i+1}</th>
                                    <td>${data[i].nombre}</td>
                                    <td>${data[i].precio}</td>
                                    <td>${data[i].descripcion}</td>
                                    <td>${data[i].cantidad}</td>
									<td><button onclick=" AbrirMedicamento('${data[i].nombre}')"  style="background-color:green"><h4><i class="fa fa-eye"  style="color:white"></i></h4></button>
										<button onclick=" ModificarMedicamento('${data[i].nombre}')"  style="background-color:blue"><h4><i class="fa fa-pencil"  style="color:white"></i></h4></button>
										<button onclick=" eliminarMedicamento('${data[i].nombre}')"  style="background-color:red"><h4><i class="fa fa-trash-o"  style="color:white"></i></h4></button></td>
                                    </tr>
                                    `
                            console.log(data[i].nombre,'prueba')
                        }
                        text2+=`</tbody>
                                </table>`
                        document.getElementById("tablausers").innerHTML = text2;
                    });
}

// ACTUALIZAR LISTA DE PACIETNES EN TIEMPO REAL
function ActualizarPaciente(){
    document.getElementById("tablausers").innerHTML = '';
    let text2=`<table class="table">
                                <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Sexo</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Tipo Usuario</th>
                                <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>`;
                    fetch('http://uhospitalproyectoback.herokuapp.com/pacientes')
                    .then(response => response.json())
                    .then(data =>{
                        var i;

                        
                        for(i=0;i<data.length;i++){
                            text2+= `
                                    <tr>
                                    <th scope="row">${i+1}</th>
                                    <td>${data[i].nombre}</td>
                                    <td>${data[i].apellido}</td>
                                    <td>${data[i].sexo}</td>
                                    <td>${data[i].usuario}</td>
                                    <td>${data[i].tipo}</td>
									<td><button onclick=" AbrirPaciente('${data[i].usuario}')"  style="background-color:green"><h4><i class="fa fa-eye"  style="color:white"></i></h4></button>
										<button onclick=" ModificarPac('${data[i].usuario}')"  style="background-color:blue"><h4><i class="fa fa-pencil"  style="color:white"></i></h4></button>
										<button onclick=" eliminarPaciente('${data[i].usuario}')"  style="background-color:red"><h4><i class="fa fa-trash-o"  style="color:white"></i></h4></button></td>
                                    </tr>
                                    `
                            console.log(data[i].nombre,'prueba')
                        }
                        text2+=`</tbody>
                                </table>`
                        document.getElementById("tablausers").innerHTML = text2;
                    });
}


// FUNCION PARA ABRIR HTML MOSTRAR DOCTOR
function AbrirDoctor(doctor){
    sessionStorage.setItem("dato",doctor)
    console.log(doctor);
    window.location.href='../Administracion/mostrarDoctores.html'
}

// FUNCION PARA ABRIR HTML MODIFICAR DOCTOR
function ModificarDoctor(doctor){
    sessionStorage.setItem("dato",doctor)
    console.log(doctor);
    window.location.href='../Administracion/modificarDoctores.html'
}


// FUNCION PARA ABRIR HTML MOSTRAR PACIENTE
function AbrirPaciente(paciente){
    sessionStorage.setItem("dato3",paciente)
    console.log(paciente);
    window.location.href='../Administracion/mostrarPaciente.html'
}

// FUNCION PARA ABRIR HTML MODIFICAR PACIENTE
function ModificarPac(dato){
    sessionStorage.setItem("dato3",dato)
    console.log(dato);
    window.location.href='../Administracion/modificarPaciente.html'
}

// FUNCION PARA ABRIR HTML MOSTRAR ENFERMERA
function AbrirEnfermera(enfermera){
    sessionStorage.setItem("dato1",enfermera)
    console.log(enfermera);
    window.location.href='../Administracion/mostrarEnfermera.html'
}

// FUNCION PARA ABRIR HTML MODIFICAR ENFERMERA
function ModificarEnfermera(enfermera){
    sessionStorage.setItem("dato1",enfermera)
    console.log(enfermera);
    window.location.href='../Administracion/modificarEnfermera.html'
}

// FUNCION PARA ABRIR HTML MOSTRAR MEDICAMENTO
function AbrirMedicamento(medicamento){
    sessionStorage.setItem("dato2",medicamento)
    console.log(medicamento);
    window.location.href='../Administracion/mostrarMedicamento.html'
}

// FUNCION PARA ABRIR HTML MODIFICAR MEDICAMENTO
function ModificarMedicamento(medicamento){
    sessionStorage.setItem("dato2",medicamento)
    console.log(medicamento);
    window.location.href='../Administracion/modificarMedicamento.html'
}




