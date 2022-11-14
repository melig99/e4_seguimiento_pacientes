import { useState } from 'react';
import { Table, Row, Rows } from 'react-native-table-component';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function Tabla({cabecera, datos}) {

  const [data, setData] = useState({tableHead: cabecera,tableData: Object.values(datos)});
  return (

    <View >
        <Table borderStyle={styles.bordetabla}>
            <Row data={data.tableHead} style={styles.head} textStyle={styles.headText} />
            <Rows data={data.tableData} textStyle={styles.text} />
        </Table>
    </View>
  );
}

const styles = StyleSheet.create({
  bordetabla: { borderWidth: 2, borderColor: '#7B7D7D' },
  head: { height: 44, backgroundColor: '#4D5656' },
  headText: { fontSize: 18, fontWeight: 'bold' , textAlign: 'center', color: 'white' },
  text: { margin: 6, fontSize: 14 , color: 'white'},
});
