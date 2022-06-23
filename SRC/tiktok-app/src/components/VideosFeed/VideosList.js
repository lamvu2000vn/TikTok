// Library
import { useSelector } from 'react-redux'
import { memo, useEffect, useState } from 'react'

// Component
import { Loading } from '../../UI'
import VideosFeedItem from './VideosFeedItem'
import VideoDetails from '../VideoDetails/VideoDetails'

// Style
import styles from './VideosList.module.css'

const VideosList = () => {
    const {itemsList} = useSelector(state => state.videosFeed)
    const {showVideoDetails} = useSelector(state => state.videoDetails)

    const [scrollY, setScrollY] = useState(0)

    // Handle scroll
    useEffect(() => {
        const handleVideosFeedScroll = () => {
            const scrollY = window.scrollY
            setScrollY(scrollY)
        }

        window.addEventListener('scroll', handleVideosFeedScroll)

        return () => {
            window.removeEventListener('scroll', handleVideosFeedScroll)
        }
    }, [])

    useEffect(() => {
        if (showVideoDetails === true) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.removeAttribute('style')
        }
    }, [showVideoDetails])

    const videosList = itemsList.map((item, key) => (
        <VideosFeedItem key={key} item={item} itemIndex={key} scrollY={scrollY} />
    ))

    return (
        <>
            <div className={styles.container}>
                {
                    videosList.length ? (
                        videosList
                    ) : (
                        <Loading />
                    )
                }
            </div>
            {showVideoDetails && <VideoDetails />}
        </>
    )
}

export default memo(VideosList)