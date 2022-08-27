// Lib
import { DataTypes, Model } from 'sequelize'
// Sequelize
import { sequelize } from '../util'

class VideoLike extends Model {

}

VideoLike.init({
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
}, {
    timestamps: false,
    sequelize,
    modelName: 'video_likes'
})

export default VideoLike