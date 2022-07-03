// Library
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

// Action
import { authSliceActions } from './store/slices/authSlice'

// API
import { CHECK_LOGIN } from './API'

// Page
import { ForYou, Following, User } from './pages'

// Component
import { Toast, ScrollTopButton, Loading } from './UI'

axios.defaults.withCredentials = true

const App = () => {
    const dispatch = useDispatch()

    const [isFetch, setIsFetch] = useState(false)
    const [showScrollTopButton, setShowScrollTopButton] = useState(false)

    const {toast} = useSelector(state => state.ui)
    const {isLogin} = useSelector(state => state.auth)

    // Check login
    useEffect(() => {
        axios(CHECK_LOGIN)
            .then(response => {
                if (response.data.status === 200) {
                    dispatch(authSliceActions.login(response.data.user))
                }

                setIsFetch(true)
            })
            .catch(error => {
                console.error(error)
                setIsFetch(true)
            })

        return () => {
            setIsFetch(false)
        }
    }, [dispatch])

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY

            setShowScrollTopButton(scrollY > 200)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    
    return (
        isFetch ? (
            <>
                <Routes>
                    <Route path="/" element={<ForYou />} />
                    <Route path="/for-you" element={<ForYou />} />
                    <Route path="/following" element={<Following />} />
                    <Route path="/@:nickname" element={<User />} />
                </Routes>
                <Toast show={toast.isShow} />
                <ScrollTopButton show={showScrollTopButton} />
            </>
        ) : (
            <Loading />
        )
    )
}

export default App