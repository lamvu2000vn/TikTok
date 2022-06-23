// Library
import { useRef, useEffect } from 'react'

// API
import { VIDEOS } from '../../API'

// Function
import { shortenTheNumber } from '../../common/functions'

// Icon
import { FiPlay } from 'react-icons/fi'

// Style
import styles from './VideoItem.module.css'

const VideoItem = ({ video, itemIndex, playingIndex, onHover, onShowVideoDetails }) => {
    const videoRef = useRef()

    const handleShowVideoDetails = () => {
        onShowVideoDetails(itemIndex, videoRef.current.currentTime)
    }

    useEffect(() => {
        videoRef.current.currentTime = 0

        if (itemIndex === playingIndex) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }, [itemIndex, playingIndex])

    const src = VIDEOS + '/' + video.name

    return (
        <div className={styles.container} onMouseEnter={() => onHover(itemIndex)} onClick={handleShowVideoDetails}>
            <div className={styles['video-container']}>
                <div className={styles['video-player-container']}>
                    <div className={styles['video-player-wrapper']}>
                        <video ref={videoRef} src={src} className={styles.video} muted loop />
                    </div>
                </div>
                <div className={styles['count-watching-container']}>
                    <FiPlay />
                    {shortenTheNumber(0)}
                </div>
            </div>
            <div className={styles['video-description']} onClick={handleShowVideoDetails}>{video.description}</div>
        </div>
    )
}

export default VideoItem