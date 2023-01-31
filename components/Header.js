import React, { useEffect, useState } from 'react';
import {useQuery, gql} from '@apollo/client'
import {useRouter} from 'next/router'
//import icon from material-ui
import {NotificationsNone} from '@material-ui/icons';
import {MoreVertOutlined} from '@material-ui/icons';

import { useMessages } from '../graphql/hooks';
const OBTENER_USUARIO = gql`
    query obtenerUsuario{
        obtenerUsuario{
            id  
            nombre
            apellido
        }
    }
`

const Header = () => {
    //MENSAJES DEL SERVER POR SUBSCRIPTION
    
    const {messages} = useMessages();
    // console.log("Mensaje obtenido desde el server", messages);

    useEffect(() => {
        // messages();
      return () => {
        console.log("Componente Header desmontado");
      };
    }, [messages]);

    //Routing 
    const router = useRouter();
    //Estado para mostrar notificaciones
    const [notificaciones, setNotificaciones] = useState(false);
    const [configuracion, setConfiguracion] = useState(false);
    //Query de Apollo
    const {data, loading, error} = useQuery(OBTENER_USUARIO)
    console.log(data)
    console.log(loading)
    console.log(error)
    //Proteger que no accedamos a data antes de tener resultado
    if(loading) return null;

    //Si no hay datos
    if(!data){
        return router.push('/')
    }
    //Destructuramos obtenerUsuario
    const {nombre, apellido} = data.obtenerUsuario;
    //Cerrar Sesión
    const cerrarSesion = () => {
        localStorage.removeItem('token')
        router.push('/')
    }
    
    const redirectConfig = ()=>{
        router.push('/configuraciones');
    }
    return ( 
    <div className='flex mb-6 justify-end align-end'>
                {/* <p className='mr-2'>Hola {nombre} {apellido}</p> */}


                {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
        <div>
             <div className="relative inline-block text-left mr-2">
            {/*
                <div>
                    <button 
                        type="button" 
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" 
                        id="menu-button" 
                        aria-expanded="true" 
                        aria-haspopup="true" 
                        onClick={()=>setNotificaciones(!notificaciones)}
                    >
                    <NotificationsNone/>
                    {messages.length > 0 && <span className="ml-1">{messages.length}</span>}
                    </button>
                </div> */}

                {/* <!--
                    Dropdown menu, show/hide based on menu state.

                    Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                    Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                --> */}
                {/* <div className={notificaciones ? "origin-top-right absolute right-0 mt-2 w-56 h-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto scrollbar" : 'hidden'} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1" onPointerLeave={()=>setNotificaciones(!notificaciones)} >
                    <div className={notificaciones ? "py-1" :"hidden"} role="none">

                    
                        {
                            messages.map(message => (
                                <div key={message.id} className="flex items-center px-4 py-2">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a1 1 0 012 0v3.158a2.032 2.032 0 01-1.095 1.396L15 17z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm leading-5 font-medium text-gray-900">
                                            {message.text}
                                        </p>
                                    </div>
                                </div>
                            ))

                        }
                    </div>
                </div> */}

            </div>
            
            {/* SECCIÓN DE OPCIONES GENERALES */}
            <div className="relative inline-block text-left">
                {/* TODO: CLICK EN OPCION CERRAR SESION */}
                <div>
                            
                    <button 
                        type="button"
                        className={"inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"} id="menu-button" 
                        aria-expanded="true" 
                        aria-haspopup="true" 
                        onClick={()=>setConfiguracion(!configuracion)}
                        // onClick={()=>cerrarSesion()}
                    >
                        <MoreVertOutlined/>
                    </button>  
                </div>

                {/* <!--
                    Dropdown menu, show/hide based on menu state.

                    Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                    Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                --> */}
                <div className={configuracion ? "z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" : 'hidden'} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1"   onPointerLeave={()=>setConfiguracion(!configuracion)}>
                    <div className={configuracion ? "py-1" :"hidden"} role="none">
                    {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0" onClick={()=>redirectConfig()}>Configuraciones</a>
                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Support</a>
                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">License</a>
                    <button className="text-gray-700 block w-full text-left px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3" onClick={()=>cerrarSesion()}>Cerrar sesión</button>
                    {/* <form method="POST" action="#" role="none">
                        <button type="submit" class="text-gray-700 block w-full text-left px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                    </form> */}
                    </div>
                </div>

            </div>
        </div>
            
    </div> 
    );
}
 
export default Header;