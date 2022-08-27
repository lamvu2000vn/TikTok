// Model
import User from '../models/User'
import Video from '../models/Video'
import Comment from '../models/Comment'
import VideoLike from '../models/VideoLike'
import CommentLike from '../models/CommentLike'
import Reply from '../models/Reply'

const associations = () => {
    return new Promise((resolve, reject) => {
        try {
            User.hasMany(Video, {
                foreignKey: 'user_id'
            })
            Video.belongsTo(User, {
                foreignKey: 'user_id'
            })

            User.belongsToMany(Video, {
                through: Comment,
                foreignKey: 'user_id'
            })
            Video.belongsToMany(User, {
                through: Comment,
                foreignKey: 'video_id'
            })

            User.belongsToMany(Comment, {
                through: CommentLike,
                foreignKey: 'user_id'
            })
            Comment.belongsToMany(User, {
                through: CommentLike,
                foreignKey: 'comment_id'
            })

            User.belongsToMany(Comment, {
                through: Reply,
                foreignKey: 'user_id'
            })
            Comment.belongsToMany(User, {
                through: Reply,
                foreignKey: 'comment_id'
            })

            User.belongsToMany(Video, {
                through: VideoLike,
                foreignKey: 'user_id'
            })
            Video.belongsToMany(User, {
                through: VideoLike,
                foreignKey: 'video_id'
            })
    
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

export default associations