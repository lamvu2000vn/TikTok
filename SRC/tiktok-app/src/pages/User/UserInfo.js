// Library
import { useState, useEffect, memo } from 'react'

// Component
import { UserAvatar, Nickname } from '../../components/User'
import { Loading, FollowButton } from '../../UI'

// Function
import { shortenTheNumber } from '../../common/functions'

// Icon
import { RiShareForwardLine } from 'react-icons/ri'
import { BsThreeDots } from 'react-icons/bs'
 
// Style
import styles from './UserInfo.module.css'

const UserInfo = ({ user }) => {
    return (
        user ? (
            <div className={styles.container}>
                <div className="flex items-stretch justify-center gap-5">
                    <UserAvatar filename={user.avatar} size={116} />
                    <div className="flex flex-col flex-1 cursor-pointer overflow-hidden">
                        <Nickname nickname={user.nickname} verified={user.verified} fz={32} />
                        <div className="font-semibold text-lg">{user.name}</div>
                        <div className={styles['follow-button-wrapper']}>
                            <div className="w-52">
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
                <div className={styles['share-button']}><RiShareForwardLine /></div>
                <div className={styles['more-button']}><BsThreeDots /></div>
            </div>
        ) : (
            <Loading />
        )
    )
}

export default memo(UserInfo)