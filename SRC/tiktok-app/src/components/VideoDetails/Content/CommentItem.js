// Component
import { UserAvatar, Nickname, UserInfoWrapper } from '../../User'

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
                    <UserInfoWrapper user={user}>
                        <UserAvatar filename={user.avatar} />
                    </UserInfoWrapper>
                </div>
                <div className="flex-auto">
                    <UserInfoWrapper user={user}>
                        <Nickname nickname={user.nickname} verified={user.verified} />
                    </UserInfoWrapper>
                    <div className={styles['comment-text']}>{comment.content}</div>
                    <div className={styles['sub-content-container']}>
                        <span>27/05/2022</span>
                        <span className={styles['reply-button']}>Trả lời</span>
                    </div>
                </div>
                <div className={styles['action-container']}>
                    <div className={styles['like-button-wrapper']}>
                        <BiHeart />
                        <span className={styles['comment-count']}>10</span>
                    </div>
                </div>
            </div>
            <div className={styles['reply-container']}></div>
        </div>
    )
}

export default CommentItem