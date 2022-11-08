import * as React from 'react';
import { ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default function Lista({lista,identificador,dato, evento}) {
    // console.log(lista[0],identificador,evento)

    return (
    <>
        <ScrollView>
            {lista.map((valor)=> <Checkbox.Item label={valor[dato]}
            key={valor[identificador]} onPress={()=>evento(valor[identificador])}/>)}
        </ScrollView>
    </>
    );
  }
