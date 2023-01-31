import NavBar from "../components/LandingPage/NavBar";
import Banner from "../components/LandingPage/Banner/Banner";
import QuienesSomos from "../components/LandingPage/QuienesSomos/QuienesSomos";
import Servicios from "../components/LandingPage/Servicios/Servicios";
import Contacto from '../components/LandingPage/Contacto/Contacto'
import Footer from "../components/LandingPage/Footer/Footer";
import Link from 'next/link'
  function Index() {
  
    return(
      <>
          <NavBar/>
          <Banner/>
          <QuienesSomos/>
          <Servicios/>
          <Contacto/>
          <Footer/>
      </>
    )
  } 
  
  

export default Index