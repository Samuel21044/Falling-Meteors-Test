export function saveScore(game) {
  game.highScore = game.Score;
  localStorage.setItem('savedScoreFMTest', JSON.stringify(game.Score));
}

export function savePoints(game) {
  
}