// Lib
import { DataTypes, Model } from 'sequelize'
// Sequelize
import { sequelize } from '../util'
// Model
import User from './User'

class Follower extends Model {

}

Follower.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    follower_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    timestamps: false,
    sequelize,
    modelName: 'followers'
})

export default Follower