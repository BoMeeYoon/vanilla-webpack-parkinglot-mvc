const log = console.log;
// request( method, url, data )
import Ajax from "../../../1.Common/Model/Ajax.js";
// memberData 는 controller 에서 인자로 보내주기


export default {
    data: [],
    
    list () {
        log(this.data.length)
        log(this.data)
        if(!this.data.length) return -1;
        return Promise.resolve(this.data);
    },

    add(data=[]) {
        log(this.data)
        log(data)
        // data 형식은 객체여야 한다
        if(!this.data.length) return this.data = [data];

        if (this.data.some( info => info.caNumber === data.carNumber)) {
            this.delete(data.carNumber);
        };

        this.data = [this.data, data];
        log(this.data)
        return this;
        
    },

    reset() {
        log(this.data)
        this.data = [{
            carNumber,
            name,
            mobile,
            startDate,
            expireDate,
        }];
        log(this.data);
        return this;
    },

    delete(carNumber) {
        log(data)
        return this.data = this.data.filter( info => info.carNumber !== carNumber );
    
    }
}