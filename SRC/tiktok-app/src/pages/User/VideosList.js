// Library
import { useState, useEffect, useCallback, memo } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

// API
import { USER } from '../../API'

// Action
import { videoDetailsActions } from '../../store/slices/videoDetailsSlice'

// Component
import { Loading } from '../../UI'
import VideoItem from './VideoItem'
import VideoDetails from '../../components/VideoDetails/VideoDetails'

// Style
import styles from './VideosList.module.css'

const VideosList = ({ user }) => {
    const dispatch = useDispatch()

    const [playingIndex, setPlayingIndex] = useState(0)
    const [videosList, setVideosList] = useState([])

    const {showVideoDetails} = useSelector(state => state.videoDetails)

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

    useEffect(() => {
        const url = USER + '/' + user.id + '/videos'

        axios.post(url, {
            limit: 30,
            offset: 0
        }).then(response => {
            if (response.data.status === 200) {
                setVideosList(response.data.data)
            }
        }).catch(error => {
            console.error(error)
        })
    }, [user.id])

    return (
        <>
            <div className={styles.container}>
                {
                    videosList.length ? (
                        videosList.map((video, key) => (
                            <VideoItem
                                key={key}
                                video={video}
                                itemIndex={key}
                                playingIndex={playingIndex}
                                onHover={handleVideoHover}
                                onShowVideoDetails={handleShowVideoDetails}
                            />
                        ))
                    ) : (
                        <div className="absolute left-0 top-10 right-0 w-full">
                            <Loading />
                        </div>
                    )
                }
            </div>
            {showVideoDetails && <VideoDetails />}
        </>
    )
}

export default memo(VideosList)