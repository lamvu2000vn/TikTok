// Library
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Component
import HeaderSearch from './HeaderSearch'
import HeaderNotification from './HeaderNotification'
import HeaderOptions from './HeaderOptions'
import { AuthModal } from '../Modal'
import { Button } from '../../UI'

// Icon
import { TikTokIcon } from '../Icons'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { IoIosNotificationsOutline, IoIosNotifications } from 'react-icons/io'
import { BiDotsVerticalRounded } from 'react-icons/bi'

// Style
import styles from './Header.module.css'

import Avatar from '../../assets/images/avatar.png'

let timerId = null

const Header = ({ fullWidth = false }) => {
    const [showNotification, setShowNotification] = useState(false)
    const [showAccount, setShowAccount] = useState(false)
    const [showLogin, setShowLogin]  = useState(false)

    const {isLogin} = useSelector(state => state.auth)

    const handleToggleNotification = () => {
        setShowNotification(prevState => !prevState)
    }

    const handleShowOptions = () => {
        clearTimeout(timerId)
        setShowAccount(true)
    }

    const handleHideOptions = () => {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
            setShowAccount(false)
        }, 300)
    }
    
    const handleToggleLogin = useCallback(() => {
        setShowLogin(prevState => !prevState)
    }, [])

    const styledWrapper = fullWidth ? {
        maxWidth: '100%',
        padding: '0 16px 0 16px'
    } : {}

    return (
        <div className={styles.container}>
            <div className={styles.wrapper} style={styledWrapper}>
                <Link to="/" className={styles.logo}><TikTokIcon /></Link>
                <div className={styles['search-container']}><HeaderSearch /></div>
                <div className={styles['account-container']}>
                    {
                        isLogin ? (
                            <>
                                {/* upload video */}
                                <div className={styles['account-item']}>
                                    <span><AiOutlineCloudUpload /></span>
                                    <span className={styles['upload-tooltip']} />
                                </div>
                                {/* notification */}
                                <div show-tooltip={showNotification.toString()} className={styles['account-item']} onClick={handleToggleNotification}>
                                    <span>{showNotification ? <IoIosNotifications /> : <IoIosNotificationsOutline />}</span>
                                    <span className={styles['notification-tooltip']} />
                                </div>
                                {/* account */}
                                <div className={styles['account-item']} onMouseEnter={handleShowOptions} onMouseLeave={handleHideOptions}>
                                    <img src={Avatar} alt="avatar" />
                                    <HeaderOptions show={showAccount} />
                                </div>

                                <HeaderNotification show={showNotification} />
                            </>
                        ) : (
                            <>
                                <button className={styles['upload-link']}>Tải lên</button>
                                <div className="w-[100px]">
                                    <Button onClick={handleToggleLogin}>Đăng nhập</Button>
                                </div>
                                <div className={styles['account-item']} onMouseEnter={handleShowOptions} onMouseLeave={handleHideOptions}>
                                    <BiDotsVerticalRounded />
                                    <HeaderOptions show={showAccount} />
                                </div>
                                <AuthModal show={showLogin} onClose={handleToggleLogin} />
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Header