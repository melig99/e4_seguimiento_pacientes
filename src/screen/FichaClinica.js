import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { tema } from '../tema/tema'
import {peticionesGet} from '../core/peticiones'
import { CampoItem,
  CampoSubTitulo,
  CampoTexto,
  CampoTitulo,
  Boton,
  Tabla,
  Lista
} from '../componentes';
import { TextInput, SegmentedButtons,  Modal, Portal, Button, Provider, Checkbox} from 'react-native-paper';

export default function FichaClinica({navigation}) {

    const [pacientes, setPaciente] = useState([]);
    const [productos, setProducto] = useState([]);
    const [data, setData] = useState({});
    const [form,setForm] = useState(false);
    const [tabla,setTabla] = useState(false);
    const [pacientes, setPaciente] = useState([]);
    const [productos, setProducto] = useState([]);
  const mostrarForm = (valor)=>{ setForm(valor); if (tabla && valor){mostrarTabla(false)}};
  const mostrarTabla = (valor)=>{ setTabla(valor); if (form && valor ){mostrarForm(false)}};
  const [value, setValue] = useState('');
  const boton = (valor)=>{
    if(valor == "nuevo"){
      mostrarForm(!form);
    }else if(valor == "panel"){
      mostrarTabla(!tabla);
    }else if(valor == "volver"){
      navigation.reset({ index: 0, routes: [{ name: 'Home' }], });
    }
  }

  const modalprueba = ["Fecha","Motivo","Diagnositico","Observacion"];
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};



    const obtenerDatos = async ()=>{
        // OBTENER LOS DATOS PARA TABLA DE FICHA CLINICA
        let temp = await peticionesGet('fichaClinica',{});
        const cabecera = ["Fecha","Motivo","Diagnositico","Observacion"];
        let datos = temp.respuesta.lista.map( (fila)=> { return [fila.fechaHora,fila.motivoConsulta,fila.diagnostico,fila.observacion]});
        setData({tableHead:cabecera,tableData:datos});

        // OBTENER DATOS DE PACIENTES
        temp = await peticionesGet("persona",{orderBy:"apellido"})
        setPaciente(temp.respuesta.lista);
        // OBTENER DATOS DE PRODUCTOS
        temp = await peticionesGet("presentacionProducto",{})
        setProducto(temp.respuesta.lista);
     }

        

 

    useEffect(
        ()=>{
            obtenerDatos()
        },[]
    )



    return (
        <View style={{flex:1, backgroundColor: tema.fondo.color}}>
          <CampoTitulo valor="Ficha Clinica"/>
          <Text/>
          <View style={styles.button}>
            <SegmentedButtons
              value={value}
              onValueChange={boton}
              buttons={[
                {
                  value: 'nuevo',
                  label: 'Nuevo',
                },
                {
                  value: 'panel',
                  label: 'Lista',
                },
                {
                  value: 'volver',
                  label: 'Volver',
                },
              ]}
            />
          </View>
            <ScrollView>
                {form && <FormularioFichaClinica pacientes={pacientes} productos={productos}></FormularioFichaClinica>}
                {tabla && <Tabla cabecera={data.tableHead} datos={data.tableData}/>}
            </ScrollView>
        </View>
    );
}

function FormularioFichaClinica({pacientes,productos}){

    const [datosForm,setDatosForm]= useState({})
    const guardarDatos = (indice,valor)=>{
        let temp = datosForm;
        temp[indice]=valor
        console.log(temp);
        setDatosForm({...temp ,...datosForm})
        console.log(datosForm)
    }

    const enviarForm = async ()=>{
        
    }
    return ( <View  style={styles.container}>
          <CampoSubTitulo valor="Registro de una Ficha Clinica"/>
          <Text/>
          <CampoItem valor="Motivo de Consulta"/>
          <CampoTexto etiqueta='Ingrese el motivo de su consulta'/>
          <Text/>
          <CampoItem valor="Diagnostico"/>
          <CampoTexto etiqueta='Ingrese el diagnostico'/>
          <Text/>
          <CampoItem valor="Obeservacion"/>
          <TextInput placeholder='Escriba alguna observacion extra' style={styles.observacion}/>
          <Text/>
          <Provider>
            <Portal>
              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Lista></Lista>
              </Modal>
            </Portal>
              <Button  onPress={showModal}>
                Doctor Encargado
              </Button>
          </Provider>
          <Text/>
          <Provider>
            <Portal>
              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Lista></Lista>
              </Modal>
            </Portal>
              <Button  onPress={showModal}>
                Paciente
              </Button>
          </Provider>
          <Text/>
          <Provider>
            <Portal>
              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Lista></Lista>
              </Modal>
            </Portal>
              <Button  onPress={showModal}>
                Producto
              </Button>
          </Provider>
          <Boton mode="contained" >Guardar</Boton>
    </View> )
}

const styles = StyleSheet.create({
    container:{
      paddingLeft: 10,
    },
    observacion: {
      height: 50,
      padding: 10,
      paddingStart: 30,
      width: '80%',
      height: 50,
      marginTop: 20,
      borderRadius: 10,
      backgroundColor: 'white',
    },
    button:{
      flexDirection: 'column',
      alignItems: 'center'
    },
});
