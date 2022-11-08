import  React,  {useState}  from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Switch } from 'react-native';
import { Boton, Paciente } from '../componentes/Boton.js';
import { PacientesService } from '../core/Admin_pacientes.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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
});

const admin_pacientes = new PacientesService();

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text >{title.nombre}, {title.apellido}, {title.email}, {title.cedula}, {title.telefono}, {title.fechaNacimiento}</Text>
  </View>
);

  const renderItem = ({ item }) => (
    <Item title={item} />
  );


export default function Pacientes({ navigation }) {
  admin_pacientes.obtener_pacientes();
  const DATA = admin_pacientes.obtener_datos();

  const [ filtro_nombre , setIsEnabled1 ]= useState(false);
  const [ filtro_apellido ,setIsEnabled2 ]= useState(false);
  const [filtro_profesional,setIsEnabled3] =  useState(false);
  const toggleSwitch3 = ( datos = DATA ) => { setIsEnabled3(previousState =>!previousState )};
  const toggleSwitch1 = ( datos = DATA ) => { setIsEnabled1(previousState =>!previousState )};
  const toggleSwitch2 = ( datos = DATA ) => {  setIsEnabled2(previousState =>!previousState )};
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <View style={{ alignItems: 'center',flexDirection: 'row'}} >
        <Text style={{flex: 0.8,fontSize:20 }} > Filtrar por nombre </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={filtro_nombre ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch1}
          value={filtro_nombre}
        ></Switch>
      </View>       

      <View style={{ alignItems: 'center',flexDirection: 'row'}} >
        <Text style={{flex: 0.8,fontSize:20 }} > Filtrar por Apellido </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={filtro_apellido ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch2}
          value={filtro_apellido}
        ></Switch>
      </View> 

      <View style={{ alignItems: 'center',flexDirection: 'row'}} >
        <Text style={{flex: 0.8,fontSize:20 }} > Mostrar Profesionales </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={filtro_profesional ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch3}
          value={filtro_profesional}
        ></Switch>
      </View> 
      <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'EditarPaciente' }],})} > Editar Paciente </Boton>
      <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'EliminarPaciente' }],})} > Eliminar Paciente </Boton>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />    
      </SafeAreaView>
        <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'NuevoPaciente' }],})} > Agregar Nuevo </Boton>
        <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'Home' }],})} > Volver</Boton>
    </View>
  );
}
