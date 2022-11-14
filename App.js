import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen,
    Pacientes,
    Turnos,
    FichaClinica,
    Login,
    NuevoTurno
    NuevoPaciente,//para la administracion de pacientes
    EditarPaciente,//para la administracion de pacientes
    EliminarPaciente,//para la administracion de pacientes
} from './src/screen';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Paciente" component={Pacientes} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Turnos" component={Turnos} options={{headerShown: false}}/>
        <Stack.Screen name="NuevoTurno" component={NuevoTurno} />
        <Stack.Screen name="FichaClinica" component={FichaClinica} options={{headerShown: false}} />
        <Stack.Screen name="NuevoPaciente" component={NuevoPaciente} options={{headerShown: false}}/>
        <Stack.Screen name="EliminarPaciente" component={EliminarPaciente} options={{headerShown: false}}/>
        <Stack.Screen name="EditarPaciente" component={EditarPaciente} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


