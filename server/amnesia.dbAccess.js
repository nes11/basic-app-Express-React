const MongoClient = require('mongodb').MongoClient;

module.exports.getAllGames = async() => {
  const url = 'mongodb://heroku_d2rlhbww:1fppph4v0po64ep8k6h1r407pl@ds111066.mlab.com:11066/heroku_d2rlhbww';
  try {
    const client = await MongoClient.connect(url);
    const collection = await client.db().collection('amnesia-games');
    const allGames = await collection.find({}).toArray();
    client.close();
    return allGames;
  } catch(error) {
    console.log(error);
  }
};

module.exports.getGame = async(gameId) => {
  const url = 'mongodb://heroku_d2rlhbww:1fppph4v0po64ep8k6h1r407pl@ds111066.mlab.com:11066/heroku_d2rlhbww';
  try {
    const client = await MongoClient.connect(url);
    const collection = await client.db().collection('amnesia-games');
    const [game] = await collection.find({ gameId: gameId}).toArray();
    client.close();
    return await game;
  } catch(error) {
    console.log(error);
  }
};

module.exports.saveGame = async(newGame) => {
  const url = 'mongodb://heroku_d2rlhbww:1fppph4v0po64ep8k6h1r407pl@ds111066.mlab.com:11066/heroku_d2rlhbww';
  try {
    const client = await MongoClient.connect(url);
    const collection = await client.db().collection('amnesia-games');
    const [savedGame] = (await collection.insertOne(newGame)).ops;
    client.close();
    return savedGame;
  } catch(error) {
    console.log(error);
  }
};

module.exports.updateGame = async(gameId, update) => {
  const url = 'mongodb://heroku_d2rlhbww:1fppph4v0po64ep8k6h1r407pl@ds111066.mlab.com:11066/heroku_d2rlhbww';
  try {
    const client = await MongoClient.connect(url);
    const collection = await client.db().collection('amnesia-games');
    await collection.updateOne({ gameId: gameId }, { $set: update });
    client.close();
  } catch(error) {
    console.log(error);
  }
};

module.exports.deleteGame = async(gameId) => {
  const url = 'mongodb://heroku_d2rlhbww:1fppph4v0po64ep8k6h1r407pl@ds111066.mlab.com:11066/heroku_d2rlhbww';
  try {
    const client = await MongoClient.connect(url);
    const collection = await client.db().collection('amnesia-games');
    await collection.deleteOne({gameId: gameId});
    client.close();
  } catch(error) {
    console.log(error);
  }
};

module.exports.deleteAll = async() => {
  const url = 'mongodb://heroku_d2rlhbww:1fppph4v0po64ep8k6h1r407pl@ds111066.mlab.com:11066/heroku_d2rlhbww';
  try {
    const client = await MongoClient.connect(url);
    const collection = await client.db().collection('amnesia-games');
    await collection.remove({});
    client.close();
  } catch(error) {
    console.log(error);
  }
};
