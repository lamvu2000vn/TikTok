// Icon
import { BiArrowToTop } from 'react-icons/bi'

// Style
import styles from './ScrollTopButton.module.css'

const ScrollTopButton = ({ show }) => {
    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    const classes = [
        styles.button,
        show && styles.show
    ].join(' ')

    return (
        <button className={classes} onClick={handleScrollTop}><BiArrowToTop /></button>
    )
}

export default ScrollTopButton