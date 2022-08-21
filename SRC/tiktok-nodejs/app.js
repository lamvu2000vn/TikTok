// Lib
import express from 'express'
// Config
import { config } from './config'
// Routes
import { routes } from './routes'

(async () => {
    const app = express()

    config(app)
    routes(app)

    app.listen(3000)
})()