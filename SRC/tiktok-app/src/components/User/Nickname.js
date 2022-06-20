// Library
import { Link } from 'react-router-dom'

// Icon
import { VerifiedIcon } from '../Icons'

// Style
import styles from './Nickname.module.css'

const Nickname = ({ nickname, verified = 0, link = false, white = false }) => {
    const styledText = {
        color: white ? '#fff' : '#333'
    }

    return (
        link ? (
            <Link to={`/@${nickname}`} className={styles.container}>
                <span style={styledText}>{nickname}</span>
                {verified === 1 && <VerifiedIcon />}
            </Link>
        ) : (
            <div className={styles.container}>
                <span style={styledText}>{nickname}</span>
                {verified === 1 && <VerifiedIcon />}
            </div>
        )
    )
}

export default Nickname