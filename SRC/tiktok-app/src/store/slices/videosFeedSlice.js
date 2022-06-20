import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    videoState: {
        isMuted: true,
        volume: 0,
        prevVolume: 1,
        currentTime: 0
    },
    showVideoDetails: false,
    showVolumeSlider: false,
    watchingIndex: null,
    itemsList: []
}

const videosFeedSlice = createSlice({
    name: 'videosFeed',
    initialState,
    reducers: {
        setItemsList(state, action) {
            state.itemsList = action.payload
        },
        changeVolume(state, action) {
            const value = Number(action.payload)
    
            if (value === 0) {
                state.videoState.isMuted = true
            } else if (value > state.videoState.volume && state.videoState.isMuted === true) {
                state.videoState.isMuted = false
            }
    
            state.videoState.volume = value
        },
        toggleMuted(state) {
            if (state.videoState.isMuted === false) {
                state.videoState.isMuted = true
                state.videoState.prevVolume = state.videoState.volume
                state.videoState.volume = 0
            } else {
                state.videoState.isMuted = false
                state.videoState.volume = state.videoState.prevVolume
            }
        },
        showVideoDetails(state, action) {
            state.showVideoDetails = true
            state.watchingIndex = action.payload.itemIndex
            state.videoState.currentTime = action.payload.currentTime
        },
        seekVideoIsWatching(state, action) {
            state.videoState.currentTime = action.payload
        },
        closeVideoDetails(state, action) {
            state.showVideoDetails = false
            state.videoState.currentTime = action.payload.currentTime
        },
        showVolumeSlider(state) {
            state.showVolumeSlider = true
        },
        hideVolumeSlider(state) {
            state.showVolumeSlider = false
        },
        switchToPrevVideo(state) {
            state.watchingIndex--
            state.videoState.currentTime = 0
        },
        switchToNextVideo(state) {
            state.watchingIndex++
            state.videoState.currentTime = 0
        },
        followUser(state, action) {
            const user = action.payload

            state.itemsList = state.itemsList.filter(item => {
                if (item.user.id === user.id) {
                    item.user.isFollowing = !item.user.isFollowing
                }

                return true
            })
        }
    }
})

export const videosFeedActions = videosFeedSlice.actions
export default videosFeedSlice.reducer