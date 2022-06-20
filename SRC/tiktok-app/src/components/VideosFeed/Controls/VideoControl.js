// Library
import { useState, useEffect } from 'react'

// Function
import { displayVideoTime } from '../../../common/functions'

// Style
import styles from './VideoControl.module.css'

const miliseconds = 100
let timerId = null

const VideoControl = ({ size = 'sm', show = true, pause, duration, videoRef }) => {
    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        if (pause === false) {
            timerId = setInterval(() => {
                setCurrentTime(() => {
                    const newValue = videoRef.current.currentTime

                    return newValue < duration ? newValue : 0
                })
            }, miliseconds)
        }

        return () => {
            clearInterval(timerId)
        }
    }, [duration, pause, videoRef])

    const handleSeekVideo = e => {
        videoRef.current.currentTime = Number(e.target.value)
    }

    const styledSeekbarContainer = [
        size === 'sm' ? styles['seekbar-container'] : styles['seekbar-container-lg']
    ].join(' ')

    const styledInput = [
        size === 'sm' ? styles['seekbar-input'] : styles['seekbar-input-lg']
    ].join(' ')

    const styledSeekbarTime = [
        size === 'sm' ? styles['seekbar-time-container'] : styles['seekbar-time-container-lg']
    ].join(' ')

    const percents = `${currentTime * 100 / duration}%`
   
    return (
        <div className={styles.container}>
            {
                show === true && (
                    <>
                        <div className={styledSeekbarContainer}>
                            <input
                                type="range"
                                min="0"
                                max={duration}
                                step="0.1"
                                className={styledInput}
                                value={currentTime}
                                onChange={handleSeekVideo}
                            />
                            <div className={styles['procress-bar']} style={{width: percents}} />
                        </div>
                        <div className={styledSeekbarTime}>
                            {displayVideoTime(currentTime)}/{displayVideoTime(duration)}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default VideoControl