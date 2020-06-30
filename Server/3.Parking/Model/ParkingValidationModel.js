const log = console.log
const tag = '[ParkingValidationModel.js]'

const DBHandler = require('../../1.Common/Model/DBHandler.js')
const ParkingQuery = require('./ParkingQueryModel.js')

class ParkingValidationModel {
    constructor () {
        this.DB = new DBHandler()
        this.ParkingQuery = new ParkingQuery()
    }
}

//입차 기록 확인
ParkingValidationModel.prototype.checkInHistory = async function(data) {
    const queryResult = await this.ParkingQuery.getUserData(data)
    log(queryResult, 'queryResult', tag)

    if(queryResult.length > 0) {
        log('기록있음. 검증 필요')
        let result 
        log(result,'..............')
        Array.from(queryResult).forEach(res => {
            log(res, 'res=========')
            const {paid, exitTime, memberId} = res
            log(paid, 'paid')
            if(paid === 1 && exitTime === null) {
                
                //차량번호 중복 : 입차 처리 된 회원 차량임
                result = -1
                log(result, '차량번호 중복 : 입차 처리 된 회원 차량임')
            } else if (paid === 1 && exitTime !== null) {
                
                memberId === 1 ? result = 1 : result = memberId
                //정상 출차 된 차량임. 입차 가능                
                log(result, '정상 출차 된 차량임. 입차 가능')
            } else if (paid === 0 && exitTime === null) {
                
                result = -2
                //차량번호 중복 : 입차 처리 된 비회원 차량임.
                log(result, '차량번호 중복 : 입차 처리 된 비회원 차량임.')
    
            } else if (paid === 0 && exitTime !== null) {
                memberId === 1 ? result = 1 : result = memberId
                //시스템으로 출차시킨 차량임. 입차 가능
                log(result, '시스템으로 출차시킨 차량임. 입차 가능')
            }
        })
        return result
    } else {
        log('user 기록 없음. 입차 가능')
        return 1
    }
}

//회원 구분
ParkingValidationModel.prototype.checkMember = async function (data) {
    const queryResult = await this.ParkingQuery.getMemberData(data)
    log(queryResult, tag, '-1이면 손님')
    
    let result 
    return queryResult.length > 0 ? result = this.verifyDate(queryResult) : retult = -1
    
}

//계약기간 확인
ParkingValidationModel.prototype.verifyDate = async function (queryResult) {

    let result 
    const today = new Date()
    const _today = this.getDate(today)

    Array.from(queryResult).forEach( res => {
        const {startDate, expireDate, memberId} = res

        const start = startDate.replace(/-/gi, '')
        const expire = expireDate.replace(/-/gi, '')

        if(!(start <= _today && _today <= expire)) {
            log(-1, tag, '계약기간 불 일치 멤버-> 손님처리')
            return -1
        } else {
            log(memberId, '계약기간 중회원, paid = 1 처리')
            return memberId
        }
    })
    return
}

//계약기간에 사용 되는 메소스들
ParkingValidationModel.prototype.getDate = function (date) {

    const _date = date.getFullYear() + this.setDate(date.getMonth()+1) + this.setDate(date.getDate())

    return _date
}

ParkingValidationModel.prototype.setDate = function (date) {
    date = date < 10 ? '0' + date : date
    return date
}

module.exports = ParkingValidationModel