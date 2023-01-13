const express = require('express')
const app = express()
let router = express.Router()
let homeController = require('../controller/homeController')

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/bands/details/:bandID', homeController.getDetailsPage)
    router.post('/create-new-band', homeController.createNewBands)
    router.post('/delete-band', homeController.deleteBand)
    router.get('/edit-bands/:bandId', homeController.getEditPage)
    router.post('/update-band', homeController.updateBands)

    return app.use('/', router)
}

module.exports = initWebRoute