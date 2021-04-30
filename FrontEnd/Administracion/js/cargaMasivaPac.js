
// PROCESO PARA LECTURA DE CSV
$('#subirPacientes').on("click", function (e) {
	e.preventDefault();
	$('#archivo2').parse({
		config: {
			delimiter: "auto",
			complete: PruebaPaciente,
		},
		before: function (file, inputElem) {
			//console.log("Parsing file...", file);
		},
		error: function (err, file) {
			//console.log("ERROR:", err, file);
		},
		complete: function () {
			//console.log("Done with all files");
		}
	});
});

// PROCESOS DE DATOS
function PruebaPaciente(results) {
	var data = results.data;
	for (i = 1; i < data.length; i++) {
		var row = data[i];
		var cells = row.join(",").split(",");
		for (j = 0; j < data.length - 1; j++) {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			headers.append('Accept', 'application/json');
			fetch('http://uhospitalproyectoback.herokuapp.com/masivaPac', {
				method: 'POST',
				headers,
				body: `{
            "nombre":"${cells[0]}",
            "apellido":"${cells[1]}",
            "usuario":"${cells[4]}",
            "password":"${cells[5]}",
            "fecha":"${cells[2]}",
            "sexo":"${cells[3]}",
            "telefono":"${cells[6]}",
            "especialidad":"ninguna",
            "tipo":"paciente"
          }`,
			})
				.then(response => response.json())
				.then(result => {
					console.log('Success:', result);

				})
				.catch(error => {
					console.error('Error:', error);

				});
			console.log(cells[0] + " " + cells[1] + " " + cells[2] + " " + cells[3] + " " + cells[4])
			break
		}
	}
	document.getElementById("archivo2").value=''
	alert("Pacientes Cargados Con Exito c:")
    ActualizarPaciente()
}