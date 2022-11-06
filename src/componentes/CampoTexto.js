import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput as Input } from 'react-native'
import { Text as Texto } from 'react-native'


export default function CampoTexto({ etiqueta }) {
  return (
    <Input placeholder={etiqueta} style={styles.textInput}/>
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
