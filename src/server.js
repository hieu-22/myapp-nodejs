const express = require('express') // import express module/library
const configViewEngine = require('./configs/view_engine')
const app = express() // create app
const initWebRoute = require('./routes/web.js')
const pool = require("./configs/connectDB")
require('dotenv').config({ path: './.env' })
const port = process.env.PORT

// set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// set up view engine
configViewEngine(app)

// init web route
initWebRoute(app)
app.listen(port, () => {
    console.log(`App are listening at http://localhost:${port}`)
})
