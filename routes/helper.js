const validator = require('express-validator')


const getErrorMessage = function(err) {
  console.log('err.name=', err.name, err.code)
  if (err.name === 'MongoServerError') {
    if (err.code === 11000) { //Duplicated
      return {
        code: err.code,
        errors: Object.keys(err.keyValue).reduce(function(errors, key) {
          errors[key] = 'is duplicated';
          return errors;
        }, {})
      }
    }
    return err
  }
  else if (err.name === 'ValidationError') {
    return {
      code: err.code,
      errmsg: err.name,
      errors: Object.keys(err.errors).reduce(function(errors, key) {
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    }
  }

  //Unknown error
  return {
    code: -1,
    errmsg: err.message
  }
}

module.exports = {
  validate: function(req, res, next) {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        data: {
          code: 10000022,
          errmsg: "ValidationError",
          errors: errors.array().reduce(function(errors, it) {
            errors[it.param] = it.msg;
            return errors;
          }, {})
        },
      })
    }
    next()
  },

  createRouter: function(callback) {
    return async function(req, res) {
      try {
        return res.json({
          success: true,
          data: await callback(req)
        })
      } 
      catch (e) {
        console.error(e)
        return res.status(501).json({
          success: false,
          data: getErrorMessage(e),
        })
      }
    }
  }
}