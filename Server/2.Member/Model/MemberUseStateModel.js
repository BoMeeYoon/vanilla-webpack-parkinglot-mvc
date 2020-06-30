const log = console.log
const tag = '[MemberUseStateModel.js]'

class MemberUseStateModel {
    constructor() {
        this.carNumber
        this.name 
        this.mobile
        this.startDate
        this.expireDate
    }
}

MemberUseStateModel.prototype.getCarNumber = function () {
    return this.carNumber
}

MemberUseStateModel.prototype.getName = function () {
    return this.name
}

MemberUseStateModel.prototype.getMobile = function () {
    return this.mobile
}

MemberUseStateModel.prototype.getStartDate = function () {
    return this.startDate
}

MemberUseStateModel.prototype.getExpireDate = function () {
    return this.expireDate
}

MemberUseStateModel.prototype.getUserData = function () {
    console.log('getuserdad(')
    return {
        carNumber : this.carNumber,
        name : this.name,
        mobile : this.mobile,
        startDate : this.startDate,
        expireDate : this.expireDate,
    }
}

MemberUseStateModel.prototype.setCarNumber = function (carNumber) {
    this.carNumber = carNumber
}

MemberUseStateModel.prototype.setName = function(name) {
    this.name = name
}

MemberUseStateModel.prototype.setStartDate = function(startDate) {
    this.startDate = startDate
}

MemberUseStateModel.prototype.setExpireDate = function (expireDate) {
    this.expireDate = expireDate
}

MemberUseStateModel.prototype.setMemberData = function(memberData) {
    console.log(memberData, 'memberusestatemodel')
    this.carNumber = memberData.carNumber
    this.name = memberData.name
    this.mobile = memberData.mobile
    this.startDate = memberData.startDate
    this.expireDate = memberData.expireDate
}


module.exports = MemberUseStateModel