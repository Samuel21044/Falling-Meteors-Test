/**
 I have an idea. So when an asteroid hits you, it creates a sound, then some red sparks come out of it. 
 Then after a set delay it brings you to the home screen. Without the death text. It will tell you your score, and how many points you have. 
 Then when you go to the shop it will still say how many coins you have in some corner. Then you can purchase things.
 */


//importing stuff
import player from './player.js';
import keyboard from './keyInput.js';
import fallingBlocks from './fallingBlocks.js';
import Button from './button.js';
import Shop from './shop.js';

//save file
import { saveScore } from './save.js';

//game scenes
const GAMESTAE = {
  PAUSED: 0,
  MENU: 1,
  RUNNING: 2,
  SHOP: 3,
};

export default class Game {
  constructor() {
    this.gamestate = GAMESTAE.SHOP;
    //blocks
    this.newBlock = true;
    this.FallingBlocks = new fallingBlocks();
    this.fallingBlocksL = [];

    //other stuff
    this.Player = new player(500, 545);

    this.Keyboard = new keyboard(this.Player, this);
    new keyboard(this.Player, this);

    //score
    this.timerScore = 100;
    this.Score = 0;
    this.highScore = 0;

    //points
    this.pointsScored = 0;
    this.totalPoints = 0;

    //buttons 
    this.shop = new Button(this, 250, 430, 250, 45, 'Shop', 7);
    this.goBack = new Button(this, 275, 50, 200, 35, 'Back to Menu');
    //shop buttons
    this.shopB1 = new Button(this, 63.75, 140, 165, 35, 'Character', 4);
    this.shopB2 = new Button(this, 292.5, 140, 165, 35, 'Stars', 4);
    this.shopB3 = new Button(this, 521.25, 140, 165, 35, 'Perks', 4);

    //items for shop
    this.shopItems = [

    ];
  }

  update(deltaTime, ctx) {
    switch(this.gamestate) {
      case 0:
        break;
      case 1:
          //displays the saved score of the player
          this.highScore = JSON.parse(localStorage.getItem('savedScoreFMTest'));

          if (this.Score > this.highScore) {
            //saves the score of the player
            saveScore(this);
          }

          //check if score is undefined
          if(this.highScore === null) {
            this.highScore = 0;
          }

          //scores and such
          ctx.fillStyle = 'orange';
          ctx.textAlign = 'center';
          //restart
          ctx.font = '50px Arial';
          ctx.fillText('Falling Meteors', 375, 200);
          ctx.font = '30px Arial';
          ctx.fillText('Press enter to play again', 375, 400);

          //score
          ctx.fillText('Score: ' + parseFloat(this.Score), 375, 280);
          ctx.fillText('High Score: ' + parseFloat(this.highScore), 375, 320);

          //player
          this.Player.update(deltaTime); this.Player.draw(ctx);

          //buttons
          this.shop.shopUpdate(); this.shop.draw(ctx);
        break;
      case 2:
          //give a random output
          let shoot = Math.round(Math.random() * 6);
          if (shoot === 1) {
            //how fast the bullets shoot out per second
            this.fallingBlocksL.push(new fallingBlocks(Math.round(Math.random() * (750 - this.FallingBlocks.w - 1) + 1), -50));
          }

          //having the bullet things update
          for (let i = 0; i < this.fallingBlocksL.length; i++) {
            this.fallingBlocksL[i].draw(ctx);
            this.fallingBlocksL[i].moveDown();
            this.fallingBlocksL[i].update(deltaTime, this.fallingBlocksL, this.Player, this);
          }
          
          //add a score based on a timer
          this.timerScore--;
          if(this.timerScore <= 0) {
            this.Score++;
            this.timerScore = 100;
          }

          //updating other objects n stuff
          this.Player.update(deltaTime); this.Player.draw(ctx);
        break;
      case 3:
          //buttons
          this.shopB1.shop1Update(); this.shopB1.draw(ctx);
          this.shopB2.shop2Update(); this.shopB2.draw(ctx);
          this.shopB3.shop3Update(); this.shopB3.draw(ctx);
          this.goBack.goBackUpdate(); this.goBack.draw(ctx);

          //items
          for(let i = 0; i < this.shopItems.length; i++) {
            this.shopItems[i].update();
            this.shopItems[i].draw(ctx);
          }

          //points
          ctx.fillStyle = 'orange';
          ctx.font = '22px Arial';
          ctx.textAlign = 'left';
          ctx.fillText('Points Scored: ' + this.pointsScored,35, 60);
          ctx.fillText('Total Points: ' + this.totalPoints, 35, 100);
        break;
    }
  }
}