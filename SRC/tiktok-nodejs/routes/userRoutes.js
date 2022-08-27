// Lib
import express from 'express'
// Controller
import { userController } from '../controllers'

const route = express.Router()

route.get('/:userID/get-other-infomation', userController.getOtherInfomation)
route.get('/recommended-users', userController.getRecommendedUsers)
route.post('/following-users', userController.getFollowingUsers)
route.post('/:userIdentify/videos', userController.getVideosOfUser)
route.get('/follow-user/:userID', userController.followUser)
route.get('/:nickname', userController.getUserByNickname)

export default route