import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    recommendedUsers: [],
    followingUsers: [],
}

const sidebarSlice = createSlice({
    name: 'sidebarSlice',
    initialState,
    reducers: {
        setRecommendedUsers(state, action) {
            state.recommendedUsers = action.payload
        },
        setFollowingUsers(state, action) {
            state.followingUsers = action.payload
        },
        pushFollowingUsers(state, action) {
            state.followingUsers.push(action.payload)
        },
        followUser(state, action) {
            const user = action.payload

            state.recommendedUsers = state.recommendedUsers.filter(item => {
                if (item.id === user.id) {
                    item.isFollowing = !item.isFollowing
                }

                return true
            })
        }
    }
})

export const sidebarSliceActions = sidebarSlice.actions
export default sidebarSlice.reducer