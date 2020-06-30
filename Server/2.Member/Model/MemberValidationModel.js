const log = console.log
const tag = '[MemberValidationModel.js]'

const MemberQuery = require('./MemberQueryModel.js')

class MemberValidationModel {
    constructor() {
        this.MemberQuery = new MemberQuery()
    }
}


MemberValidationModel.prototype.checkCarNumberHistory = async function (memberData) {
    const query = this.MemberQuery
    const carNumber = memberData.getCarNumber()
    
    let result = await query.getMember(carNumber)
   
    return result.length > 0 ? this.checkExpireDate(result) : result = 1

    
}

MemberValidationModel.prototype.checkExpireDate = function(resultData) {
    
    const today = new Date()
    const _today = `${today.getFullYear()}` + `${this.getDate(today.getMonth()+1)}` + `${this.getDate(today.getDate())}` 
    
    let result
    
    resultData.filter(info => {
        const expireDate = info.expireDate
        const _expireDate = expireDate.replace(/-/gi, "")
        
        //false '만료일 남았음 가입 못 함'
        return Number(_expireDate) >= Number(_today) ? result = -2 : result = 1
    })
    
    return result
}

MemberValidationModel.prototype.getDate = function(date) {
    return date < 10 ? '0'+date : date
}

module.exports = MemberValidationModel