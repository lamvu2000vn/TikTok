// Library
import { memo } from 'react'

// Component
import VideoPlayer from './Video/VideoPlayer'
import Content from './Content/Content'

// Style
import styles from './VideoDetails.module.css'

const VideoDetails = () => {
    return (
        <div className={styles.container}>
            <VideoPlayer />
            <Content />
        </div>
    )
}

export default memo(VideoDetails)