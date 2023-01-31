import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    SELECCIONAR_FECHA,
    CANTIDAD_PRODUCTOS, 
    ACTUALIZAR_TOTAL,
    ACTUALIZAR_STOCK_PRODUCTOS
} from '../../types'

const PedidoReducer =  (state, action) => {
    switch(action.type){
        case SELECCIONAR_CLIENTE :
            return {
                ...state, 
                cliente : action.payload
            }
        case SELECCIONAR_PRODUCTO : 
            return {
                ...state,
                productos : action.payload
            }
        case SELECCIONAR_FECHA :
            return {
                ...state, 
                fecha : action.payload
            }
        case CANTIDAD_PRODUCTOS : 
            return {
                ...state,
                productos : state.productos.map(producto => producto.id === action.payload.id ? producto = action.payload : producto)
            }
        case ACTUALIZAR_TOTAL : 
            return {
                ...state,
                total : state.productos.reduce((nuevoTotal, articulo) => nuevoTotal += articulo.precio * articulo.cantidad, 0)
            }
        case ACTUALIZAR_STOCK_PRODUCTOS : 
            return {
                ...state, 
                productos : state.productos.map(producto => producto.id === action.payload.id ? producto.cantidad = producto.cantidad - action.payload.cantidad : producto.cantidad)
            }
        default : 
        return state;
    }
}
export default PedidoReducer;