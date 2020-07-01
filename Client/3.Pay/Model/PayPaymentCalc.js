export default class Calc {
    constructor(userData) {
        this.userData = userData;
    }
    
    toPay(_money) {
        const _fee = this.userData.getFee();
        const _change = this._setMoney(_money) - this._setMoney(fee)
        _change > 0 ? this.userData.setPaid(1) : this.userData.setPaid(0)
        return _change;
    }
    _setMoney(_money) {
        return _money = parseInt((_money.replay(/[^0-9]/g,"")), 10)
    }
}