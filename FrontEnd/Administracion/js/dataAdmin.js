//FUNCION PARA ELIMINAR DOCTORES
function eliminarDoctor(usuario){
    fetch('http://localhost:8000/user/'+usuario, {
        method: 'DELETE',
      })
      .then(res => res.text()) // or res.json()
      .then(res => {
        alert(res)
        ActualizarDoctor()
    })
}

//FUNCION PARA ELIMINAR ENFERMERAS
function eliminarEnfermera(usuario){
    fetch('http://localhost:8000/user/'+usuario, {
        method: 'DELETE',
      })
      .then(res => res.text()) // or res.json()
      .then(res => {
        alert(res)
        ActualizarEnfermera()
    })
}

//FUNCION PARA ELIMINAR ENFERMERAS
function eliminarPaciente(usuario){
    fetch('http://localhost:8000/user/'+usuario, {
        method: 'DELETE',
      })
      .then(res => res.text()) // or res.json()
      .then(res => {
        alert(res)
        ActualizarPaciente()
    })
}

//FUNCION PARA ELIMINAR MEDICAMENTOS
function eliminarMedicamento(medicamento){
    fetch('http://localhost:8000/medicamento/'+medicamento, {
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
                    fetch('http://localhost:8000/doctores')
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
									<td><button onclick=" eliminarDoctor('${data[i].usuario}')"  style="background-color:green"><h4><i class="fa fa-eye"  style="color:white"></i></h4></button>
										<button onclick=" eliminarDoctor('${data[i].usuario}')"  style="background-color:blue"><h4><i class="fa fa-pencil"  style="color:white"></i></h4></button>
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
function ActualizarEnfermera(){
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
                    fetch('http://localhost:8000/enfermeras')
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
									<td><button onclick=" eliminarEnfermera('${data[i].usuario}')"  style="background-color:green"><h4><i class="fa fa-eye"  style="color:white"></i></h4></button>
										<button onclick=" eliminarEnfermera('${data[i].usuario}')"  style="background-color:blue"><h4><i class="fa fa-pencil"  style="color:white"></i></h4></button>
										<button onclick=" eliminarEnfermera('${data[i].usuario}')"  style="background-color:red"><h4><i class="fa fa-trash-o"  style="color:white"></i></h4></button></td>
                                    </tr>
                                    `
                            console.log(data[i].nombre,'prueba')
                        }
                        text2+=`</tbody>
                                </table>`
                        document.getElementById("tablausers").innerHTML = text2;
                    });

}
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
                    fetch('http://localhost:8000/medicamento')
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
									<td><button onclick=" eliminarMedicamento('${data[i].nombre}')"  style="background-color:green"><h4><i class="fa fa-eye"  style="color:white"></i></h4></button>
										<button onclick=" eliminarMedicamento('${data[i].nombre}')"  style="background-color:blue"><h4><i class="fa fa-pencil"  style="color:white"></i></h4></button>
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
                    fetch('http://localhost:8000/pacientes')
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
									<td><button onclick=" eliminarPaciente('${data[i].usuario}')"  style="background-color:green"><h4><i class="fa fa-eye"  style="color:white"></i></h4></button>
										<button onclick=" eliminarPaciente('${data[i].usuario}')"  style="background-color:blue"><h4><i class="fa fa-pencil"  style="color:white"></i></h4></button>
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



