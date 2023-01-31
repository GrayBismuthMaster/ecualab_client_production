import { useFormik } from 'formik';
import React, { useState } from 'react'
import Layout from '../components/Layout'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client';
import router from 'next/router';

const EDITAR_CUENTA = gql`
    mutation editarUsuario($input: ChangePasswordInput) {
        editarUsuario(input:$input) {
            id
            nombre
            apellido
            email
        }
    }
`;

const configuraciones = () => {
    
    //State para el mensaje
    const [mensaje, guardarMensaje] = useState(null);

   //Mutation para crear nuevos usuarios
   const [editarUsuario ] = useMutation(EDITAR_CUENTA);
    //Validación el formulario
    const formik= useFormik({
        initialValues : {
            email: '',
            password: ''
        },
        validationSchema : Yup.object({
            email: Yup.string().email("El email no es valido").required('El email es obligatorio'),
            oldPassword: Yup.string().required("El password no puede ir vacio").min(6, 'El password no puede ir vacio'),
            newPassword : Yup.string().required("La nueva contraseña es requerida").min(6, 'Minimo 6 caracteres')
        }),
        onSubmit: async valores =>{
            console.log('enviando');
            console.log(valores);
            //Destructuring de los valores del formulario
            const {email,oldPassword, newPassword} = valores
            try {
               const {data} = await editarUsuario({
                   variables : {
                       input : {
                            email,
                            oldPassword,
                            newPassword
                       }
                   }
               })
               console.log("Datos de editar usuario", data);
               //Usuario creado correctamente
                // guardarMensaje(`Se creó correctamente el Usuario: ${data.nuevoUsuario.nombre}`);
                setTimeout(()=>{
                    guardarMensaje(null)
                    router.push('/home')
                }, 3000)
               //Redirigir Usuario para iniciar sesión
               
            } catch (error) {
                guardarMensaje(error.message.replace('GraphQL error : ', ''))
                setTimeout(()=>{
                        guardarMensaje(null)
                }, 3000)
            }
        }
    });
    
    //Mostrar mensjae
    const mostrarMensaje = () => {
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>       
        )
        
    }
  return (
    <Layout>
        {mensaje && mostrarMensaje()}

        <h1 className="text-center text-2xl text-white font-light">Editar cuenta</h1>
        <div className="flex justify-center mt-5">
            <div className="w-full max-w-sm">
                <form 
                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="mb-4">
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email Usuario"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </div>
                    { formik.touched.email && formik.errors.email ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p> {formik.errors.email}</p>  
                        </div>
                    ): null}
                    <div className="mb-4">
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="oldPassword">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="oldPassword"
                            type="oldPassword"
                            placeholder="Password Usuario"
                            value={formik.values.oldPassword}
                            onChange={formik.handleChange}
                        />
                    </div>
                    { formik.touched.oldPassword && formik.errors.oldPassword ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p> {formik.errors.oldPassword}</p>  
                        </div>
                    ): null}
                        
                        <div className="mb-4">
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="newPassword">
                            Nuevo Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="newPassword"
                            type="newPassword"
                            placeholder="Nueva contraseña"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                        />
                    </div>
                    { formik.touched.newPassword && formik.errors.newPassword ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p> {formik.errors.newPassword}</p>  
                        </div>
                    ): null}

                    

                    <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900" 
                    value="Editar Cuenta"

                    />
                </form>
            </div>
        </div>
    </Layout>
  )
}

export default configuraciones