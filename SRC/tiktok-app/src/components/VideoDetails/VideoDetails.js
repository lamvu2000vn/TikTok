// Library
import { memo, useEffect } from 'react'

// Component
import VideoPlayer from './Video/VideoPlayer'
import Content from './Content/Content'

// Style
import styles from './VideoDetails.module.css'

const VideoDetails = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.removeAttribute('style')
        }
    }, [])

    return (
        <div className={styles.container}>
            <VideoPlayer />
            <Content />
        </div>
    )
}

export default memo(VideoDetails)