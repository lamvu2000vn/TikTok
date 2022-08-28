// Lib
import jwt from 'jsonwebtoken'

// Model
import { User, Following } from '../models'

export const getOtherInfomation = async (req, res) => {
    try {

    } catch (error) {
        conosle.log(error)
        res.status(500).json({ error })
    }
}

export const getUserByNickname = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                nickname: req.params.nickname
            }
        })
        const authID = req.session.user ? req.session.user.id : 0

        if (!user) {
            return res.status(400).json({
                message: 'Nickname not found'
            })
        }

        const users = await User.getUserInfo(user.id, authID)

        res.status(200).json({
            data: users
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}

export const getVideosOfUser = async (req, res) => {
    try {
        const {limit, offset} = req.body
        const authID = req.session.user ? req.session.user.id : 0
        const videos = await User.getVideos(req.params.userIdentify, limit, offset, authID)

        res.status(200).json({
            status: 200,
            data: videos
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}

export const getRecommendedUsers = async (req, res) => {
    try {
        const authID = req.session.user ? req.session.user.id : 0
        let userIds = await User.findAll({
            attributes: ['id'],
            where: {
                verified: 1
            },
            limit: 30
        })
        userIds = userIds.map(val => val.id)

        const users = await User.getUserInfo(userIds, authID)

        res.status(200).json({
            status: 200,
            data: users
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}

export const getFollowingUsers = async (req, res) => {
    try {
        const token = req.headers.jwt

        const {limit, offset} = req.body

        if (!token) {
            return res.status(401).json({
                status: 400,
                message: 'Require token'
            })
        }

        jwt.verify(token, 'secretKey', async (err, decoded) => {
            if (err) {
                return res.status(200).json({
                    status: 400,
                    err
                })
            }

            const authID = decoded.user_id
            
            let followingIds = await Following.findAll({
                attributes: ['following_id'],
                where: {
                    user_id: authID
                },
                limit,
                offset
            })
            followingIds = followingIds.map(val => val.following_id)
            
            if (!followingIds.length) {
                return res.status(200).json({
                    status: 200,
                    message: 'all',
                    data: []
                })
            }
            
            const users = await User.getUserInfo(followingIds, authID)
            
            return res.status(200).json({
                status: 200,
                data: users
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}

export const followUser = async (req, res) => {
    try {
        const token = req.headers.jwt
        const userID = req.params.userID

        if (!token) {
            return res.status(401).json({
                status: 401,
                message: 'Unauthenticated'
            })
        }

        jwt.verify(token, 'secretKey', async (err, decoded) => {
            if (err) {
                return res.status(400).json({ err })
            }

            const authID = decoded.user_id
            let action = null
            const [record, isCreated] = await Following.findOrCreate({
                where: {
                    user_id: authID,
                    following_id: userID
                }
            })
            
            if (isCreated) {
                action = 'follow'
            } else {
                action = 'unfollow'
                await Following.destroy({
                    where: {
                        id: record.id
                    }
                })
            }
    
            return res.status(200).json({
                status: 200,
                action
            })
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}
