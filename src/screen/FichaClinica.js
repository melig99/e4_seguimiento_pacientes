import * as React from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Boton } from '../componentes/Boton.js';
import CampoTexto from '../componentes/CampoTexto';
import { tema } from '../tema/tema'


export default function FichaClinica({navigation}) {
  return (
    <View style={{backgroundColor: tema.fondo.color}}>
      <Text style={styles.titulo}>Ficha Clinica</Text>
      <Text/>
      <ScrollView style={styles.container}>
        <Text style={styles.subTitulo}>Registro de una Ficha Clinica</Text>
        <Text/>
        <Text style={styles.itemTitulo}>Motivo de Consulta</Text>
        <CampoTexto etiqueta='Ingrese el motivo de su consulta'/>
        <Text/>
        <Text style={styles.itemTitulo}>Diagnostico</Text>
        <CampoTexto etiqueta='Ingrese el diagnostico'/>
        <Text/>
        <Text style={styles.itemTitulo}>Obeservacion</Text>
        <CampoTexto etiqueta='Ingrese alguna observacion extra'/>
        <Text/>
        <Text style={styles.itemTitulo}>Doctor Encargado</Text>
        <CampoTexto etiqueta='Dr. Encargado'/>
        <Text/>
        <Text style={styles.itemTitulo}>Cliente</Text>
        <CampoTexto etiqueta='Paciente'/>
        <Text/>
        <Text style={styles.itemTitulo}>Producto</Text>
        <CampoTexto etiqueta='Tipo de estudios'/>
        <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'Home' }],})} > Registrar</Boton>
        <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'Home' }],})} > Volver</Boton>
      </ScrollView>
    </View>
     
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 100,
    marginTop: 8,
  },
  itemTitulo: {
    fontSize: 15,
    color: 'white',
    
  },
  container:{
    paddingLeft: 10,
  },
  subTitulo: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontStyle: 'italic',
  }
});