const log = console.log
const tag = '[MemberQueryModel.js]'

const DBHandler = require('../../1.Common/Model/DBHandler.js')

class MemberQueryModel {
    constructor() {
        this.DB = new DBHandler()
    }
}

MemberQueryModel.prototype.getMember = async function (carNumber) {
    const db = this.DB
    const query = `SELECT * FROM member WHERE carNumber = ?`
    const params = [carNumber]

    let queryResult = ''

    try {
        queryResult = await db.sendData(query, params)
    }
    catch {
        return -1
    }
    
    return queryResult

}

MemberQueryModel.prototype.postMember = async function (userData) {
    
    const db = this.DB
    const {carNumber, name, mobile, startDate, expireDate} = userData
    const query = `INSERT INTO member (carNumber, name, mobile, startDate, expireDate) VALUES (?, ?, ?, ?, ?) `
    const params = [carNumber, name, mobile, startDate, expireDate]

    let queryResult = ''

    try {
        queryResult = await db.sendData(query, params)
    }
    catch {
        return -1
    }
    return queryResult.insertId > 0 ? 1 : new Error('postMember error - memberQueryModel.js')
}

MemberQueryModel.prototype.getSearchData = async function (inputData) {

    const db = this.DB
    const name = Object.keys(inputData)[0]
    const value = Object.values(inputData)[0]

    const query = `SELECT * FROM member WHERE ${name} LIKE ?`
    const params = [value]

    let queryResult = ''

        try {
            queryResult = await db.sendData(query, params)
            
        }
        catch {
            return -1
        }
        
        return queryResult
}

MemberQueryModel.prototype.updateMember = async function (memberData) {
    const db = this.DB
    const { carNumber, name, mobile, startDate, expireDate } = memberData[0]
    const query = `UPDATE member SET name=?, mobile=?, startDate=?, expireDate=? WHERE carNumber =?`
    const params = [name, mobile, startDate, expireDate, carNumber]
    let queryResult = ''
    try {
        
        queryResult = await db.sendData(query, params)
    }
    catch {
        return -1
    }
    
    
    return queryResult.changedRows > 0 ? 1 : new Error('memberModel updatemember 오류발생')
}

MemberQueryModel.prototype.deleteMember = async function (carNumber) {
    const db = this.DB
    const query = `DELETE from member where carNumber = ?`
    
    let queryResult = ''

    try {
        queryResult = await db.sendData(query, carNumber.carNumber)
        log(queryResult)
    }
    catch {
        return -1
    }
    
    return queryResult.affectedRows > 0 ? 1 : new Error('memberModel delete 오류발생')
}




module.exports = MemberQueryModel