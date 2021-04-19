from flask import Flask, request, jsonify
from flask_cors import CORS
from manager import manager
from usuario import usuario
app = Flask(__name__)

CORS(app)

Manager = manager()


@app.route('/')
def home():
    return 'ARRANQUE SERVER'

#INICIO DE SESION 
@app.route('/sesion/<user>/<password>')
def sesion(user=None,password=None):
    res = Manager.verificarUsuario(user,password)
    if res ==None:
        return '{"data":false}'
    if res.tipo== 'admin':
        return '{"data":"admin"}'
    if res.tipo== 'doctor':
        return '{"data":"doctor"}'
    if res.tipo== 'enfermera':
        return '{"data":"enfermera"}'
    if res.tipo== 'paciente':
        return '{"data":"paciente"}'

# REGISTRO DE PACIENTES
@app.route('/registrar', methods=['POST'])
def registrar():
    dato=request.json
    user=usuario(dato['nombre'],dato['apellido'],dato['usuario'],dato['password'],dato['fecha'],dato['sexo'],dato['telefono'],dato['especialidad'],dato['tipo'])
    prueba=Manager.Registrarusuario(user)
    if prueba ==True:
        return '{"estado":"Usuario Creado Exitosamente"}'
    else:
        return '{"estado":"El Usuario Ya Existe"}'

# PARA OBTENER DATOS DE DOCTORES   
@app.route('/doctores')
def doctores():
    return Manager.ObtenerDoctor()

# PARA OBTENER DATOS DE PACIENTES
@app.route('/pacientes')
def pacientes():
    return Manager.ObtenerPacientes()

# PARA OBTENER DATOS DE ENFERMERAS
@app.route('/enfermeras')
def enfermera():
    return Manager.ObtenerEnfemeras()

# PARA OBTENER DATOS DE ADMINISTRADOR
@app.route('/admin')
def admin():
    return Manager.ObtenerAdmin()

# PARA MOSTRAR DATOS ADMIN EN MODIFICAR
@app.route('/mostrarAdmin')
def adminGet():
    user = Manager.RetornoAdmin()
    return jsonify({'nombre':user.nombre,'apellido':user.apellido,'fecha':user.fecha,'sexo':user.sexo,'telefono':user.telefono,'password':user.password}) 

# PARA OBTENER DATOS DE MEDICAMENTOS
@app.route('/medicamento')
def medicamento():
    return Manager.ObtenerMedicamentos()

# RUTA PARA BORRAR USUARIOS
@app.route('/user/<usuario>', methods=['DELETE'])
def EliminarUser(usuario):
    if (Manager.eliminarUsuario(usuario)):
        return 'Usuario Eliminado'
    return 'Error'

@app.route('/medicamento/<medicina>', methods=['DELETE'])
def eliminarMedicamento(medicina):
    if (Manager.eliminarMedicamento(medicina)):
        return 'Medicamento Eliminado'
    return 'Error'

@app.route('/modificarAdmin/<user>',methods=["PUT"])
def modificarAdmin(user):
    dato=request.json
    cambio = usuario(dato['nombre'],dato['apellido'],dato['usuario'],dato['password'],dato['fecha'],dato['sexo'],dato['telefono'],dato['especialidad'],dato['tipo'])
    if (Manager.modificarAdmin(user,cambio)):
        return '{"Estado":"Modificado"}'
    return '{"Estado":"Error"}'

# EJECUTA LA API :3
if __name__ == '__main__':
    app.run(debug=True, port=8000)
