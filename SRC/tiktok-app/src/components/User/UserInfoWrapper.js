// Library
import { useState } from 'react'

// Component
import UserInfoPopover from './UserInfoPopover'

let timerId = null

const UserInfoWrapper = ({ children, user, showDescription, showPopover }) => {
    const [showUserPopover, setShowUserPopover] = useState(false)

    const handleShowPopover = e => {
        clearTimeout(timerId)

        timerId = setTimeout(() => {
            setShowUserPopover(true)
        }, 500)
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