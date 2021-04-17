# IMPORTACIONES
from usuario import usuario
from medicamento import medicamento
import json     

class manager:
    def __init__(self):
        self.usuarios =[]
        self.medicamentos =[]
      
        self.usuarios.append(usuario('Carlos','Campaneros','admin',"1234",'02/11/2021','M','12345678','ninguna','admin'))
        self.usuarios.append(usuario('Dilan','Suy','dilan',"suy",'02/11/2021','M','12345678','oftamologo','doctor'))
        self.usuarios.append(usuario('Conaher','Miranda','conaher',"suy",'02/11/2021','M','12345678','oftamologo','doctor'))
        self.usuarios.append(usuario('Cinthia','Lopez','yess',"suy",'02/11/2021','F','12345678','oftamologo','enfermera'))
        self.usuarios.append(usuario('Yesenia','Lopez','yess2',"suy",'02/11/2021','F','12345678','oftamologo','enfermera'))
        self.usuarios.append(usuario('Nataly','Guzman','nat',"123",'02/11/2021','F','12345678','oftamologo','paciente'))
        self.usuarios.append(usuario('Sarai','Guzman','nat2',"123",'02/11/2021','F','12345678','oftamologo','paciente'))
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
