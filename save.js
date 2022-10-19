export function saveScore(game) {
  game.highScore = game.Score;
  localStorage.setItem('savedScoreFSTest', JSON.stringify(game.Score));
}
