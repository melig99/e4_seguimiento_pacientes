import * as React from 'react';
import { View, Text } from 'react-native';
import { tema } from '../tema/tema'
import { Boton } from '../componentes';

export default function HomeScreen({navigation}) {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor: tema.fondo.color}}>

            <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'Paciente' }],})} > Paciente</Boton>
            <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'Turnos' }],})} > Turnos</Boton>
            <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'FichaClinica' }],})} > Ficha Clinica</Boton>
            <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'Login' }],})} > Salir</Boton>
        </View>
    );
}
