// Library
import { Link } from 'react-router-dom'

// Components
import { Card, FollowButton } from '../../UI'
import Nickname from './Nickname'
import UserAvatar from './UserAvatar'

// Function
import { shortenTheNumber } from '../../common/functions'

// Style
import styles from './UserInfoPopover.module.css'

const UserInfoPopover = ({ user, showDescription = false }) => {
    return (
        <div className={styles.container}>
            <Card className={styles.wrapper}>
                <div className={styles['popover-header']}>
                    <UserAvatar filename={user.avatar} nickname={user.nickname} size={44} />
                    <div className={styles['follow-btn-wrapper']}>
                        <FollowButton user={user} />
                    </div>
                </div>
                <div className={styles['popover-body']}>
                    <Nickname nickname={user.nickname} verified={user.verified} link />
                    <Link to={`/@${user.nickname}`} className="leading-4 font-semibold text-sm">{user.name}</Link>
                    <div className="flex gap-2 my-3">
                        <div className="flex items-center gap-1">
                            <b>{shortenTheNumber(user.followers)}</b>
                            <span>Follower</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <b>{shortenTheNumber(user.likes)}</b>
                            <span>Thích</span>
                        </div>
                    </div>
                </div>
                {showDescription === true && user.description && (
                    <div className={styles['popover-footer']}>
                        {user.description}
                    </div>
                )}
            </Card>
        </div>
    )
}

export default UserInfoPopover