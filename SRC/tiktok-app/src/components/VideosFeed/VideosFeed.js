// Library
import { useEffect, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// Action
import { videosFeedActions } from '../../store/slices/videosFeedSlice'

// API
import { FOR_YOU_PAGE } from '../../API'

// Component
import VideosList from './VideosList'
import UsersList from './UsersList'

// Style
import styles from './VideosFeed.module.css'

const VideosFeed = ({ page }) => {
    const dispatch = useDispatch()

    const {showVideoDetails} = useSelector(state => state.videosFeed)
    const {isLogin} = useSelector(state => state.auth)

    useEffect(() => {
        if (showVideoDetails === true) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.removeAttribute('style')
        }
    }, [showVideoDetails])

    // fetch videos
    useEffect(() => {
        if (isLogin === false && page === 'following') {
            return
        }

        axios.post(FOR_YOU_PAGE, {
            limit: 10,
            offset: 0
        }).then(response => {
            if (response.data.status === 200) {
                const data = response.data.data
                dispatch(videosFeedActions.setItemsList(data))
            }
        }).catch(error => {
            console.error(error)
        })
    }, [dispatch, isLogin, page])

    if (isLogin === false && page === 'following') {
        return (
            <div className={styles.container}>
                <UsersList />
            </div>
        )
    } else {
        return (
            <div className={styles.container}>
                <VideosList />
            </div>
        )
    }

}

export default memo(VideosFeed)