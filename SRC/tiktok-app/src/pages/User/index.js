// Library
import { memo, useState, useEffect } from 'react'
import axios from 'axios'

// API
import { USER } from '../../API'

// Component
import { Loading } from '../../UI'
import Header from '../../components/Header/Header'
import SideNav from '../../components/SideNav/SideNav'
import UserInfo from './UserInfo'
import Content from './Content'

// Style
import styles from './UserPage.module.css'

const UserPage = () => {
    const [user, setUser] = useState(null)
    const [videosList, setVideosList] = useState([])

    useEffect(() => {
        const nickname = window.location.pathname.substring(2)
        
        const getUser = axios(USER + '/' + nickname)
        const getVideosOfUser = axios(USER + '/' + nickname + '/videos')

        Promise.all([getUser, getVideosOfUser])
            .then(response => {
                console.log(response)
            })

        axios(USER + '/' + nickname)
            .then(response => {
                if (response.data.status === 200) {
                    setUser(response.data.data)
                }
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    return (
        <>
            <Header fullWidth />
            <div className={styles.container}>
                <SideNav width={240} />
                <div className={styles['user-container']}>
                    {
                        user ? (
                            <div className="flex flex-auto flex-col">
                                <UserInfo user={user} />
                                <Content user={user} />
                            </div>
                        ) : (
                            <Loading />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default memo(UserPage)