import * as React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { tema } from '../tema/tema'
import { CampoItem,
  CampoSubTitulo,
  CampoTexto,
  CampoTitulo,
  Boton,
} from '../componentes';
import { TextInput } from 'react-native-paper';




export default function FichaClinica({navigation}) {
  return (
    <View style={{flex:1, backgroundColor: tema.fondo.color}}>
      <CampoTitulo valor="Ficha Clinica"/>
      <Text/>
      <ScrollView style={styles.container}>
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
        <Text/>
        <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'Home' }],})} > Registrar</Boton> 
        <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'Home' }],})} > Volver</Boton>
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
  }
});