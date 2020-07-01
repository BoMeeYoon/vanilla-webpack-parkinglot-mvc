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
        log(data)
        this.carNumber = data.carNumber;
        this.entryTime = data.entryTime;
        this.paid = data.paid;
        this.userId = data.userId;
        log(this.entryTime)
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
        log(this.entryTime)
        return this.entryTime
    }
    getTime() {
        return this.time
    }
    getFee() {
        return this.fee
    }
    getNow() {
        return this.now
    }
    getHs() {
        return this.hs
    }
    getMs() {
        return this.ms
    }
    getUserId() {
        return this.userId;
    }
    
    
}