import React, { useContext } from 'react'
import PedidoContext from '../../context/pedidos/PedidoContext'
import ResumenProducto from './ResumenProducto';
const ResumenPedido = () => {
    //Context de Pedidos
    const pedidoContext = useContext(PedidoContext)
    const {productos} = pedidoContext;
    return (
        <>
            <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>3.- Ajustar la cantidades del producto</p>
            {
                productos.length > 0
                    ? 
                (
                        <>
                        {
                            productos.map(producto => (
                                <ResumenProducto
                                    key = {producto.id}
                                    producto = {producto}
                                />
                            ))
                        }
                        </>
                )
                    :
                (
                    <>
                        <p>No hay productos</p>
                    </>
                )
            }
        </>
        
    )
}

export default ResumenPedido;