import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    videoState: {
        isMuted: true,
        volume: 0,
        prevVolume: 1
    },
    showVolumeSlider: false,
    itemsList: []
}

const videosFeedSlice = createSlice({
    name: 'videosFeed',
    initialState,
    reducers: {
        setItemsList(state, action) {
            state.itemsList = action.payload
        },
        pushItemsList(state, action) {
            state.itemsList.push(...action.payload)
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
        seekVideoIsWatching(state, action) {
            state.videoState.currentTime = action.payload
        },
        showVolumeSlider(state) {
            state.showVolumeSlider = true
        },
        hideVolumeSlider(state) {
            state.showVolumeSlider = false
        },
        followUser(state, action) {
            const user = action.payload

            state.itemsList = state.itemsList.filter(item => {
                if (item.user.id === user.id) {
                    item.user.is_following === 1 ? item.user.is_following = 0 : item.user.is_following = 1
                }

                return true
            })
        }
    }
})

export const videosFeedActions = videosFeedSlice.actions
export default videosFeedSlice.reducer