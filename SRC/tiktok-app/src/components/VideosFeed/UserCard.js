// Library
import { useEffect, useRef, memo } from 'react'
import { Link } from 'react-router-dom'

// Component
import { Button } from '../../UI'
import { UserAvatar, Nickname } from '../User'
import Video from '../Video/Video'

// Style
import styles from './UserCard.module.css'

const UserCard = ({ itemIndex, playingIndex, item, onHover, onShowAuthModal }) => {
    const videoRef = useRef()
    const {video, user} = item
    
    const handleNavigateToUserPage = e => {
        e.preventDefault()
        
        const tagName = e.target.tagName
        
        if (tagName === 'BUTTON') {
            return onShowAuthModal()
        }
        
        window.open(`/@${user.nickname}`)
    }
    
    useEffect(() => {
        videoRef.current.currentTime = 0

        if (playingIndex === itemIndex) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }, [itemIndex, playingIndex])

    return (
        <div className={styles.container} onMouseEnter={() => onHover(itemIndex)}>
            <Link to={`/@${user.nickname}`} className={styles['a-user-card']} onClick={handleNavigateToUserPage}>
                <Video ref={videoRef} filename={video.filename} objectFit="cover" />
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