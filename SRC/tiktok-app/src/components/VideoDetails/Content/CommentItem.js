// Library
import { useSelector } from 'react-redux'
import { memo } from 'react'

// Component
import { UserAvatar, Nickname, UserInfoWrapper } from '../../User'

// Function
import { convertToFriendlyTime } from '../../../common/functions'

// Icon
import { BiHeart, BiDotsHorizontalRounded } from 'react-icons/bi'
import { FiFlag, FiTrash2 } from 'react-icons/fi'

// Style
import styles from './CommentItem.module.css'

const CommentItem = ({ item, onShowDeleteCommentModal }) => {
    const auth = useSelector(state => state.auth)
    const {user, comment} = item

    return (
        <div className={styles.container}>
            <div className={styles['comment-content-container']}>
                <div className="mr-3">
                    <UserInfoWrapper userId={user.id} showPopover showDescription>
                        <UserAvatar filename={user.avatar} nickname={user.nickname} />
                    </UserInfoWrapper>
                </div>
                <div className="flex-auto">
                    <UserInfoWrapper userId={user.id} showPopover showDescription>
                        <Nickname nickname={user.nickname} verified={user.verified} link />
                    </UserInfoWrapper>
                    <div className={styles['comment-text']}>{comment.content}</div>
                    <div className={styles['sub-content-container']}>
                        <span>{convertToFriendlyTime(comment.post_date)}</span>
                        <span className={styles['reply-button']}>Trả lời</span>
                    </div>
                </div>
                <div className={styles['action-container']}>
                    <div className={styles['option-button']}>
                        <BiDotsHorizontalRounded />
                        <div className={styles['comment-option-container']}>
                            {
                                auth.isLogin && user.id === auth.user.id ? (
                                    <div className={styles['comment-option-item']} onClick={() => onShowDeleteCommentModal(comment.id)}>
                                        <FiTrash2/>Xóa
                                    </div>
                                ) : (
                                    <div className={styles['comment-option-item']}>
                                        <FiFlag/>Báo cáo
                                    </div>
                                )
                            }
                        </div>
                    </div>
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

export default memo(CommentItem)