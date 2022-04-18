const stripe = require('stripe')('sk_test_51KnjUNSICPCBToGuE3vJpRWS2OCndMmmW2VeDbd1CZ6bdywqVmvgHaBbPy3m48NNH2PLuPFqzXhIsXgGdZlAmZsG00OdL5fIsM');
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../../config');
const mongoose = require('mongoose');
const { use } = require('..');

const controllers = {};

controllers.addUser = async (req, res) => {
    try {
        const body = _.pick(req.body, ['userName', 'emailId', 'password']);

        body.emailId = body.emailId.toLowerCase();

        const user = await User.findOne({ emailId: body.emailId });
        if (user) return res.reply(messages.already_exists('Email'));

        const userName = await User.findOne({ userName: body.userName });
        if (userName) return res.reply(messages.already_exists('userName'));

        body.password = _.encryptPassword(body.password);
        
        const result = await User.create(body);
        if (!result) return res.reply(messages.no_prefix('Please try again!!!'));
        return res.reply(messages.success('Registered'), { result });

    } catch (error) {
        console.log(error)
        res.reply(messages.server_error(), error);
    }
};

controllers.userLogin = async (req,res) => {
    try {
        const body = _.pick(req.body, ['userName', 'password']);
        let sToken = [];
        let userName = body.userName

        const user = await User.findOne({userName, password:  _.encryptPassword(body.password)})
        if (user == null) return res.reply(messages.not_matched('Email and password'));
        
        const token = _.encodeToken({userName: body.userName}, '60d');

        if (user.token) {
            if (user.token.length) {
                sToken = user.token.filter((ele) => _.verifyToken(ele) !== 'jwt expired');
            }
            sToken.push(token);
        } else {
            sToken = [token];
        }

        const updateUser = await User.updateOne({userName}, {token: sToken})
        if (!updateUser) return res.reply(messages.no_prefix('Please try again!!!'));
        return res.reply(messages.success('Login'), { user, token });

    } catch (error) {
        console.log(error)
        res.reply(messages.server_error(), error);
    }
}

controllers.logout = async (req, res) => {
    try {
        const updateQuery = {};
        const user = await User.findOne( { userName: req.user.userName } );
        const token = user.token.filter((ele) => ele !== req.header('Authorization'));    
        Object.assign(updateQuery, { token });
        const update = await User.updateOne(updateQuery);
        if (!update) return res.reply(messages.no_prefix('Please try again!!!'));
        return res.reply(messages.success('User logout'));
    } catch (error) {
        console.log(error);
        res.reply(messages.server_error(), error);
    }
};

controllers.stripePayment = async (req, res) => {
    const { purchase, totalAmount, shippingFee } = req.body;

    const calculateOrderAmount = () => {
        return totalAmount + shippingFee;
    };

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'usd',
    });

  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = controllers;