import React from 'react'
import { View, StyleSheet, Text } from 'react-native'



export default function CampoSubTitulo({ valor }) {
  return (
    <Text style={styles.subTitulo}>{valor}</Text>
  )
}

const styles = StyleSheet.create({
    subTitulo: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontStyle: 'italic',
    }
});