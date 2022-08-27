// Model
import { Comment } from '../models'

export const submitComment = async (req, res, next) => {
    try {
        const auth = req.session.user
        const {content, videoID} = req.body

        if (!auth) {
            return res.status(401).json({
                status: 401,
                message: 'Unauthenticated'
            })
        }

        const newComment = await Comment.create({
            user_id: auth.id,
            video_id: videoID,
            content
        })

        res.status(200).json({
            status: 200,
            data: newComment
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const commentID = req.params.commentID
        const auth = req.session.user
        const comment = await Comment.findByPk(commentID)

        if (!auth) {
            return res.status(401).json({
                status: 401,
                message: 'Unauthenticated'
            })
        }
        
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
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}