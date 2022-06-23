// Component
import { UserAvatar, Nickname, UserInfoWrapper } from '../../User'

// Function
import { convertToFriendlyTime } from '../../../common/functions'

// Icon
import { BiHeart } from 'react-icons/bi'

// Style
import styles from './CommentItem.module.css'

const CommentItem = ({ comment }) => {
    const {user} = comment

    return (
        <div className={styles.container}>
            <div className={styles['comment-content-container']}>
                <div className="mr-3">
                    <UserInfoWrapper user={user} showPopover showDescription>
                        <UserAvatar filename={user.avatar} nickname={user.nickname} />
                    </UserInfoWrapper>
                </div>
                <div className="flex-auto">
                    <UserInfoWrapper user={user} showPopover showDescription>
                        <Nickname nickname={user.nickname} verified={user.verified} link />
                    </UserInfoWrapper>
                    <div className={styles['comment-text']}>{comment.content}</div>
                    <div className={styles['sub-content-container']}>
                        <span>{convertToFriendlyTime(comment.post_date)}</span>
                        <span className={styles['reply-button']}>Trả lời</span>
                    </div>
                </div>
                <div className={styles['action-container']}>
                    <div className={styles['like-button-wrapper']}>
                        <BiHeart />
                        <span className={styles['comment-count']}>{comment.likes}</span>
                    </div>
                </div>
            </div>
            <div className={styles['reply-container']}></div>
        </div>
    )
}

export default CommentItem