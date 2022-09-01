// Library
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { memo } from 'react'

// Action
import { videosFeedActions } from '../store/slices/videosFeedSlice'
import { sidebarSliceActions } from '../store/slices/sidebarSlice'

// API
import { FOLLOW_USER } from '../API'

// Component
import Button from './Button'
import FollowButton from './FolllowButton'

// Style
import styles from './FollowingButton.module.css'
import { useState } from 'react'

const FollowingButton = ({ user, outline }) => {
    const dispatch = useDispatch()

    const [changeToFollow, setChangeToFollow] = useState(false)

    const handleUnfolloweUser = async () => {
        try {
            const jwt = localStorage.getItem('jwt')
            const response = await axios(FOLLOW_USER + '/' + user.id, { headers: { jwt }})

            const {status} = response.data
            
            if (status === 200) {
                setChangeToFollow(true)
                dispatch(videosFeedActions.followUser(user))
                dispatch(sidebarSliceActions.followUser(user))
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        changeToFollow ? (
            <FollowButton user={user} outline={outline} />
        ) : (
            <Button className={styles['following-btn']} onClick={handleUnfolloweUser}>Đang theo dõi</Button>
        )
    )
}

export default memo(FollowingButton)