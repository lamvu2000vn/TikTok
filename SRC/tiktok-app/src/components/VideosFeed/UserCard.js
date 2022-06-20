// Library
import { useEffect, useRef, memo } from 'react'
import { Link } from 'react-router-dom'

// API
import { VIDEOS } from '../../API'

// Component
import { Button } from '../../UI'
import { UserAvatar, Nickname } from '../User'

// Style
import styles from './UserCard.module.css'

const UserCard = ({ user, itemIndex, playingIndex, onHover, onShowAuthModal }) => {
    const videoRef = useRef()
    const src = VIDEOS + '/' + user.video.name

    const handleNavigateToUserPage = e => {
        e.preventDefault()

        const tagName = e.target.tagName

        if (tagName === 'BUTTON') {
            return onShowAuthModal()
        }

        window.open(`/@${user.nickname}`)
    }

    useEffect(() => {
        if (playingIndex === itemIndex) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }, [itemIndex, playingIndex])

    return (
        <div className={styles.container} onMouseEnter={() => onHover(itemIndex)}>
            <Link to={`/@${user.nickname}`} className={styles['a-user-card']} onClick={handleNavigateToUserPage}>
                <div className={styles['video-player-container']}>
                    {
                        user.video && (
                            <div className={styles['video-player-wrapper']}>
                                <video ref={videoRef} src={src} className={styles.video} loop muted />
                            </div>
                        )
                    }
                </div>
                <div className={styles['user-info-container']}>
                    <div className="mb-3">
                        <UserAvatar filename={user.avatar} size={48} />
                    </div>
                    <div className="font-bold text-lg h-6 w-full text-center overflow-hidden text-ellipsis text-white">
                        {user.name}
                    </div>
                    <Nickname nickname={user.nickname} verified={user.verified} white />
                    <div className="mt-2 w-4/5">
                        <Button>Follow</Button>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default memo(UserCard)