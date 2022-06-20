// Library
import { forwardRef, memo } from 'react'

// API
import { VIDEOS } from '../../API'

// Style
import styles from './VideoPlayer.module.css'

const VideoPlayer = forwardRef(({ filename, onClick }, ref) => {
    const src = VIDEOS + '/' + filename

    return (
        <div className={styles.container}>
            <div className={styles['video-wrapper']}>
                <video ref={ref} src={src} className={styles['video']} loop onClick={onClick} />
            </div>
        </div>
    )
})

export default memo(VideoPlayer)