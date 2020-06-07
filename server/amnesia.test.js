const expect = require('chai').expect;
const { randomise } = require('./amnesia.helpers');

const startData = [
  {
    "player": "Agnes",
    "character": "Hulk"
  },
  {
    "player": "Oliver",
    "character": "Thor"
  },
  {
    "player": "Alice",
    "character": "Wonderwoman"
  },
  {
    'player': "Catherine",
    "character": "Iron Man"
  }
];

describe('Generate a valid player/character array', () => {
  let result;
  before(() => {
    result = randomise(startData);
  });

  it('returns an array of the same length', () => {
    expect(result.length).to.equal(startData.length);
  });

  it('has same players as startData.playersInput', () => {
    const startPlayersArray = startData.map(obj => obj.player).sort();
    const randomisedPlayersArray = result.map(obj => obj.player).sort();
    const sameValues = startPlayersArray.every((curr, i) => curr === randomisedPlayersArray[i]); // write as array.every()

    expect(startPlayersArray.length).to.equal(randomisedPlayersArray.length);
    expect(sameValues).to.be.true;
  });

  it('players are not assigned character that they chose', () => {
    startData.forEach(startPlayer => {
      const foundPlayer = result.find(el => el.player === startPlayer.player);
      expect(foundPlayer.character).to.not.equal(startPlayer.character);
    });
  });

  it('every player gets a different character, no duplicates', () => {
    const startCharactersArray = startData.map(obj => obj.character).sort();
    const resultCharactersArray = result.map(obj => obj.character).sort();
    const sameValues = startCharactersArray.every((curr, i) => curr === resultCharactersArray[i], true);

    expect(startCharactersArray.length).to.equal(resultCharactersArray.length);
    expect(sameValues).to.be.true;
  });
});
