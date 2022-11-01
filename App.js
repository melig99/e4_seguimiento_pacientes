import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen,
    Pacientes,
    Turnos,
    FichaClinica,
    Login
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
