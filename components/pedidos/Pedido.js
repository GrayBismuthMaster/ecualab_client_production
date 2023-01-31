import React, { useEffect, useState } from 'react'
import {gql, useMutation} from '@apollo/client'
import Swal from 'sweetalert2'
 
const ACTUALIZAR_PEDIDO = gql`
    mutation actualizarPedido($id : ID!, $input : PedidoInput){
        actualizarPedido(id : $id, input : $input){
            estado 
            aportes{
                id
                valor
                pedido
                creado
            }
            saldo
        }
    }
`
const ELIMINAR_PEDIDO = gql`
    mutation eliminarPedido($id : ID!){
        eliminarPedido(id:$id)
    }
`
const OBTENER_PEDIDOS = gql`
    query obtenerPedidosVendedor { 
        obtenerPedidosVendedor{
            id
        }
    }
`
const Pedido = ({pedido}) => {
    console.log("Pedido de este contecxto", pedido);
    const {id, total ,cliente : {nombre, apellido, telefono, direccion, empresa}, cliente, estado, aportes, saldo, creado} = pedido;
    console.log("APORTE DESDE PEDIDO", aportes);
    const [actualizarPedido] = useMutation(ACTUALIZAR_PEDIDO);
    const [eliminarPedido] = useMutation(ELIMINAR_PEDIDO, {
        update(cache){
            const {obtenerPedidosVendedor} = cache.readQuery({
                query : OBTENER_PEDIDOS
            })
            cache.writeQuery({
                query: OBTENER_PEDIDOS,
                data : {
                    obtenerPedidosVendedor : obtenerPedidosVendedor.filter(pedido => pedido.id !== id)
                }
            })
        }
    });
    const [estadoPedido, setEstadoPedido] = useState(estado);
    const [clase, setClase] = useState('')
    const [aportesPedido, setAportesPedido] = useState(aportes);
    const [saldoPedido, setSaldoPedido ] = useState(saldo);

    useEffect(()=>{
        if(estadoPedido || saldoPedido){
            setEstadoPedido(estadoPedido);
            setSaldoPedido(saldoPedido)
        }  
        clasePedido();
    },[estadoPedido, saldoPedido])

    // useEffect(()=>{
    //     // if(aportesPedido){
    //     //     setAportesPedido(aportesPedido);
    //     // }
    //     console.log("aportes desde useeffect" , aportesPedido)
    //     return ()=>{
    //     }
    // },[aportesPedido])

    //Funcion que modifica el color del pedido por su estado
    const clasePedido = ()=>{
        if(estadoPedido === 'PENDIENTE'){
            setClase('border-yellow-500')
        }else if(estadoPedido === 'COMPLETADO'){
            setClase('border-green-500')
        }else{
            setClase('border-red-800')
        }
    }
    const cambiarEstadoPedido = async (nuevoEstado)=>{
         try{
            const {data} = await actualizarPedido({
                variables : {
                    id,
                    input : {
                        estado : nuevoEstado,
                        cliente : cliente.id
                    }
                }
            })
            console.log(data);
            setEstadoPedido(data.actualizarPedido.estado)
        }catch(error){
            console.log(error)
        }
    }
    const confirmarEliminarPedido = ()=>{
        Swal.fire({
            title: `¿Estás seguro de eliminar el pedido?`,
            text: "No se podrá deshacer esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, bórralo!',
            cancelButtonText:'No, cancélalo'
          }).then(async (result) => {
            if(result.value){
                try{
                    const data = await eliminarPedido({
                        variables : {
                            id
                        }
                    })
                    Swal.fire(
                        "Eliminado",
                        data.eliminarPedido,
                        "success"
                    )
                }catch(error){
                    console.log(error)
                }
            }
          })
    }

    //APORTE
    const cambioAporte =async (e)=>{
        const valor = parseFloat(e.target.value);
        if(e.key === 'Enter'){
            
            try{
                const {data} = await actualizarPedido({
                    variables : {
                        id,
                        input : {
                            aportes : {
                                valor
                            },
                            cliente : cliente.id
                        }
                    }
                })
                console.log("Peiddo actuakizado",data.actualizarPedido);
                
                setAportesPedido(data.actualizarPedido.aportes);
                setSaldoPedido(data.actualizarPedido.saldo);
            }catch(error){
                console.log(error)
            }
        }
    }
    //FIN APORTE


  return (
    <div className={`${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg'`}>
        <div>
            <p className='font-bold text-gray-800'>Cliente :  {nombre} {apellido} {empresa}</p>
            {
                direccion && (
                    <p className='flex items-center my-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                         {direccion}
                    </p>
                )
                
            }
            {
                telefono && (
                    <p className='flex items-center my-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                         {telefono}
                    </p>
                )
                
            }
            <h2 className='text-gray-800 font-bold mt-10'>Estado Pedido : </h2>
            <select
                className='mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold'
                defaultValue = {estadoPedido}
                onChange= {e=>cambiarEstadoPedido(e.target.value)}
            >
                <option value = "COMPLETADO">COMPLETADO</option>
                <option value = "PENDIENTE">PENDIENTE</option>
                <option values = "CANCELADO">CANCELADO</option>
            </select>
            <div className='text-gray-800 mt-3 font-bold'>Aportes: 
                <input
                    className="shadow appearance-none border rounded w-30 py-2 px-3 mx-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="existencia"
                    type="number"
                    placeholder="Cantidad a aportar"
                    onKeyPress = {(e)=>cambioAporte(e)}
                    //Va revisando el cambio que se haga y lo coloca en el estado  
                />
                {
                    aportesPedido.length === 0
                        ?
                        <>
                        
                        <ul className=" flex flex-col h-40 w-80 overflow-auto mt-10 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ">
                             {
                                    aportes.map(aporteUI =>{
                                        return(
                                            <li key={aporteUI.id} className="py-2 px-4 w-full rounded-b-lg">Valor : {aporteUI.valor}$, Fecha : {new Date(parseInt(aporteUI.creado)).toLocaleDateString()}</li>
                                        ) 
                                    })
                            }
                           
                        </ul> 
                        </>
                        
                        :
                    
                        <ul className=" flex flex-col h-40 w-80 overflow-auto mt-10 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ">
                             {
                                    aportesPedido.map(aporteUI =>{
                                        return(
                                            <li key={aporteUI.id} className="py-2 px-4 w-full rounded-b-lg">Valor : {aporteUI.valor}$, Fecha : {new Date(parseInt(aporteUI.creado)).toLocaleDateString()}</li>
                                        ) 
                                    })
                            }
                           
                        </ul> 
                        // null
                }
            </div>
        </div>
        <div className='text-gray-800 font-bold mt-2'>
            <h2>Resumen del Pedido</h2>
            {pedido.pedido.map(articulo=>(
                <div key={articulo.id } className="mt-4"> 
                    <p className='text-sm text-gray-600 font-light'>Producto: {articulo.nombre}</p>
                    <p className='text-sm text-gray-600 font-light'>Cantidad: {articulo.cantidad}</p>
                    <p className='text-sm text-gray-600 font-light'>Fecha del Pedido: {new Date(parseInt(creado)).toLocaleDateString()}</p>
                </div>
            ))}
            
            <p className='text-gray-800 mt-3 font-bold'>Total a pagar: 
                <span className='font-light'>$ {total}</span>
            </p>
            <p className='text-gray-800 mt-3 font-bold'>Saldo: 
                <span className='font-light'>$ {saldoPedido}</span>
            </p>
            <button
                className='uppercase text-xs font-bold flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight'
                onClick={confirmarEliminarPedido}
            >
                Eliminar Pedido
                <svg className="w-4 h-4 ml-2" fill="none" strokeLinecap="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    
            </button>
        </div>
    </div>
  )
}

export default Pedido