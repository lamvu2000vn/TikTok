// Library
import { useState, useCallback, memo } from 'react'
import { useSelector } from 'react-redux'

// Component
import { Loading } from '../../UI'
import UserCard from './UserCard'
import { AuthModal } from '../Modal'

// Style
import styles from './UsersList.module.css'

const UsersList = () => {
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [playingIndex, setPlayingIndex] = useState(0)

    const {recommendedUsers} = useSelector(state => state.sidebar)

    const handleToggleAuthModal = useCallback(() => {
        setShowAuthModal(state => !state)
    }, [])
        
    const handleHoverCard = useCallback(index => {
        setPlayingIndex(index)
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