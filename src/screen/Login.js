import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import BotonLogin from '../componentes/BotonLogin'

export default function Login() {
  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>INICIO SESION</Text>
        <Text style={styles.subTitulo}>Inicie sesión en su cuenta</Text>
        <TextInput placeholder="jhon@mail.com" style={styles.textInput}/>
        <TextInput placeholder="contraseña" style={styles.textInput}/>
        <Text/>
        <BotonLogin/>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 50,
        color: '#34434D',
        fontWeight: 'bold', 
    },
    subTitulo: {
        fontSize: 20,
        color: 'gray',
    },
    textInput: {
        padding: 10,
        paddingStart: 30,
        width: '80%',
        height: 50,
        marginTop: 20,
        borderRadius: 30,
        backgroundColor: 'white',

    },

});
