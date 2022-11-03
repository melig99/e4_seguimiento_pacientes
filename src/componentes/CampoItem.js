import React from 'react'
import { View, StyleSheet, Text } from 'react-native'



export default function CampoItem({ valor }) {
  return (
    <Text style={styles.itemTitulo}>{valor}</Text>
  )
}

const styles = StyleSheet.create({
    itemTitulo: {
        fontSize: 15,
        color: 'white',
    },
});