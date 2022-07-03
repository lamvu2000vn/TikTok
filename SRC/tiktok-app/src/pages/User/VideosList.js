// Library
import { useState, useCallback, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Action
import { videoDetailsActions } from '../../store/slices/videoDetailsSlice'

// Component
import VideoItem from './VideoItem'
import VideoDetails from '../../components/VideoDetails/VideoDetails'
import NoVideo from './NoVideo'

// Style
import styles from './VideosList.module.css'

const VideosList = ({ videosList }) => {
    const dispatch = useDispatch()

    const [playingIndex, setPlayingIndex] = useState(0)

    const {showVideoDetails} = useSelector(state => state.videoDetails)

    const firstItem = videosList[0]
    const {user, video} = firstItem

    const handleVideoHover = useCallback(index => {
        setPlayingIndex(index)
    }, [])

    const handleShowVideoDetails = useCallback((itemIndex, currentTime) => {
        dispatch(videoDetailsActions.setVideosList(videosList))
        dispatch(videoDetailsActions.showVideoDetails({
            itemIndex,
            currentTime
        }))
    }, [dispatch, videosList])

    const renderVideosList = video ? (
        videosList.map((item, key) => (
            <VideoItem
                key={key}
                video={item.video}
                itemIndex={key}
                playingIndex={playingIndex}
                onHover={handleVideoHover}
                onShowVideoDetails={handleShowVideoDetails}
            />
        ))
    ) : null

    return (
        renderVideosList ? (
            <div className={styles.container}>
                {renderVideosList}
                {showVideoDetails && <VideoDetails />}
            </div>
        ) : (
            <NoVideo user={user} />
        )
    )
}

export default memo(VideosList)