

export default class PayFeeCalc {
    constructor(userData) {
        this.userData = userData
    }
    getTimer() {
        const now = this.userData.getNow()
        const entryTime = new Date(this.userData.getEntryTime())
        
        const timer = Math.floor( ((now.getTime()) - (entryTime.getTime())) / 60000 )

        let hs;
        30 < timer < 60 ? hs = 1 : hs = Math.floor(timer/60)
        log(30 < timer < 60)
        const ms = timer%60

        this.userData.setHours(hs, ms)
        return this
    }
    getTime() {
        const hs = this.userData.getHs()
        const ms = this.userData.getMs()

        const time = `${hs}시간 ${ms}분`
        
        const fee = (hs*1000).toLocaleString()

        this.userData.setPayInfo(time, fee)

        return this
    }
}