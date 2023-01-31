import styles from "./Carousel.module.css";
const Carousel = (props) => {
    
    return (
        <div className={styles.body}>
            <div className={styles.containerAll}>
                <input type="radio" id="1" name="image-slide" hidden/>
                <input type="radio" id="2" name="image-slide" hidden/>
                <input type="radio" id="3" name="image-slide" hidden/>
                    <div className={styles.slide}>
                        <div className = {styles.itemSlide}>
                            <img className={styles.img} alt="Imagen de servicio" src={props.img1}></img>
                        </div>
                        <div className = {styles.itemSlide}>
                            <img className={styles.img} alt="Imagen de servicio" src={props.img2}></img>
                        </div>
                        <div className = {styles.itemSlide}>
                            <img className={styles.img} alt="Imagen de servicio" src={props.img3}></img>
                        </div>
                    </div>
                    <div className={styles.pagination}>
                        <label className={styles.paginationItem} htmlFor="1">
                            <img className="img" alt="Imagen de servicio" src={props.img1}></img>
                        </label>

                        <label className={styles.paginationItem} htmlFor="2">
                                <img alt="Imagen de servicio" src={props.img2}></img>
                        </label>
                        
                        <label className={styles.paginationItem} htmlFor="3">
                                <img alt="Imagen de servicio" src={props.img3}></img>
                        </label>
                    </div>

            </div>
        </div >
    )
}
export default Carousel;