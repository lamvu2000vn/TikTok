// Style
import styles from './Loading.module.css'

const Loading = () => {
    return (
        <div className={styles.container}>
            <div className={styles['dot-container']}>
                <div className={styles['blue-dot']} />
                <div className={styles['red-dot']} />
            </div>
        </div>
    )
}

export default Loading