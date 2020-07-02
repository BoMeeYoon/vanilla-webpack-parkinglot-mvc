const log = console.log;

export default {
    
    
    verify(option, data) {
        
        const patterns = {
            mobile : `^010-?([0-9]{4})-?([0-9]{4})$`,
            carNumber : `^([0-9]{2}|[0-9]{3})[가-힣]{1}[0-9]{4}$`,
            name : `^([가-힣a-zA-Z]){2,10}$`
        }

        const check = new RegExp(patterns[option]);

        return check.test(data)

    }
}