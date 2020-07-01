const log = console.log;
// export default class Calc {
//     constructor() {
//         this.userData;
//     }
    
//     toPay(_money) {
//         const _fee = this.userData.getFee();
//         const _change = this._setMoney(_money) - this._setMoney(fee)
//         _change > 0 ? this.userData.setPaid(1) : this.userData.setPaid(0)
//         return _change;
//     }
//     _setMoney(_money) {
//         return _money = parseInt((_money.replay(/[^0-9]/g,"")), 10)
//     }
// }

function _setMoney(_money) {
    log(_money)
    log(typeof _money)
    if(!_money.indexOf(',')) return Number(_money)
    return _money = parseInt((_money.replay(/[^0-9]/g, "")), 10);
}

export function toPay(_money, fee) {
    const charge = _setMoney(_money) - _setMoney(fee);
    return charge
}

