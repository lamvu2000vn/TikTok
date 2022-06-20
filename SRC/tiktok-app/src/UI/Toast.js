// Library
import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'
import { Transition } from 'react-transition-group'
import { useDispatch, useSelector } from 'react-redux'

// Actions
import { uiSliceActions } from '../store/slices/uiSlice'

// Style
import styles from './Toast.module.css'

const Toast = ({ show }) => {
    const dispatch = useDispatch()
    const {toast} = useSelector(state => state.ui)

    useEffect(() => {
        if (toast.isShow === true) {
            setTimeout(() => {
                dispatch(uiSliceActions.closeToast())
            }, 5000)
        }
    }, [dispatch, toast.isShow])

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
                        {toast.content}
                    </div>
                </div>
            )}
        </Transition>
    )
}

const Wrapper = ({ show }) => {
    return createPortal(<Toast show={show} />, document.getElementById('toast'))
}

export default Wrapper