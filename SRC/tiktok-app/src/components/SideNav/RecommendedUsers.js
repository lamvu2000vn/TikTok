// Library
import { useEffect, useState, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// Action
import { sidebarSliceActions } from '../../store/slices/sidebarSlice'

// API
import { RECOMMENDED_USERS } from '../../API'

// Components
import UserLink from './UserLink'
import ActionButton from './ActionButton'

const RecommendedUsers = () => {
    const dispatch = useDispatch()

    const [showAll, setShowAll] = useState(false)

    const recommendedUsers = useSelector(state => state.sidebar.recommendedUsers)

    const handleShowAllOrHideUsers = () => {
        setShowAll(state => !state)
    }

    // Fetch data
    const length = recommendedUsers.length
    useEffect(() => {
        if (length === 0) {
            axios(RECOMMENDED_USERS)
                .then(response => {
                    if (response.data.status === 200) {
                        const data = response.data.data
    
                        dispatch(sidebarSliceActions.setRecommendedUsers(data))
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }, [dispatch, length])

    const RenderUsersList = showAll ? (
        recommendedUsers.map((user, key) => (
            <UserLink key={key} user={user} showPopover={true} />
        ))
    ) : (
        recommendedUsers.map((user, key) => {
            if (key < 5) {
                return <UserLink key={key} user={user} showPopover={true} />
            }
            return false
        })
    )

    return (
        <>
            {RenderUsersList}
            {recommendedUsers.length > 5 && <ActionButton onClick={handleShowAllOrHideUsers}>{showAll ? 'Ẩn bớt' : 'Xem tất cả'}</ActionButton>}
        </>
    )
}

export default memo(RecommendedUsers)