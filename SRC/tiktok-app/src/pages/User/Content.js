// Library
import { useCallback, useState, memo } from 'react'

// Component
import Tabs from './Tabs'
import VideosList from './VideosList'

// Style
import styles from './Content.module.css'

const Content = ({ user }) => {
    const [activeTab, setActiveTab] = useState(0)

    const handleChangeTab = useCallback(tab => {
        setActiveTab(tab)
    }, [])

    return (
        <div className={styles.container}>
            <Tabs activeTab={activeTab} onChange={handleChangeTab} />
            <VideosList user={user} />
        </div>
    )
}

export default memo(Content)