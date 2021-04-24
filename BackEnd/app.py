from flask import Flask, request, jsonify
from flask_cors import CORS
from manager import manager
from usuario import usuario
from medicamento import medicamento
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

# PARA MASIVO DOCTORES
@app.route('/masivaDoc', methods=['POST'])
def masivaDoc():
    dato=request.json
    user=usuario(dato['nombre'],dato['apellido'],dato['usuario'],dato['password'],dato['fecha'],dato['sexo'],dato['telefono'],dato['especialidad'],dato['tipo'])
    prueba=Manager.Registrarusuario(user)
    if prueba ==True:
        return '{"estado":"Usuario Creado Exitosamente"}'
    else:
        return '{"estado":"El Usuario Ya Existe"}'

# PARA MASIVOS PACIENTES
@app.route('/masivaPac', methods=['POST'])
def masivaPac():
    dato=request.json
    user=usuario(dato['nombre'],dato['apellido'],dato['usuario'],dato['password'],dato['fecha'],dato['sexo'],dato['telefono'],dato['especialidad'],dato['tipo'])
    prueba=Manager.Registrarusuario(user)
    if prueba ==True:
        return '{"estado":"Usuario Creado Exitosamente"}'
    else:
        return '{"estado":"El Usuario Ya Existe"}'

# PARA MASIVOS ENFERMERA
@app.route('/masivaenfer', methods=['POST'])
def masivaEnfer():
    dato=request.json
    user=usuario(dato['nombre'],dato['apellido'],dato['usuario'],dato['password'],dato['fecha'],dato['sexo'],dato['telefono'],dato['especialidad'],dato['tipo'])
    prueba=Manager.Registrarusuario(user)
    if prueba ==True:
        return '{"estado":"Usuario Creado Exitosamente"}'
    else:
        return '{"estado":"El Usuario Ya Existe"}'

# PARA MASIVOS MEDICAMENTO
@app.route('/masivaMed', methods=['POST'])
def masivaMed():
    dato=request.json
    medical=medicamento(dato['nombre'],dato['precio'],dato['descripcion'],dato['cantidad'])
    prueba=Manager.RegistrarMedicina(medical)
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
    return jsonify({'nombre':user.nombre,'apellido':user.apellido,'password':user.password}) 

# PARA MOSTRAR DATOS DE DOCTORES 
@app.route('/mostarDoc/<doc>')
def doctorGet(doc):
    user = Manager.RetornoDoc(doc)
    return jsonify({'usuario':user.usuario,'nombre':user.nombre,'apellido':user.apellido,'fecha':user.fecha,'sexo':user.sexo,'telefono':user.telefono,'especialidad':user.especialidad,'password':user.password}) 

# PARA MOSTRAR DATOS DE ENFERMERAS 
@app.route('/mostrarEnfer/<enfermera>')
def enferGet(enfermera):
    user = Manager.RetornoEnfer(enfermera)
    return jsonify({'usuario':user.usuario,'nombre':user.nombre,'apellido':user.apellido,'fecha':user.fecha,'sexo':user.sexo,'telefono':user.telefono,'password':user.password}) 

# PARA MOSTRAR DATOS DE ENFERMERAS 
@app.route('/mostrarPac/<pac>')
def pacGet(pac):
    user = Manager.RetornoPac(pac)
    return jsonify({'usuario':user.usuario,'nombre':user.nombre,'apellido':user.apellido,'fecha':user.fecha,'sexo':user.sexo,'telefono':user.telefono,'password':user.password}) 

# PARA MOSTRAR DATOS DE ENFERMERAS 
@app.route('/mostrarMed/<med>')
def medGet(med):
    medical = Manager.RetornoMedic(med)
    return jsonify({'nombre': medical.nombre,'precio':medical.precio,'descripcion':medical.descripcion,'cantidad':medical.cantidad}) 


# PARA OBTENER DATOS DE MEDICAMENTOS
@app.route('/medicamento')
def medicam():
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

@app.route('/modificardoc/<user>', methods=["PUT"])
def modificarDoc(user):
    dato = request.json
    cambio = usuario(dato['nombre'],dato['apellido'],dato['usuario'],dato['password'],dato['fecha'],dato['sexo'],dato['telefono'],dato['especialidad'],dato['tipo'])
    if (Manager.modificarDoc(user,cambio)):
        return '{"Estado":"Doctor Modificado"}'
    return '{"Estado":"Error"}'

@app.route('/modificarEnfer/<user>', methods=["PUT"])
def modificarEnfer(user):
    dato = request.json
    cambio = usuario(dato['nombre'],dato['apellido'],dato['usuario'],dato['password'],dato['fecha'],dato['sexo'],dato['telefono'],dato['especialidad'],dato['tipo'])
    if (Manager.modificarEnfer(user,cambio)):
        return '{"Estado":"Doctor Modificado"}'
    return '{"Estado":"Error"}'

@app.route('/modificarPac/<user>', methods=["PUT"])
def modificarPac(user):
    dato = request.json
    cambio = usuario(dato['nombre'],dato['apellido'],dato['usuario'],dato['password'],dato['fecha'],dato['sexo'],dato['telefono'],dato['especialidad'],dato['tipo'])
    if (Manager.modificarPac(user,cambio)):
        return '{"Estado":"Doctor Modificado"}'
    return '{"Estado":"Error"}'


@app.route('/modificarMed/<med>', methods=["PUT"])
def modificarMed(med):
    dato = request.json
    cambio = medicamento(dato['nombre'],dato['precio'],dato['descripcion'],dato['cantidad'])
    if (Manager.modificarMed(med,cambio)):
        return '{"Estado":"Doctor Modificado"}'
    return '{"Estado":"Error"}'

# EJECUTA LA API :3
if __name__ == '__main__':
    app.run(debug=True, port=8000)
