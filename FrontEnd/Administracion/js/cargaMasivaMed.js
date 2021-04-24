
// PROCESO PARA LECTURA DE CSV
$('#subirMedicamentos').on("click", function (e) {
	e.preventDefault();
	$('#archivo4').parse({
		config: {
			delimiter: "auto",
			complete: PruebaMedic,
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
function PruebaMedic(results) {
	var data = results.data;
	for (i = 1; i < data.length; i++) {
		var row = data[i];
		var cells = row.join(",").split(",");
		for (j = 0; j < data.length - 1; j++) {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			headers.append('Accept', 'application/json');
			fetch('http://localhost:8000/masivaMed', {
				method: 'POST',
				headers,
				body: `{
            "nombre":"${cells[0]}",
            "precio":"${cells[1]}",
            "descripcion":"${cells[2]}",
            "cantidad":"${cells[3]}"
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
	document.getElementById("archivo4").value=''
	alert("Medicamentos Cargados Con Exito c:")
	ActualizarMedicamento()
}