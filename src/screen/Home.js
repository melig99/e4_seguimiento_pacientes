import * as React from 'react';
import { View,StyleSheet } from 'react-native';
import { tema } from '../tema/tema'
import { Boton,CampoTitulo } from '../componentes';

export default function HomeScreen({navigation}) {

    return (
        <View style={{flex:1, backgroundColor: tema.fondo.color}}>
            <CampoTitulo valor="Menu Principal"/>
            <View  style={styles.container}>
                <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'Paciente' }],})} > Paciente</Boton>
                <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'Turnos' }],})} > Turnos</Boton>
                <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'FichaClinica' }],})} > Ficha Clinica</Boton>
                <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'Login' }],})} > Salir</Boton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

