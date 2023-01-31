import styles from "./Contacto.module.css";
// import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
// import EmailIcon from '@mui/icons-material/Email';
import Link from 'next/link'
const Contacto = () => {
    return (
        <section id="Contacto" className={styles.contacto_container}>
            <div className={styles.contacto_container_left}/>
            <div className={styles.contacto_container_right}>
                <div className={styles.contacto_container_card}>    
                    <div className={styles.form}>
                        <h3 className={styles.form_title}>Horarios de Atención: </h3>
                        <h3>09:00 AM - 18:00 PM</h3>
                        <h3 className={styles.contactoLabels}>Puede solicitar sus productos a través de nuestro número telefónico o página web</h3>
                        <h3>0996146753</h3>
                        <h3> juse862@hotmail.com</h3>
                        <h3>Dirección</h3>
                        <h3>Centro de Durán, Calle : Yaguachi SL. 14 Mz. 2</h3>
                                {/* <Link href='/login'>
                                    <button className={styles.form_button}>
                                        <h3>Agendar Cita</h3>
                                    </button>
                                </Link>
                             */}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Contacto;
