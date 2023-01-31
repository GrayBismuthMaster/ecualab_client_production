import React,{useState} from 'react';
import Layout from '../components/Layout'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {gql, useMutation} from '@apollo/client'
import {useRouter} from 'next/router'
import Link from 'next/link';
// const API_URL = 'https://server.crissol.link'

const API_URL = 'http://localhost:9000'
// const AUTENTICAR_USUARIO = gql`
//     mutation autenticarUsuario($input:AutenticarInput)
//     {
//         autenticarUsuario(input:$input)
//         {
//             token
//         }
//     }
// `;

const Index = () => {
    //Routing 
    const router = useRouter();
     //State para el mensaje
     const [mensaje, guardarMensaje] = useState(null);
     

    //Mutation para crear nuevos usuarios en Apollo
    //Array Destructuring para el retorno del mutation de gql
    // const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

    const formik = useFormik({
        initialValues: {
            email: '',
            password : ''
        },
        validationSchema : Yup.object({
            email: Yup.string().email('El email no es válido').required('El email no puede ir vacio'),
            password: Yup.string()
                    .required('El password es obligatorio')           
        }), 
        onSubmit: async valores => {
            const {email,password} =valores
            console.log(valores)
            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: {
                      'content-type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                  });
                  if (response.ok) {
                    console.log(response)
                    const { token } = await response.json();
                    // localStorage.setItem(ACCESS_TOKEN_KEY, token);
                    localStorage.setItem('token',token)
                    //redireccionar hacia clientes
                    setTimeout(()=>{
                        guardarMensaje(null)
                        router.push('/home')
                    }, 3000)
                  }
                  return null;
               
            } catch (error) {
                console.log(error)
                guardarMensaje(error.message.replace('GraphQL error : ', ''))
                setTimeout(()=>{
                        guardarMensaje(error)
                }, 3000)
            }

        }
    })
     //Mostrar mensjae
     const mostrarMensaje = () => {
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>       
        )
        
    }
    
    return (
        <>
            <Layout>
                <div className="flex justify-start mt-5 flex-col">
                    
                <h1 className="text-2xl text-white font-light justify-self-center ml-10 my-8">Login</h1>
                {mensaje && mostrarMensaje()}
                    <div className="w-full max-w-sm" >
                        <form 
                            className="bg-white rounded shadow-md ml-8 px-8 pt-6 pb-8 mb-4"
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
                                    //Va revisando el cambio que se haga y lo coloca en el estado
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value = {formik.values.email}
                                />
                            </div>
                            { formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                  <p className="font-bold">Error</p>
                                  <p> {formik.errors.email}</p>  
                                </div>
                            ): null}

                            <div className="mb-4">
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Password Usuario"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value = {formik.values.password}
                                />
                            </div>

                            { formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                  <p className="font-bold">Error</p>
                                  <p> {formik.errors.password}</p>  
                                </div>
                            ): null}   

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900" 
                                value="Iniciar Sesión"
                            />
                            
                            {/* <Link
                                href={'nuevacuenta'}
                            >
                                <div 
                                    className="flex bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900 justify-center content-center" 
                                >
                                    Registrarse
                                </div>
                            </Link> */}
                        </form>
                        
                    </div>
                </div>
           
            </Layout>
        </>
      );
}
 
export default Index;
