const log = console.log
const tag = '[ParkingRouter.js]'
const path = require('path')
const express = require('express')
const ParkingRouter = express.Router()


const ParkingController = require('../Controller/ParkingController.js')

const Controller = new ParkingController()
ParkingRouter.get('/main', (req, res) => {
    res.render(path.join(__dirname, '../../../Client/src/html/parking.html'))
})

ParkingRouter.get('/?', (req, res) => {
    log(Object.keys(req.query)[0])
    
    Controller.getUserData(Object.keys(req.query)[0]).then(result => {
        log(result, tag)
        res.send({result})
    })
})

ParkingRouter.put('/', (req, res) => {
    
    log(req.body, '받기')
    Controller.putUserData(req.body).then(result => {
        log(result, tag)
        res.send({result})
    })
})

ParkingRouter.post('/', (req, res) => {
    //req.body = {carNumber : '12가1234'}
    log(req.body, 'req.body, 32번')
    Controller.postUserData(req.body).then(result => {
        log(result, tag)
        res.send({result})
    })
})


module.exports = ParkingRouter