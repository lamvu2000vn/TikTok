// Library
import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// Action
import { videoDetailsActions } from '../../store/slices/videoDetailsSlice'

// Component
import { FollowButton } from '../../UI'
import { UserInfoWrapper, UserAvatar } from '../User'
import PlayVideoButton from './Controls/PlayVideoButton'
import VolumeControl from './Controls/VolumeControl'
import VideoControl from './Controls/VideoControl'
import ReportVideoButton from './Controls/ReportVideobutton'
import { AuthModal } from '../Modal'
import Video from '../Video/Video'

// Function
import { shortenTheNumber, likeVideo } from '../../common/functions'

// Icon
import { BsFillHeartFill } from 'react-icons/bs'
import { FaCommentDots, FaShare } from 'react-icons/fa'

// Style
import styles from './VideosFeedItem.module.css'

const VideosFeedItem = ({ item, itemIndex, scrollY }) => {
    const dispatch = useDispatch()
    
    const [isPause, setIsPause] = useState(true)
    const [seekToSeconds, setSeekToSeconds] = useState(0)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [showVideoControl, setShowVideoControl] = useState(true)
    
    const videoRef = useRef()
    const likeButtonRef = useRef()

    const {showVideoDetails, watchingIndex, currentTime} = useSelector(state => state.videoDetails)

    const {videoState, itemsList} = useSelector(state => state.videosFeed)
    const {volume} = videoState
    const {video, user} = item

    const {isLogin} = useSelector(state => state.auth)

    // Play/Pause button
    const handlePlayOrPause = () => {
        setIsPause(prevState => !prevState)
    }

    // Show video details
    const handleSeeVideoDetails = useCallback(() => {
        const currentTime = videoRef.current.currentTime

        setIsPause(true)

        dispatch(videoDetailsActions.setVideosList(itemsList))
        dispatch(videoDetailsActions.showVideoDetails({
            itemIndex,
            currentTime
        }))

        videoRef.current.currentTime = 0
    }, [dispatch, itemIndex, itemsList])

    const handleToggleAuthModal = useCallback(() => {
        setShowAuthModal(state => !state)
    }, [])

    const handleLikeVideo = () => {
        if (isLogin) {
            likeVideo(video.id)
                .then(response => {
                    const {status, action} = response.data
                    if (status === 200) {
                        if (action === 'like') {
                            likeButtonRef.current.style.color = 'rgb(254, 44, 85)'
                        } else {
                            likeButtonRef.current.style.color = '#333'
                        }
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        } else {
            handleToggleAuthModal()
        }
    }

    // Play/Pause video
    useEffect(() => {
        if (isPause === true) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        }

    }, [isPause])

    // Auto play or pause
    useEffect(() => {
        const viewportHeight = window.innerHeight
        const videoRect = videoRef.current.getBoundingClientRect()

        if (videoRect.top >= 0 && videoRect.bottom <= viewportHeight) {
            if (showVideoDetails === false) {
                setIsPause(false)
                setShowVideoControl(true)
            }
        } else {
            videoRef.current.currentTime = 0
            setShowVideoControl(false)
            setSeekToSeconds(0)
            setIsPause(true)
        }
    }, [scrollY, showVideoDetails])

    // Auto scroll when watchingIndex was changed
    useEffect(() => {
        if (watchingIndex !== null && watchingIndex === itemIndex) {
            if (watchingIndex === 0) {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                })
            } else {
                const videoRect = videoRef.current.getBoundingClientRect()
                const top = videoRect.top + window.scrollY - 180
                window.scrollTo({
                    top,
                    left: 0,
                    behavior: 'smooth'
                })
            }
        }
    }, [itemIndex, watchingIndex])
    
    // Volume
    useEffect(() => {
        videoRef.current.volume = volume
    }, [volume])

    // Seek video
    useEffect(() => {
        videoRef.current.currentTime = seekToSeconds
    }, [seekToSeconds])

    // Continue playing when video details was closed
    useEffect(() => {
        if (showVideoDetails === false && watchingIndex === itemIndex) {
            setIsPause(false)
            videoRef.current.currentTime = currentTime
        }
    }, [currentTime, itemIndex, showVideoDetails, watchingIndex])

    // Active like button
    useEffect(() => {
        if (video.is_liked) {
            likeButtonRef.current.style.color = 'rgb(254, 44, 85)'
        }
    }, [video.is_liked])

    return (
        <div className={styles.container}>
            <UserInfoWrapper user={user} showDescription showPopover>
                <UserAvatar filename={user.avatar} nickname={user.nickname} size="56" />
            </UserInfoWrapper>
            <div className={styles['content-container']}>
                <div className={styles['info-container']}>
                    <UserInfoWrapper user={video.user} showDescription showPopover>
                        <Link to={`/@${user.nickname}`} className={styles['author-container']}>
                            <div className={styles['auth-link']}>
                                <span className={styles['author-user-id']}>{user.nickname}</span>
                                <span className={styles['author-user-name']}>{user.name}</span>
                            </div>
                        </Link>
                    </UserInfoWrapper>
                    <div className={styles['follow-btn-wrapper']}>
                        <FollowButton user={user} />
                    </div>
                    <div className={styles['description-wrapper']}>
                        {video.description}
                    </div>
                </div>
                <div className={styles['video-wrapper']}>
                    <div className={styles['video-container']}>
                        <canvas width="56.25" height="100" className={styles['canvas-video-card']} />
                        <div className={styles['video-player-container']}>
                            {/* video */}
                            <Video ref={videoRef} filename={video.filename} onClick={handleSeeVideoDetails} />
                            {/* Play/Pause video button */}
                            <div className={styles['play-icon-container']}>
                                <PlayVideoButton pause={isPause} onClick={handlePlayOrPause} />
                            </div>
                            {/* Volume bar */}
                            <div className={styles['volume-control-container']}>
                                <VolumeControl />
                            </div>
                            {/* Video control */}
                            <div className={styles['video-control-container']}>
                                <VideoControl
                                    size="sm"
                                    show={showVideoControl}
                                    pause={isPause}
                                    duration={video.duration}
                                    videoRef={videoRef}
                                />
                            </div>
                            {/* Report button */}
                            <div className={styles['report-btn-container']}>
                                <ReportVideoButton />
                            </div>
                        </div>
                    </div>
                    <div className={styles['action-container']}>
                        <button className={styles['action-button']} onClick={handleLikeVideo}>
                            <span ref={likeButtonRef} className={styles['action-icon']}><BsFillHeartFill /></span>
                            <strong>{shortenTheNumber(video.likes)}</strong>
                        </button>
                        <button className={styles['action-button']} onClick={handleSeeVideoDetails}>
                            <span className={styles['action-icon']}><FaCommentDots /></span>
                            <strong>{shortenTheNumber(video.comments)}</strong>
                        </button>
                        <button className={styles['action-button']}>
                            <span className={styles['action-icon']}><FaShare /></span>
                            <strong></strong>
                        </button>
                    </div>
                </div>
            </div>

            <AuthModal show={showAuthModal} onClose={handleToggleAuthModal} />
        </div>
    )   
}

export default memo(VideosFeedItem)