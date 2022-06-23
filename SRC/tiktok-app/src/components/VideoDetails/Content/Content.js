// Library
import { useSelector, useDispatch } from 'react-redux'
import { memo } from 'react'
import { Link } from 'react-router-dom'

// API
import { HOST } from '../../../API'

// Action
import { uiSliceActions } from '../../../store/slices/uiSlice'

// Function
import { shortenTheNumber } from '../../../common/functions'

// Component
import { UserAvatar, Nickname, UserInfoWrapper } from '../../User'
import { Button, Toast } from '../../../UI'
import { LikeIcon, CommentIcon } from '../../Icons'
import CommentsList from './CommentsList'
import BottomComment from './BottomComment'

// Style
import styles from './Content.module.css'

const Content = () => {
    const dispatch = useDispatch()

    const {watchingIndex, videosList} = useSelector(state => state.videoDetails)
    const item = videosList[watchingIndex]
    const {user} = item

    const {toast} = useSelector(state => state.ui)

    const videoUrl = `${HOST}/@${user.nickname}/video/${item.id}`

    const handleCopyVideoLink = () => {
        navigator.clipboard.writeText(videoUrl)
        dispatch(uiSliceActions.showToast('Đã sao chép'))
    }

    return (
        <div className={styles.container}>
            <div className={styles['info-container']}>
                <div className="mr-3">
                    <UserInfoWrapper user={user} showDescription showPopover>
                        <UserAvatar filename={user.avatar} nickname={user.nickname} />
                    </UserInfoWrapper>
                </div>
                <div className="flex flex-auto mr-3">
                    <UserInfoWrapper user={user} showDescription showPopover>
                        <Nickname nickname={user.nickname} verified={user.verified} link />
                        <div className={styles['orther-info-container']}>
                            <Link to={`/@${user.nickname}`}>{user.name}</Link>
                            <span style={{margin: '0px 4px'}}>.</span>
                            <span>2 ngày trước</span>
                        </div>
                    </UserInfoWrapper>
                </div>
                <div className={styles['follow-btn-container']}>
                    <Button outline>Follow</Button>
                </div>
            </div>
            <div className={styles['main-content-container']}>
                <div>{item.description}</div>
                <div className="py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-5">
                            <button className="flex items-center gap-2">
                                <LikeIcon size={32} />
                                <b className="text-xs">{shortenTheNumber(item.likes)}</b>
                            </button>
                            <button className="flex items-center gap-2">
                                <CommentIcon size={32} />
                                <b className="text-xs">{shortenTheNumber(item.comments)}</b>
                            </button>
                        </div>
                    </div>
                    <div className={styles['copy-link-container']}>
                        <div className={styles['copy-link-text']}>{videoUrl}</div>
                        <button className={styles['copy-link-button']} onClick={handleCopyVideoLink}>Sao chép liên kết</button>
                    </div>
                </div>
            </div>
            <CommentsList videoId={item.id} />
            <BottomComment />
            <Toast show={toast.isShow} />
        </div>
    )
}

export default memo(Content)