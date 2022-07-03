// Library
import { memo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
import styles from './index.module.css'

const UserPage = () => {
    const [itemsList, setItemsList] = useState(null)
    const {nickname} = useParams()

    useEffect(() => {
        axios.post(USER + '/' + nickname + '/videos', {
            limit: 30,
            offset: 0
        })
            .then(response => {
                const {status, data} = response.data
                if (status === 200) {
                    setItemsList(data)
                }
            })
            .catch(error => {
                console.error(error)
            })

        return () => {
            setItemsList(null)
        }
    }, [nickname])

    return (
        <>
            <Header fullWidth />
            <div className={styles.container}>
                <SideNav width={240} />
                <div className={styles['user-container']}>
                    {
                        itemsList ? (
                            <div className="flex flex-auto flex-col">
                                <UserInfo user={itemsList[0].user} />
                                <Content videosList={itemsList} />
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