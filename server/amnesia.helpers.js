const {
  getAllGames, getGame,
  saveGame, updateGame,
  deleteGame, deleteAll,

} = require('./amnesia.dbAccess'); // const dbAccess = require('./amnesia.dbAccess');

module.exports.getAllGames = async() => {
  return await getAllGames();
};

module.exports.getGameId = () => {
  const randomUpTo9999 = Math.floor(Math.random() * 10000);
  return randomUpTo9999 < 1000 ? `0${randomUpTo9999}` : randomUpTo9999.toString();
};

module.exports.checkgameExists = async(gameId) => {
  return await getGame(gameId);
};

module.exports.createNewGame = async(gameId, numberOfPlayers) => {
  const newGame = {
    gameId: gameId,
    numberOfPlayers: numberOfPlayers,
    playersInput: []
  };
  return await saveGame(newGame);
};

module.exports.addPlayer = async(gameId, playerInput) => {
  const gameToUpdate = await getGame(gameId);
  const updatedPlayersInput = [...gameToUpdate.playersInput, playerInput];
  await updateGame(gameId, { playersInput: updatedPlayersInput});

  if (gameToUpdate.numberOfPlayers === updatedPlayersInput.length) {
    const game = await getGame(gameId);
    await finaliseGame(game);
  }
};

module.exports.getPlayerGameList = async(gameId, player) => {
  const game = await getGame(gameId);
  return game.gameList.filter(el => el.player !== player);
};

module.exports.deleteGame = async(gameId) => {
  await deleteGame(gameId);
};

module.exports.deleteAll = async() => {
  await deleteAll();
};

const finaliseGame = async(game) => {
  const gameList = module.exports.randomise(game.playersInput);
  await updateGame(game.gameId, { gameList: gameList });
};

module.exports.randomise = (playersInput) => {
  const randomFactor = (Math.floor(Math.random() * Math.floor(playersInput.length))) + 1;
  return playersInput.map((playerInput, i, arr) => {
    const assignedCharacterIndex = i + randomFactor < arr.length ? i + randomFactor : (i + randomFactor) - playersInput.length;
    return { player: playerInput.player, character: arr[assignedCharacterIndex].character};
  });
};
