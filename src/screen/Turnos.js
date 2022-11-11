import * as React from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Boton } from '../componentes/Boton.js';
import { ReservasService } from './Admin_reservas.js';
import { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
//import DateTimePicker from '@react-native-community/datetimepicker';
/*
constructor(props){
  super(props);

  this.state={
    loading:false,
    persona:[],
    url:'https://equipoyosh.com/stock-nutrinatalia/persona/?/agenda?fecha=?'
  }
}*/

const admin_reservas = new ReservasService();


const ListItem = ({ data }) => {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemP2}>ID: {data.idReserva}</Text>
        <Text style={styles.itemP2}>Empleado: {data.empleado}</Text>
        <Text style={styles.itemP2}>Cliente: {data.cliente}</Text>
        <Text style={styles.itemP2}>Fecha: {data.fecha}</Text>
        <Text style={styles.itemP2}>Hora inicio: {data.horaInicio}</Text>
        <Text style={styles.itemP2}>Hora fin: {data.horaFin}</Text>
        <Text style={styles.itemP2}>Obs: {data.observacion}</Text>
        <Button onPress={()=>{admin_reservas.eliminar_turno(data.idReserva)}}>Cancelar</Button>
      </View>
    </TouchableOpacity>
  );
};





export default function Turnos({navigation}) {
  admin_reservas.obtener_reservas();
  const DATA = admin_reservas.obtener_datos();
  //console.log(DATA);

  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState(DATA);

  useEffect(()=>{
    if(searchText===''){
      setList(DATA);
    } else{
      setList(
        DATA.filter(item=>{
          if(item.cliente.toLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1){
            return true;
          } else {
            return false;
          }
        })
      );
    }
  }, [searchText]);
  
  const [searchEmpleado, setSearchEmpleado] = useState('');

  useEffect(()=>{
    if(searchEmpleado===''){
      setList(DATA);
    } else{
      setList(
        DATA.filter(item=>{
          if(item.empleado.toLowerCase().indexOf(searchEmpleado.toLocaleLowerCase()) > -1){
            return true;
          } else {
            return false;
          }
        })
      );
    }
  }, [searchEmpleado]);

  const [date, setDate] = useState('');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
        <TextInput
          placeholder='Buscar por cliente'
          value={searchText}
          style={styles.textInputStyle}
          onChangeText={(t) => setSearchText(t)}
        />
      
      <TextInput
          placeholder='Buscar por empleado'
          value={searchEmpleado}
          style={styles.textInputStyle}
          onChangeText={(t) => setSearchEmpleado(t)}
      />
      <View style={{flexDirection:"row"}}>
      <TouchableOpacity><Button>Fecha desde</Button></TouchableOpacity>
      <TouchableOpacity><Button>Fecha hasta</Button></TouchableOpacity>
      </View>
      <Text style={styles.itemP1}>Turnos</Text>
      <FlatList 
          data={list}
          renderItem={({ item }) => <ListItem data={item} />}
          keyExtractor={(item) => item.id}
        />
      <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'Home' }],})} > Volver</Boton>
    </View>
    
  );
}



const styles = StyleSheet.create({
  flatlist:{
    flex: 1,
    backgroundColor: '#242425',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 32,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  view_costado :{
    height: 150, 
    width: 300,
    flex: 1
  },
  textInputStyle:{
    height: 40,
    width: 300,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor:'009688',
    backgroundColor:'white'

  },
  itemP1: {
    fontSize: 22,
    color: '#000000',
    marginBottom: 5
  },
  itemP2: {
    fontSize: 18,
    color: '#000000',
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingTop: 15,
    paddingBottom: 15,
  }

});