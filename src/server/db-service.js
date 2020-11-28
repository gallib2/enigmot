const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'riddleApp';

async function findDocuments({ db, collectionName, query = {} }) {
  try {
    // Get the documents collection
    const collection = db.collection(collectionName);
    // Find some documents
    const docs = await collection.find(query).toArray();

    return docs;

  } catch (err) {
    console.log('error in find documnets, error: ', err);
  }
}

async function getDocumentOfCollection({ collectionName, query = {} }) {
  const mongoClient = await MongoClient.connect(url, { useUnifiedTopology: true });
  console.log('connected successfully to mongo server');

  const db = mongoClient.db(dbName);

  const docs = await findDocuments({ db, collectionName, query });
  mongoClient.close();

  return docs;
}


async function getAllDocumentOfCollection({ collectionName }) {
  return await getDocumentOfCollection({ collectionName });
}

async function getDocumentOfCollectionByQuery({ collectionName, query }) {
  return await getDocumentOfCollection({ collectionName, query });
}

async function createDocumentofCollection({ collectionName, data }) {
  const mongoClient = await MongoClient.connect(url, { useUnifiedTopology: true });
  console.log('connected successfully to mongo server from createDocumentOfCollection');

  const db = mongoClient.db(dbName);
  const collection = db.collection(collectionName);
  console.log('data is: ', data)
  const document = await collection.insertOne(data);
  mongoClient.close();

  return document;
}

async function updateDocumentofCollection({ collectionName, userId, paint, riddleId }) {
  const mongoClient = await MongoClient.connect(url, { useUnifiedTopology: true });
  console.log('connected successfully to mongo server from updateDocumentofCollection');

  const db = mongoClient.db(dbName);
  const collection = db.collection(collectionName);

  let query = { "_id": ObjectId(userId), riddles: { $elemMatch: { "riddleId": riddleId } } }
  let update = { "$set": { "riddles.$.paint": paint } }

  let document = await collection.updateOne(query, update)

  console.log('----------------- the dos is: ', document)
  if (!document.modifiedCount) {
    console.log('didnt updated...')
    query = { "_id": ObjectId(userId) }
    update = { "$push": { "riddles": {riddleId, paint} } }
    document = await collection.updateOne(query, update);

    if(!document.modifiedCount) {
      console.log('-------- new doc: ', document);
      console.log('------------- again... didnt updated.. ')
    }
  }


  mongoClient.close();

  return document;
}

// async function updateDocumentofCollection({collectionName, userId, paint, riddleId}) {
//   const mongoClient = await MongoClient.connect(url, { useUnifiedTopology: true });
//   console.log('connected successfully to mongo server from updateDocumentofCollection');

//   const db = mongoClient.db(dbName);
//   const collection = db.collection(collectionName);

//   const document = await collection.updateOne(
//     { "_id" : ObjectId(userId) }, 
//     { $set: { "riddles.$[paint]" : paint} },
//     {arrayFilters: [ { "riddleId": riddleId, "paint": {$exists: true} } ]},
//     {upsert: true}
//     );
//   // const document = await collection.updateOne(query, {$set: dataToSet});
//   mongoClient.close();

//   return document;
// }


module.exports = {
  getAllDocumentOfCollection,
  getDocumentOfCollectionByQuery,
  createDocumentofCollection,
  updateDocumentofCollection
}