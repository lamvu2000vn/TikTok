// Library
import { useRef } from 'react'

// Icon
import { HiLockClosed } from 'react-icons/hi'

// Style
import styles from './Tabs.module.css'

const Tabs = ({ activeTab, onChange }) => {
    const containerRef = useRef()
    const bottomLineRef = useRef()

    const handleMouseEnter = tab => {
        if (tab === 0) {
            bottomLineRef.current.style.transform = 'translateX(0)'
        } else {
            bottomLineRef.current.style.transform = `translateX(${containerRef.current.getBoundingClientRect().width / 2}px)`
        }
    }

    const handleMouseLeave = () => {
        if (activeTab === 0) {
            bottomLineRef.current.style.transform = 'translateX(0)'
        } else {
            bottomLineRef.current.style.transform = `translateX(${containerRef.current.getBoundingClientRect().width / 2}px)`
        }
    }

    const videoTabClasses = [
        styles['tab-item'],
        activeTab === 0 && styles.active
    ].join(' ')

    const likedTabClasses = [
        styles['tab-item'],
        activeTab === 1 && styles.active
    ].join(' ')

    const styledBottomLine = {
        transform: `translateX(${activeTab === 0 ? 0 : containerRef.current.getBoundingClientRect().width / 2})`
    }

    return (
        <div ref={containerRef} className={styles.container}>
            <div
                className={videoTabClasses}
                onClick={() => onChange(0)}
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
            >Video</div>
            <div
                className={likedTabClasses}
                onClick={() => onChange(1)}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
            >
                <HiLockClosed />Đã thích
            </div>
            <div ref={bottomLineRef} className={styles['botton-line']} style={styledBottomLine} />
        </div>
    )
}

export default Tabs