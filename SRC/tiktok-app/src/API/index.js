// Root URL
export const HOST = 'http://localhost:8000'
export const API = HOST + '/api'

// Public
export const IMAGES = HOST + '/images'
export const VIDEOS = HOST + '/videos'
export const STREAM_VIDEO = API + '/stream-video'

// Auth
export const CSRF_TOKEN = HOST + '/sanctum/csrf-cookie'
export const CHECK_LOGIN = API + '/check-login'
export const LOGIN = API + '/login'
export const LOGOUT = API + '/logout'

// Layout
export const RECOMMENDED_USERS = API + '/recommended-users'
export const FOLLOWING_USERS = API + '/following-users'
export const LIKE_VIDEO = API + '/like-video'
export const FOLLOW_USER = API + '/follow-user'

// For you page
export const FOR_YOU_PAGE = API + '/for-you'