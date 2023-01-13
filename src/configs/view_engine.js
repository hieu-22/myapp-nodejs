// configure (cau hinh, arrange, set up, ...)view engine
const express = require('express')
const app = express()

const configViewEngine = (app) => {
    app.use(express.static('./src/public'))
 // configure static files
    app.set('view engine', 'ejs')
    app.set('views', './src/views')
}

module.exports = configViewEngine