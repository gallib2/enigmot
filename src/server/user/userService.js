const crypto = require('crypto');
const { hash, compare } = require('bcryptjs');
const dbService = require('../db-service');
const {BCRYPT_WORK_FACTOR} = require('../config/auth');

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
    const user = _getUserFromDB(query);

    return user;
}

module.exports = {
    getUserFromDB,
    ceateUser,
    getUser,
    getMatchesPassword
}