// Library
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
    user: null
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        login(state, action) {
            state.isLogin = true
            state.user = action.payload
        },
        loggout(state) {
            state.isLogin = false
            state.user = null
        }
    }
})

export const authSliceActions = authSlice.actions
export default authSlice.reducer