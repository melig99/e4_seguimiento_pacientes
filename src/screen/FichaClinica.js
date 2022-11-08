import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { tema } from '../tema/tema'
import {peticionesGet} from '../core/peticiones'
import { CampoItem,
    CampoSubTitulo,
    CampoTexto,
    CampoTitulo,
    Boton,
    Tabla
} from '../componentes';
import { TextInput } from 'react-native-paper';

export default function FichaClinica({navigation}) {
    const [pacientes, setPaciente] = useState([]);
    const [productos, setProducto] = useState([]);
    const [data, setData] = useState({});
    const [form,setForm] = useState(false);
    const [tabla,setTabla] = useState(false);
    const mostrarForm = (valor)=>{ setForm(valor)}
    const mostrarTabla = (valor)=>{ setTabla(valor)}


    const obtenerDatos = async ()=>{
        // OBTENER LOS DATOS PARA TABLA DE FICHA CLINICA
        let temp = await peticionesGet('fichaClinica',{});
        const cabecera = ["Fecha","Motivo","Diagnositico","Observacion"];
        let datos = temp.respuesta.lista.map( (fila)=> { return [fila.fechaHora,fila.motivoConsulta,fila.diagnostico,fila.observacion]});
        setData({tableHead:cabecera,tableData:datos});

        // OBTENER DATOS DE PACIENTES
        temp = await peticionesGet("persona",{orderBy:"apellido"})
        setPaciente(temp.respuesta.lista);

        // OBTENER DATOS DE PRODUCTOS
        temp = await peticionesGet("presentacionProducto",{})
        setProducto(temp.respuesta.lista);

    }

    useEffect(
        ()=>{
            obtenerDatos()
        },[]
    )



    return (
        <View style={{flex:1, backgroundColor: tema.fondo.color}}>
            <CampoTitulo valor="Ficha Clinica"/>
            <Text/>
            <Boton mode="contained"  onPress ={ ()=>{mostrarForm(!form)}} > Nuevo Registro</Boton>
            <Boton mode="contained"  onPress ={ ()=>{mostrarTabla(!tabla)}} > Lista </Boton>
            <ScrollView>
                {form && <FormularioFichaClinica pacientes={pacientes} productos={productos}></FormularioFichaClinica>}
                {tabla && <Tabla cabecera={data.tableHead} datos={data.tableData}/>}
            </ScrollView>
            <Boton mode="contained" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }], })}> Volver</Boton>
        </View>
    );
}

function FormularioFichaClinica({pacientes,productos}){

    const [datosForm,setDatosForm]= useState({})
    const guardarDatos = (indice,valor)=>{
        let temp = datosForm;
        temp[indice]=valor
        console.log(temp);
        setDatosForm({...temp ,...datosForm})
        console.log(datosForm)
    }

    const enviarForm = async ()=>{
        
    }
    return <View  style={styles.container}>
        <CampoSubTitulo valor="Registro de una Ficha Clinica"/>
        <Text/>
        <CampoItem valor="Motivo de Consulta"/>
        <CampoTexto etiqueta='Ingrese el motivo de su consulta' valor={datosForm.motivo} eventoChange={(valor)=>{guardarDatos('motivo',valor)}} />
        <Text/>
        <CampoItem valor="Diagnostico"/>
        <CampoTexto etiqueta='Ingrese el diagnostico' valor={datosForm.diagnostico} eventoChange={(valor)=>{guardarDatos('diagnostico',valor)}}/>
        <Text/>
        <CampoItem valor="Observacion"/>
        <TextInput placeholder='Escriba alguna observacion extra' style={styles.observacion} valor={datosForm.observacion} eventoChange={(valor)=>{guardarDatos('observacion',valor)}}/>
        <Text/>
        <CampoItem valor="Doctor Encargado"/>
        <CampoTexto etiqueta='Dr. Encargado'/>
        <Text/>
        <CampoItem valor="Cliente"/>
        <CampoTexto etiqueta='Paciente'/>
        <Text/>
        <CampoItem valor="Producto"/>
        <CampoTexto etiqueta='Tipo de estudios'/>
        <Boton mode="contained" onPress={() => enviarForm()} >Guardar</Boton>
    </View>
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
    }
});
