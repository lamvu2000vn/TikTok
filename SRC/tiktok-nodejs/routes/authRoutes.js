// Lib
import express from 'express'
// Controller
import { authController } from '../controllers'

const route = express.Router()

route.post('/login', authController.login)
route.get('/logout', authController.logout)
route.get('/check-login', authController.checkLogin)

export default route