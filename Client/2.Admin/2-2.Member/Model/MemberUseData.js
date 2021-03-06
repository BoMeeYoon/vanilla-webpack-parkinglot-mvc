const log = console.log;

export default {

    data : [],
    
    list() {

        return Promise.resolve(this.data);
    },
    
    add(data=[]) {
    
        if(!this.data.length) return this.data = [data];
        if(this.data.some( info => info.memberId === data.memberId)) {
            this.delete(data.memberId);
        }
        this.data = [...this.data, data];
        return this
    },
    
    reset() {
        this.data = [];
        return this
    },
    
    delete(memberId) {
        this.data= this.data.filter( info => info.memberId !== memberId );
        return this
    }
}
