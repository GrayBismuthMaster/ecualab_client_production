import React, { useEffect, useState, useContext } from 'react'
import Select from 'react-select'
import {gql, useQuery} from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';
const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
    }
  }
`

const AsignarCliente = () => {
  const [cliente, setClientes] = useState([]);
  //Context e pedidos
  const pedidoContext = useContext(PedidoContext);
  const {agregarCliente} = pedidoContext;

  //COnsultar la base de datos
  const {data, loading, error} = useQuery(OBTENER_CLIENTES_USUARIO);
  console.log(data)
  
  useEffect(() => {
    agregarCliente(cliente);

  return () => {
    
  }
  }, [cliente])

const seleccionarCliente = clientes => {
    setClientes(clientes);
}
  if (loading) return "cargando ..."

  const {obtenerClientesVendedor} = data;

  return (
    <>
      <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>1.- Asigna un cliente al pedido</p>
      <Select
            className='mt-3'
            options = {obtenerClientesVendedor}
             
            onChange={(option)=>seleccionarCliente(option)}
            getOptionValue = {(opciones)=>opciones.id}
            getOptionLabel = {(opciones)=>opciones.nombre}
            placeholder = {'Seleccione el cliente'}
            noOptionsMessage = {"NO hay ese cliente"}
      />
    </>
    
  )
}

export default AsignarCliente