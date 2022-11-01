import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function BotonLogin (){
    return(
        <TouchableOpacity style={styles.container}>
             <LinearGradient 
                    colors={['#FFB677', '#FF3CBD']}
                    start={{x:1, y:0}}
                    end={{x:0, y:1}}
                    style={styles.button}>
                <Text style={styles.text}>Ingresar</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    text: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',


    },
    button: {
        width: '80%',
        height: 50,
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'

    }
});