const { hash, compare } = require('bcryptjs');
const _ = require('lodash');
const dbService = require('../db-service');
const {ObjectId} = require('mongodb');
const { BCRYPT_WORK_FACTOR } = require('../config/auth');

const userCollection = 'users';


async function _getUserFromDB(query) {
    try {
        const user = await dbService.getDocumentOfCollectionByQuery({
            collectionName: userCollection,
            query: query
        });

        return user;

    } catch (err) {
        console.log('error in getUserFromDB: ', err);
        throw err;
    }
}


async function getUserFromDB(email) {
    const query = { email: email };
    return await _getUserFromDB(query);

    // try {
    //     const user = await dbService.getDocumentOfCollectionByQuery({
    //         collectionName: userCollection,
    //         query: {user_name: userName}
    //     });

    //     return user;

    // } catch (err) {
    //     console.log('error in getUserFromDB: ', err);
    //     throw err;
    // }
}


// function _getHashedPassword(password) {
//     const sha256 = crypto.createHash('sha256');
//     const hash = sha256.update(password).digest('base64');
//     return hash;
// }

async function _getHashedPassword(password) {
    const hashPassword = await hash(password, BCRYPT_WORK_FACTOR);

    return hashPassword;
}

async function getMatchesPassword(password, dbPassword) {
    const isMatch = await compare(password, dbPassword);
    console.log('is passeord match: ', isMatch)
    return isMatch;
}

async function ceateUser(email, userName, password) {
    try {
        const hashPassword = await _getHashedPassword(password);
        const user = {
            email: email,
            user_name: userName,
            password: hashPassword
        }

        return await dbService.createDocumentofCollection({ collectionName: userCollection, data: user })

    } catch (err) {
        console.log('error in ceateUser: ', err);
        throw err;
    }
}

async function getUser(email) {
    const query = { email: email }
    // TODO G - await??
    const user = await _getUserFromDB(query);

    return user && user[0];
}

async function getUserRiddles(userId) {
    const query = {"_id" : ObjectId(userId)}
    const user = await _getUserFromDB(query);

    const isHaveRiddles = !_.isEmpty(user) && user[0] && !_.isEmpty(user[0].riddles);

    if(isHaveRiddles) return user[0].riddles;

    return [];
}


async function savePaint({userId, paint, riddleId}) {
    // // const query = {"_id" : ObjectId(userId), riddles: {riddleId: riddleId}};
    // // const query = { "_id" : ObjectId(userId) }
    // const query = {$or: [{ "_id" : ObjectId(userId), riddles: { $elemMatch: { "riddleId": riddleId } } },{ "_id" : ObjectId(userId) }]}
    // // const query = { "_id" : ObjectId(userId), riddles: { $elemMatch: { "riddleId": riddleId } } }
    // const dataToSet =  {$addToSet: { riddles: {paint, riddleId} } };
    // // const dataToSet = {riddles: [{paint, riddleId}]};


        //    const query = { "_id" : ObjectId(userId) };
        //     const ts = { $set: { riddles.$[elem].paint" : paint} }
        //     const fil = {
        //         arrayFilters: [ { "elem.riddleId": riddleId  } ]
        //     },
        //   {upsert: true}

    // const docs = await dbService.getDocumentOfCollectionByQuery({collectionName: userCollection,});
    // console.log('--------- docs: ', docs);

    const x = await dbService.updateDocumentofCollection({collectionName: userCollection, userId, paint, riddleId})

    // console.log('------- x: ', x);
}

// this function saves new paint every time.
// so we can add date and return the newer paint every time
// async function savePaint({userId, paint, riddleId}) {
//     // const query = {"_id" : ObjectId(userId), riddles: {riddleId: riddleId}};
//     const query = { "_id" : ObjectId(userId) }
//     // const query = { "_id" : ObjectId(userId), riddles: { $elemMatch: { "riddleId": riddleId } } }
//     const dataToSet =  {$addToSet: { riddles: {paint, riddleId} } };
//     // const dataToSet = {riddles: [{paint, riddleId}]};

//     const docs = await dbService.getDocumentOfCollectionByQuery({collectionName: userCollection, query});
//     console.log('--------- docs: ', docs);

//     const x = await dbService.updateDocumentofCollection({collectionName: userCollection, query, dataToSet})

//     // console.log('------- x: ', x);
// }

module.exports = {
    getUserFromDB,
    ceateUser,
    getUser,
    getMatchesPassword,
    getUserRiddles,
    savePaint
}