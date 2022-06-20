// Library
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toast: {
        isShow: false,
        content: ''
    }
}

const uiSlice = createSlice({
    name: 'uiSlice',
    initialState,
    reducers: {
        showToast(state, action) {
            state.toast = {
                isShow: true,
                content: action.payload
            }
        },
        closeToast(state) {
            state.toast.isShow = false
        }
    }
})

export const uiSliceActions = uiSlice.actions
export default uiSlice.reducer