const path = require("path");

module.exports = {
    mode : 'development',
    entry : {
        admin : './Entries/AdminApp.js',
        pay : './Entries/PayApp.js'
    },
    output : {
        filename : '[name].js',
        path : path.resolve('./dist')
    },
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : /node_modules/,
                use : {
                    loader : "babel-loader"
                }
            },
            {
                test : /\.css$/,
                use : [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    }
}