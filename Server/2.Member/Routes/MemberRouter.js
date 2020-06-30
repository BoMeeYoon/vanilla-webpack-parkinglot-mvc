const log = console.log
const tag = '[MemberRouter.js]'
const path = require('path')
const express = require('express')
const MemberRouter = express.Router()


const MemberController = require('../Controller/MemberController.js')

const Controller = new MemberController()

MemberRouter.post('/', (req, res) => {
    Controller.postMember(req.body).then(result => res.send({result}))
})

MemberRouter.get('/?', (req, res) => {
    const _req = req.query
    
    !Object.keys(_req).length && res.render(path.join(__dirname, '../../../Client/src/html/admin.html'))

    Controller.getSearch(_req).then(result => res.send({result}))
})

MemberRouter.put('/', (req, res) => {
    Controller.updateMember(req.body).then(result => res.send({result}))
})

MemberRouter.delete('/', (req, res) => {
    Controller.deleteMember(req.body).then(result => res.send({result}))
})

module.exports = MemberRouter