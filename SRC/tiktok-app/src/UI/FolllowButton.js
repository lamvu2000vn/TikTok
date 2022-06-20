// Library
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
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
    const [showAuthModal, setShowAuthModal] = useState(false)

    const {isLogin} = useSelector(state => state.auth)

    const handleFolowUser = () => {
        if (isLogin) {
            axios(FOLLOW_USER + '/' + user.id)
                .then(response => {
                    const {status} = response.data

                    if (status === 200) {
                        dispatch(videosFeedActions.followUser(user))
                        dispatch(sidebarSliceActions.followUser(user))
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        } else {
            setShowAuthModal(true)
        }
    }

    return (
        isLogin ? (
            user && user.isFollowing ? (
                <FollowingButton user={user} />
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
}

export default FollowButton