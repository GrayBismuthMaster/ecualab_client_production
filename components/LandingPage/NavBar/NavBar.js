import React from 'react';
import styles from './Navbar.module.css'
// import { NavLink } from 'react-router-dom';
//import logoDermatologia from '../../assets/LogoDermatologiaHG.png'
//import Login from '../../../pages/login';
import Link from 'next/link'
const NavBar = () => {
    return (
        <>
        <nav className = {styles.navBar}>
            <a href = '/#' className={styles.logo}>
            </a>
            <div className = {styles.containerItems}>
            <a href="/login" className={styles.itemsNavbar}>¿Eres Usuario?</a>
                <a href="#Contacto" className={styles.itemsNavbar}>Contacto</a>
                <a href="#Servicios" className={styles.itemsNavbar}>Servicios</a>
                <a href="#QuienesSomos" className={styles.itemsNavbar}>Quienes Somos</a>
                <a href="#Banner" className={styles.itemsNavbar}>Inicio</a>  
                
                
            </div>
            
        </nav> 
        </>
    );
};
export default NavBar;