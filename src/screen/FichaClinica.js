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
                {tabla && <FiltroFicha/>}
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


function FiltroFicha(){
    const [data, setData] = useState({tableHead:["Fecha","Motivo","Diagnositico","Observacion", " "],tableData:[]});

    const obtenerDatos = async (condicion ={})=>{
        // OBTENER LOS DATOS PARA TABLA DE FICHA CLINICA
        let temp = await peticionesGet('fichaClinica',condicion);
        const cabecera = ["Fecha","Motivo","Diagnositico","Observacion", " "];
        let datos = temp.respuesta.lista.map( (fila)=> { return [fila.fechaHora,fila.motivoConsulta,fila.diagnostico,fila.observacion]});
        // console.log("Datos :"+Object.values(datos))
        setData({tableHead:cabecera,tableData:datos});
    }

    useEffect(
        ()=>{
            obtenerDatos()
        },[]
    )

    const [visibleFiltro, setVisibleFiltro] = useState(false);
    const [datosForm,setDatosForm]= useState({})
    const guardarDatos = (indice,valor)=>{
        let temp = datosForm;
        temp[indice]=valor
        console.log(temp);
        setDatosForm({...temp ,...datosForm})
        console.log(datosForm)
    }

    const enviarForm = async ()=>{
        let form = {
            "idEmpleado":{"idPersona":datosForm.fisio},
            "idCliente":{"idPersona":datosForm.paciente},
            "fechaDesdeCadena":datosForm.fech_desde,
            "fechaHastaCadena":datosForm.fech_hasta,
            "idTipoProducto":{"idTipoProducto":datosForm.producto},

        }
        console.log(form);
        obtenerDatos(form);

    }

    return(
        <View style={styles.container}>

            <Boton mode="contained" onPress={()=>setVisibleFiltro(!visibleFiltro)}>
                Desplegar
            </Boton>
            <Text/>
                {visibleFiltro && <View onDismiss={()=>{setVisibleFiltro(false)}} contentContainerStyle={{backgroundColor: 'white', padding: 20,position:'absolute',top:0}}>
                    <CampoItem valor="Fisioterapeuta"/>
                    <CampoTexto etiqueta="Ingrese el fisioterapeuta" valor={datosForm.fisio} eventoChange={(valor)=>guardarDatos("fisio",valor)}/>
                    <Text/>
                    <CampoItem valor="Paciente"/>
                    <CampoTexto etiqueta="Ingrese el paciente" valor={datosForm.paciente} eventoChange={(valor)=>guardarDatos("paciente",valor)}/>
                    <Text/>
                    <CampoItem valor="Fecha Desde"/>
                    <CampoTexto etiqueta='Ingrese la fecha desde' valor={datosForm.fech_desde} eventoChange={(valor)=>guardarDatos("fech_desde",valor)}/>
                    <Text/>
                    <CampoItem valor="Fecha Hasta"/>
                    <CampoTexto etiqueta='Ingrese la fecha hasta' valor={datosForm.fech_hasta} eventoChange={(valor)=>guardarDatos("fech_hasta",valor)}/>
                    <Text/>
                    <CampoItem valor="Tipo de Producto"/>
                    <CampoTexto etiqueta='Ingrese el producto' valor={datosForm.producto} eventoChange={(valor)=>guardarDatos("producto",valor)}/>
                    <Text/>
                    <Boton mode="contained" onPress={()=>enviarForm()}>
                        Filtrar
                    </Boton>
                </View>}
            <Text/>
            <Text/>
            {data.tableData.length > 0 && <Tabla cabecera={data.tableHead} datos={data.tableData}/>}

        </View>
    );
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
