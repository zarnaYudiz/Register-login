const User = require('../../../models/user');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const middleware = {};


middleware.authenticateToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (authHeader == null) {
        return res.status(401)
    }
    let result = _.verifyToken(authHeader)
    let userName = result.userName
    
    const user = await User.findOne({ userName: userName })
    if (!user) return res.reply(messages.no_prefix('Please try again!!!'))
    req.user = user
    next()
}

module.exports = middleware;