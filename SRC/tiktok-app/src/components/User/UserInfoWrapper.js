// Library
import { useState } from 'react'
import axios from 'axios'

// API
import { USER } from '../../API'

// Component
import UserInfoPopover from './UserInfoPopover'

let timerId = null

const UserInfoWrapper = ({ children, userId, showDescription, showPopover }) => {
    const [showUserPopover, setShowUserPopover] = useState(false)
    const [user, setUser] = useState(null)
    
    const handleShowPopover = () => {
        try {
            timerId = setTimeout(async () => {
                const jwt = localStorage.getItem('jwt')
                
                const response = await axios(USER + '/' + userId, { headers: { jwt } })
    
                const {status, user} = response.data
    
                if (status === 200) {
                    setUser(user)
                    setShowUserPopover(true)
                }
            }, 500)
        } catch (err) {
            console.error(err)
        }
    }

    const handleHidePopover = () => {
        clearTimeout(timerId)
        setShowUserPopover(false)
    }

    if (showPopover) {
        return (
            <div className="relative" onMouseEnter={handleShowPopover} onMouseLeave={handleHidePopover}>
                {children}
                {showUserPopover && <UserInfoPopover user={user} showDescription={showDescription} />}
            </div>
        )
    } else {
        return children
    }
}

export default UserInfoWrapper