// Library
import { useEffect, useState, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// Action
import { sidebarSliceActions } from '../../store/slices/sidebarSlice'

// API
import { FOLLOWING_USERS } from '../../API'

// Components
import UserLink from './UserLink'
import ActionButton from './ActionButton'

const LIMIT = 10

const FolllowingUsers = () => {
    const dispatch = useDispatch()

    const [isShowAll, setIsShowAll] = useState(false)
    const [number, setNumber] = useState(LIMIT)

    const followingUsers = useSelector(state => state.sidebar.followingUsers)

    const handleSeeMoreOrHideUsers = () => {
        if (isShowAll) {
            const newData = followingUsers.slice(0, LIMIT)
            setNumber(LIMIT)
            dispatch(sidebarSliceActions.setFollowingUsers(newData))
            setIsShowAll(false)
        } else {
            setNumber(state => state + LIMIT)
        }
    }

    // Fetch data
    useEffect(() => {
        axios.post(FOLLOWING_USERS, {
            limit: LIMIT,
            offset: number - LIMIT
        }).then(response => {
            const {status, data} = response.data
            if (status === 200) {
                if (data.length > 0) {
                    if (number === LIMIT) {
                        dispatch(sidebarSliceActions.setFollowingUsers(data))
                    } else {
                        dispatch(sidebarSliceActions.pushFollowingUsers(data))
                    }
                } else {
                    setIsShowAll(true)
                }
            }
        })
        .catch(error => {
            console.error(error)
        })
    }, [dispatch, number])

    const RenderUsersList = followingUsers.map((user, key) => (
        <UserLink key={key} user={user} showPopover={false} />
    ))

    return (
        <>
            {RenderUsersList}
            <ActionButton onClick={handleSeeMoreOrHideUsers}>{isShowAll ? 'Ẩn bớt' : 'Xem tất cả'}</ActionButton>
        </>
    )
}

export default memo(FolllowingUsers)