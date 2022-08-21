// Lib
import bodyParser from 'body-parser'

const config = app => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
}

export default config