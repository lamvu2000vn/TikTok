// Library
import axios from 'axios'
import { useDispatch } from 'react-redux'

// Action
import { videosFeedActions } from '../store/slices/videosFeedSlice'
import { sidebarSliceActions } from '../store/slices/sidebarSlice'

// API
import { FOLLOW_USER } from '../API'

// Component
import Button from './Button'

// Style
import styles from './FollowingButton.module.css'

const FollowingButton = ({ user }) => {
    const dispatch = useDispatch()

    const handleUnfolloweUser = () => {
        axios(FOLLOW_USER + '/' + user.id)
            .then(response => {
                const {status} = response.data

                if (status === 200) {
                    dispatch(videosFeedActions.followUser(user))
                    dispatch(sidebarSliceActions.followUser(user))
                }
            })
    }

    return (
        <Button className={styles['following-btn']} onClick={handleUnfolloweUser}>Đang theo dõi</Button>
    )
}

export default FollowingButton