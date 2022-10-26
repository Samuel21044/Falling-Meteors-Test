/**
I need to find out how to store items in a list so that I can use one single file 
I need to add items into the shop
Add something that keeps track of the score in the top corner of smth
Fix point problem



For meteors decrease the width and height by a certain amount and draw the image in the center using  ---> this.x + this.w / 2
And in drawing the image itself I manually add some stuff to have the collision smaller but the width and height the same
I also do this with the rocket bc it is too big

//important
|||||||||||

//asteroids
Have two astreoids to have both of them in the screen
Fix collision for asteroids and spaceship

Create an image for the spaceship
 */


//importing stuff
import player from './player.js';
import keyboard from './keyInput.js';
import fallingBlocks from './fallingBlocks.js';
import Button from './button.js';
import Shop from './shop.js';

//scenes
import { mainBackground } from './scene.js';

//save file
import { saveScore, savePoints } from './save.js';

//game scenes
const GAMESTAE = {
  MENU: 1,
  RUNNING: 2,
  SHOP: 3,
  HOW: 4,
  ABOUT: 5,
};

export default class Game {
  constructor() {
    this.gamestate = GAMESTAE.MENU;
    this.paused = 0;
    this.gameOver = false;

    //blocks
    this.newBlock = true;
    this.meteors = new fallingBlocks();
    this.meteorsL = [];
    this.meteorsOnFireL = [];

    //other stuff
    this.Player = new player(500, 545);

    this.Keyboard = new keyboard(this.Player, this);
    new keyboard(this.Player, this);

    //score
    this.timerScore = 100;
    this.Score = 0;
    this.highScore = 0;

    //points
    this.timerTillPoints = 600;
    this.pointsScored = 0;
    this.totalPoints = 0;

    //buttons 
    this.shop = new Button(this, 250, 430, 250, 45, 'Shop', 7);
    this.goBack = new Button(this, 275, 50, 200, 35, 'Back to Menu');
    this.how = new Button(this, 170, 215, 60, 150, 'How', 5);
    this.about = new Button(this, 530, 215, 60, 150, 'About', 5);
    this.goBack2 = new Button(this, 275, 520, 200, 35, 'Back to Menu');
    this.goBack3 = new Button(this, 275, 580, 200, 35, 'Back to Menu');
    //shop buttons
    this.shopB1 = new Button(this, 63.75, 140, 165, 35, 'Character', 4);
    this.shopB2 = new Button(this, 292.5, 140, 165, 35, 'Stars', 4);
    this.shopB3 = new Button(this, 521.25, 140, 165, 35, 'Perks', 4);

    //items for shop
    this.shopItems = [

    ];
  }

  update(deltaTime) {
    switch(this.gamestate) {
      case 1:
          //player
          this.Player.update(deltaTime); 
          //buttons
          this.shop.shopUpdate();
          this.how.howUpdate();
          this.about.aboutUpdate();
        break;
      case 2:
          //pause
          if(this.paused === 2 || this.paused === 1 || this.gameOver) {
            return;
          }

          //give a random output
          let shoot = Math.round(Math.random() * 6);
          if(shoot === 1) {
            //how fast the meteors shoot out per second
            this.meteorsL.push(new fallingBlocks(Math.round(Math.random() * (750 - this.meteors.w - 1) + 1), -50, 25, 25, 1));
          }

          //having the bullet things update
          for (let i = 0; i < this.meteorsL.length; i++) {
            this.meteorsL[i].moveDown();
            this.meteorsL[i].update(deltaTime, this.meteorsL, this.Player, this);
          }

          //add a score based on a timer
          this.timerScore--;
          if(this.timerScore <= 0) {
            this.Score++;
            this.timerScore = 100;
          }

          //point timer
          this.timerTillPoints--;
          if(this.timerTillPoints <= 0) {
            this.pointsScored++;
            this.timerTillPoints = 600;
          }

          //updating other objects n stuff
          this.Player.update(deltaTime);
        break;
      case 3:
          //buttons
          this.shopB1.shop1Update(); 
          this.shopB2.shop2Update();
          this.shopB3.shop3Update(); 
          this.goBack.goBackUpdate(); 

          //items
          for(let i = 0; i < this.shopItems.length; i++) {
            this.shopItems[i].update();
          }
        break;
      case 4:
          this.goBack2.goBackUpdate();
        break;
      case 5:
          this.goBack3.goBackUpdate();
        break;
    }
  }
  draw(ctx) {
    switch(this.gamestate) {
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

          this.Player.draw(ctx);
          this.shop.draw(ctx);
          this.how.draw(ctx);
          this.about.draw(ctx);
        break;
      case 2:
          mainBackground(ctx);

          this.Player.draw(ctx);
          for (let i = 0; i < this.meteorsL.length; i++) {
            this.meteorsL[i].draw(ctx);
          }

          //pause
          if(this.paused === 2 || this.paused === 1) {
            if(!this.gameOver) {
              ctx.fillStyle = 'rgb(20, 20, 20, 0.5)';
              ctx.fillRect(0, 0, 750, 640);
              //text
              ctx.fillStyle = 'rgb(250, 250, 250)';
              ctx.font = '50px Arial';
              //ctx.textAlign = 'center';
              ctx.fillText('Game Paused', 375, 100);
              ctx.font = '25px Arial'; ctx.fillStyle = 'rgb(240, 240, 240)';
              ctx.fillText('Click Esc to Unpause', 375, 140);
            }
          }
          //pause and unpause the screen
          if(this.paused >= 3) {
            this.paused = 0;
          }

          //game over
          if(this.gameOver) {
            ctx.fillStyle = 'rgb(250, 250, 250)';
            ctx.font = '50px Arial';
            ctx.fillText('Game Over', 375, 100);
          }
        break;
      case 3:
          //buttons
          this.shopB1.draw(ctx); this.shopB2.draw(ctx); this.shopB3.draw(ctx); this.goBack.draw(ctx);

          //items
          for(let i = 0; i < this.shopItems.length; i++) {
            this.shopItems[i].draw(ctx);
          }

          //points
          ctx.fillStyle = 'orange';
          ctx.font = '22px Arial';
          ctx.textAlign = 'left';
          ctx.fillText('Points Scored: ' + this.pointsScored,35, 60);
          ctx.fillText('Total Points: ' + this.totalPoints, 35, 100);
        break;
      case 4:
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.font = '40px Arial';

          //about game
          ctx.fillText('About Game', 375, 100);
          ctx.font = '25px Arial';
          ctx.fillText('You controll a spaceship dogging astreoids', 375, 180);
          ctx.fillText('Survive as long as you can', 375, 220);
          ctx.fillText('Earn points to buy items from the shop', 375, 260);
          //controls
          ctx.font = '40px Arial';
          ctx.fillText('Controls', 375, 360);
          ctx.font = '25px Arial';
          ctx.fillText('Use WASD or arrow keys to move spaceship left or right', 375, 440);
          ctx.fillText('Press Esc to pause and unpause game', 375, 480);
          this.goBack2.draw(ctx);
        break;
      case 5:
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        //creators
        ctx.font = '40px Arial';
        ctx.fillText('---Created By---', 375, 100);

        //logo drawing
        ctx.font = '30px Arial';
        ctx.fillText('Idiot', 300, 180);
        ctx.fillText('Studios', 300, 215);
        //box line
        ctx.fillRect(370, 160, 110, 4);
        //box
        ctx.fillStyle = 'black';
        ctx.fillRect(410, 180, 70, 40);
        ctx.fillStyle = 'white';
        ctx.fillRect(414, 184, 62, 32);


        //people in the company
        ctx.font = '40px Arial';
        ctx.fillText('Creators', 375, 300);
        ctx.font = '20px Arial';
        ctx.fillText('Rodrigo-Owner/Programmer    Junior-Ideas    Brody-Animator    Jack-Animator', 375, 360);

        //concerns
        ctx.font = '40px Arial';
        ctx.fillText('Concerns', 375, 460);
        ctx.font = '25px Arial';
        ctx.fillText('If game lags consider refreshing', 375, 500);
        ctx.fillText('If you delete all your files there is a chance',375, 530);
        ctx.fillText('you may loose all data on game', 375,560);

        this.goBack3.draw(ctx);
        break;
    }
  }
}