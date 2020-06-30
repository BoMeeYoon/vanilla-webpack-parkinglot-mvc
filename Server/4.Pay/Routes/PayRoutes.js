const log = console.log
const tag = '[PayRouter]'

const express = require('express')
const app = express()
const PayRouter = express.Router()
const path = require('path')

const PayController = require('../Controller/PayController.js')

PayRouter.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../../Client/src/html/pay.html'))
})

PayRouter.get('/out', (req, res) => {
    log(req.query.carNumber, tag)
    const query = new PayController() 
    query.getUser(req.query.carNumber).then(result => {
        log(result,tag)
        res.send({result})
    })
})

PayRouter.put('/out', (req, res) => {
    log(req.body)
    const query = new PayController()
    query.updatePaid(req.body.carNumber).then(result=> {
        log(result, tag)
        res.send({result})
    })
})

module.exports = PayRouter