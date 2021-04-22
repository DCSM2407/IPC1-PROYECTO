document.addEventListener("DOMContentLoaded", () => {

    const $boton = document.querySelector("#reporte1")
    $boton.addEventListener("click", () => {
        const $elementoParaConvertir = document.getElementById("services"); // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 1,
                filename: 'ListadoEnfermera_UHospital.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 4, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "cm",
                    format: "a3",
                    orientation: 'landscape' // landscape o portrait
                }
        })
        .from($elementoParaConvertir)
        .save()
        .catch(err => console.log(err));
    });
});