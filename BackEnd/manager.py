# IMPORTACIONES
from usuario import usuario
from medicamento import medicamento
import json     

class manager:
    def __init__(self):
        self.usuarios =[]
        self.medicamentos =[]
      
        self.usuarios.append(usuario('Carlos','Campaneros','admin',"1234",'24/07/1998','M','12345678','ninguna','admin'))
        self.usuarios.append(usuario('Dilan','Suy','dilan',"suy",'24/07/1998','M','12345678','oftamologo','doctor'))
        self.usuarios.append(usuario('Conaher','Miranda','conaher',"suy",'24/07/1998','M','12345678','oftamologo','doctor'))
        self.usuarios.append(usuario('Cinthia','Lopez','yess',"suy",'24/07/1998','F','12345678','oftamologo','enfermera'))
        self.usuarios.append(usuario('Yesenia','Lopez','yess2',"suy",'24/07/1998','F','12345678','oftamologo','enfermera'))
        self.usuarios.append(usuario('Nataly','Guzman','nat',"123",'24/07/1998','F','12345678','oftamologo','paciente'))
        self.usuarios.append(usuario('Sarai','Guzman','nat2',"123",'24/07/1998','F','12345678','oftamologo','paciente'))
        self.medicamentos.append(medicamento('Paracetamol',"125.20","Para dolor de Cabeza","20"))
        self.medicamentos.append(medicamento('Acetaminofen',"12.50","Para dolor de Cabeza","20"))
    
    def verificarUsuario(self,user,password):
        for x in self.usuarios:
            if x.usuario==user and x.password==password:
                return x
        return None

    def Registrarusuario(self, user):
        validar = self.ExistenciaUser(user)
        if validar==True:
            return False
        else:
            self.usuarios.append(user)
            return True

    def ExistenciaUser(self,user):
        for i in self.usuarios:
            if i.usuario == user:
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