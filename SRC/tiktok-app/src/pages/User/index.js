// Library
import { memo } from 'react'

// Component
import Header from '../../components/Header/Header'
import SideNav from '../../components/SideNav/SideNav'
import UserInfo from './UserInfo'

// Style
import styles from './UserPage.module.css'

const UserPage = () => {
    return (
        <>
            <Header fullWidth />
            <div className={styles.container}>
                <SideNav width={240} />
                <div className={styles['user-container']}>
                    <div className="flex flex-auto flex-col">
                        <UserInfo />
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(UserPage)