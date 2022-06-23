// Library
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showVideoDetails: false,
    watchingIndex: 0,
    currentTime: 0,
    videosList: []
}

const videoDetailsSlice = createSlice({
    name: 'videoDetailsSlice',
    initialState,
    reducers: {
        showVideoDetails(state, action) {
            const {itemIndex, currentTime} = action.payload

            state.showVideoDetails = true
            state.watchingIndex = itemIndex
            state.currentTime = currentTime
        },
        closeVideoDetails(state, action) {
            state.showVideoDetails = false
            state.currentTime = action.payload.currentTime

            const isUserPage = window.location.pathname.substring(1, 2)

            if (isUserPage === '@') {
                state.watchingIndex = 0
            }
        },
        setVideosList(state, action) {
            state.videosList = action.payload
        },
        pushVideosList(state, action) {
            state.videosList.push(...action.payload)
        },
        removeVideosList(state) {
            state.videosList = []
        },
        switchToPrevVideo(state) {
            state.watchingIndex--
            state.currentTime = 0
        },
        switchToNextVideo(state) {
            state.watchingIndex++
            state.currentTime = 0
        },
    }
})

export const videoDetailsActions = videoDetailsSlice.actions
export default videoDetailsSlice.reducer