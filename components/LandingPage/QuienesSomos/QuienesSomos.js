import Image from "next/image";
import React from "react";
import styles from "./QuienesSomos.module.css";
import MisionImg from '../../../public/assets/landPage/Mision.jpeg'
import VisionImg from "../../../public/assets/landPage/Vision.png"
const QuienesSomos = () => {
    return(
            <section id="QuienesSomos" className={styles.QuienesSomos__container}>
                <div className={styles.Container_title}>
                    <h1 className={styles.title}>¿Quiénes somos?</h1>    
                </div>
                <div className={styles.Container_contenido}>
                    {
                        /*
                             Sección Izquierda de quienes somos Misión y Visión
                        */
                    }
                    <div className={styles.Container_contenido_informacion}>
                        <div className={styles.Container_contenido_informacion_superior}>
                            <h2>Misión </h2>
                        </div>
                        <div className={styles.Container_contenido_informacion_inferior}>
                            <p>
                                    Contribuir con el mejoramiento de la calidad de vida de la población de Quito, 
                                    a través del suministro de productos tecnológicos.
                            </p>
                        </div>

                        <div className={styles.Container_contenido_informacion_superior}>
                            <h2>Visión </h2>
                        </div>
                        <div className={styles.Container_contenido_informacion_inferior}>
                            <p>
                                        Nuestra visión es ser el almacén de productos tecnológicos de vanguardia líder 
                                        en Ecuador  con reconocimiento internacional, superando las expectativas
                                         de nuestros pacientes en las áreas tecnológicas y logísticas.  
                            </p>
                        </div>
                    </div>
                    {	
                        /*
                            Sección Derecha de quienes somos Misión y Visión imágenes
                        */
                    }
                    <div className={styles.Container_contenido_informacion}>
                        <div className={styles.ContainerImg}>
                            <div className={styles.ContainerMisionVisionImg}>
                                {/* <img alt="Imagen de la misión de la empresa" src={MisionImg} className={styles.MisionVisionImg}></img> */}
                                <Image
                                    src={MisionImg}
                                    width={300}
                                    height={300}
                                />
                            </div>
                        </div>

                        <div className={styles.ContainerImg}>
                            <div className={styles.ContainerMisionVisionImg}>
                                {/* <img alt="Imagen de la visión de la empresa" src={VisionImg} className={styles.MisionVisionImg}></img> */}
                                <Image
                                    src={VisionImg}
                                    width={300}
                                    height={300}
                                />
                            </div>
                        </div>
                    </div>


                </div>
            </section>

    )
}
export default QuienesSomos;