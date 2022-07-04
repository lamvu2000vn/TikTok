// Library
import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'
import { Transition } from 'react-transition-group'
import { useDispatch, useSelector } from 'react-redux'

// Action
import { uiSliceActions } from '../store/slices/uiSlice'

// Style
import styles from './Toast.module.css'

const Toast = () => {
    const dispatch = useDispatch()

    const {isShow, content} = useSelector(state => state.ui.toast)

    useEffect(() => {
        if (isShow === true) {
            setTimeout(() => {
                dispatch(uiSliceActions.closeToast())
            }, 3000)
        }
    }, [dispatch, isShow])

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
        <Transition in={isShow} timeout={timeout} mountOnEnter unmountOnExit nodeRef={nodeRef}>
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

const Wrapper = () => {
    return createPortal(
        <Toast />,
        document.getElementById('toast')
    )
}

export default Wrapper