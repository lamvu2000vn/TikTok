// Lib
import { DataTypes, Model } from 'sequelize'
// Sequelize
import { sequelize } from '../util'

class CommentLike extends Model {

}

CommentLike.init({
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
    comment_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
}, {
    timestamps: false,
    sequelize,
    modelName: 'comment_likes'
})

export default CommentLike