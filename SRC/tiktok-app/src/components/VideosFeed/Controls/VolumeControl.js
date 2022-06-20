// Library
import { useDispatch, useSelector } from 'react-redux'

// Action
import { videosFeedActions } from '../../../store/slices/videosFeedSlice'

// Icon
import { HiOutlineVolumeUp, HiVolumeOff } from 'react-icons/hi'

// Style
import styles from './VolumeControl.module.css'

// Constant
const VOLUME_CONTROL_WIDTH = 46

export const VolumeSlider = () => {
    const dispatch = useDispatch()

    const videoState = useSelector(state => state.videosFeed.videoState)

    const {volume} = videoState

    const handleChangeVolume = e => {
        dispatch(videosFeedActions.changeVolume(Number(e.target.value)))
    }

    const volumePercent = volume * 100 * VOLUME_CONTROL_WIDTH / 100
    
    return (
        <div className={styles['control-container']}>
            <div className={styles['slider-track-container']}>
                <div className={styles['process-bar']} style={{width: volumePercent}} />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    className={styles['volume-input']}
                    value={volume}
                    onChange={handleChangeVolume}
                />
            </div>
        </div>
    )
}

const VolumeControl = () => {
    const dispatch = useDispatch()

    const videosFeed = useSelector(state => state.videosFeed)
    const showVolumeSlider = videosFeed.showVolumeSlider
    const videoState = videosFeed.videoState

    const handleShowVolumeSlider = () => {
        dispatch(videosFeedActions.showVolumeSlider())
    }

    const handleHideVolumeSlider = () => {
        dispatch(videosFeedActions.hideVolumeSlider())
    }

    const handleToggleMuted = () => {
        dispatch(videosFeedActions.toggleMuted())
    }

    return (
        <div className={styles.container} onMouseEnter={handleShowVolumeSlider} onMouseLeave={handleHideVolumeSlider}>
            <div className={styles['volume-control-icon']} onClick={handleToggleMuted}>
                {videoState.volume === 0 ? <HiVolumeOff /> : <HiOutlineVolumeUp />}
            </div>
            {showVolumeSlider && <VolumeSlider />}
        </div>
    )
}

export default VolumeControl