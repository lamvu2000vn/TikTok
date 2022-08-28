// Library
import { useSelector, useDispatch } from 'react-redux'
import { useState, memo } from 'react'
import axios from 'axios'

// Action
import { videosFeedActions } from '../store/slices/videosFeedSlice'
import { sidebarSliceActions } from '../store/slices/sidebarSlice'

// API
import { FOLLOW_USER } from '../API'

// Component
import Button from './Button'
import { AuthModal } from '../components/Modal'
import FollowingButton from './FollowingButton'

const FollowButton = ({ user, outline = true }) => {
    const dispatch = useDispatch()

    const [changeToFollowing, setChangeToFollowing] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false)

    const {isLogin} = useSelector(state => state.auth)

    const handleFolowUser = async () => {
        if (isLogin) {
            try {
                const jwt = localStorage.getItem('jwt')
                const response = await axios({
                    url: FOLLOW_USER + '/' + user.id, user,
                    method: 'GET',
                    headers: { jwt }
                })
                
                const {status} = response.data

                if (status === 200) {
                    setChangeToFollowing(true)
                    dispatch(videosFeedActions.followUser(user))
                    dispatch(sidebarSliceActions.followUser(user))
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            setShowAuthModal(true)
        }
    }

    return (
        changeToFollowing ? (
            <FollowingButton user={user} outline={outline} />
        ) : (
            isLogin ? (
                user && user.is_following ? (
                    <FollowingButton user={user} outline={outline} />
                ) : (
                    <Button outline={outline} onClick={handleFolowUser}>Follow</Button>
                )
            ) : (
                <>
                    <Button outline={outline} onClick={handleFolowUser}>Follow</Button>
                    <AuthModal show={showAuthModal} onClose={() => setShowAuthModal(false)} />
                </>
            )
        )
    )
}

export default memo(FollowButton)