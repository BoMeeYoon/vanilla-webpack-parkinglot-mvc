const log = console.log
const tag = '[MemberController.js]'

const MemberUseStateModel = require('../Model/MemberUseStateModel.js')
const MemberQueryModel = require('../Model/MemberQueryModel.js')
const MemberValidationModel = require('../Model/MemberValidationModel.js')
const MemberRouter = require('../Routes/MemberRouter.js')

class MemberController {
    
    constructor() {
        
        this.UseState = new MemberUseStateModel()
        this.Sql = new MemberQueryModel()
        this.Validation = new MemberValidationModel()
    }

}

MemberController.prototype.postMember = async function (memberData) {
   
    const validation = this.Validation
    const sql = this.Sql

    this.UseState.setMemberData(memberData[0])
    
    const _validation = await validation.checkCarNumberHistory(this.UseState)

    //-2 회원, 만료기간 남음
    //-1 회원기록 있음
    //1 가입가능

    return _validation < 0 ? _validation : await sql.postMember(this.UseState.getUserData())

}

MemberController.prototype.getSearch = async function (inputData) {
    if(!inputData) return 
    const sql = this.Sql
    
    const result = await sql.getSearchData(inputData)
    return !result.length ? {result:-1} : result
}

MemberController.prototype.updateMember = async function (memberData) {
    if(!memberData) return 
    return await this.Sql.updateMember(memberData)
}

MemberController.prototype.deleteMember = async function (carNumber) {
    
    if(!carNumber) return 
    const result = await this.Sql.deleteMember(carNumber)
    
    return result
}

module.exports = MemberController