// Lib
import express from 'express'

// Controller
import { videoController } from '../controllers'

const route = express.Router()

route.get('/stream-video/:filename', videoController.streamVideo)
route.get('/like-video/:videoID', videoController.likeVideo)
route.post('/for-you', videoController.videoForYou)
route.post('/following', videoController.videoFollowing)
route.post('/:videoID/comments', videoController.getCommentsOfVideo)

export default route