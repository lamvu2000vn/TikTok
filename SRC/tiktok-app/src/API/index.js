// Root URL
export const SERVER = 'http://localhost:8000'
export const HOST = 'http://localhost:3000'
export const API = SERVER + '/api'

// Public
export const IMAGES = SERVER + '/images'
export const VIDEOS = SERVER + '/videos'
export const STREAM_VIDEO = API + '/stream-video'

// Auth
export const CSRF_TOKEN = SERVER + '/sanctum/csrf-cookie'
export const CHECK_LOGIN = API + '/check-login'
export const LOGIN = API + '/login'
export const LOGOUT = API + '/logout'
export const LIKE_VIDEO = API + '/like-video'
export const SUBMIT_COMMENT = API  + '/submit-comment'
export const DELETE_COMMENT = API + '/delete-comment'

// Layout
export const RECOMMENDED_USERS = API + '/recommended-users'
export const FOLLOWING_USERS = API + '/following-users'
export const FOLLOW_USER = API + '/follow-user'

// Page
export const FOR_YOU_PAGE = API + '/for-you'
export const FOLLOWING_PAGE = API + '/following'

// User
export const USER = API + '/user'

// Video
export const VIDEO = API + '/video'