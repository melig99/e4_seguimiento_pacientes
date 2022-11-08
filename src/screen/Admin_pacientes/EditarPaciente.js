import  React,  {useState}  from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text,TextInput, StatusBar,ScrollView,Button,TouchableOpacity } from 'react-native';
import { Boton } from '../../componentes/Boton.js';
import { PacientesService } from '../../core/Admin_pacientes.js';
import { Formik } from 'formik';


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
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      margin: 8,
    },
  });

const admin_pacientes = new PacientesService();

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.nombre}, {item.apellido}, {item.email}, {item.cedula}, {item.telefono}, {item.fechaNacimiento}</Text>
    <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
    />
  </TouchableOpacity>
);


  const renderItem = ({ item }) => (
    <Item title={item} />
  );


export default function EditarPaciente({ navigation }) {
  admin_pacientes.obtener_pacientes();
  const DATA = admin_pacientes.obtener_datos();
  const [selectedId, setSelectedId] = useState(null);


  const renderItem = ({ item }) => {
    const backgroundColor = item.idPersona === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.idPersona === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={ async () => { 
                          await admin_pacientes.eliminar_paciente( {item} ); 
                          console.log( {item} )
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
      <ScrollView>   
      <Formik 
        initialValues={ {email: '', nombre: '', apellido: '', telefono: '', ruc: '', cedula: '', tipoPersona: '', fechaNacimiento: ''} } 
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="email"
              value={values.email}
            />
            <TextInput
              style={styles.input}
              onChangeText={handleChange('nombre')}
              onBlur={handleBlur('nombre')}
              placeholder="nombre"
              value={values.nombre}
            />
            <TextInput
              style={styles.input}        
              onChangeText={handleChange('apellido')}
              onBlur={handleBlur('apellido')}
              value={values.apellido}
              placeholder="apellido"
            />
            <TextInput
              style={styles.input}        
              onChangeText={handleChange('teléfono')}
              onBlur={handleBlur('teléfono')}
              value={values.telefono}
              placeholder="teléfono"
            />
            <TextInput
              style={styles.input}        
              onChangeText={handleChange('ruc')}
              onBlur={handleBlur('ruc')}
              value={values.ruc}
              placeholder="ruc"
            />    
                  
            <TextInput
              style={styles.input}        
              onChangeText={handleChange('cedula')}
              onBlur={handleBlur('cedula')}
              value={values.cedula}
              placeholder="cedula"
            />     
            <TextInput
              style={styles.input}        
              onChangeText={handleChange('tipoPersona')}
              onBlur={handleBlur('tipoPersona')}
              value={values.tipoPersona}
              placeholder="tipoPersona"
            />     
            <TextInput
              style={styles.input}        
              onChangeText={handleChange('fechaNacimiento')}
              onBlur={handleBlur('fechaNacimiento')}
              value={values.fechaNacimiento}
              placeholder="fechaNacimiento: AAAA/MM/DD"
            />   

            <Button title="Editar Paciente" mode="contained" onPress={
                                                    async () => { 
                                                      
                                                      await admin_pacientes.agregar_nuevo_paciente(    {"nombre": "Victor",
                                                      "apellido": "Garcete",
                                                      "email": "vgar@prueba.com",
                                                      "telefono": "x4433x",
                                                      "ruc": "1244432222-3",
                                                      "cedula": "1244432222-3",
                                                      "tipoPersona": "FISICA",
                                                      "fechaNacimiento": "1990-10-30 00:00:00"} );
                                                      const res = admin_pacientes.obtener_respuesta();
                                                      console.log( res );
                                                      navigation.reset({index: 0,routes: [{ name: 'Paciente' }],})
                                                    }
                                                  }/>
          <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'Paciente' }],})} > Volver</Boton>
            
          </View>
        )}
      </Formik>
    </ScrollView> 
  </View>
  );
}