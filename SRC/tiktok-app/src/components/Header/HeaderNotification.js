import { useRef } from 'react'
import { Transition } from 'react-transition-group'
import styles from './HeaderNotification.module.css'

const HeaderNotification = ({ show }) => {
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
                    <div className={styles.title}>Thông báo</div>
                    <div className={styles.types}>
                        <button className={styles.active}>Tất cả</button>
                        <button className={styles.type}>Thích</button>
                        <button className={styles.type}>Bình luận</button>
                        <button className={styles.type}>Nhắc đến</button>
                        <button className={styles.type}>Follower</button>
                    </div>
                </div>
            )}
        </Transition>
    )
}

export default HeaderNotification