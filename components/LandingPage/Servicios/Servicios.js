import React from "react";
import Carousel from "../../Carousel/Carousel";
import img1 from "../../../public/assets/landPage/Servicios/gafasServicios.jpg";
import img2 from "../../../public/assets/landPage/Servicios/relojesServicios.jpg";
import img3 from "../../../public/assets/landPage/Servicios/gorraServicios.jpg";
import styles from "../Servicios/Servicios.module.css"

const Servicios = () => {
    
    return (
        <section id="Servicios" className={styles.container}>
            <div className={styles.container_servicios}>
                <div className={styles.container_title}>
                    <h1>Nuestros Productos</h1>
                </div>
                <div className={styles.container_seccion_inferior}>    
                    <div className={styles.container_carousel}>
                            <Carousel  img1={img1} img2={img2} img3={img3}/>
                    </div>
                    <div className={styles.container_informacion_servicios}>
                        <div className={styles.container_items_informacion_servicios}>
                            <h3>VENTA DE RELOJES</h3>
                            <p>
                                Se ofrecen los mejores productos en relojería para que puedas comprar los que necesitas en el mejor precio y con las 
                                mejores condiciones de calidad.
                            </p>
                            
                        </div>
                        <div className={styles.container_items_informacion_servicios}>
                            <h3>VENTA DE GORRAS</h3>
                            <p>
                                Se ofecen los mejores productos en gorras de las mejores marcas y al mejor precio del mercado con las mejores condiciones
                                de calidad.
                            </p>
                        </div>
                        <div className={styles.container_items_informacion_servicios}>
                            <h3>VENTA DE GAFAS</h3>
                            <p>
                                Se ofrecen los mejores productos en gafas de las mejores marcas y al mejor precio del mercado con las mejores condiciones
                                de calidad.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Servicios;