import { configureStore } from '@reduxjs/toolkit'

// Reducer
import videosFeedReducer from './slices/videosFeedSlice'
import sidebarReducer from './slices/sidebarSlice'
import authReducer from './slices/authSlice'
import uiReducer from './slices/uiSlice'
import videoDetailsReducer from './slices/videoDetailsSlice'

const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        videosFeed: videosFeedReducer,
        sidebar: sidebarReducer,
        videoDetails: videoDetailsReducer
    }
})

export default store