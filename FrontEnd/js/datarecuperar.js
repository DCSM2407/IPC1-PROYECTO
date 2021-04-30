
//PARA VALIDAR LOS DATOS PARA INICIAR SESION
function Recuperar() {
    var usuario = document.getElementById("user");
  
    fetch(`http://localhost:8000/recuperar/${usuario.value}`)
      .then(response => response.json())
      .then(data => {
          console.log(data.estado)
          if (data.estado == 'No') {
            alert("El Usuario No Existe")
            usuario.value='';
          }else{
            alert("La Password es: "+data.estado)
            usuario.value='';
            window.location.href = 'index.html'

          }
          
    });
}
  