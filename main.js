const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(y, x, percentage) {
    this.field = this.generateField(y, x, percentage);

    this.playerPosY = 0;
    this.playerPosX = 0;
    this.gameOn = true;
  }

  print() {
    
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(''));
    }
      console.log('\n');
  }

  generateField(y, x, percentage) {
    let playGround = [];
    percentage = percentage / 100;

    const oneOrTwo = () => {
    let randomValue = Math.random();
    if (randomValue < percentage) {
      return hole;
    } else {
        return fieldCharacter;
      }
    }

    for (let i = 0; i < y; i++) {
      playGround[i] = [];
      for (let j = 0; j < x; j++) {
        playGround[i][j] = oneOrTwo();
      }
    }

    playGround[0][0] = pathCharacter;

    let hatYPos, hatXPos;
    do {
      hatYPos = Math.floor(Math.random() * y);
      hatXPos = Math.floor(Math.random() * x);
    } while (hatYPos === 0 && hatXPos === 0);

    playGround[hatYPos][hatXPos] = hat;

      return playGround;
  }

  move(input) {
    let moveY = 0;
    let moveX = 0;

    switch (input) {
      case 'a':
        moveX--;
        break;
      case 'd':
        moveX++;
        break;
      case 'w':
        moveY--;
        break;
      case 's':
        moveY++;
        break;
      default:
        console.log('Invalid input\n');
        break;
      }
      return { moveY: moveY, moveX: moveX };
    }

  updateField(move) {

    let newMoveY = this.playerPosY + move.moveY;
    let newMoveX = this.playerPosX + move.moveX;

    if (newMoveY >= 0 && newMoveY < this.field.length && newMoveX >= 0 && newMoveX < this.field[0].length) {
      const newPosition = this.field[newMoveY][newMoveX];

      if (newPosition === hole) {
        console.log('You fell in a Hole! You lose!\n');
        this.gameOn = false;
      } else if (newPosition === hat) {
        console.log('You found the hat! You Win!\n');
        this.gameOn = false;
      }

      this.field[newMoveY][newMoveX] = pathCharacter;

      this.playerPosY = newMoveY;
      this.playerPosX = newMoveX;

      } else {
          console.log('You went out of the field. You Lose!\n');
          this.gameOn = false;
        }
  }

  game() {
    let input;

    this.print();

    while (this.gameOn) {
    input = prompt('Which way? (Up = W, Down = S, Left = A, Right = D || Quit = Q)');

    if (input === 'q') {
      this.gameOn = false;
    }

    let move = this.move(input);
    this.updateField(move);
    this.print();
    }

    console.log('Thanks for playing!');
  }
}

const myGame = new Field(10, 10, 30);
myGame.game();
