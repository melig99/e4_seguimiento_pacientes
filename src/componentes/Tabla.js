import { useState } from 'react';
import { Table, Row, Rows } from 'react-native-table-component';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function Tabla({cabecera, datos}) {
  const [data, setData] = useState({tableHead: cabecera,tableData: Object.values(datos)});

  return (

    <View >
        <Table borderStyle={{ borderWidth: 4, borderColor: 'teal' }}>
        <Row data={data.tableHead} style={styles.head} textStyle={styles.headText} />
        <Rows data={data.tableData} textStyle={styles.text} />
        </Table> 
    </View>    
  );
}

const styles = StyleSheet.create({
  container:{
    paddingLeft: 10,
  },
  observacion: {
    height: 50,
    padding: 10,
    paddingStart: 30,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  head: { height: 44, backgroundColor: 'darkblue' },
  headText: { fontSize: 20, fontWeight: 'bold' , textAlign: 'center', color: 'white' },
  text: { margin: 6, fontSize: 16, fontWeight: 'bold' , textAlign: 'center', color: 'white'},
  textTabla:{ margin: 6}
});