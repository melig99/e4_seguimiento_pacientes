import React from "react";
import axios from "axios";

export class ReservasService extends React.Component{
    URL_BASE="https://equipoyosh.com/stock-nutrinatalia/reserva"
    datos=[];

    obtener_datos=()=>{
        //console.log("obtener datos");
        return this.datos;
    }

    obtener_reservas = async()=>{
        //console.log("obtener.reservas");
        await axios.get(this.URL_BASE).then(res=>{
            
            const{lista}=res.data;
            //console.log(lista);
            for(element of lista) {
                
                const {idReserva, fecha, horaInicio, horaFin, idCliente:{nombre:cliente}, idEmpleado:{nombre:empleado}, observacion} = element;
                //console.log(idReserva, fecha, horaInicio, horaFin);
                this.datos.push ({ idReserva, fecha, horaInicio, horaFin, cliente, empleado, observacion});
            };
            //console.log(this.datos);   
        });
        //console.log("obtener reservas")
    }

    componentDidMount() {  
        axios.get(`https://jsonplaceholder.typicode.com/posts`)  
          .then(res => {  
            const posts = res.data;  
            this.setState({ posts });  
          })  
      }  
        
      eliminar_turno = async ( datos = {} )=>{
        console.log(datos);
        todelete=this.URL_BASE+'/'+datos;
        console.log(todelete);
        await axios.delete( todelete )
                    .then( ( res )=>{
                      this.respuesta = res;
                    })
                    .catch( ( error )=> console.log( "ha ocurrido un error --------->" + error ) );
      }

}   