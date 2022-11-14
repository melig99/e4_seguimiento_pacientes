import React from 'react';
import axios from 'axios';

export class PacientesService extends React.Component {
  URL_BASE = "https://equipoyosh.com/stock-nutrinatalia/persona";
  datos = [];
  respuesta = {};
  es_profesional = true ;

  obtener_datos = ( ) => {

    return this.datos;
  }
  obtener_respuesta = ( ) => {

    return this.respuesta;
  }
  obtener_pacientes = async ( )=>{
    //idPersona, nombre, apellido, teléfono, email, ruc, cedula, tipoPersona, fechaNacimiento
    await axios.get( this.URL_BASE )
              .then(res => {
                const { lista } = res.data;
                this.datos = lista ;
              })
              .catch ( error => console.log ( " Ha ocurrido un error " + error ));
    return this.datos ;
  }

  obtener_pacientes_ordenado_x_nombre = async ( tipo = 'desc', cantidad = 0 )=>{
    console.log( this.URL_BASE + `&orderBy=nombre&orderDir=${ tipo }` );
    await axios.get( this.URL_BASE + `&orderBy=nombre&orderDir=${ tipo }` )
              .then( ( res ) => {
                const { lista } = res.data;
                this.datos = lista ;
              })
              .catch ( error => console.log ( " Ha ocurrido un error " + error ));
    return this.datos ;
  }

  obtener_pacientes_ordenado_x_apellido = async ( tipo = 'desc', cantidad = 0 )=>{

    axios.get( URL_BASE + `&orderBy=apellido&orderDir=${ tipo }` )
        .then( ( data )=>{
          const { lista } = res.data;
          for (const element of lista) {
            const { idPersona, nombre, apellido, teléfono, email, ruc, cedula, tipoPersona, fechaNacimiento } = element ;                  
            this.datos.push( { idPersona, nombre, apellido, teléfono, email, ruc, cedula, tipoPersona, fechaNacimiento } );
          };
        } );
    return pacientes ;
  }

  obtener_pacientes_x_nombre = async  ( paginacion = '', nombre = '' )=>{
    const url = this.URL_BASE + `?ejemplo=%7B%22nombre%22%3A%22${ nombre }%22%7D`;
    await axios.get ( url )
              .then( ( res )=>{
                const { lista } = res.data;
                //console.log ( lista );
                this.datos = lista ;
                console.log( this.datos );
              })
              .catch ( error => console.log ( " Ha ocurrido un error " + error ));
    return this.datos ;
  }

  obtener_profesionales = async  ( paginacion = "", nombre = '' )=>{
    await axios.get ( this.URL_BASE + `?ejemplo=%7B%22soloUsuariosDelSistema%22%3Atrue%7D` )
                .then( ( res ) => {
                  const { lista } = res.data;
                  this.datos = lista ;
                })
                .catch ( error => console.log ( " Ha ocurrido un error " + error ));
    return this.datos ;
    
  }

  agregar_nuevo_paciente = async  ( datos = {} )=>{
    //console.log ( datos );
    await axios.post( this.URL_BASE,  datos )
                .then( ( res )=>{
                  this.respuesta = res.data;
                  console.log( 'Paciente Creado' );
                })
                .catch( ( error )=> console.log( "ha ocurrido un error" ) );
  
  }

  eliminar_paciente = async ( datos = {} )=>{
    const { idPersona } = datos;
    console.log ( idPersona ); 
    console.log(  this.URL_BASE + `/${idPersona}` );
    
    const eliminacion = await axios.delete( this.URL_BASE + `/${idPersona}` )
                                  .then( ( res )=>{
                                    this.respuesta = res;
                                    console.log ( 'Registro Eliminado' );
                                  })
                                  .catch( ( error )=> console.log( "ha ocurrido un error --------->" + error ) );
  }
  editar_paciente = async  ( datos = {} )=>{
    console.log ( datos );
    
    const edicion =  await axios.put( this.URL_BASE , datos )
                                .then( ( res )=>{
                                  this.respuesta = res;
                                  console.log ( 'registro editado' )
                                })
                                .catch( ( error )=> console.log( "ha ocurrido un error" + error ) );
  }




}
