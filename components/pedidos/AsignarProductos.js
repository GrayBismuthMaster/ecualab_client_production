import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import {gql, useQuery} from '@apollo/client'
import PedidoContext from '../../context/pedidos/PedidoContext'
const OBTENER_PRODUCTOS = gql`
    query obtenerProductos{
        obtenerProductos{
            id
            nombre
            precio
            existencia
        }
    }
`
const AsignarProductos = () => {

    const [producto, setProductos] = useState([]);
    
    //Context e pedidos
    const pedidoContext = useContext(PedidoContext);
    const {agregarProductos} = pedidoContext;

    //Consulta a la bsae de datos
    const {data, loading, error} = useQuery(OBTENER_PRODUCTOS);
    
    useEffect(() => {
        agregarProductos(producto);
      return () => {
        
      }
    },[producto])
    
    if (loading) return null;
    const {obtenerProductos} = data;

    const seleccionarProductos = (productos)=>{
        setProductos(productos)
    }
  return (
    <>
        <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>2.- Selecciona o busca los productos</p>
        <Select
            className='mt-3'
            options = {obtenerProductos}
            isMulti
            onChange={(option)=>seleccionarProductos(option)}
            getOptionValue = {(opciones)=>opciones.id}
            getOptionLabel = {(opciones)=>`${opciones.nombre} - ${opciones.existencia} Disponibles`}
            placeholder = {'Seleccione los productos'}
            noOptionsMessage = {"No hay resultados"}
        />
    </>
  )
}

export default AsignarProductos