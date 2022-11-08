import * as React from 'react';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default function Lista() {

  
    return (
    <>
        <View>
            <Checkbox.Item label="Item" status="checked" />
        </View>
    </>
    );
  }