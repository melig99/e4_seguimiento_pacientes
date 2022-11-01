import * as React from 'react';
import { View, Text } from 'react-native';
import { Boton } from '../componentes/Boton.js';


export default function Turnos({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Turnos</Text>
        <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'Home' }],})} > Volver</Boton>
    </View>
  );
}