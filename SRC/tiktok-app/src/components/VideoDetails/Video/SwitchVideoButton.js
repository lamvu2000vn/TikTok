// Library
import { useDispatch } from 'react-redux'
import { memo } from 'react'

// Action
import { videosFeedActions } from '../../../store/slices/videosFeedSlice'

// Icon
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

// Style
import styles from './SwitchVideoButton.module.css'

export const PrevButton = () => {
    const dispatch = useDispatch()

    const handleSwitchVideo = () => {
        dispatch(videosFeedActions.switchToPrevVideo())
    }
    
    return (
        <button className={styles['switch-button']} onClick={handleSwitchVideo}>
            <IoIosArrowUp />
        </button>
    )
}

export const NextButton = () => {
    const dispatch = useDispatch()

    const handleSwitchVideo = () => {
        dispatch(videosFeedActions.switchToNextVideo())
    }

    return (
        <button className={styles['switch-button']} onClick={handleSwitchVideo}>
            <IoIosArrowDown />
        </button>
    )
}