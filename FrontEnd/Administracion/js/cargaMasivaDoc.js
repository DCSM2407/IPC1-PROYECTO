
// PROCESO PARA LECTURA DE CSV
$('#subirDoctores').on("click", function (e) {
	e.preventDefault();
	$('#archivo1').parse({
		config: {
			delimiter: "auto",
			complete: PruebaDoc,
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
function PruebaDoc(results) {
	var data = results.data;
	for (i = 1; i < data.length; i++) {
		var row = data[i];
		var cells = row.join(",").split(",");
		for (j = 0; j < data.length - 1; j++) {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			headers.append('Accept', 'application/json');
			fetch('http://uhospitalproyectoback.herokuapp.com/masivaDoc', {
				method: 'POST',
				headers,
				body: `{
            "nombre":"${cells[0]}",
            "apellido":"${cells[1]}",
            "usuario":"${cells[4]}",
            "password":"${cells[5]}",
            "fecha":"${cells[2]}",
            "sexo":"${cells[3]}",
            "telefono":"${cells[7]}",
            "especialidad":"${cells[6]}",
            "tipo":"doctor"
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
	document.getElementById("archivo1").value=''
	alert("Doctores Cargados Con Exito c:")
	ActualizarDoctor()
}