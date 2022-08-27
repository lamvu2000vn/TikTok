// Lib
import { DataTypes, QueryTypes, Model } from 'sequelize'

// Sequelize
import { sequelize } from '../util'

class Video extends Model {
    static getVideo = async (videoIdentify, authID = 0) => {
        try {
            let query = `
                SELECT
                    videos.*,
                    (SELECT COUNT(*) FROM video_likes WHERE video_likes.video_id = videos.id) AS video_likes,
                    (SELECT COUNT(*) FROM comments WHERE comments.video_id = videos.id) AS comments,
                    users.nickname,
                    users.name,
                    users.description AS user_description,
                    users.avatar,
                    users.verified,
                    (SELECT COUNT(*) FROM followings WHERE followings.user_id = videos.user_id) AS following,
                    (SELECT COUNT(*) FROM followers WHERE followers.user_id = videos.user_id) AS followers,
                    (
                        SELECT COUNT(*)
                        FROM video_likes
                        WHERE video_likes.video_id IN (
                            SELECT videos.id
                            FROM videos
                            WHERE videos.user_id = users.id
                        )
                    ) AS user_likes,
                    (SELECT COUNT(*) FROM followings WHERE followings.user_id = $authID AND followings.following_id = videos.user_id) AS is_following,
                    (SELECT COUNT(*) FROM video_likes WHERE video_likes.user_id = $authID AND video_likes.video_id = videos.id) AS is_liked
                FROM videos
                LEFT JOIN users ON videos.user_id = users.id
            `
    
            const type = typeof videoIdentify
            let whereClauses = ''
    
            switch (type) {
                case 'number': {
                    whereClauses = `WHERE videos.id = ${videoIdentify}`
                    break
                }
                case 'object': {
                    const videoIdsString = videoIdentify.join(',')
                    whereClauses = `WHERE videos.id IN (${videoIdsString})`
                    break
                }
                default:
                    return []
            }
    
            query += whereClauses
    
            const results = await sequelize.query(query, {
                type: QueryTypes.SELECT,
                bind: {
                    authID
                }
            })

            let videos = []

            if (results.length) {
                videos = results.map(record => ({
                    video: {
                        id: record.id,
                        user_id: record.user_id,
                        filename: record.filename,
                        duration: record.duration,
                        description: record.description,
                        allow_comments: record.allow_comments,
                        post_date: record.post_date,
                        status: record.status,
                        likes: record.video_likes,
                        comments: record.comments,
                        is_liked: record.is_liked
                    },
                    user: {
                        id: record.user_id,
                        nickname: record.nickname,
                        name: record.name,
                        description: record.user_description,
                        avatar: record.avatar,
                        verified: record.verified,
                        following: record.following,
                        followers: record.followers,
                        likes: record.user_likes,
                        is_following: record.is_following
                    }
                }))
            }
    
            return videos
        } catch (error) {
            console.log(error)
            return []
        }
    }

    static getComments = async (id, limit, offset, authID = 0) => {
        try {
            const query = `
                SELECT
                    comments.*,
                    (SELECT COUNT(*) FROM comment_likes WHERE comment_likes.comment_id = comments.id) AS comment_likes,
                    (SELECT COUNT(*) FROM replies WHERE replies.comment_id = comments.id) AS replies,
                    users.nickname,
                    users.name,
                    users.description,
                    users.avatar,
                    users.verified,
                    users.status,
                    (SELECT COUNT(*) FROM followings WHERE followings.user_id = users.id) AS following,
                    (SELECT COUNT(*) FROM followers WHERE followers.user_id = users.id) AS followers,
                    (
                        SELECT COUNT(*)
                        FROM video_likes
                        WHERE video_likes.video_id IN (
                            SELECT videos.id
                            FROM videos
                            WHERE videos.user_id = users.id
                        )
                    ) AS user_likes,
                    (SELECT COUNT(*) FROM followings WHERE followings.user_id = ${authID} AND followings.following_id = users.id) AS is_following,
                    (SELECT COUNT(*) FROM comment_likes WHERE comment_likes.user_id = ${authID} AND comment_likes.comment_id = comments.id) AS is_liked_comment
                FROM comments
                LEFT JOIN users ON comments.user_id = users.id
                WHERE comments.video_id = ${id}
                ORDER BY comments.post_date DESC
                LIMIT ${limit} OFFSET ${offset}
            `
    
            const results = await sequelize.query(query, {
                type: QueryTypes.SELECT
            })
    
            let comments = []
    
            if (results.length) {
                comments = results.map(record => ({
                    user: {
                        id: record.user_id,
                        nickname: record.nickname,
                        name: record.name,
                        description: record.description,
                        avatar: record.avatar,
                        verified: record.verified,
                        status: record.status,
                        following: record.following,
                        followers: record.followers,
                        likes: record.user_likes,
                        is_following: record.is_following,
                        is_liked_comment: record.is_liked_comment
                    },
                    comment: {
                        id: record.id,
                        user_id: record.user_id,
                        video_id: record.video_id,
                        content: record.content,
                        post_date: record.post_date,
                        likes: record.comment_likes,
                        replies: record.replies
                    }
                }))
            }
    
            return comments
        } catch (error) {
            console.log(error)
            return []
        }
    }
}

Video.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        filename: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        duration: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        allow_comment: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
        post_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        }   
    },
    {
        timestamps: false,
        sequelize,
        modelName: 'videos'
    }
)

export default Video