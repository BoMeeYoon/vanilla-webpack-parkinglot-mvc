const log = console.log
const tag = '[ParkingController.js]'

const ParkingQueryModel = require('../Model/ParkingQueryModel.js')
const ParkingValidationModel = require('../Model/ParkingValidationModel.js')
const ParkingRouter = require('../Routes/ParkingRouter.js')


class ParkingController {
    constructor() {
        this.Sql = new ParkingQueryModel()
        this.validation = new ParkingValidationModel()
    }
}

//입차 차량 등록
ParkingController.prototype.postUserData = async function (carNumber) {
    //carNumber = {carNumber : '12가1234'}
    log(carNumber, '17번째 줄')
    const checkMember = await this.validation.checkMember(carNumber)

    if(checkMember > 1) {
        const doubleCheck = await this.validation.checkInHistory(carNumber)

        switch(doubleCheck) {
            case 1 : return this.sql.addMemberUser(carNumber, checkMember)
            case -1 : return -3 //차량번호 중복 회원 차량임
            case -2 : return -4 //차량번호 중복 이미 입차처리된 손님 차량임
            
        }
        log(doubleCheck, '회원검사')
        return 
    } else {
        //비회원 중복검사
        const doubleCheck = await this.validation.checkInHistory(carNumber)
        log(doubleCheck,'1이면 adduser해야한다')
        switch(doubleCheck) {
            
            case -1 : return -3
            case -2 : return -4 //차량번호 중복 이미 입차처리된 손님차량
            default : return this.addUser(carNumber)
        }
        log(doubleCheck, '손님검사')
        return
    }
}

//출차 차량 조회 
ParkingController.prototype.getUserData = async function (carNumber) {
    log(carNumber)
    if(!carNumber) return
    
    let result = await this.Sql.getUserData(carNumber)
    log(result, 'result')
    return !result.length ? {result:-1} : result
            // Array.from(result).filter( info => !info.exitTime)

}

//입차 처리 과정에서 사용되는 메소드
ParkingController.prototype.addUser = async function (data) {
    log('이거가 되야하는데...')
    const result = await this.Sql.postUserData(data)
    
    return result.insertId >= 1 && await this.Sql.getUserData(data)
    
    
}

//정산 시 필요한 것 같은데... 
ParkingController.prototype.paidCarSet = async function (data, memberId) {
    const result = this.Sql.paidCarSet(data, memberId)
    log(result, memberId, 'PArkingController, paidcarset')
}

//멤버 차량 조회
ParkingController.prototype.getMemberData = async function (carNumber) {
    if(!carNumber) return 
    const result = await this.Sql.getMemberData(carNumber)
    return !result.length ? {result : -1} : result
}

//출차처리

ParkingController.prototype.putUserData = async function(data) {
    const result = await this.Sql.putUserData(data)
    log(result, tag)
    return result
}


module.exports = ParkingController