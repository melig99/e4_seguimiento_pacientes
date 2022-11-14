import * as React from 'react';
import {  StyleSheet, StatusBar, TextInput,Text,ScrollView,View, Button } from 'react-native';
import { Boton } from '../../componentes';
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
});

/*ejemplo de lo que va en el body
{
  "nombre": "Ariel",
  "apellido": "Cardozo",
  "email": "ariel@gmail.com",
  "telefono": "xx",
  "ruc": "123",
  "cedula": "123-3",
  "tipoPersona": "FISICA",
  "fechaNacimiento": "1990-10-30 00:00:00"
}
*/
const admin_pacientes = new PacientesService();

export default function NuevoPaciente ({ navigation }) {
  return (
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

          <Button title="Agregar Nuevo" mode="contained" onPress={
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
);
}
