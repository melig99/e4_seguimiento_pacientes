import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import React,{ useState } from 'react';
import BotonLogin from '../componentes/BotonLogin'
import {peticionesGet} from '../core/peticiones'

export default function Login({navigation}) {
    const [usuario, setUsuario] = useState('');
    let error="";

    const loguear= async ()=>{
        console.log(`{"soloUsuariosDelSistema":true,"usuarioLogin":"${usuario}"}`)
        const resp =  await peticionesGet('persona',{"ejemplo":`{"soloUsuariosDelSistema":true,"usuarioLogin":"${usuario}"}`});
        console.log(resp)
        if(resp.cod ==0){
            console.log(resp.respuesta)
            navigation.reset({index: 0,routes: [{ name: 'Home' }],})
        }else{
            console.log("Error")
        }
    }

  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>INICIO SESION</Text>
        <Text style={styles.subTitulo}>Inicie sesión en su cuenta</Text>
        <TextInput placeholder="jhon@mail.com" style={styles.textInput} onChangeText ={(valor)=>{setUsuario(valor)}} />
        <TextInput placeholder="contraseña" style={styles.textInput}/>
        <Text/>
        <BotonLogin evento={() => loguear()}/>
        <Text>{error}</Text>
        <StatusBar style="auto" />
    </View>
  );
}
// <BotonLogin evento={() =>navigation.reset({index: 0,routes: [{ name: 'Home' }],})}/>
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
