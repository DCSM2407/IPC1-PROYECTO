document.addEventListener("DOMContentLoaded", () => {
    const $boton = document.querySelector("#reporte");
    $boton.addEventListener("click", () => {
        const $elementoParaConverti = document.getElementById("home");;
        html2pdf()
            .set({
                margin: 1,
                filename: 'Receta_UHospital.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a3",
                    orientation: 'landscape' // landscape o portrait
                }
            })
            .from($elementoParaConverti)
            .save()
            .catch(err => console.log(err));
    });
});