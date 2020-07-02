const log = console.log;
export default class UserData {
    constructor() {
        this.carNumber
        this.entryTime
        this.paid 
        this.userId
        
        this.hs
        this.ms 

        this.fee 
    }
    setUserData(data) {
        
        this.carNumber = data.carNumber;
        this.entryTime = data.entryTime;
        this.paid = data.paid;
        this.userId = data.userId;
        
    }
    setFee(fee) {
        this.fee = fee
    }
    setHours(hs, ms) {
        this.hs = hs;
        this.ms = ms;
    }
    setReset() {
        this.carNumber =''
        this.entryTime =''
        this.paid =''
        
        this.hs =''
        this.ms =''

        this.fee ='' 
    }

    getCarNumber() {
        return this.carNumber
    }
    getEntryTime() {
        return this.entryTime
    }
    getTime() {
        return this.time
    }
    getFee() {
        return this.fee
    }
    getUserId() {
        return this.userId;
    }
    
    
}