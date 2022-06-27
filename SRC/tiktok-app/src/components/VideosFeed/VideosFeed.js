// Library
import { memo } from 'react'
import { useSelector } from 'react-redux'

// Component
import VideosList from './VideosList'
import UsersList from './UsersList'

// Style
import styles from './VideosFeed.module.css'

const VideosFeed = ({ page }) => {
    const {isLogin} = useSelector(state => state.auth) 

    if (isLogin === false && page === 'following') {
        return (
            <div className={styles.container}>
                <UsersList />
            </div>
        )
    } else {
        return (
            <div className={styles.container}>
                <VideosList page={page} />
            </div>
        )
    }
}

export default memo(VideosFeed)