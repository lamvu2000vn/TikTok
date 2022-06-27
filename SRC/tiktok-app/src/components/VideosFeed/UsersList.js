// Library
import { useState, useCallback, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

// API
import { FOLLOWING_PAGE } from '../../API'

// Component
import { Loading } from '../../UI'
import UserCard from './UserCard'
import { AuthModal } from '../Modal'

// Style
import styles from './UsersList.module.css'

const UsersList = () => {
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [playingIndex, setPlayingIndex] = useState(0)
    const [videosList, setVideosList] = useState([])

    const {recommendedUsers} = useSelector(state => state.sidebar)

    const handleToggleAuthModal = useCallback(() => {
        setShowAuthModal(state => !state)
    }, [])
        
    const handleHoverCard = useCallback(index => {
        setPlayingIndex(index)
    }, [])

    useEffect(() => {
        axios.post(FOLLOWING_PAGE)
            .then(response => {
                console.log(response)
            })
    }, [])

    return (
        <>
            <div className={styles.container}>
                {
                    recommendedUsers.length ? (
                        recommendedUsers.map((user, key) => (
                            <UserCard
                                key={key}
                                itemIndex={key}
                                playingIndex={playingIndex}
                                user={user}
                                onHover={handleHoverCard}
                                onShowAuthModal={handleToggleAuthModal}
                            />
                        ))
                    ) : (
                        <Loading />
                    )
                }
            </div>
            <AuthModal show={showAuthModal} onClose={handleToggleAuthModal} />
        </>
    )
}

export default memo(UsersList)