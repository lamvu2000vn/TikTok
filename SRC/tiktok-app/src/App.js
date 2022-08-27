// Library
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

// Action
import { authSliceActions } from './store/slices/authSlice'

// API
import { CHECK_LOGIN, CSRF_TOKEN } from './API'

// Page
import { ForYou, Following, User } from './pages'

// Component
import { Toast, ScrollTopButton, Loading } from './UI'

const App = () => {
    const dispatch = useDispatch()

    const [isFetch, setIsFetch] = useState(false)
    const [showScrollTopButton, setShowScrollTopButton] = useState(false)

    // const {toast} = useSelector(state => state.ui)
    // const {isLogin} = useSelector(state => state.auth)
    console.log(sessionStorage.getItem('token'))

    // Check login & get CSRF token
    useEffect(() => {
        const jwt = localStorage.getItem('jwt')
        const fetchCSRFToken = axios(CSRF_TOKEN, { withCredentials: true })
        const fetchCheckLogin = axios(CHECK_LOGIN, { headers: { 'token':  jwt} })

        Promise.all([fetchCSRFToken, fetchCheckLogin])
            .then(response => {
                const csrfRes = response[0]
                const checkLoginRes = response[1]

                if (csrfRes.data.status === 200) {
                    axios.defaults.headers.common['x-csrf-token'] = csrfRes.data.token
                    axios.defaults.withCredentials = true
                }

                if (checkLoginRes.data.status === 200) {
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
                <Toast />
                <ScrollTopButton show={showScrollTopButton} />
            </>
        ) : (
            <Loading />
        )
    )
}

export default App