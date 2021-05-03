# IMPORTACIONES
from usuario import usuario
from medicamento import medicamento
from cita import cita
from receta import receta
from factura import factura
import json     

class manager:
    def __init__(self):
        self.usuarios =[]
        self.medicamentos =[]
        self.citas=[]
        self.recetas=[]
        self.facturas=[]
        self.usuarios.append(usuario('Carlos','Campaneros','admin',"1234",'24/07/1998','M','12345678','ninguna','admin'))
        self.usuarios.append(usuario('Dilan','Suy','dilan',"1234",'24/07/1998','M','12345678','oftamologo','doctor'))
        self.usuarios.append(usuario('Cinthia','Lopez','yesenia',"1234",'24/07/1998','F','12345678','oftamologo','enfermera'))
        self.usuarios.append(usuario('Nataly','Guzman','nataly',"1234",'24/07/1998','F','12345678','oftamologo','paciente'))
        self.medicamentos.append(medicamento('Paracetamol',"125.20","Para dolor de Cabeza","20"))
        self.citas.append(cita("nataly","2021-05-05","14:20","Dolor de Cabeza","Pendiente","Ninguno"))
        
    def verificarUsuario(self,user,password):
        for x in self.usuarios:
            if x.usuario==user and x.password==password:
                return x
        return None

    def recuperar(self,user):
        for x in self.usuarios:
            if x.usuario == user:
                return x
        return None

    def Registrarusuario(self, user):
        validar = self.ExistenciaUser(user)
        if validar==True:
            return False
        else:
            self.usuarios.append(user)
            return True
    
    def registrarReceta(self, receta):
        self.recetas.append(receta)
        return True

    def registrarFactura(self, fact):
        self.facturas.append(fact)
        return True

    def RegistrarCita(self, cita):
        validar = self.ExisteCita(cita)
        if validar==True:
            return False
        else:
            self.citas.append(cita)
            return True
    
    def ExisteCita(self, cita):
        for i in self.citas:
            if i.idpaciente == cita.idpaciente and i.estado == 'Pendiente' or i.estado == 'Aceptada':
                return True
        return False

    def ExistenciaUser(self,user):
        for i in self.usuarios:
            if i.usuario == user.usuario:
                return True
        return False

    def RegistrarMedicina(self, medicina):
        validar = self.ExistenciaMedicamento(medicina)
        if validar==True:
            return False
        else:
            self.medicamentos.append(medicina)
            return True

    def ExistenciaMedicamento(self,medicina):
        for i in self.medicamentos:
            if i.nombre == medicina.nombre:
                return True
        return False

    def ObtenerDoctor(self):
        return json.dumps([ob.__dict__ for ob in self.usuarios if ob.tipo == 'doctor'])
    
    def ObtenerEnfemeras(self):
        return json.dumps([ob.__dict__ for ob in self.usuarios if ob.tipo == 'enfermera'])

    def ObtenerPacientes(self):
        return json.dumps([ob.__dict__ for ob in self.usuarios if ob.tipo == 'paciente'])

    def ObtenerAdmin(self):
        return json.dumps([ob.__dict__ for ob in self.usuarios if ob.tipo == 'admin'])
        
    def ObtenerMedicamentos(self):
        return json.dumps([ob.__dict__ for ob in self.medicamentos])
    
    def ObtenerMedicamentoList(self):
        return json.dumps([ob.__dict__ for ob in self.medicamentos if ob.cantidad !='0' ])

    def getPaciente(self,usuario):
        return json.dumps([ob.__dict__ for ob in self.usuarios if ob.usuario == usuario and ob.tipo == 'paciente'])
        
    def getEnfermera(self,usuario):
        return json.dumps([ob.__dict__ for ob in self.usuarios if ob.usuario == usuario and ob.tipo == 'enfermera'])

    def getDatoNombre(self,usuario):
        for i in self.usuarios:
            if i.usuario == usuario:
                return i

    def getDoctor(self,usuario):
        return json.dumps([ob.__dict__ for ob in self.usuarios if ob.usuario == usuario and ob.tipo == 'doctor'])

    def getCitas(self,paciente):
        return json.dumps([ob.__dict__ for ob in self.citas if ob.idpaciente == paciente ])

    def getFactura(self):
        return json.dumps([ob.__dict__ for ob in self.facturas])
    
    def getRecetaDoc(self,doc):
        return json.dumps([ob.__dict__ for ob in self.recetas if ob.iddoctor ==doc ])
    
    def getCitasAsignadas(self,doctor):
        return json.dumps([ob.__dict__ for ob in self.citas if ob.iddoctor == doctor and ob.estado == 'Aceptada' ])
        
    def getCitasComplete(self,doctor):
        return json.dumps([ob.__dict__ for ob in self.citas if ob.iddoctor == doctor and ob.estado == 'Completada' ])
    
    def getCitasList(self):
        return json.dumps([ob.__dict__ for ob in self.citas if ob.estado == 'Pendiente' ])

    def getCitasListAcept(self):
        return json.dumps([ob.__dict__ for ob in self.citas if ob.estado == 'Aceptada' ])

    def RetornoAdmin(self):
        for i in self.usuarios:
            if i.tipo == 'admin':
                return i

    def RetornoDoc(self, user):
        for i in self.usuarios:
            if i.usuario == user:
                return i
    
    def RetornoEnfer(self, user):
        for i in self.usuarios:
            if i.usuario == user:
                return i
    
    def RetornoPac(self, user):
        for i in self.usuarios:
            if i.usuario == user:
                return i
    
    def RetornoMedic(self, medical):
        for i in self.medicamentos:
            if i.nombre == medical:
                return i

    def eliminarReceta(self,paciente,padecimiento,fecha,doctor):
        for dato in self.recetas:
            if(dato.idpaciente==paciente and dato.padecimiento == padecimiento and dato.fecha == fecha, dato.iddoctor == doctor ):
                self.recetas.remove(dato)
                return True
        return False

    def getReceta(self,paciente,fecha,doctor,padecimiento):
        for dato in self.recetas:
            if(dato.idpaciente==paciente and dato.fecha==fecha and dato.iddoctor == doctor and dato.padecimiento == padecimiento):
                return dato

    def eliminarUsuario(self,user):
        for dato in self.usuarios:
            if(dato.usuario==user):
                self.usuarios.remove(dato)
                return True
        return False

    def eliminarMedicamento(self,medicina):
        for dato in self.medicamentos:
            if(dato.nombre==medicina):
                self.medicamentos.remove(dato)
                return True
        return False
    
    def modificarAdmin(self,user,Usuario):
        for data in self.usuarios:
            if (data.usuario == user):
                self.usuarios[self.usuarios.index(data)]=Usuario
                return True
        return False

    def modificarDoc(self,user,Usuario):
        for data in self.usuarios:
            if (data.usuario == user and data.tipo == 'doctor'):
                self.usuarios[self.usuarios.index(data)]=Usuario
                return True
        return False

    def modificarEnfer(self,user,Usuario):
        for data in self.usuarios:
            if (data.usuario == user and data.tipo == 'enfermera'):
                self.usuarios[self.usuarios.index(data)]=Usuario
                return True
        return False

    def modificarPac(self,user,Usuario):
        for data in self.usuarios:
            if (data.usuario == user and data.tipo == 'paciente'):
                self.usuarios[self.usuarios.index(data)]=Usuario
                return True
        return False

    def modificarMed(self,medical,medicina):
        for data in self.medicamentos:
            if (data.nombre == medical):
                self.medicamentos[self.medicamentos.index(data)]=medicina
                return True
        return False
    
    def modificarCita(self,paciente,fecha,hora,cambio):
        for data in self.citas:
            if (data.idpaciente == paciente and data.fecha == fecha and data.hora == hora):
                self.citas[self.citas.index(data)]=cambio
                return True
        return False
    
    def modificarReceta(self,paciente,fecha,doc,padecimiento,cambio):
        for data in self.recetas:
            if (data.idpaciente == paciente and data.fecha == fecha and data.iddoctor == doc and data.padecimiento ==padecimiento):
                self.recetas[self.recetas.index(data)]=cambio
                return True
        return False