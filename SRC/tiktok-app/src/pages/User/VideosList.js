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
    const [itemsList, setItemsList] = useState([])
    const [isFetch, setIsFetch] = useState(false)

    const {showVideoDetails} = useSelector(state => state.videoDetails)

    const handleVideoHover = useCallback(index => {
        setPlayingIndex(index)
    }, [])

    const handleShowVideoDetails = useCallback((itemIndex, currentTime) => {
        dispatch(videoDetailsActions.setVideosList(itemsList))
        dispatch(videoDetailsActions.showVideoDetails({
            itemIndex,
            currentTime
        }))
    }, [dispatch, itemsList])

    useEffect(() => {
        const url = USER + '/' + user.id + '/videos'

        axios.post(url, {
            limit: 30,
            offset: 0
        }).then(response => {
            const {status, data} = response.data
            if (status === 200) {
                setItemsList(data)
            }

            setIsFetch(true)
        }).catch(error => {
            console.error(error)
            setIsFetch(true)
        })
    }, [user.id])

    return (
        <>
            <div className={styles.container}>
                {
                    isFetch ? (
                        itemsList.length ? (
                            itemsList.map((item, key) => (
                                <VideoItem
                                    key={key}
                                    video={item.video}
                                    itemIndex={key}
                                    playingIndex={playingIndex}
                                    onHover={handleVideoHover}
                                    onShowVideoDetails={handleShowVideoDetails}
                                />
                            ))
                        ) : (
                            <div>No videos</div>
                        )
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