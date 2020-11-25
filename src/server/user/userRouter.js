const express = require('express');
const router = express.Router();
const _ = require('lodash');
const httpStatus = require('../httpStatuses');
const userService = require('./userService');
const {registerScheme, loginScheme} = require('../validation/auth');
const {validate} = require('../validation/joi');
const {logIn, logout} = require('../auth');
const {guest, auth} = require('../middleware/auth');

router.post('/signup', guest, async function(req, res){
    const {email, username, password} = req.body;

    try {
        await validate(registerScheme, req.body);
        const user = await userService.getUserFromDB(email);
        const isUserExsists = !_.isEmpty(user);

        if(isUserExsists) {
           return res.status(httpStatus.badRequest).json({msg: 'Invalid email'});
        }

        const newUser = await userService.ceateUser(email, username, password);
        
        logIn(req, newUser.insertedId);

        res.status(httpStatus.ok).json({});
    } catch(err) {
        console.log('error in /signup: ', err);
        console.log('error msg: ', err.message);
        console.log('error status: ', err.status);
        res.sendStatus(httpStatus.badRequest);
    }
});

router.post('/login', guest, async function(req, res){
    const {email, password} = req.body;

    try {
        await validate(loginScheme, {email, password});
        const user = await userService.getUser(email, password);

        console.log('password: ', password);
        console.log('user[0].password ', user[0].password);

        if(_.isEmpty(user) || !(await userService.getMatchesPassword(password, user[0].password))) {
            req.sendStatus(httpStatus.unauthorized);
        }

        logIn(req, user[0]._id);

        res.status(httpStatus.ok).json({});
    } catch(err) {
        console.log('error in /login: ', err);
        res.sendStatus(httpStatus.badRequest);
    }
});

router.post('/logout', auth, async function(req, res){
    try {

        await logout(req, res);
        console.log('after logout... ')


        res.status(httpStatus.ok).json({});
    } catch(err) {
        console.log('error in /logout: ', err);
        res.sendStatus(httpStatus.badRequest);
    }
});


// router.post('/signup', async function(req, res){
//     const username = req.body.username;
//     const password = req.body.password;

//     try {
//         const user = await userService.getUserFromDB(username);
//         const isUserExsists = !_.isEmpty(user);

//         if(isUserExsists) {
//            return res.status(httpStatus.ok).json({});
//         }

//         await userService.ceateUser(username, password);

//         res.status(httpStatus.ok).json({});
//     } catch(err) {
//         console.log('error in /signup: ', err);
//         res.sendStatus(httpStatus.badRequest);
//     }
// })

// router.post('/login', async function(req, res){
//     const {username, password} = req.body;

//     try {
        
//         const user = await userService.getUser(username, password);

//         if(_.isEmpty(user)) {
//             req.sendStatus(httpStatus.unauthorized);
//         }

//         const authToken = userService.generateAuthToken();
//         authTokens[authToken] = user;

//         res.cookie('AuthToken', authToken);

//         res.status(httpStatus.ok).json({});
//     } catch(err) {
//         console.log('error in /signup: ', err);
//         res.sendStatus(httpStatus.badRequest);
//     }
// })

module.exports = router;