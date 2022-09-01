// Library
import { useSelector, useDispatch } from 'react-redux'
import { memo, useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// API
import { HOST, VIDEO } from '../../../API'

// Action
import { uiSliceActions } from '../../../store/slices/uiSlice'

// Function
import { shortenTheNumber, convertToFriendlyTime } from '../../../common/functions'

// Component
import { FollowButton } from '../../../UI'
import { UserAvatar, Nickname, UserInfoWrapper } from '../../User'
import { LikeIcon, CommentIcon } from '../../Icons'
import CommentsList from './CommentsList'
import BottomComment from './BottomComment'

// Icon
import { BsDot } from 'react-icons/bs'

// Style
import styles from './Content.module.css'

const Content = () => {
    const dispatch = useDispatch()

    const [isFetch, setIsFetch] = useState(false)
    const [commentsList, setCommentsList] = useState([])

    const {watchingIndex, videosList} = useSelector(state => state.videoDetails)
    const {video, user} = videosList[watchingIndex]

    const videoUrl = `${HOST}/@${user.nickname}/video/${video.id}`

    const handePushCommentsList = useCallback(comment => {
        setCommentsList(state => [
            comment,
            ...state
        ])
    }, [])

    const handleRemoveComment = useCallback(commentID => {
        setCommentsList(state => state.filter(item => item.comment.id !== commentID))
    }, [])

    const handleCopyVideoLink = () => {
        navigator.clipboard.writeText(`${HOST}/@${user.nickname}/video/${video.id}`)
        dispatch(uiSliceActions.showToast('Đã sao chép'))
    }

    // Fetch comments
    useEffect(() => {
        axios.post(VIDEO + '/' + video.id + '/comments', {
            limit: 30,
            offset: 0
        }).then(response => {
            const {status, data} = response.data
            
            if (status === 200) {
                setIsFetch(true)
                setCommentsList(data)
            }
        }).catch(error => {
            console.log(error)
        })

        return () => {
            setIsFetch(false)
            setCommentsList([])
        }
    }, [video.id])

    return (
        <div className={styles.container}>
            <div className={styles['info-container']}>
                <div className="mr-3">
                    <UserInfoWrapper userId={user.id} showDescription showPopover>
                        <UserAvatar filename={user.avatar} nickname={user.nickname} />
                    </UserInfoWrapper>
                </div>
                <div className="flex flex-auto mr-3">
                    <UserInfoWrapper userId={user.id} showDescription showPopover>
                        <Nickname nickname={user.nickname} verified={user.verified} link />
                        <div className={styles['orther-info-container']}>
                            <Link to={`/@${user.nickname}`}>{user.name}</Link>
                            <BsDot />
                            <span>{convertToFriendlyTime(video.post_date)}</span>
                        </div>
                    </UserInfoWrapper>
                </div>
                <div className={styles['follow-btn-container']}>
                    <FollowButton user={user} outline={false}  />
                </div>
            </div>
            <div className={styles['main-content-container']}>
                <div>{video.description}</div>
                <div className="py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-5">
                            <button className="flex items-center gap-2">
                                <LikeIcon size={32} />
                                <b className="text-xs">{shortenTheNumber(video.likes)}</b>
                            </button>
                            <button className="flex items-center gap-2">
                                <CommentIcon size={32} />
                                <b className="text-xs">{shortenTheNumber(video.comments)}</b>
                            </button>
                        </div>
                    </div>
                    <div className={styles['copy-link-container']}>
                        <div className={styles['copy-link-text']}>{videoUrl}</div>
                        <button className={styles['copy-link-button']} onClick={handleCopyVideoLink}>Sao chép liên kết</button>
                    </div>
                </div>
            </div>
            <CommentsList isFetch={isFetch} commentsList={commentsList} onRemoveComment={handleRemoveComment} />
            <BottomComment videoID={video.id} onPushCommentsList={handePushCommentsList} />
        </div>
    )
}

export default memo(Content)