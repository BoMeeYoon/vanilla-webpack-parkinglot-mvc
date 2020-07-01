const log = console.log;
export default {
    send(method, url, data) {

        return new Promise ( res => {

            const ajax = new XMLHttpRequest();
            
            ajax.open(method, url);
            ajax.setRequestHeader('Content-type', 'application/json');
            ajax.send(data);

            ajax.addEventListener('load', (err, result) => {
                
                return err ? res(err) : res(result)
            });
        })
    },

    async request( method, url, data ) {
        data = JSON.stringify(data);
        
        const _data = await this.send(method, url, data);
        const response = JSON.parse(_data.target.response);
       
        return response.result;
    }

}