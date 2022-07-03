// Library
import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'
import { Transition } from 'react-transition-group'

// Style
import styles from './Toast.module.css'

const Toast = ({ show, content, onClose }) => {
    useEffect(() => {
        if (show === true) {
            setTimeout(() => {
                onClose()
            }, 3000)
        }
    }, [onClose, show])

    const nodeRef = useRef()

    const transitionStyles = {
        entering: {
            opacity: 0,
            transform: 'translate(-50%, -100%)'
        },
        entered: {
            opacity: 1,
            transform: 'translate(-50%, 0)'
        },
        exiting: {
            opacity: 0,
            transform: 'translate(-50%, -100%)'
        },
        exited:  {
            opacity: 0,
            transform: 'translate(-50%, -100%)'
        },
    }

    const timeout = {
        appear: 0,
        enter: 0,
        exit: 300
    }

    return (
        <Transition in={show} timeout={timeout} mountOnEnter unmountOnExit nodeRef={nodeRef}>
            {state => (
                <div ref={nodeRef} className={styles.container} style={{...transitionStyles[state]}}>
                    <div className={styles.content}>
                        {content}
                    </div>
                </div>
            )}
        </Transition>
    )
}

const Wrapper = ({ show, content, onClose }) => {
    return createPortal(
        <Toast show={show} content={content} onClose={onClose} />,
        document.getElementById('toast')
    )
}

export default Wrapper