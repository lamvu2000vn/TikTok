// Library
import { Link } from 'react-router-dom'

// Icon
import { VerifiedIcon } from '../Icons'

// Style
import styles from './Nickname.module.css'

const Wrapper = props => {
    return (
        props.link ? (
            <Link to={`/@${props.nickname}`} className={styles.container}>{props.children}</Link>
        ) : (
            <div className={styles.container}>
                {props.children}
            </div>
        )
    )
}

const Nickname = ({ nickname, verified = 0, link = false, white = false, fz = 16 }) => {
    const styledText = {
        color: white ? '#fff' : '#333',
        fontSize: fz
    }

    // 70% of nickname
    const verifiedIconSize = fz * 0.7

    return (
        <Wrapper link={link} nickname={nickname}>
            <span style={styledText}>{nickname}</span>
            {verified === 1 && <VerifiedIcon fz={verifiedIconSize} />}
        </Wrapper>
    )
}

export default Nickname