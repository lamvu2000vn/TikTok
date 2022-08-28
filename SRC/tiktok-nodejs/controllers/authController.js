// Lib
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Model
import { User } from '../models'

export const login = async (req, res) => {
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

        jwt.sign({ user_id: user.id, phone: user.phone, nickname: user.nickname, name: user.name }, 'secretKey', async (err, token) => {
            if (err) {
                return res.status(500).json({ err })
            }

            user.remember_token = token
            await user.save()
    
            user = await User.getUserInfo(user.id, user.id)

            req.session.user = user
        
            res.status(200).json({
                status: 200,
                message: 'Authenticated',
                token,
                user
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}

export const logout = (req, res) => {
    try {
        const token = req.headers.jwt
        jwt.verify(token, 'secretKey', (err, decoded) => {
            if (err) {
                return res.status(400).json({ err })
            }

            return res.status(200).json({
                status: 200,
                message: 'Logout successful'
            })
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
        const token = req.headers.jwt

        if (!token) {
            return res.status(200).json({
                status: 401,
                message: 'Require token'
            })
        }

        jwt.verify(token, 'secretKey', async (err, decoded) => {
            if (err) {
                return res.status(200).json({
                    status: 401,
                    err
                })
            }

            const user = await User.getUserInfo(decoded.user_id, decoded.user_id)

            return res.status(200).json({
                status: 200,
                message: 'Authenticated',
                user
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}