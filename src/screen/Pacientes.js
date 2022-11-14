import  React,  {useState}  from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Switch } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Boton } from '../componentes';
//import { CampoTexto } from '../componentes/CampoTexto.js';
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
  textInput: {
    width: '80%',
    height: 50,
    paddingStart: 60,
    backgroundColor: 'white',
    fontSize:20,
    flex:0.45

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
  const [list, setList ] = useState(admin_pacientes.obtener_datos());
  const [ filtro_nombre , setIsEnabled1 ]= useState(false);
  const [filtro_profesional,setIsEnabled3] =  useState(false);
  const [paciente_busqueda, onChangeText] = React.useState("");

  const toggleSwitch3 =  async ( ) => {
    if (filtro_profesional === false) {
      //console.log( 'obteniendo profesionales' );
      const list = await admin_pacientes.obtener_profesionales(  );
      setList( list );
      setIsEnabled3(previousState =>!previousState );
      //console.log( 'mostrando profesionales' );
    }else {
      const list2 = await admin_pacientes.obtener_pacientes(  );
      setList( list2 );
      //console.log( 'mostrando profesionales' );
      setIsEnabled3(previousState =>!previousState );
    }
  };
  const toggleSwitch1 = async  ( ) => {
    //console.log( 'ordenando por nombre' );
    if ( filtro_nombre  === false ) {
      const list = await admin_pacientes.obtener_pacientes_ordenado_x_nombre(  );
      console.log ( list );
      setList( list );
      setIsEnabled1(previousState =>!previousState )
      //console.log( 'mostrando ordenado ' );
    }else {
      const list2 = await admin_pacientes.obtener_pacientes(  );
      setList( list2 );
      //console.log( 'mostrando pacientes ordenados' );
      setIsEnabled1(previousState =>!previousState )
    }

  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center',flexDirection: 'row'}} >
        <TextInput
            style={styles.textInput}
            value={paciente_busqueda}
            onChangeText={onChangeText}
            placeholder="Buscar"
            keyboardType="text"
          />
        <Boton style={{flex:0.2}} mode="contained" onPress={ async () =>{
                                                                          console.log( 'obteniendo el paciente' );
                                                                          const list3 = await admin_pacientes.obtener_pacientes_x_nombre( '',paciente_busqueda );
                                                                          setList( list3 );
                                                                          console.log ( list3 );
                                                                        }
                                                            } > Buscar </Boton>
      </View>

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
        <Text style={{flex: 0.8,fontSize:20 }} > Mostrar Profesionales </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={filtro_profesional ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch3}
          value={filtro_profesional}
        ></Switch>
      </View>
      <View style={{ alignItems: 'center',flexDirection: 'row'}} >
        <Boton style={{flex:0.4}} mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'EditarPaciente' }],})} > Editar </Boton>
        <Boton style={{flex:0.4}} mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'EliminarPaciente' }],})} > Eliminar </Boton>
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </SafeAreaView>
      <View style={{ alignItems: 'center',flexDirection: 'row'}} >
        <Boton style={{flex:0.6}} mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'NuevoPaciente' }],})} > Agregar Nuevo </Boton>
        <Boton style={{flex:0.3}} mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'Home' }],})} > Volver</Boton>
      </View>
    </View>
  );
}
