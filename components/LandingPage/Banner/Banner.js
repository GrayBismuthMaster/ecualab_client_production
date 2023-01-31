import React from "react";
import styles from './Banner.module.css'
// import Biotech from '../../../public/assets/landPage/Icons/biotech_white_24dp.svg'
// import Satisfied from '../../../public/assets/landPage/Icons/bolt_white_24dp.svg'
// import Medication from '../../../public/assets/landPage/Icons/military_tech_white_24dp.svg'
const Banner = () => {
    //const BannerImg = styles['Banner-img'];
    //const Banner = styles.Banner + ` ${BannerImg}`;

    return(
        <section className = {styles.BannerContainer}>
            <div id="Banner" className = {styles.Banner}>
                    <div className={styles.Informacion}>
                            <h1 className={styles.Informacion_title}>POINTI</h1>
                        {/* <h3 className={styles.Informacion_title}>Venta de articulos</h3> */}
                    </div>
                <div id= "Beneficios" className= {styles.Beneficios}>
                    <div className = {styles.ItemBeneficios}>
                        {/* <img alt={"Medicación"} src={Medication} className={styles.imgBeneficios}></img> */}
                        <h3>Atención Profesional</h3>
                        <h5>Contamos con profesionales capacitados gustosos de  atenderle con calidad</h5>
                    </div>
                    <div className = {styles.ItemBeneficios}>
                        {/* <img alt={"Tecnología de punta"} src={Biotech} className={styles.imgBeneficios}></img> */}
                        <h3>Tecnología de Punta</h3>
                        <h5>Contamos con equipos de alta tecnología</h5>
                    </div>
                    <div className = {styles.ItemBeneficios}>
                        {/* <img alt={"Resultados de los exámenes"} src={Satisfied} className={styles.imgBeneficios}></img> */}
                        <h3>Despacho Instantaneo</h3>
                        <h5>Todos los articulos los entregamos al instante </h5>
                    </div>
                    <a href='https://www.freepik.es/fotos/mano' hidden>Foto de Mano creado por lookstudio - www.freepik.es</a>
                </div>
            </div>
        </section>
    )
}

export default Banner;