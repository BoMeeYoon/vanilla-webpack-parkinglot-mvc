export default class UserData {
    constructor() {
        this.carNumber
        this.entryTime
        this.paid 
        this.now = new Date()
        
        this.hs
        this.ms 

        this.time 
        this.fee 

    }
    setCarNumber(carNumber) {
        this.carNumber = carNumber
    }
    setEntryTime(entryTime) {
        this.entryTime = entryTime
    }
    setPaid(paid) {
        this.paid=paid
    }
    setPayInfo(time, fee) {
        this.time = time
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
        this.now = new Date()
        
        this.hs =''
        this.ms =''

        this.time ='' 
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
    getNow() {
        return this.now
    }
    getHs() {
        return this.hs
    }
    getMs() {
        return this.ms
    }
    
    
}