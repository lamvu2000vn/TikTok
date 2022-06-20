// Library
import { useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// Action
import { authSliceActions } from '../../store/slices/authSlice'
import { uiSliceActions } from '../../store/slices/uiSlice'

// API
import { LOGOUT } from '../../API'

// Component
import { ShortcutModal } from '../Modal'

// Icon
import { RiUserLine, RiSettings3Line } from 'react-icons/ri'
import { BsCoin } from 'react-icons/bs'
import { GrLanguage } from 'react-icons/gr'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { MdOutlineKeyboardAlt, MdLogout } from 'react-icons/md'

import styles from './HeaderOptions.module.css'

const HeaderOptions = ({ show }) => {
    const dispatch = useDispatch()

    const [showShortcutModal, setShowShortcutModal] = useState(false)

    const nodeRef = useRef()

    const {isLogin} = useSelector(state => state.auth)

    const timeout = {
        appear: 0,
        enter: 0,
        exit: 300
    }

    const transitionStyles = {
        entering: {
            display: 'block',
            opacity: 0,
            transform: 'translateY(10px)'
        },
        entered: {
            display: 'block',
            opacity: 1,
            transform: 'translateY(0)'
        },
        exiting: {
            display: 'block',
            opacity: 0,
            transform: 'translateY(10px)'
        },
        exited: {
            display: 'none',
            opacity: 0,
            transform: 'translateY(10px)'
        }
    }

    const toggleShortcutModalHandle = () => {
        setShowShortcutModal(prevState => !prevState)
    }

    const handleLogout = () => {
        axios(LOGOUT)
            .then(response => {
                if (response.data.status === 200) {
                    dispatch(authSliceActions.loggout())
                    dispatch(uiSliceActions.showToast('Đã đăng xuất'))
                }
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <Transition in={show} timeout={timeout} nodeRef={nodeRef}>
            {state => (
                <div ref={nodeRef} className={styles.card} style={{...transitionStyles[state]}}>
                    <ul>
                        {isLogin && (
                            <>
                                <li>
                                    <div className={styles.item}><RiUserLine />Xem hồ sơ</div>
                                </li>
                                <li>
                                    <div className={styles.item}><BsCoin />Nhận xu</div>
                                </li>
                                <li>
                                    <div className={styles.item}><RiSettings3Line />Cài đặt</div>
                                </li>
                            </>
                        )}
                        <li>
                            <div className={styles.item}><GrLanguage />Tiếng Việt</div>
                        </li>
                        <li>
                            <div className={styles.item}><AiOutlineQuestionCircle />Phản hồi và trợ giúp</div>
                        </li>
                        <li>
                            <div className={styles.item} onClick={toggleShortcutModalHandle}><MdOutlineKeyboardAlt />Phím tắt trên bàn phím</div>
                            <ShortcutModal  show={showShortcutModal} onClose={toggleShortcutModalHandle} />
                        </li>
                        {isLogin && (
                            <>
                                <li>
                                    <div className={styles.divider} />
                                </li>
                                <li>
                                    <div className={styles.item} onClick={handleLogout}><MdLogout />Đăng xuất</div>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </Transition>
    )
}

export default HeaderOptions