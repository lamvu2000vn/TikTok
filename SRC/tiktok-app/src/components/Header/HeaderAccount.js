// Library
import { useRef } from 'react'
import { Transition } from 'react-transition-group'

// Icon
import { RiUserLine, RiSettings3Line } from 'react-icons/ri'
import { BsCoin } from 'react-icons/bs'
import { GrLanguage } from 'react-icons/gr'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { MdOutlineKeyboardAlt, MdLogout } from 'react-icons/md'

// Style
import styles from './HeaderAccount.module.css'

const HeaderAccount = ({ show }) => {
    const nodeRef = useRef()

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

    return (
        <Transition in={show} timeout={timeout} nodeRef={nodeRef}>
            {state => (
                <div ref={nodeRef} className={styles.card} style={{...transitionStyles[state]}}>
                    <ul>
                        <li>
                            <div className={styles.item}><RiUserLine /> Xem hồ sơ</div>
                        </li>
                        <li>
                            <div className={styles.item}><BsCoin /> Nhận xu</div>
                        </li>
                        <li>
                            <div className={styles.item}><RiSettings3Line /> Cài đặt</div>
                        </li>
                        <li>
                            <div className={styles.item}><GrLanguage /> Tiếng Việt</div>
                        </li>
                        <li>
                            <div className={styles.item}><AiOutlineQuestionCircle /> Phản hồi và trợ giúp</div>
                        </li>
                        <li>
                            <div className={styles.item}><MdOutlineKeyboardAlt /> Phím tắt trên bàn phím</div>
                        </li>
                        <li>
                            <div className={styles.divider} />
                        </li>
                        <li>
                            <div className={styles.item}><MdLogout /> Đăng xuất</div>
                        </li>
                    </ul>
                </div>
            )}
        </Transition>
    )
}

export default HeaderAccount