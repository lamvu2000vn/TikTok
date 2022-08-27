// Lib
import { QueryTypes} from 'sequelize'
import fs from 'fs'
import appRoot from 'app-root-path'
import jwt from 'jsonwebtoken'

// Model
import { VideoLike, Video, Following } from '../models'

// Util
import { sequelize } from '../util'

export const likeVideo = async (req, res, next) => {
    try {
        const auth = req.session.user

        if (!auth) {
            return res.status(401).json({
                status: 401,
                message: 'Unauthenticated'
            })
        }

        const videoID = req.params.videoID
        let action = null
        const [record, isCreated] = await VideoLike.findOrCreate({
            where: {
                user_id: auth.id,
                video_id: videoID
            }
        })

        if (isCreated) {
            action = 'like'
        } else {
            action = 'unlike'
            await VideoLike.destroy({ where: { user_id: record.user_id, video_id: record.video_id } })
        }

        return res.status(200).json({
            status: 200,
            action
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error
        })
    }
}

export const streamVideo = (req, res, next) => {
    try {
        const videoPath = `${appRoot}/public/videos/${req.params.filename}`
        const videoStat = fs.statSync(videoPath)
        const fileSize = videoStat.size
        const videoRange = req.headers.range

        if (videoRange) {
            const parts = videoRange.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize-1
            const chunksize = (end-start) + 1
            const file = fs.createReadStream(videoPath, {start, end})
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(206, head)
            file.pipe(res)
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head)
            fs.createReadStream(videoPath).pipe(res)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}

export const videoForYou = async (req, res, next) => {
    try {
        const {limit, offset} = req.body
        const authID = req.session.user ? req.session.user.id : 0

        let videoIds = await Video.findAll({
            attributes: ['id'],
            limit,
            offset
        })

        videoIds = videoIds.map(val => val.id)

        const videos = await Video.getVideo(videoIds, authID)
        
        return res.status(200).json({
            status: 200,
            message: 'success',
            data: videos
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}

export const videoFollowing = async (req, res, next) => {
    try {
        const token = req.headers.token
        let videos = []
        let auth = null

        if (!token) {
            let videoIds = await sequelize.query(`
                SELECT videos.id
                FROM videos
                WHERE videos.user_id IN (
                    SELECT	users.id
                    FROM users
                    WHERE users.verified = 1
                )
                ORDER BY RAND()
                LIMIT 30
            `, {
                type: QueryTypes.SELECT
            })

            videoIds = videoIds.map(val => val.id)

            videos = await Video.getVideo(videoIds)

            return res.status(200).json({
                status: 200,
                data: videos
            })
        }

        jwt.verify(token, 'PRIVATE KEY', (err, decoded) => {
            if (err) {
                return res.status(200).json({
                    status: 400,
                    err
                })
            }

            auth = decoded.user
        })

        const {limit, offset} = req.body

        let followingIds = await Following.findAll({
            attributes: ['following_id'],
            where: {
                user_id: auth.id
            }
        })
        followingIds = followingIds.map(val => val.id)


        if (followingIds.length) {
            let videoIds = await Video.findAll({
                attributes: ['id'],
                where: {
                    user_id: {
                        [Op.in]: followingIds
                    }
                },
                limit,
                offset
            })
            videoIds = videoIds.map(val => val.id)
    
            if (!videoIds.length) {
                return res.status(200).json({
                    status: 200,
                    message: 'all',
                    data: []
                })
            }

            videos = await Video.getVideo(videoIds, auth.id)
        }

        return res.status(200).json({
            data: videos
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}

export const getCommentsOfVideo = async (req, res, next) => {
    try {
        const authID = req.session.user ? req.session.user.id : 0
        const videoID  = req.params.videoID
        const {limit, offset} = req.body

        const comments = await Video.getComments(videoID, limit, offset, authID)

        res.status(200).json({
            status: 200,
            data: comments
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message })
    }
}