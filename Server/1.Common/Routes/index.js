const log = console.log
const tag = '[server-1.common-routes-index.js]'

const express = require('express')
const CommonRouter = express.Router()
const path = require("path");
const fs = require("fs");
const MemberRouter = require('../../2.Member/Routes/MemberRouter.js')
const ParkingRouter = require('../../3.Parking/Routes/ParkingRouter.js')
const PayRouter = require('../../4.Pay/Routes/PayRoutes.js')

CommonRouter.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../../Client/src/html/admin.html'))
})
CommonRouter.get('/favicon.ico', (req, res) => {
    res.send(path.join(__dirname, '../../../Client/src/imgs/favicon.png'))
})
CommonRouter.use('/member', MemberRouter)
CommonRouter.use('/parking', ParkingRouter)
CommonRouter.use('/pay', PayRouter)

module.exports = CommonRouter