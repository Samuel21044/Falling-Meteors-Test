/*so basically for the pause
I have a list that contains 1 and 2. 1 represents if its paused and 2 represents if its off. 
Then if 1 AND 2 are both in the list, meaning 

So heres whats gonna happen

If list contains nothing
Then PAUSED = true; and
add 1 to the list

If list contains 1
Then PAUSED = false and
add 2 to the list so now its [1, 2]

If list contains 1 and 2
Then PAUSED = true and
list set to have nothing

Ex-
let list = [];

keyDown---

if(list === []) {
  paused = true;
  list + 1;
}

if() 

So when it releases it creates a variable true
*/
export default class keyboard {
  constructor (player, game) {

    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        //movement
        case 37:
            player.moveLeft();
          break;
        case 39:
            player.moveRight();
          break;
        case 65:
            player.moveLeft();
          break;
        case 68:
            player.moveRight();
          break;
        //starting a new game
        case 13:
            if(game.gamestate === 1) {
              game.Score = 0;
              game.gamestate = 2;
            }
          break;
        case 27:
            //do something
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
            if(player.speed < 0) player.stop();
          break;
        case 39:
            if(player.speed > 0) player.stop();
          break;
        case 65:
            if(player.speed < 0) player.stop();
          break;
        case 68:
            if(player.speed > 0) player.stop();
          break;
      }
    });
  }
}