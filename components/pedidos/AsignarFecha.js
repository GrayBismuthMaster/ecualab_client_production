import React, { useContext, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PedidoContext from '../../context/pedidos/PedidoContext';

const AsignarFecha = () => {
    const pedidoContext = useContext(PedidoContext)
    const {agregarFecha} = pedidoContext;
    
    //DATE 
    const [startDate, setStartDate] = useState(new Date());

  return (
    <>
        <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>4.- Asignar fecha de Pedido</p>
        <DatePicker
            selected={startDate}
            onChange={(date) => {
                agregarFecha(date);
                setStartDate(date);
            }}
            isClearable
            placeholderText="I have been cleared!"
        />
    </>
    
  )
}
export default AsignarFecha;