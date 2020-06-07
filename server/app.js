const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const {
  getGameId, checkgameExists,
  createNewGame, addPlayer,
  getAllGames, deleteGame, deleteAll,
  getPlayerGameList,
} = require('./amnesia.helpers');

const port = process.env.PORT || 1330;

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
  res.send('I got your back');
});

app.get('/amnesia/get-all', async(req, res) => {
  const allGames = await getAllGames();
  res.send(allGames);
});

app.post('/amnesia/init', async(req, res) => {
  const { numberOfPlayers } = req.body;
  const gameId = getGameId();
  await createNewGame(gameId, numberOfPlayers);
  res.send({ numberOfPlayers: numberOfPlayers, gameId: gameId});
});

app.post('/amnesia/setup', async (req, res) => {
  const { gameId, player, character } = req.body;
  const isValidGameId = await checkgameExists(gameId);
  if (!isValidGameId) {
    res.send('Error: game doesn\'t exist');
  }
  await addPlayer(gameId, {player, character});
  res.send(`Thank you ${player}`);
});

app.post('/amnesia/start', async(req, res) => {
  const { gameId, player } = req.body;
  const playerGameList = await getPlayerGameList(gameId, player);
  res.send(playerGameList);
});

app.delete('/amnesia/delete/:gameId', async(req, res) => {
  const {gameId} = req.params;
  await deleteGame(gameId);
  res.send(`Deleted game ${gameId}`);
});

app.delete('/amnesia/delete', async(req, res) => {
  await deleteAll();
  res.send('Deleted all games');
});



app.use(express.static('../client/build'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
