// Library
import { useState, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Components
import { Button } from '../../UI'
import RecommendedUsers from './RecommendedUsers'
import FollowingUsers from './FollowingUsers'
import Discover from './Discover'
import Footer from './Footer'
import { AuthModal } from '../Modal'

// Icon
import { AiFillHome } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'
import { RiLiveLine } from 'react-icons/ri'

// Style
import styles from './SideNav.module.css'

const SideNav = ({ width = 356 }) => {
    const [showAuthModal, setShowAuthModal] = useState(false)

    const {isLogin} = useSelector(state => state.auth)

    const handleToggleAuthModal = useCallback(() => {
        setShowAuthModal(state => !state)
    }, [])

    const handleActiveNavLink = isActive => (isActive ? styles['main-nav-link-active'] : styles['main-nav-link'])

    const styledContainer = {
        width,
        flex: `0 0 ${width}px`
    }

    const styledWrapper = {
        width
    }

    return (
        <div className={styles.container} style={styledContainer}>
            <div className={styles['scroll']} style={styledWrapper}>
                <div className={styles['sidenav-wrapper']} style={styledWrapper}>
                    {/* nav */}
                    <div className={styles['main-nav-container']}>
                        <NavLink to="/" className={({ isActive }) => handleActiveNavLink(isActive)}>
                            <div className={styles['main-nav-icon']}><AiFillHome /></div>
                            <div className={styles['main-nav-text']}>Dành cho bạn</div>
                        </NavLink>
                        <NavLink to="/following" className={({ isActive }) => handleActiveNavLink(isActive)}>
                            <div className={styles['main-nav-icon']}><FiUsers /></div>
                            <div className={styles['main-nav-text']}>Đang Follow</div>
                        </NavLink>
                        <div className={styles['main-nav-link']}>
                            <div className={styles['main-nav-icon']}><RiLiveLine /></div>
                            <div className={styles['main-nav-text']}>LIVE</div>
                        </div>
                    </div>
                    {
                        isLogin === true ? (
                            <>
                                {/* recommended users */}
                                <div className={styles['nav-section']}>
                                    <div className={styles['nav-section-title']}>Tài khoản được đề xuất</div>
                                    <RecommendedUsers />
                                </div>
                                {/* following users */}
                                <div className={styles['nav-section']}>
                                    <div className={styles['nav-section-title']}>Các tài khoản đang follow</div>
                                    <FollowingUsers  />
                                </div>
                            </>

                        ) : (
                            <>
                                <div className={styles['nav-section']}>
                                    <div className="px-2">
                                        <div className={styles['login-hint']}>Đăng nhập để follow các tác giả, thích video và xem bình luận.</div>
                                        <Button outline onClick={handleToggleAuthModal}>Đăng nhập</Button>
                                        <AuthModal show={showAuthModal} onClose={handleToggleAuthModal} />
                                    </div>
                                </div>
                                {/* recommended users */}
                                <div className={styles['nav-section']}>
                                    <div className={styles['nav-section-title']}>Tài khoản được đề xuất</div>
                                    <RecommendedUsers />
                                </div>
                            </>
                        )
                    }
                    {/* discover */}
                    <div className={styles['nav-section']}>
                        <div className={styles['nav-section-title']}>Khám phá</div>
                        <Discover />
                    </div>
                    {/* footer */}
                    <div className={styles['nav-section']}>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideNav