import * as React from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity, Platform, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Boton } from '../componentes';
import { SelectList } from 'react-native-dropdown-select-list';
import { ReservasService } from '../core/Admin_reservas.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';
import {peticionesGet,peticionesPost,peticionesPut} from '../core/peticiones'

const admin_reservas = new ReservasService();

export default function NuevoTurno({navigation}) {
  admin_reservas.obtener_pacientes();
  const DATA = admin_reservas.obtener_personas();
  //console.log(DATA);
  admin_reservas.obtener_empleados();
  const EMPLEADOS = admin_reservas.obtener_empleados2();
  //console.log(EMPLEADOS);
  const [selected, setSelected] = React.useState("");
  const [selected2, setSelected2] = React.useState("");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [hora, setHora] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');

  const onChange = (event, selectedDate)=>{
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'default')
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    //console.log(tempDate);
    let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() +1) +'-' +tempDate.getDate();
    let fTime = tempDate.getHours() +':'+ tempDate.getMinutes()+':00';
    let fTimeFinal = tempDate.getHours().toString()+tempDate.getMinutes().toString();

    let fDateFinal = tempDate.getFullYear().toString()+(tempDate.getMonth()+1)+ tempDate.getDate();

    if(tempDate.getMonth()<10 && tempDate.getDate()<10){
        fDateFinal = tempDate.getFullYear().toString()+'0'+tempDate.getMonth() + '0' + tempDate.getDate()
    }
    if(tempDate.getMonth()<10 && tempDate.getDate()>9){
        fDateFinal = tempDate.getFullYear().toString()+  tempDate.getMonth().toString() + '0' + tempDate.getDate().toString()
    }
    if(tempDate.getMonth()>10 && tempDate.getDate()<10){
        fDateFinal = tempDate.getFullYear().toString() + tempDate.getMonth().toString()+ '0'+ tempDate.getDate().toString()
    }

    console.log(fDateFinal);
    setFechaFinal(fDateFinal);
    if(tempDate.getHours()<10 && tempDate.getMinutes()<10){
        fTimeFinal = '0'+tempDate.getHours() + '0' + tempDate.getMinutes()
    }
    if(tempDate.getMinutes()<10 && tempDate.getHours()>9){
        fTimeFinal = tempDate.getHours().toString() + '0' + tempDate.getMinutes().toString()
    }
    if(tempDate.getMinutes()>10 && tempDate.getHours()<10){
        fTimeFinal = '0'+tempDate.getHours()+ tempDate.getMinutes()
    }
    console.log(fTimeFinal);
    tempDate.setMinutes(tempDate.getMinutes()+15);

    let fTime2 = tempDate.getHours().toString()+ tempDate.getMinutes().toString() ;
    if(tempDate.getHours()<10 && tempDate.getMinutes()<10){
        fTime2 = '0'+tempDate.getHours() + '0' + tempDate.getMinutes()
    }
    if(tempDate.getMinutes()<10 && tempDate.getHours()>9){
        fTime2 = tempDate.getHours().toString() + '0' + tempDate.getMinutes().toString()
    }
    if(tempDate.getMinutes()>10 && tempDate.getHours()<10){
        fTime2 = '0'+tempDate.getHours().toString() + tempDate.getMinutes().toString()
    }
    console.log(fTime2);
    //console.log(fTime);
    setText(fDate);
    setHora(fTimeFinal);
    setText2(fTime);
    setText3(fTime2);
    //console.log(fDate);
    //setShow(false);
  }


  const showMode = (currentMode) =>{
    setShow(true);
    setMode(currentMode);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Nueva Reserva{'\n'}</Text>
        <Text>Cliente:</Text>
        <SelectList
        //onSelect={() => alert(selected)}
        data={DATA}
        setSelected={setSelected}
        defaultOption={{ key:'0', value:'Seleccione al cliente' }}
        />
        <Text/>
        <Text>Fisioterapeuta:</Text>
        <SelectList
        //onSelect={() => alert(selected2)}
        data={EMPLEADOS}
        setSelected={setSelected2}
        defaultOption={{ key:'1', value:'Seleccione al empleado' }}
        />
        <Text/>

        <TouchableOpacity><Button title='Seleccione la fecha' onPress={() => showMode('date')}>Fecha desde</Button></TouchableOpacity>
        <Text>{'\n'}Fecha seleccionada: {text}{'\n'}</Text>

        <TouchableOpacity><Button title='Seleccione la hora' onPress={() => showMode('time')}>Fecha desde</Button></TouchableOpacity>
        <Text>{'\n'}Hora seleccionada: {text2}{'\n'}</Text>

        {show && (
        <DateTimePicker
        testID='dateTimePicker'
        value={date}
        mode={mode}
        is24Hour={true}
        format="HH:mm"
        display='default'
        onChange={onChange}
        />)}


        <Button title="Agendar reserva" mode="contained" onPress={async () => {

                                                        let form =    {
                                                        "fechaCadena": fechaFinal,
                                                        "horaInicioCadena":hora,
                                                        "horaFinCadena":text3,
                                                        "idEmpleado":{
                                                            "idPersona":selected2
                                                        },
                                                        "idCliente":{
                                                            "idPersona":selected
                                                        }
                                                    };
                                                    let resp = await peticionesPost('reserva',form,'usuario1');
                                                    console.log( res );
                                                  }
                                                }/>
        <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'Turnos' }],})} > Volver</Boton>
    </View>

  );
}


const styles = StyleSheet.create({
    select:{
        width: 30
    },
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
