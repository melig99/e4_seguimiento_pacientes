import { StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
import React from 'react';
import {tema} from '../tema/tema'

export default function BotonLogin ({evento}){
    return(
        <TouchableOpacity onPress={evento}>
            <Button title="Ingresar"
                color={tema.colors.primario}/>
        </TouchableOpacity>
    );

}
