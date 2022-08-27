// Lib
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('tiktok_2', 'tiktok', null, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
})

export default sequelize