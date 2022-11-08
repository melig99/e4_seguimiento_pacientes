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
    NuevoPaciente,//para la administracion de pacientes
    EditarPaciente,//para la administracion de pacientes
    EliminarPaciente,//para la administracion de pacientes
} from './src/screen';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Paciente" component={Pacientes} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Turnos" component={Turnos} />
            <Stack.Screen name="FichaClinica" component={FichaClinica} />
            <Stack.Screen name="NuevoPaciente" component={NuevoPaciente} />
            <Stack.Screen name="EliminarPaciente" component={EliminarPaciente} />
            <Stack.Screen name="EditarPaciente" component={EditarPaciente} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
