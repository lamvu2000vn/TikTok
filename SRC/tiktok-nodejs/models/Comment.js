// Lib
import { DataTypes, Model } from 'sequelize'
// Sequelize
import { sequelize } from '../util'

class Comment extends Model {

}

Comment.init({
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
    video_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(200)
    },
    post_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    sequelize,
    modelName: 'comments'
})

export default Comment