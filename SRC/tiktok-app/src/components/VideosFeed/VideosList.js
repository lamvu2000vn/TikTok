// Library
import { useSelector, useDispatch } from 'react-redux'
import { memo, useEffect, useState } from 'react'
import axios from 'axios'

// Action
import { videosFeedActions } from '../../store/slices/videosFeedSlice'

// API
import { FOR_YOU_PAGE, FOLLOWING_PAGE } from '../../API'

// Component
import { Loading } from '../../UI'
import VideosFeedItem from './VideosFeedItem'
import VideoDetails from '../VideoDetails/VideoDetails'

// Style
import styles from './VideosList.module.css'

const LIMIT = 7

const VideosList = ({ page }) => {
    const dispatch = useDispatch()

    const [offset, setOffset] = useState(0)
    const [scrollY, setScrollY] = useState(0)
    const [isFetching, setIsFetching] = useState(false)
    const [isFetchAll, setIsFetchAll] = useState(false)

    const {itemsList} = useSelector(state => state.videosFeed)
    const {showVideoDetails} = useSelector(state => state.videoDetails)
    const {isLogin} = useSelector(state => state.auth)

    // Handle scroll
    useEffect(() => {
        const handleVideosFeedScroll = () => {
            const scrollY = window.scrollY
            const percentage = document.body.clientHeight * 0.7

            if (isFetchAll === false && scrollY >= percentage) {
                if (isFetching === false) {
                    setIsFetching(true)
                    setOffset(state => state += LIMIT)
                }
            }

            setScrollY(scrollY)
        }

        window.addEventListener('scroll', handleVideosFeedScroll)

        return () => {
            window.removeEventListener('scroll', handleVideosFeedScroll)
        }
    }, [isFetchAll, isFetching])

    // fetch videos
    useEffect(() => {
        const jwt = localStorage.getItem('jwt')
        const url = page === 'for-you' ? FOR_YOU_PAGE : FOLLOWING_PAGE

        axios({
            url,
            method: 'POST',
            headers: { jwt },
            data: {
                limit: LIMIT,
                offset
            }
        })
            .then(response => {
                const {status, data} = response.data
                if (status === 200) {
                    if (data.length > 0) {
                        dispatch(videosFeedActions.pushItemsList(data))
                    } else {
                        setIsFetchAll(true)
                    }

                    setIsFetching(false)
                }
            }).catch(error => {
                console.error(error)
            })
    }, [dispatch, offset, page, isLogin])

    useEffect(() => {
        return () => {
            dispatch(videosFeedActions.setItemsList([]))
        }
    }, [dispatch, isLogin])

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

    if (isFetchAll === false) {
        videosList.push(
            <div key={itemsList.length} className="relative w-full py-10">
                <Loading />
            </div>
        )
    }

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