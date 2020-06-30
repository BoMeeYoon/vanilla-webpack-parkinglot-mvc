const log = console.log;
export default class MemberInputValidation {
    constructor() {
        this.memberData;
        this.inputData;
        this.patterns = {
            carNumber : `^([0-9]{2}|[0-9]{3})[가-힣]{1}[0-9]{4}$`,
            name: `^([가-힣a-zA-Z]){2,10}$`,
            mobile: `^010-?([0-9]{4})-?([0-9]{4})$`,
        };
        this.isValid = {
            carNumber : false,
            name : false,
            mobile : false,
            startDate : false,
            expireDate : false,
        };
        return this;
    }
    setInputData(inputData, memberData) {
        
        this.inputData = inputData;
        this.memberData = memberData;
        return this;

    }
    verify() {
        const name = Object.keys(this.inputData)[0];
        const value = Object.values(this.inputData)[0];
        

        switch (name) {

            case "startDate" : return { name : this._checkStartDate(name, value) };

            case "expireDate" : return { name : this._checkExpireDate(name, value) };

            default : return { name : this._check( name, value ) };

        }
    }
    isValidCounter() {
        let count = 0; 
        log(count)
        for (const value in this.isValid) {
            log(this.isValid[value])
            this.isValid[value] === true ? count++ : count;
            log(count)
        }

        if(count === 5) {
            this.isValid.carNumber = false;
            this.isValid.name = false;
            this.isValid.mobile = false;
            this.isValid.startDate = false;
            this.isValid.expireDate = false;
        }
        return count;
    }

    /* 시작일 검증
       시작일은 오늘 부터 선택 가능 */
    _checkStartDate(name, value) {

        const today = this._getDate(new Date());
        const start = this._getDate(new Date(value));
        
        const _result = Number(start) - Number(today) >= 0 ? true : false
        
        return this._setData(name, value, _result)
    
    }
    /* 만료일 검증
       시작일 이후 부터 선택 가능 */
    _checkExpireDate(name, value) {

        const _start = this.memberData.getStartDate().replace(/-/gi, '')

        if(!_start) alert('계약일을 먼저 선택하세요');
        const expire = this._getDate(new Date(value));

        const _result = Number(_start) - Number(expire) < 0 ? true : false

        return this._setData(name, value, _result)
    }
    /* 날짜 검증에 필요한 메소드 */
    _getDate(date) {

        const getDate = day => day < 10 ? '0' + day : day

        return date.getFullYear() + getDate(date.getMonth()+1) + getDate(date.getDate())
    }


    /* 이름, 연락처, 차량번호 검증 */
    _check(name, value) {
        console.log(name)
        const result = new RegExp(this.patterns[name])
        const _result = result.test(value);

        return this._setData(name, value, _result)
        
    }
    /* 검증결과 및 검증 된 데이터 memberData 에 저장 */
    _setData(name, value, _result) {
        
        if(_result === false) {
            this.isValid[name] = false
           
        } else {
            this.memberData.setData({name, value})
            this.isValid[name] = true
           
        }
        return _result
    }
    
}
