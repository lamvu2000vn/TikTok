// Library
import { useState, useEffect } from 'react'

// Component
import { UserAvatar, Nickname } from '../../components/User'
import { Loading, FollowButton } from '../../UI'

// Function
import { getUserFromSession } from '../../common/functions'
 
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
                        <div className="flex items-center h-9 mb-1">
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
            </div>
        ) : (
            <Loading />
        )
    )
}

export default UserInfo