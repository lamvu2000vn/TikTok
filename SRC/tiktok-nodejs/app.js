// Lib
import express from 'express'
// Config
import { config } from './config'
// Routes
import { routes } from './routes'
// Util
import { associations, sequelize } from './util'

(async () => {
    try {
        const app = express()
    
        config(app)
        routes(app)

        await associations()
        await sequelize.sync()

        app.listen(8000)
    } catch (error) {
        console.log(error)
    }
})()