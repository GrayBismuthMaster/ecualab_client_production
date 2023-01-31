import React from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Image from 'next/image'
import {useRouter} from 'next/router'
const Layout = ({children}) => {
    //Hook de Routing
    const router = useRouter();
    return ( 
        <>
            <Head>
                <title>CRM - Administración de clientes</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.2/tailwind.min.css" integrity="sha512-+WF6UMXHki/uCy0vATJzyA9EmAcohIQuwpNz0qEO+5UeE5ibPejMRdFuARSrl1trs3skqie0rY/gNiolfaef5w==" crossOrigin="anonymous" />
            </Head>
            {router.pathname==='/' || router.pathname==='/nuevacuenta'? (
                <div className="min-h-screen flex flex-col justify-center" style={{
                    backgroundImage: `url("/assets/landPage/banner.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed"
                }}>
                          <div>        
                                {children}
                          </div>
                </div>
            ): (
                    <div className="bg-gray-200">
                    <div className="flex min-h-screen">
                        <Sidebar/>
                        <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
                            <Header/>
                            {children}
                        </main>
                    </div>
                </div>
            )}
            
            </>
    );
}

export default Layout;