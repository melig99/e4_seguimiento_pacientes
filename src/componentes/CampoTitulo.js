import React from 'react'
import { View, StyleSheet, Text } from 'react-native'



export default function CampoTitulo({ valor }) {
  return (
    <Text style={styles.titulo}>{valor}</Text>
  )
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 35,
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 100,
        marginTop: 8,
    },
});