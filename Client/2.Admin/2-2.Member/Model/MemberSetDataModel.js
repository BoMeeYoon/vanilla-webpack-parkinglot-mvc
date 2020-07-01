const log = console.log;

export default class MemberSetDataModel {
    constructor() {
        this.info = {
            memberId : 0,
            carNumber : "",
            name : "",
            mobile : "",
            startDate : "",
            expireDate : "",
        };
    }
    getStartDate() {
        return this.info.startDate;
    }

    getData() {
        return this.info;
    }

    setData( {name, value} ) {
        return this.info[name] = value;
    }

    updateSetData( updateData ) {

        this.info = updateData;
        return this;
    }
}