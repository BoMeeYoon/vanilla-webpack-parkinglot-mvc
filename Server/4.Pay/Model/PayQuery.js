const DBHandler = require('../../1.Common/Model/DBHandler.js')
const e = require('express')

const log = console.log
const tag = '[PayQuery.js-moddel]'

class PayQueryModel {
    constructor () {
        this.db = new DBHandler()
    }
}

PayQueryModel.prototype.getUser = async function (carNumber) {
    const db = this.db
    
    const setZero = function (date) {
        return date < 10 ? date = `0${date}` : date = date
    }
    
    const now = new Date
    const yy = now.getFullYear()
    let mm = setZero(now.getMonth()+1)
    let dd = setZero(now.getDate())
    const today = `${yy}-${mm}-${dd}`
    
    const query = `select * from user where entryTime between '${today} 00:00:00' and '${today} 23:59:59' and carNumber like?`
    const params = ['___'+carNumber]
    let queryResult = ''
    try {
        queryResult = await db.sendData(query, params)
        if(!queryResult.length) {
            
            return {result : -1}
        } else {
            
            queryResult = queryResult.filter(el => el.exitTime === null)
            
            return queryResult.length > 0 ? queryResult : {result : -2}
           
        }
    }
    catch {
        log(queryResult)
        log(-1)
    }

}
PayQueryModel.prototype.updatePaid = async function (carNumber) {
    const db = this.db
    const query = `update user set paid = 1, exitTime = now() where carNumber = ?`
    const params = carNumber
    let queryResult = ''
    try {
        queryResult = await db.sendData(query, params) 
        log(queryResult.affectedRows, tag)
        return queryResult
    } catch {

    }
}

module.exports = PayQueryModel