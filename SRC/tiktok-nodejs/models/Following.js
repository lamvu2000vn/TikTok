// Lib
import { DataTypes, Model } from 'sequelize'
// Sequelize
import { sequelize } from '../util'
// Model
import User from './User'

class Following extends Model {

}

Following.init({
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
    following_id: {
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
    modelName: 'followings'
})

export default Following