// Library
import { useEffect, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// Action
import { videosFeedActions } from '../../store/slices/videosFeedSlice'

// API
import { FOR_YOU_PAGE, FOLLOWING_PAGE } from '../../API'

// Component
import VideosList from './VideosList'
import UsersList from './UsersList'

// Style
import styles from './VideosFeed.module.css'

const VideosFeed = ({ page }) => {
    const dispatch = useDispatch()

    const {isLogin} = useSelector(state => state.auth)

    // fetch videos
    useEffect(() => {
        if (isLogin === false && page === 'following') {
            return
        }

        const url = page === 'for-you' ? FOR_YOU_PAGE : FOLLOWING_PAGE

        axios.post(url, {
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