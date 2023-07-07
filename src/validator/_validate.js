
const Ajv = require('ajv')
const ajv = new Ajv({
    // allErrors: true // 输出所有的错误（比较慢）
})


function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data)
    if (!valid) {
        console.log("ajv.errors[0]",ajv.errors[0])
        return ajv.errors[0]
    }
}

module.exports = validate
