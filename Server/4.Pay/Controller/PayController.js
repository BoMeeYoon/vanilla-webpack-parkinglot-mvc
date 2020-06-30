const log = console.log
const tag = '[Server ParkingPayController.js]'

const PayQueryModel = require('../Model/PayQuery.js')
const ParkingValidation = require('../../3.Parking/Model/ParkingValidationModel.js')

class PayController {
    constructor() {
        this.sql = new PayQueryModel()
        this.validation = new ParkingValidation()
    }

    async getUser(carNumber) {
        //뒷 4자리 받기
        if(!carNumber) return 
        const result = await this.sql.getUser(carNumber)
         
        if(!result.length) {
            
            switch(result.result) {
        
            case -1 : return {result : -1} // 차량번호 없음
            case -2 : return {result : -2} //이미 정산된 차량임
            
            }
        } else {
            
            return result
        }

    }
    async updatePaid(carNumber) {
        
        const result = await this.sql.updatePaid(carNumber)

        log(result, tag)
    }
}

module.exports = PayController