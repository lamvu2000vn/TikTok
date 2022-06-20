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
import { Toast, ScrollTopButton } from './UI'

axios.defaults.withCredentials = true

const App = () => {
    const dispatch = useDispatch()

    const [showScrollTopButton, setShowScrollTopButton] = useState(false)


    const {toast} = useSelector(state => state.ui)

    // Check login
    useEffect(() => {
        axios(CHECK_LOGIN)
            .then(response => {
                if (response.data.status === 200) {
                    dispatch(authSliceActions.login(response.data.user))
                }
            })
            .catch(error => {
                console.error(error)
            })
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
        <>
            <Routes>
                <Route path="/" element={<ForYou />} />
                <Route path="/for-you" element={<ForYou />} />
                <Route path="/following" element={<Following />} />
                <Route path="/:userId" element={<User />} />
            </Routes>
            <Toast show={toast.isShow} />
            <ScrollTopButton show={showScrollTopButton} />
        </>
    )
}

export default App