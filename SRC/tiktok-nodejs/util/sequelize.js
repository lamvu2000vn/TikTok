// Lib
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('tiktok', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize