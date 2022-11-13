import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { tema } from '../tema/tema'
import {peticionesGet,peticionesPost} from '../core/peticiones'
import { CampoItem,
    CampoSubTitulo,
    CampoTexto,
    CampoTitulo,
    Boton,
    Tabla,
    Lista
} from '../componentes';
import { TextInput, SegmentedButtons,  Modal, Portal, Button, Provider, Checkbox} from 'react-native-paper';

export default function FichaClinica({navigation}) {

    const [pacientes, setPaciente] = useState([]);
    const [productos, setProducto] = useState([]);
    const [data, setData] = useState({});
    const [form,setForm] = useState(false);
    const [tabla,setTabla] = useState(false);
    const mostrarForm = (valor)=>{ setForm(valor); if (tabla && valor){mostrarTabla(false)}};
    const mostrarTabla = (valor)=>{ setTabla(valor); if (form && valor ){mostrarForm(false)}};
    const [value, setValue] = useState('');
    const boton = (valor)=>{
        if(valor == "nuevo"){
            mostrarForm(!form);
        }else if(valor == "panel"){
            mostrarTabla(!tabla);
        }else if(valor == "volver"){
            navigation.reset({ index: 0, routes: [{ name: 'Home' }], });
        }
    }
    const modalprueba = ["Fecha","Motivo","Diagnositico","Observacion"];
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
            <View style={styles.button}>
                <SegmentedButtons
                    value={value}

                    onValueChange={boton}
                    buttons={[
                        {
                            value: 'nuevo',
                            label: 'Nuevo',
                            style:{backgroundColor:tema.colors.primario,borderColor:"white"}
                        },
                        {
                            value: 'panel',
                            label: 'Lista',
                            style:{backgroundColor:tema.colors.primario,borderColor:"white"}
                        },
                        {
                            value: 'volver',
                            label: 'Volver',
                            style:{backgroundColor:tema.colors.primario,borderColor:"white"}
                        },
                    ]}
                    />
            </View>
            <Text></Text>
            <ScrollView>
                {form && <FormularioFichaClinica pacientes={pacientes} productos={productos}></FormularioFichaClinica>}
                {tabla && <Tabla cabecera={data.tableHead} datos={data.tableData}/>}
            </ScrollView>
        </View>
    );
}

function FormularioFichaClinica({pacientes,productos}){

    const [datosForm,setDatosForm]= useState({})
    const guardarDatos = (indice,valor)=>{
        let temp = datosForm;
        temp[indice]=valor
        // console.log(temp);
        setDatosForm({...temp ,...datosForm})
        // console.log(datosForm)
    }
    const [visiblePaciente, setVisiblePaciente] = useState(false);
    const [visibleDoctor, setVisibleDoctor] = useState(false);
    const [visibleProducto, setVisibleProducto] = useState(false);
    const enviarForm = async ()=>{
        let form = {
            "motivoConsulta":datosForm.motivo,
            "diagnostico":datosForm.diagnostico,
            "observacion":datosForm.observacion,
            "idEmpleado":{"idPersona":datosForm.idPersonaD},
            "idCliente":{"idPersona":datosForm.idPersonaP},
            "idTipoProducto":{"idTipoProducto":datosForm.idproducto},

        }
        console.log(form);
        let resp = await peticionesPost('fichaClinica',form,'usuario1');

    }
    return ( <View  style={styles.container}>
        <CampoSubTitulo valor="Registro de una Ficha Clinica"/>
        <Text/>
        <CampoItem valor="Motivo de Consulta"/>
        <CampoTexto etiqueta='Ingrese el motivo de su consulta' valor={datosForm.motivo} eventoChange={(valor)=>guardarDatos("motivo",valor)}/>
        <Text/>
        <CampoItem valor="Diagnostico"/>
        <CampoTexto etiqueta='Ingrese el diagnostico'
            valor={datosForm.diagnostico} eventoChange={(valor)=>guardarDatos("diagnostico",valor)}></CampoTexto>
        <Text/>
        <CampoItem valor="Obeservacion"/>
        <TextInput placeholder='Escriba alguna observacion extra' style={styles.observacion} value={datosForm.observacion} onChangeText={(valor)=>guardarDatos("observacion",valor)}/>
        <Text/>

        <Provider>
            <Portal>
                <Modal visible={visibleDoctor} onDismiss={()=>{setVisibleDoctor(false)}} contentContainerStyle={containerStyle}>

                    <Lista lista={pacientes} identificador="idPersona" dato="nombreCompleto" evento={(valor)=>{guardarDatos("idPersonaD",valor);setVisibleDoctor(false)}}></Lista>
                </Modal>
                <Modal visible={visiblePaciente} onDismiss={()=>setVisiblePaciente(false)} contentContainerStyle={containerStyle}>
                    <Lista lista={pacientes} identificador="idPersona" dato="nombreCompleto" evento={(valor)=>{guardarDatos("idPersonaP",valor);setVisiblePaciente(false)}}></Lista>
                </Modal>
                <Modal visible={visibleProducto} onDismiss={()=>setVisibleProducto(false)} contentContainerStyle={containerStyle}>
                    <Lista lista={productos} identificador="idproducto" dato="descripcion" evento={(valor)=>{guardarDatos("idproducto",valor);setVisibleProducto(false)}}></Lista>
                </Modal>
            </Portal>
            <Boton mode="contained" onPress={()=>setVisibleDoctor(true)}>
                Doctor Encargado
            </Boton>
            <Boton mode="contained" onPress={()=>setVisiblePaciente(true)}>
                Paciente
            </Boton>
            <Boton mode="contained"  onPress={()=>setVisibleProducto(true)}>
                Producto
            </Boton>
        </Provider>
        <Text/>
        <Boton mode="contained" onPress={()=>enviarForm()}>Guardar</Boton>
    </View> )
}
const containerStyle = {backgroundColor: 'white', padding: 20};
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
    button:{
        flexDirection: 'column',
        alignItems: 'center'
    },
});
