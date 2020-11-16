const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'riddleApp';

async function findDocuments({db, collectionName, query={}}) {
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

async function getDocumentOfCollection({collectionName, query={}}) {
  const mongoClient = await MongoClient.connect(url, { useUnifiedTopology: true });
  console.log('connected successfully to mongo server');

  const db = mongoClient.db(dbName);

  const docs = await findDocuments({db, collectionName, query});
  mongoClient.close();

  return docs;
}

async function getAllDocumentOfCollection({collectionName}) {
  return await getDocumentOfCollection({collectionName});
}

async function getDocumentOfCollectionByQuery({collectionName, query}) {
  return await getDocumentOfCollection({collectionName, query});
}

// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
//     assert.strictEqual(null, err);
//     console.log('connected successfully to mongo server');

//     const db = client.db(dbName);

//     findDocuments(db, function() {
//       client.close();
//     })

//     // client.close();
// });




module.exports = {
  getAllDocumentOfCollection,
  getDocumentOfCollectionByQuery,
}