const { body } = require('express-validator')

const register = [
  body('userName').not().isEmpty(),
  body('emailId').isEmail(),
  body('password').not().isEmpty()
]

const login = [
  body('userName').not().isEmpty(),
  body('password').not().isEmpty()
]

module.exports = {
    register,
    login
}