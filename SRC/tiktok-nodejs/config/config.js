// Lib
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import csrf from 'csurf'
import cors from 'cors'

const config = app => {
    // CORS
    app.use(cors({
        origin: 'http://localhost:3000',
        methods: '*',
        allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-TOKEN', 'X-XSRF-TOKEN', 'token'],
        credentials: true
    }))
    
    // Request body/params
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(express.static('public'))
    
    app.use(cookieParser())
    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false
    }))

    app.use(csrf())
}

export default config