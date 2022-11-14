import  React,  {useState}  from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text,TextInput, StatusBar,ScrollView,Button } from 'react-native';
import { Boton } from '../../componentes';
import { PacientesService } from '../../core/Admin_pacientes.js';
import SelectMultiple from 'react-native-select-multiple'
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
const renderLabel = (label, style) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{marginLeft: 10}}>
        <Text style={style}>{label}</Text>
      </View>
    </View>
  )
}


export default function EditarPaciente({ navigation }) {
  admin_pacientes.obtener_pacientes();
  const DATA = admin_pacientes.obtener_datos();
  let idPersona = '';

  const lista = DATA.map( ( value )=>{ return `${value.nombre},${value.apellido},${value.idPersona}`} );

  const state = []

  const onSelectionsChange = ( selections, item ) => {
      state.push( selections);
      const { value } = item;
      const [ nombre, apellido, id] = value.split( ',' )
      idPersona = id ;
      console.log ( idPersona );

  }

  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SelectMultiple
        items={lista}
        selectedItems={state}
        renderLabel={renderLabel }
        onSelectionsChange={onSelectionsChange}
      />
      <ScrollView >
        <Formik initialValues={ {email: '', nombre: '', apellido: '', telefono: '', ruc: '', cedula: '', tipoPersona: '', fechaNacimiento: ''} } >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={{ flex: 1,justifyContent: 'center' }}>
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
              onChangeText={handleChange('telefono')}
              onBlur={handleBlur('telefono')}
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

                                                      await admin_pacientes.editar_paciente(
                                                      {
                                                        "idPersona"       : idPersona,
                                                        "nombre"          : values.nombre,
                                                        "apellido"        : values.apellido,
                                                        "email"           : values.email,
                                                        "telefono"        : values.telefono,
                                                        "ruc"             : values.ruc,
                                                        "cedula"          : values.cedula,
                                                        "tipoPersona"     : values.tipoPersona.toUpperCase(),
                                                        "fechaNacimiento" : values.fechaNacimiento + " 00:00:00"
                                                      } );
                                                      const res = admin_pacientes.obtener_respuesta();
                                                      console.log( res );
                                                      navigation.reset( {index: 0,routes: [{ name: 'Paciente' }],} )
                                                    }
                                                  }/>

          </View>
        )}
        </Formik>
      </ScrollView>

      <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'Paciente' }],})} > Volver</Boton>
  </View>
  );
}
