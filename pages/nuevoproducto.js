import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {gql, useMutation} from '@apollo/client'
import Swal from 'sweetalert2'
import router from 'next/router';
import { useAddMessage, useMessages } from '../graphql/hooks';

const NUEVO_PRODUCTO = gql`
    mutation nuevoProducto($input : ProductoInput){
        nuevoProducto(input : $input){
            id
            nombre
            existencia
            precio
        }
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

const NuevoProducto = () => {
    

    //CUSTOMHOOK PARA MENSAJE DE NUEVO PRODUCTO AGREGADO
    const { addMessage } = useAddMessage();
    
    

    //Mutation
    const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
        update(cache,{data:{nuevoProducto}}){
            //OBtener objeto de cache
            const {obtenerProductos} = cache.readQuery({query: OBTENER_PRODUCTOS});
            console.log("Obtener productos desde update", obtenerProductos);
            
            
            //Reescribir cache
            cache.writeQuery({
                query : OBTENER_PRODUCTOS,
                data : {
                    obtenerProductos : [...obtenerProductos , nuevoProducto]
                }
            });
        }
    });
    //Formulario para nuevos productos
    const formik = useFormik({
        initialValues:{
            nombre : '',
            existencia: '',
            precio : ''
        },
        validationSchema : Yup.object({
            nombre : Yup.string()
                        .required('El nombre del producto es obligatorio'),
            existencia : Yup.number()
                            .required('Agrega la cantidad disponible')
                            .positive('No se aceptan números negativos')
                            .integer('La existencia deben ser enteros'),
            precio : Yup.number()
                        .required('El precio es obligatorio')
                        .positive(' Los números deben ser positivos')
        }),
        onSubmit : async valores =>{
             const {nombre, existencia, precio} = valores;
             
             if(window !== undefined){
                await addMessage(`Se agregó el producto ${nombre}`);
                // const message = await addMessage(`Se agregó el producto ${nombre}`);
                // console.log("Mensaje desde onSubmit", message);
                // if(message.id !== undefined){

                    try{
                        
                            //MENSAJE DE NUEVO PRODUCTO AGREGADO
                            const producto = await nuevoProducto({
                                variables : {
                                    input : {
                                        nombre,
                                        existencia, 
                                        precio
                                    }
                                }
                            })
                            console.log("Producto desde nuevo Producto", producto);
                            
                            Swal.fire(
                                'Creado',
                                'Se creó el producto correctamente',
                                'success',
                                ).then(async ()=>{
                                    await router.push('/productos');

                                }
            
                            )
                                
                        }
                        catch (error){
                            console.log(error)
                        }  
                // }
             }

            
            
            
            
        }
    })

    //EVENTOS PARA EL UPLOAD DE LOS ARCHIVOS
        //ESTADO DE LA LISTA DE IMAGENES
        const [fileList, setFileList] = useState([]);

        //REFERENCIA
        const wrapperRef = useRef(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e);
        wrapperRef.current.classList.add('bg-black-800')
        // console.log("Drageado encima");
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e);
        // wrapperRef.current.classList.remove('bg-black-800')
        // console.log("Deja");
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e);
        // wrapperRef.current.classList.remove('dragover')
        // console.log("Deja");
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e);
        // wrapperRef.current.classList.remove('bg-black-800')
    };

    const onFileDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Se dejo aca");
        const newFile = e.target.files[0];

        formik.setFieldValue("file", newFile);

        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    }

  return (
    <Layout>
        <h1 className = "text-2xl text-gray-800 font-light ">Crear nuevo producto</h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <form
                        className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                        onSubmit={formik.handleSubmit}
                        onDragEnter={(e)=>{e.preventDefault();e.stopPropagation()}}
                        onDrag={(e)=>{e.preventDefault();e.stopPropagation()}}
                        onDragEnd={(e)=>{e.preventDefault();e.stopPropagation()}}
                        onDragLeave={(e)=>{e.preventDefault();e.stopPropagation()}}
                    >
                        <div className="mb-4">
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="nombre">
                                    Nombre
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nombre"
                                    type="text"
                                    placeholder="Nombre"
                                    //Va revisando el cambio que se haga y lo coloca en el estado
                                    
                                     onChange={formik.handleChange}
                                     onBlur={formik.handleBlur}
                                     value = {formik.values.nombre}
                                />
                        </div>
                        { formik.touched.nombre && formik.errors.nombre ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                  <p className="font-bold">Error</p>
                                  <p> {formik.errors.nombre}</p>  
                                </div>
                            ): null
                        }
                        <div className="mb-4">
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="nombre">
                                    Cantidad Disponible
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="existencia"
                                    type="number"
                                    placeholder="Cantidad Disponible"
                                    //Va revisando el cambio que se haga y lo coloca en el estado
                                    
                                     onChange={formik.handleChange}
                                     onBlur={formik.handleBlur}
                                     value = {formik.values.existencia}
                                />
                        </div>
                        { formik.touched.existencia && formik.errors.existencia ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                  <p className="font-bold">Error</p>
                                  <p> {formik.errors.existencia}</p>  
                                </div>
                            ): null
                        }
                        <div className="mb-4">
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="nombre">
                                    Precio
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="precio"
                                    type="number"
                                    placeholder="Precio Producto"
                                    //Va revisando el cambio que se haga y lo coloca en el estado
                                    
                                     onChange={formik.handleChange}
                                     onBlur={formik.handleBlur}
                                     value = {formik.values.precio}
                                />
                        </div>
                        { formik.touched.precio && formik.errors.precio ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                  <p className="font-bold">Error</p>
                                  <p> {formik.errors.precio}</p>  
                                </div>
                            ): null
                        }

                        {/* <div className="flex justify-center items-center w-full" ref={wrapperRef} onDragEnter={(e)=>handleDragEnter(e)} onDragOver={(e)=>handleDragOver(e)} onDragLeave={(e)=>handleDragLeave(e)} onDrop={(e)=>handleDrop(e)} >
                            <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                    <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" onChange={onFileDrop} />
                            </label>
                        </div>  */}

                        <input
                            type='submit'
                            className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900'
                            value="Agregar Producto"
                        />
                    </form>
                </div>
            </div>
    </Layout>
  )
}

export default NuevoProducto