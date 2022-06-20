// style
import styles from './Container.module.css'

const Container = ({ children, width = 1150 }) => {
    return (
        <div className={styles.container} style={{width}}>{children}</div>
    )
}

export default Container