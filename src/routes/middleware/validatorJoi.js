const { logger } = require("../../utils/logger")

module.exports = (schema) => {
    return async (req, res, next) =>{
        try {
console.log(req.body)
            await schema.validateAsync(req.body)

            next()
        } catch (error) {
            logger.warn(error)
            res.render('errorValidation', {error: error.message})
        }
    }
}