// Library
import { useCallback, useState } from 'react'

// Component
import { AuthModal } from '../../Modal'

// Style
import styles from './BottomComment.module.css'

const login = false

const BottomComment = () => {
    const [showAuthModal, setShowAuthModal] = useState(false)

    const handleToggleLoginModal = useCallback(() => {
        setShowAuthModal(state => !state)
    }, [])

    return (
        <div className={styles.container}>
            {
                login ? (
                    <div className="flex items-end">
                        <div className="flex-auto">
                            <div className={styles['input-container']}></div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={styles['login-bar']} onClick={handleToggleLoginModal}>Please log in to comment</div>
                        <AuthModal show={showAuthModal} onClose={handleToggleLoginModal} />
                    </>
                )
            }
        </div>
    )
}

export default BottomComment