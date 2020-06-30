const log = console.log
const tag = '[ DBHandler.js]'
const mysql = require('mysql')

class DBHandler {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234567890',
            database: 'parkinglot',
            dateStrings: 'date', 
        })
    }

    connect() {
        this.connection.connect()
    }

    disconnect() {
        this.connection.end()
    }
    
    sendData(query, params='') {
        log(query, params, 'dbHandler, query, params')
        return new Promise( (resolve, reject) => {
            this.connection.query(
                query,
                params,
                (err, result) => {
                    log(result, '디비에 다녀온 값')
                    return err ? resolve(err) : resolve(result)
                }
            )
        })  
    }


}

module.exports = DBHandler