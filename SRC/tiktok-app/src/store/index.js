import { configureStore } from '@reduxjs/toolkit'

// Reducer
import videosFeedReducer from './slices/videosFeedSlice'
import sidebarReducer from './slices/sidebarSlice'
import authReducer from './slices/authSlice'
import uiReducer from './slices/uiSlice'

const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        videosFeed: videosFeedReducer,
        sidebar: sidebarReducer
    }
})

export default store