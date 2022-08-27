// Lib
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Model
import { User } from '../models'

export const login = async (req, res, next) => {
    try {
        const {phone, password} = req.body
    
        let user = await User.findOne({ where: { phone } })
    
        if (!user) {
            return res.status(200).json({
                status: 401,
                message: 'Unauthenticated'
            })
        }
    
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(200).json({
                status: 401,
                message: 'Unauthenticated'
            })
        }

        const token = jwt.sign({ user }, 'PRIVATE KEY')
        user.remember_token = token
        await user.save()

        user = await User.getUserInfo(user.id, user.id)
    
        res.status(200).json({
            status: 200,
            message: 'Authenticated',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}

export const logout = (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err)
            } else {
                return res.status(200).json({
                    status: 200,
                    message: 'logout successful'
                })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}

export const checkLogin = async (req, res) => {
    try {
        const token = req.headers.token

        if (!token) {
            return res.status(400).json({
                message: 'Require token'
            })
        }

        jwt.verify(token, 'PRIVATE KEY', (err, decoded) => {
            if (err) {
                return res.status(200).json({
                    status: 401,
                    err
                })
            }

            return res.status(200).json({
                status: 200,
                message: 'Authenticated',
                user: decoded
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}