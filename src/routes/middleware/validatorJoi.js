const { logger } = require("../../utils/logger")

module.exports = (schema) => {
    return async (req, res, next) =>{
        try {
            await schema.validateAsync(req.body)
            return next()
        } catch (error) {
            logger.warn(error)
            res.render('errorValidation', {error: error.message})
        }
    }
}