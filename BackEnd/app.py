from flask import Flask, request, jsonify
from flask_cors import CORS
from manager import manager
from usuario import usuario
from medicamento import medicamento
from receta import receta
from factura import factura
from cita import cita
app = Flask(__name__)

CORS(app)

Manager = manager()


@app.route('/')
def home():
    return '[IPC 1] PROYECTO2 -- DILAN CONAHER SUY MIRANDA - 201801194\n '

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

#INICIO DE SESION 
@app.route('/recuperar/<user>')
def recuperar(user):
    dato = Manager.recuperar(user)
    if dato == None:
        return '{"estado":"No"}'
    else:
        return jsonify({'estado':dato.password})
    

# REGISTRO DE RECETAS
@app.route('/receta', methods=['POST'])
def registrarReceta():
    dato=request.json
    recet=receta(dato['idpaciente'],dato['nombre'], dato['padecimiento'],dato['descripcion'],dato['iddoctor'],dato['fecha'])
    prueba=Manager.registrarReceta(recet)
    if prueba ==True:
        return '{"estado":"Receta Creada"}'
    else:
        return '{"estado":"ERROR"}'

# REGISTRO FACTURAS
@app.route('/registrarFactura', methods=['POST'])
def registrarFactura():
    dato=request.json
    fact=factura(dato['fecha'],dato['nombre'],dato['doctor'],dato['consulta'],dato['operacion'],dato['internado'],dato['total'],dato['enfermera'])
    prueba=Manager.registrarFactura(fact)
    if prueba ==True:
        return '{"estado":"Factura Creada"}'
    else:
        return '{"estado":"ERROR"}'


# CREAR CITASS
@app.route('/crearCita', methods=['POST'])
def Citas():
    dato=request.json
    nuevacita=cita(dato['idpaciente'],dato['fecha'],dato['hora'],dato['motivo'],dato['estado'],dato['iddoctor'])
    prueba=Manager.RegistrarCita(nuevacita)
    if prueba ==True:
        return '{"estado":"Cita Creada"}'
    else:
        return '{"estado":"Ya Existe una Cita En Proceso"}'



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

# PARA OBTENER DATOS DEL PACIENTE (EN LA SECCION DE PACIENTES)
@app.route('/pacienteM/<pac>')
def pacienteM(pac):
    return Manager.getPaciente(pac)

# PARA OBTENER DATOS DEL PACIENTE (EN LA SECCION DE PACIENTES)
@app.route('/enfermeraM/<pac>')
def enfermeraM(pac):
    return Manager.getEnfermera(pac)

# PARA OBTENER DATOS DEL PACIENTE (EN LA SECCION DE PACIENTES)
@app.route('/doctorM/<pac>')
def doctorM(pac):
    return Manager.getDoctor(pac)


# PARA OBTENER DATOS DE CITAS PARA EL LISTADO
@app.route('/recetasC/<doc>')
def getRecetas(doc):
    return Manager.getRecetaDoc(doc)

# PARA OBTENER DATOS DE CITAS PARA EL LISTADO
@app.route('/citas/<pac>')
def getCitas(pac):
    return Manager.getCitas(pac)

# PARA OBTENER DATOS DE CITAS PARA EL LISTADO
@app.route('/citasAsignada/<doc>')
def getCitasAsignadas(doc):
    return Manager.getCitasAsignadas(doc)

# PARA OBTENER DATOS PARA RECETA NOMBRE
@app.route('/getDatoNombre/<paciente>')
def getDatoNombre(paciente):
    dato = Manager.getDatoNombre(paciente)
    return jsonify({'name':dato.nombre,'last':dato.apellido})



# PARA OBTENER DATOS DE CITAS PARA EL LISTADO
@app.route('/citasComplete/<doc>')
def getCitasComplete(doc):
    return Manager.getCitasComplete(doc)
    
# PARA OBTENER DATOS DE CITAS PENDIENTES LISTADO ENFERMERA
@app.route('/citas')
def getCitasList():
    return Manager.getCitasList()

# PARA OBTENER DATOS DE CITAS ACEPTADAS LISTADO ENFERMERA
@app.route('/citasA')
def getCitasListAcept():
    return Manager.getCitasListAcept()

# PARA OBTENER DATOS DE FACTURA LISTADO 
@app.route('/getFactura')
def getFactura():
    return Manager.getFactura()

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

# PARA OBTENER DATOS DE MEDICAMENTOS
@app.route('/medicamentos')
def medical():
    return Manager.ObtenerMedicamentoList()

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

# RUTA PARA ELIMINAR CITAS EN DOCTOR
@app.route('/citaDelete/<paciente>/<padecimiento>/<fecha>/<doctor>', methods=['DELETE'])
def EliminarRecta(paciente,padecimiento,fecha,doctor):
    if (Manager.eliminarReceta(paciente, padecimiento, fecha, doctor)):
        return 'Receta Eliminada'
    return 'Error'

# PARA MOSTRAR DATOS DE ENFERMERAS 
@app.route('/mostrarRecetaC/<paci>/<fech>/<doc>/<pad>')
def recetaGet(paci,fech,doc,pad):
    user = Manager.getReceta(paci,fech,doc,pad)
    return jsonify({'idpaciente':user.idpaciente,'nombre':user.paciente,'padecimiento':user.padecimiento,'descripcion':user.descripcion,'iddoctor':user.iddoctor,'fecha':user.fecha}) 


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

@app.route('/modificarCita/<paciente>/<fecha>/<hora>', methods=["PUT"])
def modificarCita(paciente,fecha,hora):
    dato = request.json
    cambio = cita(dato['idpaciente'],dato['fecha'],dato['hora'],dato['motivo'],dato['estado'],dato['iddoctor'])
    if (Manager.modificarCita(paciente,fecha,hora,cambio)):
        return '{"Estado":"Cita Rechazada"}'
    return '{"Estado":"Error"}'


@app.route('/modificarCita/<paciente>/<fecha>/<hora>', methods=["PUT"])
def CitaAceptada(paciente,fecha,hora):
    dato = request.json
    cambio = cita(dato['idpaciente'],dato['fecha'],dato['hora'],dato['motivo'],dato['estado'],dato['iddoctor'])
    if (Manager.modificarCita(paciente,fecha,hora,cambio)):
        return '{"Estado":"Cita Aceptada"}'
    return '{"Estado":"Error"}'

@app.route('/modificarReceta/<paciente>/<fecha>/<doc>/<padecimiento>', methods=["PUT"])
def modificarReceta(paciente,fecha,doc,padecimiento):
    dato = request.json
    cambio = receta(dato['idpaciente'], dato['nombre'], dato['padecimiento'], dato['descripcion'], dato['iddoctor'], dato['fecha'])
    if (Manager.modificarReceta(paciente, fecha, doc, padecimiento, cambio)):
        return '{"Estado":"Receta Modificada"}'
    return '{"Estado":"Error"}'

# EJECUTA LA API :3
if __name__ == '__main__':
    app.run(debug=True, port=8000)
