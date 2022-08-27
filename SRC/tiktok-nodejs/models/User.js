// Lib
import { DataTypes, Model, QueryTypes } from 'sequelize'
// Util
import { sequelize } from '../util'

class User extends Model {
    static getUserInfo = async (userIdentify, authID = 0) => {
        try {
            let query = `
                SELECT
                    users.id,
                    users.phone,
                    users.nickname,
                    users.name,
                    users.description,
                    users.avatar,
                    users.verified,
                    users.status,
                    users.remember_token,
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
                    ) AS likes,
                    (SELECT COUNT(*) FROM followings WHERE followings.user_id = $authID AND followings.following_id = users.id) AS is_following
                FROM users
            `

            const type = typeof userIdentify
            let whereClauses = ''
    
            switch (type) {
                case 'number': {
                    whereClauses = `WHERE users.id = ${userIdentify}`
                    break
                }
                case 'object': {
                    const stringUserIds = userIdentify.join(',')
                    whereClauses = `WHERE users.id IN (${stringUserIds})`
                    break
                }
                default:
                    return []
            }
    
            query += whereClauses
    
            const users = await sequelize.query(query, {
                type: QueryTypes.SELECT,
                bind: {
                    authID
                }
            })

            return users.length === 1 ? users[0] : users
        } catch (error) {
            console.log(error)
            return []
        }
    }

    static getVideos = async (userIdentify, limit, offset, authID = 0) => {
        try {
            let query = `
                SELECT
                    users.*,
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
                    ) AS likes,
                    (SELECT COUNT(*) FROM followings WHERE followings.user_id = ${authID} AND followings.following_id = users.id) AS is_following,
                    videos.id AS video_id,
                    videos.filename,
                    videos.duration,
                    videos.description AS video_description,
                    videos.allow_comment,
                    videos.post_date,
                    videos.status AS video_status,
                    (SELECT COUNT(*) FROM video_likes WHERE video_likes.video_id = videos.id) AS video_likes,
                    (SELECT COUNT(*) FROM comments WHERE comments.video_id = videos.id) AS comments
                FROM users
                LEFT JOIN videos ON users.id = videos.user_id
            `
    
            const type = typeof userIdentify
            let whereClauses = ''
    
            switch (type) {
                case 'number': {
                    whereClauses = `WHERE users.id = ${userIdentify}`;
                    break
                }
                case 'string': {
                    whereClauses = `WHERE users.nickname = '${userIdentify}'`;
                    break
                }
                default:
                    return []
            }
    
            query += `
                ${whereClauses}
                ORDER BY videos.post_date DESC
                LIMIT ${limit} OFFSET ${offset}
            `
    
            const results = await sequelize.query(query, {
                type: QueryTypes.SELECT
            })
            let videos = []
    
            if (results.length > 0) {
                videos = results.map(record => ({
                    user: {
                        id: record.id,
                        nickname: record.nickname,
                        name: record.name,
                        description: record.description,
                        avatar: record.avatar,
                        verified: record.verified,
                        status: record.status,
                        following: record.following,
                        followers: record.followers,
                        likes: record.likes,
                        is_following: record.is_following
                    },
                    video: record.video_id ? {
                        id: record.video_id,
                        filename: record.filename,
                        duration: record.duration,
                        description: record.video_description,
                        allow_comments: record.allow_comments,
                        post_date: record.post_date,
                        status: record.video_status,
                        likes: record.video_likes,
                        comments: record.comments
                    } : null
                }))
            }
    
            return videos
        } catch (error) {
            console.log(error)
            return []
        }
    }
}

User.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    nickname: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(200)
    },
    avatar: {
        type: DataTypes.STRING(500),
        defaultValue: 'default-avatar.png'
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1
    },
    remember_token: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    timestamps: false,
    sequelize,
    modelName: 'users'
})

export default User