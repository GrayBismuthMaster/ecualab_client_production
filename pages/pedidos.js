import Layout from '../components/Layout'
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import Pedido from '../components/pedidos/Pedido'
import { useEffect, useState } from 'react'
import { useData } from '../hooks/useData'
const OBTENER_PEDIDOS = gql`
    query obtenerPedidosVendedor{
        obtenerPedidosVendedor{
            id
            pedido{
                id
                nombre
                cantidad
            }
            cliente{
                id
                nombre
                apellido
                telefono
                direccion
                empresa
            }
            aportes{
                id
                valor 
                creado
            }
            vendedor
            total
            saldo
            creado
            estado
        }
    }
`
    const pedidos = () => {
        
    const {data, loading, error} = useQuery(OBTENER_PEDIDOS);
    const [pedidosVendedor, setPedidosVendedor] = useState([])
    const [pedidosVendedorFiltrado, setPedidosVendedorFiltrado] = useState([]);
    const [stateFiltering, setStateFiltering]= useState(false);
    useEffect(()=>{
        console.log("pedidos del vendedor")
        console.log(pedidosVendedor);
        return ()=>{

        }
    },[pedidosVendedor])
    useEffect(()=>{
        if(stateFiltering){
            console.log("Pedidos", pedidosVendedor)
            let filterItems= (arr, query) => {
                return arr.filter((el) => el.estado == query);
            }
            let endFilterItems = filterItems(pedidosVendedor,'PENDIENTE');
            console.log("filtrados", endFilterItems);
            
            console.log('Longitud de filtrado',endFilterItems)
                setPedidosVendedorFiltrado(endFilterItems);
            
        }
    },[pedidosVendedor, stateFiltering])
    
    if(loading) return 'Cargando'
    const{obtenerPedidosVendedor} = data;
    
    // const {arrayData} = useData(obtenerPedidosVendedor)
    
    const filtrado = (e)=>{
        console.log("Pedidos", pedidosVendedor)
        console.log('DAtos del ',e.target.value)
        let filterItems= (arr, query) => {
            return arr.filter((el) => el.cliente.nombre.toLowerCase().includes(query.toLowerCase()));
        }
        let endFilterItems = filterItems(pedidosVendedor,e.target.value);
        console.log("filtrados", endFilterItems);
        if(endFilterItems.length>0)
            setPedidosVendedorFiltrado(endFilterItems);
    }
        return (
        <>
            <Layout>
                <h1 className = "text-2xl text-gray-800 font-light">Pedidos</h1>
                <Link href="/nuevopedido">
                    <a className='bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded '>
                    Nuevo Pedido
                    </a>
                </Link>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Buscar</label>
                <div className="relative mt-4 z-auto">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar pedidos por cliente" required onChange={(e)=>{
                        if(pedidosVendedor.length===0){
                            setPedidosVendedor(obtenerPedidosVendedor);
                        }
                        filtrado(e)    
                    }}/>
                    
                    {/* <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> 
                        <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button> */}
                </div>
                
                <div className="flex items-center mx-4 my-4">
                    <input id="default-checkbox" type="checkbox" value={stateFiltering} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={()=>{
                            if(pedidosVendedor.length===0){
                                setPedidosVendedor(obtenerPedidosVendedor);
                            }
                            setStateFiltering(!stateFiltering)}
                        
                        }/>
                    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pendientes</label>
                </div>

                {
                    
                    obtenerPedidosVendedor.length === 0
                        ?
                    (
                        <p className='mt-5 text-center text-2xl'>No hay pedidos aún</p>
                    )
                        :
                    ( 
                        pedidosVendedorFiltrado.length > 0 || stateFiltering
                            ?
                        pedidosVendedorFiltrado.map(pedido => (
                            <Pedido key = {pedido.id}  pedido={pedido}/>
                        ))
                            :
                        obtenerPedidosVendedor.map(pedido => (
                            <Pedido key = {pedido.id}  pedido={pedido}/>
                        ))
                    )
                }
            </Layout>
        </>
    )
    
    }
  
export default pedidos
