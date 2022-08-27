// Lib
import express from 'express'

// Controller
import { commentController } from '../controllers'

const route = express.Router()

route.post('/submit', commentController.submitComment)
route.get('/delete/:commentID', commentController.deleteComment)


export default route