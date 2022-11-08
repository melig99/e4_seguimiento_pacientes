import axios from 'axios';
const URL_BASE = "https://equipoyosh.com/stock-nutrinatalia/";
const PARAMETROS_GENERALES = {  mode: 'no-cors',redirect: 'follow', crossorigin: true,'Access-Control-Allow-Origin': '*' };


const peticionesGet = async (endpoint,datos)=>{

    // console.log(`${URL_BASE+endpoint} test`);
    const options = {
        method: 'GET',
        url: `${URL_BASE+endpoint}`,
        params: datos
    };
    let respuesta="";
    try {

        respuesta = await axios.request(options);
        respuesta = await respuesta.data
        respuesta = {"cod":"0","respuesta":respuesta};
    } catch (e) {
        console.error(e)
        respuesta = {"cod":"1"}
    }
    return respuesta;
}

const peticionesPost = async (endpoint,datos)=>{
    const options = {
        method: 'POST',
        url: `${URL_BASE+endpoint}`,
        data: datos
    };
    let respuesta="";
    try {

        respuesta = await axios.request(options);
        respuesta = await respuesta.data
        respuesta = {"cod":"0","respuesta":respuesta};
    } catch (e) {
        console.error(e)
        respuesta = {"cod":"1"}
    }
    return respuesta;
}


export {peticionesGet};
