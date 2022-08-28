// Lib
import jwt from 'jsonwebtoken'

// Model
import { Comment } from '../models'

export const submitComment = async (req, res) => {
    try {
        const token = req.headers.jwt
        const {content, videoID} = req.body

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

            const newComment = await Comment.create({
                user_id: authID,
                video_id: videoID,
                content
            })
    
            res.status(200).json({
                status: 200,
                data: newComment
            })
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}

export const deleteComment = async (req, res) => {
    try {
        const token = req.headers.jwt

        if (!token) {
            return res.status(401).json({
                status: 401,
                message: 'Unauthenticated'
            })
        }

        jwt.verify(token, 'secretKey', async (err) => {
            if (err) {
                return res.status(400).json({ err })
            }

            const commentID = req.params.commentID
            const comment = await Comment.findByPk(commentID)
    
            if (!comment) {
                return res.status(400).json({
                    status: 400,
                    message: 'Comment not found'
                })
            }
    
            await Comment.destroy({
                where: {
                    id: commentID
                }
            })
    
            res.status(200).json({
                status: 200,
                message: 'delete comment successful'
            })
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}