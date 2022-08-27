// Route
import authRoutes from './authRoutes'
import videoRoutes from './videoRoutes'
import userRoutes from './userRoutes'
import commentRoutes from './commentRoutes'
import apiRoutes from './apiRoutes'

import { User } from '../models'
import bcrypt from 'bcrypt'
import { QueryTypes } from 'sequelize'
import { sequelize } from '../util'

const routes = app => {
    // Api
    app.use('/api/', apiRoutes)
    // Auth
    app.use('/api/auth', authRoutes)
    // Video
    app.use('/api/video', videoRoutes)
    // User
    app.use('/api/user', userRoutes)
    // Comment
    app.use('/api/comment', commentRoutes)

    app.get('/csrf', (req, res, next) => {
        const token = req.csrfToken()
        res.send(`<h1>${token}</h1>`)
    })

    app.get('/update-password', async (req, res, next) => {
        const password = bcrypt.hashSync('123', 10)  
        await sequelize.query(`UPDATE users SET password = '${password}'`, {
            type: QueryTypes.UPDATE
        })

        res.send('<h1>Update successful</h1>')
    })
}

export default routes