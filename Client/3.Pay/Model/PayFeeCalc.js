
const log = console.log;
export default class PayFeeCalc {
    constructor() {
        this.userData;
        this.useState;
        this.hs;
        this.ms;
        return this;
    }
    
    setData(userData, useState) {
        this.userData = userData;
        this.useState = useState;
        return this;
    }
    
    getTimer = () => {
        const now = new Date();
        const entryTime = new Date(this.userData.entryTime);
        
        const timer = Math.floor( ((now.getTime()) - (entryTime.getTime()))/60000 );
        
        30 < timer <60 ? this.hs = 1 : this.hs = Math.floor(timer/60);
        this.ms = timer%60;
        
        return `${this.hs}시간 ${this.ms}분`;
    }
    getFee = () => {
        this.useState.setFee(this.hs*1000);
        const fee = (this.hs*1000).toLocaleString();
        return `${fee}원`;
    }
}