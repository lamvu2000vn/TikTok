// Root URL
export const SERVER = 'http://localhost:8000'
export const HOST = 'http://localhost:3000'
export const API = SERVER + '/api'
export const AUTH = API + '/auth'
export const VIDEO = API + '/video'
export const USER = API + '/user'
export const COMMENT = API + '/comment'

// Public
export const IMAGES = SERVER + '/images'
export const VIDEOS = SERVER + '/videos'

// Auth
// export const CSRF_TOKEN = SERVER + '/sanctum/csrf-cookie'
export const CSRF_TOKEN = API + '/csrf-token'
export const CHECK_LOGIN = AUTH + '/check-login'
export const LOGIN = AUTH + '/login'
export const LOGOUT = AUTH + '/logout'

// Video
export const STREAM_VIDEO = VIDEO + '/stream-video'
export const LIKE_VIDEO = VIDEO + '/like-video'
export const FOR_YOU_PAGE = VIDEO + '/for-you'
export const FOLLOWING_PAGE = VIDEO + '/following'

// User
export const RECOMMENDED_USERS = USER + '/recommended-users'
export const FOLLOWING_USERS = USER + '/following-users'
export const FOLLOW_USER = USER + '/follow-user'

// Comment
export const SUBMIT_COMMENT = COMMENT  + '/submit'