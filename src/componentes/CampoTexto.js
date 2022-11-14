import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput as Input } from 'react-native'
import { Text as Texto } from 'react-native'


export default function CampoTexto(parametros) {
    const valor = (typeof parametros.valor !== "undefined")?parametros.valor:"";
    const id = (typeof parametros.id !=="undefined")?parametros.id:"test";
    // console.log("valor:"+valor)
  return (
    <Input placeholder={parametros.etiqueta} style={styles.textInput} onChangeText={(valorTexto)=>{ if(typeof parametros.eventoChange !== "undefined"){parametros.eventoChange(valorTexto)}}} value={valor}/>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    width: '100%',
    marginVertical: 12,
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
})
