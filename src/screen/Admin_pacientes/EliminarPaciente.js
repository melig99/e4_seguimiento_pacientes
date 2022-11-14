import  React, { useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,TouchableOpacity  } from 'react-native';
import { Boton } from '../../componentes';
import { PacientesService } from '../../core/Admin_pacientes.js';

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
});

const admin_pacientes = new PacientesService();

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.nombre}, {item.apellido}, {item.email}, {item.cedula}, {item.telefono}, {item.fechaNacimiento}</Text>
  </TouchableOpacity>
);



export default function EliminarPaciente({ navigation }) {

  admin_pacientes.obtener_pacientes();
  const DATA =  admin_pacientes.obtener_datos();
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.idPersona === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.idPersona === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={ async () => {
                    console.log( await admin_pacientes.eliminar_paciente( item ) );
                    navigation.reset({index: 0,routes: [{ name: 'Paciente' }],});
                  }
                }
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          extraData={selectedId}
        />
      </SafeAreaView>
        <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'Paciente' }],})} > Volver</Boton>
    </View>
    );
}
