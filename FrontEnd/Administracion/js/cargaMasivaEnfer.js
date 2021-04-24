
// PROCESO PARA LECTURA DE CSV
$('#subirEnfermeras').on("click", function (e) {
	e.preventDefault();
	$('#archivo3').parse({
		config: {
			delimiter: "auto",
			complete: PruebaEnfer,
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
function PruebaEnfer(results) {
	var data = results.data;
	for (i = 1; i < data.length; i++) {
		var row = data[i];
		var cells = row.join(",").split(",");
		for (j = 0; j < data.length - 1; j++) {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			headers.append('Accept', 'application/json');
			fetch('http://localhost:8000/masivaenfer', {
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
            "tipo":"enfermera"
          }`,
			})
				.then(response => response.json())
				.then(result => {
					console.log('Success:', result);

				})
				.catch(error => {
					console.error('Error:', error);

				});
			break
		}
	}
	document.getElementById("archivo3").value=''
	alert("Enfermeras Cargadas Con Exito c:")
    ActualizarEnfermera()
}