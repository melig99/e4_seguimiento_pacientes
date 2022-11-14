import * as React from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Boton } from '../componentes/';
import { ReservasService } from '../core/Admin_reservas.js';
import { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  const [obs, setObs] = useState('');
  const [ass, setAss] = useState('');
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemP2}>ID: {data.idReserva}</Text>
        <Text style={styles.itemP2}>Empleado: {data.empleado} {data.apellidoEmpleado}</Text>
        <Text style={styles.itemP2}>Cliente: {data.cliente} {data.apellidoCliente}</Text>
        <Text style={styles.itemP2}>Fecha: {data.fecha}</Text>
        <Text style={styles.itemP2}>Hora inicio: {data.horaInicio}</Text>
        <Text style={styles.itemP2}>Hora fin: {data.horaFin}</Text>
        <Text style={styles.itemP2}>Asistencia: {data.flagAsistio}</Text>
        <Text style={styles.itemP2}>Obs: {data.observacion}</Text>
        <Text style={styles.itemP2}>Modificar:</Text>
        <TextInput
          placeholder='Observacion'
          style={styles.textInputStyle}
          value={obs}
          onChangeText={text => setObs(text)}
        />
        <TextInput
          placeholder='Asistio? Responda S o N'
          style={styles.textInputStyle}
          value={ass}
          onChangeText={text => setAss(text)}
        />
        <Button onPress={()=>
                        admin_reservas.editar_reserva({
                          "idReserva":data.idReserva,
                          "observacion":obs,
                          "flagAsistio":ass

                        })
                        }> Editar</Button>
        <Button onPress={()=>{admin_reservas.eliminar_turno(data.idReserva)}}>Cancelar</Button>
      </View>
    </TouchableOpacity>
  );
};





export default function Turnos({navigation}) {
  admin_reservas.obtener_reservas();
  const DATA = admin_reservas.obtener_datos();
  //console.log(DATA);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [fecha, setFecha] = useState('Empty');
  const [fecha2, setFecha2] = useState('Empty');

  const onChange = (event, selectedDate)=>{
    const currentDate = selectedDate || date;
    //console.log(selectedDate);
    setShow(Platform.OS === 'default')
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =   tempDate.getFullYear()+ '-' +(tempDate.getMonth() +1)+'-' + tempDate.getDate();
    console.log(fDate);
    setFecha(fDate)
    //setShow(false);
  }

  const onChange2 = (event2, selectedDate2)=>{
    const currentDate = selectedDate2 || date;
    //console.log(selectedDate);
    setShow(Platform.OS === 'default')
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate2 =   tempDate.getFullYear()+ '-' +(tempDate.getMonth() +1)+'-' + tempDate.getDate();
    console.log(fDate2);
    setFecha2(fDate2);
    //setShow(false);
  }
  const showMode = (currentMode) =>{
    setShow(true);
    setMode(currentMode);
  }

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
      <TouchableOpacity><Button title='DatePicker' onPress={() => showMode('date')}>Fecha desde</Button></TouchableOpacity>

      {show && (
        <DateTimePicker
        testID='dateTimePicker'
        value={date}
        mode={mode}
        is24Hour={true}
        display='default'
        onChange={onChange}
        />)}

<TouchableOpacity><Button title='DatePicker' onPress={() => showMode('date')}>Fecha desde</Button></TouchableOpacity>

{show && (
        <DateTimePicker
        testID='dateTimePicker'
        value={date}
        mode={mode}
        is24Hour={true}
        display='default'
        onChange={onChange2}
        />)}
      </View>
      <Text style={styles.itemP1}>Turnos</Text>
      <FlatList
          data={list}
          renderItem={({ item }) => <ListItem data={item} />}
          keyExtractor={(item) => item.id}
        />
      <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'NuevoTurno' }],})} > Realizar reserva</Boton>
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
