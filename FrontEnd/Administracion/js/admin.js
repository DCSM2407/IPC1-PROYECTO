
function actualizarAdmin() {
    document.getElementById("tablausers").innerHTML = '';
    let text2 = `<table class="table">
                                <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Sexo</th>
                                <th scope="col">Tipo Usuario</th>
                                </tr>
                            </thead>
                            <tbody>`;
    fetch('http://uhospitalproyectoback.herokuapp.com/admin')
        .then(response => response.json())
        .then(data => {
            var i;


            for (i = 0; i < data.length; i++) {
                text2 += `
                                    <tr>
                                    <th scope="row">${i + 1}</th>
                                    <td>${data[i].nombre}</td>
                                    <td>${data[i].apellido}</td>
                                    <td>${data[i].usuario}</td>
                                    <td>${data[i].sexo}</td>
                                    <td>${data[i].tipo}</td>
                                    </tr>
                                    `
                console.log(data[i].nombre, 'prueba')
            }
            text2 += `</tbody>
                                </table>`
            document.getElementById("tablausers").innerHTML = text2;
        });

}