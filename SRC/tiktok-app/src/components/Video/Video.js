// Library
import { memo, forwardRef } from 'react'

// API
import { STREAM_VIDEO } from '../../API'

// Style
import styles from './Video.module.css'

const Video = forwardRef(({ filename, onClick, onMouseEnter, objectFit = 'contain' }, ref) => {
    const styledVideo = {
        objectFit
    }
    const src = STREAM_VIDEO + '/' + filename

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <video
                    ref={ref}
                    src={src}
                    className={styles.video}
                    style={styledVideo}
                    preload="auto"
                    loop
                    muted
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                />
            </div>
        </div>
    )
})

export default memo(Video)