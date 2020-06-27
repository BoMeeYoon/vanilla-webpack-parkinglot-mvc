module.exports = {
    presets : [
        ["@babel/preset-env", {
            targets : {
                chrome : "79",
                ie : "11"
            },
            useBuiltIns : 'usage',
            corejs : 3,
            shippedProposals : true,
        }]
    ]
}