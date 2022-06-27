// Library
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

// Component
import { AuthModal } from '../../Modal'

// Style
import styles from './BottomComment.module.css'

const BottomComment = () => {
    const [showAuthModal, setShowAuthModal] = useState(false)

    const {isLogin} = useSelector(state => state.auth)

    const handleToggleLoginModal = useCallback(() => {
        setShowAuthModal(state => !state)
    }, [])

    return (
        <div className={styles.container}>
            {
                isLogin ? (
                    <div className="flex items-end">
                        <div className="flex-auto">
                            <div className={styles['input-container']}></div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={styles['login-button']} onClick={handleToggleLoginModal}>Please log in to comment</div>
                        <AuthModal show={showAuthModal} onClose={handleToggleLoginModal} />
                    </>
                )
            }
        </div>
    )
}

export default BottomComment