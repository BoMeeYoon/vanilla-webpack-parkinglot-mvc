const log = console.log;


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

