import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import * as React from 'react';
import BotonLogin from '../componentes/BotonLogin'
import CampoTexto from '../componentes/CampoTexto';

export default function Login({navigation}) {
  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>INICIO SESION</Text>
        <Text style={styles.subTitulo}>Inicie sesión en su cuenta</Text>
        <CampoTexto etiqueta="jhon@mail.com"></CampoTexto>
        <CampoTexto etiqueta="Aqui va su contraseña"></CampoTexto>
        <Text/>
        <BotonLogin evento={() =>navigation.reset({index: 0,routes: [{ name: 'Home' }],})}/>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d1117',
    },
    titulo: {
        fontSize: 50,
        color: 'white',
        fontWeight: 'bold',
    },
    subTitulo: {
        fontSize: 20,
        color: 'white',
        textDecorationLine: 'underline',
        fontStyle: 'italic',
    },

});
