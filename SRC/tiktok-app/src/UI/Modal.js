import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Transition } from 'react-transition-group'
import Card from './Card'
import { IoClose } from 'react-icons/io5'

import styles from './Modal.module.css'

export const CloseModalButton = ({ onClose, size = 'lg' }) => {
    const classes = [
        styles['close-btn'],
        styles[`close-btn-${size}`]
    ].join(' ')

    return (
        <button className={classes} onClick={onClose}><IoClose /></button>
    )
}

const Backdrop = ({ show, onClose }) => {
    const nodeRef = useRef()

    const transitionStyles = {
        entering: { opacity: 0 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 },
    }

    const timeout = {
        appear: 0,
        enter: 0,
        exit: 300
    }

    return (
        <Transition in={show} timeout={timeout} mountOnEnter unmountOnExit nodeRef={nodeRef}>
            {state => (
                <div ref={nodeRef} className={styles.backdrop} style={{...transitionStyles[state]}} onClick={onClose} />
            )}
        </Transition>
    )
}

const Overlay = ({ children, show }) => {
    const nodeRef = useRef()

    const transitionStyles = {
        entering: {
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0)'
        },
        entered: {
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1)'
        },
        exiting: {
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0)'
        },
        exited:  {
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0)'
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
                <div ref={nodeRef} className={styles.overlay} style={{...transitionStyles[state]}}>
                    <Card>
                        {children}
                    </Card>
                </div>
            )}
        </Transition>
    )
}

const Container = document.getElementById('overlays')

const Modal = ({ children, show, onClose }) => {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden'
            document.body.style.marginRight = '7px';
        } else {
            document.body.removeAttribute('style')
        }
    }, [show])

    return (
        <>
            {createPortal(<Backdrop show={show} onClose={onClose} />, Container)}
            {createPortal(<Overlay show={show}>{children}</Overlay>, Container)}
        </>
    )
}

export default Modal