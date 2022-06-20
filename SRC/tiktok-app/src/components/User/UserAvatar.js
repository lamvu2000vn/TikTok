// Library
import { Link } from 'react-router-dom'

// API
import { IMAGES } from '../../API'

// Style
import styles from './UserAvatar.module.css'

const UserAvatar = ({ filename, nickname = '', size = 40 }) => {
    const styledContainer = {
        width: `${size}px`,
        height: `${size}px`
    }

    const src = IMAGES + '/' + filename

    return (
        nickname ? (
            <Link to={`/@${nickname}`} className={styles.container} style={styledContainer}>
                <span className={styles['span-avatar-container']} />
                <img src={src} alt="user avatar" className={styles['img-avatar']} />
            </Link>
        ) : (
            <div className={styles.container} style={styledContainer}>
                <span className={styles['span-avatar-container']} />
                <img src={src} alt="user avatar" className={styles['img-avatar']} />
            </div>
        )
    )
}

export default UserAvatar