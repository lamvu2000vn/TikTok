// Library
import { useState, useEffect, memo } from 'react'

// Component
import { UserAvatar, Nickname } from '../../components/User'
import { Loading, FollowButton } from '../../UI'

// Function
import { shortenTheNumber, getUserFromSession } from '../../common/functions'
 
// Style
import styles from './UserInfo.module.css'

const UserInfo = () => {
    const [user, setUser] = useState()

    useEffect(() => {
        setUser(getUserFromSession())
    }, [])

    return (
        user ? (
            <div className={styles.container}>
                <div className="flex items-stretch justify-center gap-5">
                    <UserAvatar filename={user.avatar} size={116} />
                    <div className="flex flex-col flex-1 cursor-pointer overflow-hidden">
                        <div className="flex items-center leading-9 mb-1">
                            <Nickname nickname={user.nickname} verified={user.verified} fz={32} />
                        </div>
                        <div className="font-semibold text-lg h-6">{user.name}</div>
                        <div className={styles['follow-button-wrapper']}>
                            <div className="w-[208px]">
                                <FollowButton user={user} outline={false} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['count-info-container']}>
                    <div className={styles['number-wrapper']}>
                        <strong>0</strong>
                        <span className={styles['span-unit']}>Đang Follow</span>
                    </div>
                    <div className={styles['number-wrapper']}>
                        <strong>{shortenTheNumber(user.followers)}</strong>
                        <span className={styles['span-unit']}>Follower</span>
                    </div>
                    <div className={styles['number-wrapper']}>
                        <strong>{shortenTheNumber(user.likes)}</strong>
                        <span className={styles['span-unit']}>Thích</span>
                    </div>
                </div>
                <div className={styles['description-container']}></div>
            </div>
        ) : (
            <Loading />
        )
    )
}

export default memo(UserInfo)