import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { tema } from '../tema/tema'
import {peticionesGet} from '../core/peticiones'
import { CampoItem,
  CampoSubTitulo,
  CampoTexto,
  CampoTitulo,
  Boton,
  Tabla
} from '../componentes';
import { TextInput, SegmentedButtons,  Modal, Portal, Text, Button, Provider} from 'react-native-paper';

export default function FichaClinica({navigation}) {
  const [data, setData] = useState({});
  const [form,setForm] = useState(false);
  const [tabla,setTabla] = useState(false);
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

  const obtenerDatos = async ()=>{
      let temp = await peticionesGet('fichaClinica',{});
      const cabecera = ["Fecha","Motivo","Diagnositico","Observacion"];
      let datos = temp.respuesta.lista.map( (fila)=> { return [fila.fechaHora,fila.motivoConsulta,fila.diagnostico,fila.observacion]});
      setData({tableHead:cabecera,tableData:datos});
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
      <Text/>
      <ScrollView>
        {form && <View  style={styles.container}>
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
          <CampoItem valor="Doctor Encargado"/>
          <CampoTexto etiqueta='Dr. Encargado'/>
          <Text/>
          <CampoItem valor="Cliente"/>
          <CampoTexto etiqueta='Paciente'/>
          <Text/>
          <CampoItem valor="Producto"/>
          <CampoTexto etiqueta='Tipo de estudios'/>
          <Boton mode="contained" >Guardar</Boton>
        </View>}
        {tabla && <Tabla cabecera={data.tableHead} datos={data.tableData}/>}
      </ScrollView>
    </View>
  );
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
    }
});
