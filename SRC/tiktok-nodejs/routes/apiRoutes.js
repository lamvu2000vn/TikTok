// Lib
import express from 'express'

// Controller
import { apiController } from '../controllers'

const route = express.Router()

route.get('/csrf-token', apiController.getCSRFToken)

export default route