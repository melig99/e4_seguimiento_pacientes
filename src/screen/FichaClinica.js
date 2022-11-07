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
import { TextInput } from 'react-native-paper';



const tableData = {
    tableHead: ['Crypto Name', 'Value', 'Mkt Cap'],
    tableData: [
        ['Bitcoin', '$44,331', '$839,702,328,904'],
        ['Ethereum', '$3000.9', '$359,080,563,225'],
        ['Tether', '$1', '$79,470,820,738'],
        ['BNB', '$413.44', '$69,446,144,361'],
        ['USD Coin', '$1', '$53,633,260,549'],
    ],
};



export default function FichaClinica({navigation}) {
  const [data, setData] = useState(tableData);
  const [form,setForm] = useState(false);
  const [tabla,setTabla] = useState(false);
  const mostrarForm = (valor)=>{ setForm(valor)}
  const mostrarTabla = (valor)=>{ setTabla(valor)}

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
      <Boton mode="contained"  onPress ={ ()=>{mostrarForm(!form)}} > Nuevo Registro</Boton>
      <Boton mode="contained"  onPress ={ ()=>{mostrarTabla(!tabla)}} > Lista </Boton>
      <ScrollView style={styles.container}>
        {form && <View >
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
      <Boton mode="contained" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }], })}> Volver</Boton>
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
    }
});
