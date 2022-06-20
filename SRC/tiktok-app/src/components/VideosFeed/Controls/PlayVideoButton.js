// Icon
import { BsPlayFill, BsPauseFill } from 'react-icons/bs'

// Style
import styles from './PlayVideoButton.module.css'

const PlayVideoButton = ({ pause, onClick }) => {
    return (
        <div className={styles.icon} onClick={onClick}>
            {pause ? <BsPlayFill /> : <BsPauseFill />}
        </div>
    )
}

export default PlayVideoButton