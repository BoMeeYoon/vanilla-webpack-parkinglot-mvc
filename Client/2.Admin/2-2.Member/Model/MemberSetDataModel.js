const log = console.log;

export default class MemberSetDataModel {
    constructor() {
        this.info = {
            carNumber : '',
            name : '',
            mobile : '',
            startDate : '',
            expireDate : '',
        };
    }
    getStartDate() {
        // log(this.info[startDate])
        log(this.info.startDate);
        return this.info.startDate;
    }

    getData() {
        log(this.info)
        return this.info;
    }

    setData( {name, value} ) {
        log(this.info[name] = value);
        log(name, value)
        return this.info[name] = value;
    }

    updateSetData( {carNumber, name, mobile, startDate, expireDate} ) {
        this.info = {
            carNumber,
            name,
            mobile,
            startDate,
            expireDate
        };
        log(this.info);
        return this;
    }
}