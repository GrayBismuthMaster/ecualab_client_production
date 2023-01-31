import { gql, useMutation } from '@apollo/client';
import router from 'next/router';
import React from 'react'
import Swal from 'sweetalert2'

const ELIMINAR_PRODUCTO = gql`
    mutation eliminarProducto($id : ID!) {
        eliminarProducto(id : $id)
    }
`
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
const Producto = ({producto}) => {
    const {id, nombre, precio, existencia} = producto;

    //Mutation para eliminar productos
    const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO,{
        update(cache){
            const {obtenerProductos} = cache.readQuery({
                query : OBTENER_PRODUCTOS
            });
            cache.writeQuery({
                query : OBTENER_PRODUCTOS,
                data : {
                    obtenerProductos: obtenerProductos.filter(productoActual => productoActual.id !== id)
                }
            })
        }
    });

    const confirmarEliminarProducto = id => {
        Swal.fire({
            title: `¿Estás seguro de eliminar el producto ${nombre}?`,
            text: "No se podrá deshacer esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, bórralo!',
            cancelButtonText:'No, cancélalo'
          }).then(async (result) => {
            if (result.isConfirmed) 
            {
                try {
                    //Eliminar por id 
                    //Data es la respuesta del servidor
                    const{data} = await eliminarProducto({
                        variables:{
                            id 
                        }
                    })
                    console.log(data)
                    //Mostrar una alerta
                    Swal.fire(
                        'Producto ELiminado!',
                        data.eliminarProducto,
                        'success'
                    )   
                } catch (error) {
                    console.log(error);
                }
            }
          })
    }

    const editarProducto = ()=>{
        router.push({
            pathname : "/editarProducto/[id]",
            query : {id}
        })
    }
  return (
    <tr>
        <td className='border px-4 py-2'>{nombre}</td>
        <td className='border px-4 py-2'>{existencia} Piezas</td>
        <td className='border px-4 py-2'>$ {precio}</td>
        <td className='border px-4 py-2'>
            <button type="button"
                className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                onClick = {()=>confirmarEliminarProducto(id)}
            >  
                Eliminar       
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
        </td>

        <td className='border px-4 py-2'>
            <button type="button"
                className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                onClick = {()=>editarProducto(id)}
            >
                Editar
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>    
            </button>
        </td>
    </tr>
  )
}

export default Producto