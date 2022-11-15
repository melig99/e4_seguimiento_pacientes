import React from "react";
import axios from "axios";

export class ReservasService extends React.Component{
    URL_BASE="https://equipoyosh.com/stock-nutrinatalia/reserva"
    URL_BASE_PERSONAS = "https://equipoyosh.com/stock-nutrinatalia/persona";
    URL_BASE_FISIOTERAPEUTAS = "https://equipoyosh.com/stock-nutrinatalia/persona?ejemplo=%7B%22soloUsuariosDelSistema%22%3Atrue%7D"
    URL_AGENDA= "https://equipoyosh.com/stock-nutrinatalia/persona/2/agenda?fecha=20221012"
    datos=[];
    personas=[];
    empleados=[];
    agenda=[];

    obtener_datos=()=>{
        //console.log("obtener datos");
        return this.datos;
    }

    obtener_personas = ( ) => {

        return this.personas;
      }

    obtener_empleados2 = ( ) => {

      return this.empleados;
    }

    obtener_agenda2 = ( ) => {
      //console.log(this.agenda);
      return this.agenda;
    }
    devolver_agenda = (id ) => {
      this.obtener_agenda(id);
      return this.agenda;
    }

    obtener_respuesta = ( ) => {

      return this.respuesta;
    }
    obtener_reservas = async()=>{
        //console.log("obtener.reservas");
        await axios.get(this.URL_BASE+"?orderBy=fechaHoraCreacion&orderDir=desc").then(res=>{
            //console.log(res.data);
            const{lista}=res.data;
            //console.log(lista);
            for(element of lista) {

                const {idReserva, fecha, horaInicio, horaFin, idCliente:{nombre:cliente}, idEmpleado:{nombre:empleado}, observacion, idCliente:{apellido:apellidoCliente}, idEmpleado:{apellido:apellidoEmpleado}, flagAsistio } = element;
                //console.log(idReserva, fecha, horaInicio, horaFin);
                this.datos.push ({ idReserva, fecha, horaInicio, horaFin, cliente, empleado, observacion, apellidoCliente, apellidoEmpleado, flagAsistio});
            };
            //console.log(this.datos);
        });
        //console.log("obtener reservas")
    }

    obtener_pacientes = async ( )=>{
        //idPersona, nombre, apellido, teléfono, email, ruc, cedula, tipoPersona, fechaNacimiento
        await axios.get( this.URL_BASE_PERSONAS )
                  .then(res => {
                    const { lista } = res.data;
                    for (const element of lista) {
                      const { idPersona:key, nombre:value } = element ;
                      this.personas.push( { key, value} );
                    };
                  });
      }


      obtener_empleados = async ( )=>{
        //idPersona, nombre, apellido, teléfono, email, ruc, cedula, tipoPersona, fechaNacimiento
        await axios.get( this.URL_BASE_FISIOTERAPEUTAS )
                  .then(res => {
                    const { lista } = res.data;
                    for (const element of lista) {
                      const { idPersona:key, nombre:value } = element ;
                      this.empleados.push( { key, value} );
                    };
                  });
      }

      obtener_agenda = async ( idFisioterapeuta )=>{
        var hoy=new Date();
        url='https://equipoyosh.com/stock-nutrinatalia/persona/'+idFisioterapeuta+'/agenda?fecha='+hoy.getFullYear()+(hoy.getMonth()+1)+hoy.getDate();
        console.log(url);
        await axios.get(url)
                  .then(res => {
                    //console.log(res.data);
                    //const { lista } = res.data;
                    //console.log(res);
                    for (const element of res.data) {
                      const { fecha, horaInicio, horaFin } = element ;
                      this.agenda.push( { fecha, horaFin, horaInicio} );
                    };
                    //console.log(this.agenda);
                  });
      }


      nueva_reserva = async  ( datos = {} )=>{
        console.log ( datos );
        await axios.post(this.URL_BASE, datos)
          .then( ( res )=>{
            this.respuesta = res.data;
            console.log( 'Reserva Creada' );
          })
          .catch( ( error )=> console.log( "ha ocurrido un error -> " + error ) );
      }

    componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
          .then(res => {
            const posts = res.data;
            this.setState({ posts });
          })
      }
      editar_reserva = async  ( datos = {} )=>{
        console.log(datos);

        const edicion =  await axios.put( this.URL_BASE , datos )
                                .then( ( res )=>{
                                  this.respuesta = res;
                                  console.log ( 'registro editado' )
                                })
                                .catch( ( error )=> console.log( "ha ocurrido un error" + error ) );
      }


      eliminar_turno = async ( datos = {} )=>{
        //console.log(datos);
        todelete=this.URL_BASE+'/'+datos;
        console.log(todelete);
        await axios.delete( todelete )
                    .then( ( res )=>{
                      this.respuesta = res;
                    })
                    .catch( ( error )=> console.log( "ha ocurrido un error --------->" + error ) );
      }



}
