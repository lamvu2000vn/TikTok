// Library
import { Link } from 'react-router-dom'

// Components
import { UserInfoWrapper, UserAvatar, Nickname } from '../User'

// Style
import styles from './UserLink.module.css'

const UserLink = ({ user, showPopover }) => {       
    return (
        <UserInfoWrapper userId={user.id} showPopover={showPopover}>
            <Link to={`/@${user.nickname}`} className={styles['user-link-wrapper']}>
                <UserAvatar filename={user.avatar} size={32} />
                <div className={styles['user-info-wrapper']}>
                    <div style={{marginTop: '-2px'}}>
                        <Nickname nickname={user.nickname} verified={user.verified} />
                    </div>
                    <div className={styles['user-name']}>{user.name}</div>
                </div>
            </Link>
        </UserInfoWrapper>
    )
}

export default UserLink