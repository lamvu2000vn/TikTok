// Library
import { useState, useCallback, memo, useEffect } from 'react'
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
    const [itemsList, setItemsList] = useState([])

    const handleToggleAuthModal = useCallback(() => {
        setShowAuthModal(state => !state)
    }, [])
        
    const handleHoverCard = useCallback(index => {
        setPlayingIndex(index)
    }, [])

    useEffect(() => {
        axios.post(FOLLOWING_PAGE)
            .then(response => {
                const {status, data} = response.data
                if (status === 200) {
                    setItemsList(data)
                }
            })
            .catch(error => {
                console.error(error)
            })

        return () => {
            setItemsList([])
        }
    }, [])

    return (
        <>
            <div className={styles.container}>
                {
                    itemsList.length ? (
                        itemsList.map((item, key) => (
                            <UserCard
                                key={key}
                                itemIndex={key}
                                playingIndex={playingIndex}
                                item={item}
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