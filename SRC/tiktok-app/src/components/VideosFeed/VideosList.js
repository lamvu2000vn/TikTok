// Library
import { useSelector } from 'react-redux'
import { memo } from 'react'

// Component
import { Loading } from '../../UI'
import VideosFeedItem from './VideosFeedItem'
import VideoDetails from '../VideoDetails/VideoDetails'

// Style
import styles from './VideosList.module.css'

const VideosList = () => {
    const {showVideoDetails, itemsList} = useSelector(state => state.videosFeed)

    const videosList = itemsList.map((item, key) => (
        <VideosFeedItem key={key} item={item} itemIndex={key} />
    ))

    return (
        <>
            <div className={styles.container}>
                {
                    videosList.length ? (
                        videosList
                    ) : (
                        <Loading />
                    )
                }
            </div>
            {showVideoDetails && <VideoDetails />}
        </>
    )
}

export default memo(VideosList)