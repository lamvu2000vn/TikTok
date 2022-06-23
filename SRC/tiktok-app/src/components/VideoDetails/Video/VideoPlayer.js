// Library
import { useEffect, useRef, useCallback, useState, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Action
import { videoDetailsActions } from '../../../store/slices/videoDetailsSlice'

// Component
import Video from '../../VideosFeed/VideoPlayer'
import VideoControl from '../../VideosFeed/Controls/VideoControl'
import VolumeControl from '../../VideosFeed/Controls/VolumeControl'
import { PrevButton, NextButton } from './SwitchVideoButton'
import ReportVideoButton from '../../VideosFeed/Controls/ReportVideobutton'

// Icon
import { BsPlayFill } from 'react-icons/bs'
import { IoIosClose } from 'react-icons/io'
import { TikTokCircleIcon } from '../../Icons'

// Style
import styles from './VideoPlayer.module.css'

const VideoPlayer = () => {
    const dispatch = useDispatch()

    const [isPause, setIsPause] = useState(false)
    const [isShowSeekbar, setIsShowSeekbar] = useState(false)

    const videoRef = useRef()
    const seekbarRef = useRef()

    const {watchingIndex, videosList} = useSelector(state => state.videoDetails)
    const video = videosList[watchingIndex]
    
    const {videoState} = useSelector(state => state.videosFeed)
    const {volume, currentTime} = videoState

    const handlePlayOrPause = useCallback(() => {
        setIsPause(prevState => !prevState)
    }, [])

    const handleCloseVideoDetails = () => {
        dispatch(videoDetailsActions.closeVideoDetails({
            currentTime: videoRef.current.currentTime
        }))
    }

    const handleToggleSeekbar = () => {
        setIsShowSeekbar(prevState => !prevState)
    }

    useEffect(() => {
        videoRef.current.currentTime = currentTime
    }, [currentTime])

    useEffect(() => {
        isPause ? videoRef.current.pause() : videoRef.current.play()
    }, [isPause])

    useEffect(() => {
        seekbarRef.current.style.opacity = isShowSeekbar === true ? 1 : 0
    }, [isShowSeekbar])

    useEffect(() => {
        videoRef.current.volume = volume
    }, [volume])

    useEffect(() => {
        setIsPause(false)
        videoRef.current.play()

        // Fetch more videos
        if (watchingIndex === videosList.length - 1) {
            
        }
    }, [dispatch, videosList.length, watchingIndex])

    return (
        <div className={styles.container}>
            <div className={styles['blur-background']} />
            <div className={styles['video-wrapper']} onMouseEnter={handleToggleSeekbar} onMouseLeave={handleToggleSeekbar}>
                <Video ref={videoRef} filename={video.name} onClick={handlePlayOrPause} />
                <div ref={seekbarRef} className={styles['video-control-container']}>
                    <VideoControl
                        size="lg"
                        pause={isPause}
                        duration={video.duration}
                        videoRef={videoRef}
                    />
                </div>
            </div>
            {/* Play/Pause button */}
            {isPause && <div className={styles['play-button-wrapper']} onClick={handlePlayOrPause}><BsPlayFill /></div>}
            {/* Close button */}
            <button className={styles['close-btn']} onClick={handleCloseVideoDetails}><IoIosClose /></button>
            {/* TikTok icon */}
            <div className={styles['tiktok-icon']}><TikTokCircleIcon /></div>
            {/* Volume control */}
            <button className={styles['volume-control-container']}><VolumeControl /></button>
            {/* Switch buttons */}
            <div className={styles['prev-btn-container']}>
                {watchingIndex !== 0 && <PrevButton />}
            </div>
            <div className={styles['next-btn-container']}>
                {(watchingIndex !== videosList.length - 1) && <NextButton />}
            </div>
            {/* Report button */}
            <div className={styles['report-btn-container']}>
                <ReportVideoButton background />
            </div>
        </div>
    )
}

export default memo(VideoPlayer)