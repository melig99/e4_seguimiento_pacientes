import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Hello</Text>
      <Text style={styles.subTitulo}>Sign In to you account</Text>
      <TextInput>
            placeholder="jhon@mail.com"
      </TextInput>
      <TextInput>
            placeholder="password"
      </TextInput>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo{
        fontSide: 80,
        color: '#000',
        fontWeight: 'blond' 
    },
    subTitulo{
        fontSide: 30,
        color: 'gray',
    },
});
