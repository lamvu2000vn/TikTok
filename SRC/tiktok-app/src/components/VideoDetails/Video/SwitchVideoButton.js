// Library
import { useDispatch } from 'react-redux'

// Action
import { videoDetailsActions } from '../../../store/slices/videoDetailsSlice'

// Icon
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

// Style
import styles from './SwitchVideoButton.module.css'

export const PrevButton = () => {
    const dispatch = useDispatch()

    const handleSwitchVideo = () => {
        dispatch(videoDetailsActions.switchToPrevVideo())
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
        dispatch(videoDetailsActions.switchToNextVideo())
    }

    return (
        <button className={styles['switch-button']} onClick={handleSwitchVideo}>
            <IoIosArrowDown />
        </button>
    )
}