import React, {useReducer} from 'react'
import PedidoContext from './PedidoContext'
import PedidoReducer from './PedidoReducer'
import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    SELECCIONAR_FECHA,
    CANTIDAD_PRODUCTOS, 
    ACTUALIZAR_TOTAL,
    ACTUALIZAR_STOCK_PRODUCTOS
} from '../../types'

const PedidoState = ({children}) =>{
    //State de Pedidos
    const initialState = {
        cliente : {},
        productos : [],
        total : 0,
        fecha : new Date()
    }
    const [state, dispatch] = useReducer(PedidoReducer, initialState);
    const agregarCliente = (cliente) =>{
        dispatch({
            type : SELECCIONAR_CLIENTE, 
            payload : cliente
        })
    }
    const agregarFecha = (fecha) =>{
        dispatch({
            type : SELECCIONAR_FECHA, 
            payload : fecha
        })
    }
    const agregarProductos = (productosSeleccionados) =>{
        console.log("productos seleccionados del state")
        console.log(state.productos);
        let nuevoState;
        if(state.productos.length > 0){
            //Tomar del segundo arreglo, una copia para asignarlo al primero
            nuevoState = productosSeleccionados.map(producto =>{
            const nuevoObjeto = state.productos.find(productoState => productoState.id === producto.id);
            return {...producto, ...nuevoObjeto};
        })
        }else{
            nuevoState = productosSeleccionados;
        }
        
        dispatch({
            type : SELECCIONAR_PRODUCTO,
            payload : nuevoState
        })
    }
    const cantidadProductos = (nuevoProducto)=>{
        dispatch({
            type : CANTIDAD_PRODUCTOS,
            payload : nuevoProducto
        });
    }

    const actualizarTotal = ()=>{
        dispatch({
            type : ACTUALIZAR_TOTAL
        })
    }
    const actualizarStockProductos = (cantidad)=>{
        dispatch({
            type : ACTUALIZAR_STOCK_PRODUCTOS,
            payload : cantidad
        })
    }
    return (
        <PedidoContext.Provider
            value={{
                cliente : state.cliente,
                productos : state.productos,
                total : state.total,
                fecha : state.fecha,
                agregarCliente,
                agregarProductos,
                agregarFecha,
                cantidadProductos, 
                actualizarTotal,
                actualizarStockProductos
            }}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;