const log = console.log
const tag = '[ParkingQueryModel.js]'

const DBHandler = require('../../1.Common/Model/DBHandler.js')

class ParkingQueryModel {
    constructor() {
        this.DB = new DBHandler()
    }
}

//회원차량등록
ParkingQueryModel.prototype.postMemberData = async function (data, memberId) {
    const db = this.DB
    const {carNumber} = data
    const query = `INSERT INTO user (carNumber, paid, exitTime, memberId) VALUES (?, ?, null, ?);`
    const params = [carNumber, 1, memberId]
    let queryResult = ''
    try {
        log('addMemberUser====회원을 user에 등록한다')
        queryResult = await db.sendData(query, params)
        log(queryResult.insertId, 'result.insertId')
        return queryResult.insertId > 1 && await this.sql.getUserData(data)
           
        }
        catch {

        }
}

//비회원차량등록
ParkingQueryModel.prototype.postUserData = async function (data) {
    const db = this.DB
    const {carNumber} = data
    const query = `INSERT INTO user (carNumber, paid, exitTime, memberId) VALUES (?, ?, null, ?);`
        const params = [carNumber, 0, 1]

        let queryResult = ''
    log('비히ㅗ원',carNumber)
        try {
            log('send 되는 거 맞나요....??', tag)
            queryResult = await db.sendData(query, params)
            log(queryResult, '너 왜 안나와.....?????', tag)
            return queryResult
        }
        catch {

        }
}

//회원 차량조회

ParkingQueryModel.prototype.getMemberData = async function (data) {
    const db = this.DB
    const carNumber = data.carNumber
    const query = `SELECT * FROM member WHERE carNumber=?`
    const params = [carNumber]
    let queryResult = ''

    try {
        log(carNumber, query, params, tag, '61 보내기 전')
        queryResult = await db.sendData(query, params)
        log(queryResult, 'queryResult', tag)

        queryResult.length > 0 ? queryResult : null
        
        log(queryResult.length, 'length', tag)
        log(carNumber, 'carNumber', tag)
    }
    catch {
        return -1
    }
    return queryResult
}

//비회원 차량 조회
ParkingQueryModel.prototype.getUserData = async function (data) {
    const db = this.DB
    let carNumber

    typeof data !== 'object' ? carNumber = data : carNumber = data.carNumber
    
    const query = `SELECT * FROM user WHERE carNumber=?`
    const params = [carNumber]
    let queryResult = ''

    try {
        log(carNumber, query, tag, carNumber, '85 보내기 전')
        queryResult = await db.sendData(query, params)
        log(queryResult, 'queryResult', tag)

        queryResult.length > 0 ? queryResult : null
        
        log(queryResult.length, 'length', tag)
        log(carNumber, 'carNumber', tag)
    }
    catch {
        return -1
    }
    return queryResult
}


//회원 혹은 정산 된 차량 등록
ParkingQueryModel.prototype.paidCarSet = async function (data, memberId) {
    const db = this.DB
    const {carNumber} = data
    const query = `UPDATE user SET paidCar=?, memberId=? WHERE carNumber=?`
    const params = [1, memberId, carNumber]
    let queryResult = ''
    try {
        log(params, 'params, paidCarSet')
        queryResult = await db.sendData(query, params)
        log(queryResult, 'Query, PaidCarSEt, ')
    }
    catch {
        return -1
    }
    log(queryResult, 'queryResult')
}

//출차 차량 처리
ParkingQueryModel.prototype.putUserData = async function ({carNumber, entryTime, userId}) {

        const db = this.DB
        const query = `UPDATE user SET exitTime=NOW() WHERE carNumber = ? and entryTime = ?`
        const params =[carNumber, entryTime]
        let queryResult;
        try {  
            queryResult = await db.sendData(query, params)
            queryResult.changedRows > 0 ? queryResult = await this.getExitTime(userId) : -1
            
        }
        catch {
            return -1
        }
        
        return queryResult
}
ParkingQueryModel.prototype.getExitTime = async function (userId) {
    const db = this.DB
    const query = `select exitTime from user where userId =?`
    const params = [userId]
    let queryResult;
    try {
        queryResult = await db.sendData(query, params);
        log(queryResult, 'getExitTime')
        return queryResult;
    }
    catch {
        return -1
    }

}


module.exports = ParkingQueryModel