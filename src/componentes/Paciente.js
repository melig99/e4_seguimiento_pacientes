import { StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
import React from 'react';

export default function BotonLogin ({paciente}){

    if ( paciente === undefined ) { 
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> No vino nada </Text>
            </View>
            );

    }else {
        return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text> {paciente.idPersona} </Text>
        </View>
        );
        
    }
}