// Library
import { useCallback, useState, memo } from 'react'

// Component
import Tabs from './Tabs'
import VideosList from './VideosList'

// Style
import styles from './Content.module.css'

const Content = ({ videosList }) => {
    const [activeTab, setActiveTab] = useState(0)

    const handleChangeTab = useCallback(tab => {
        setActiveTab(tab)
    }, [])

    return (
        <div className={styles.container}>
            <Tabs activeTab={activeTab} onChange={handleChangeTab} />
            <VideosList videosList={videosList} />
        </div>
    )
}

export default memo(Content)