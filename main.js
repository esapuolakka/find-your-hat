//const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
  constructor(y, x, percentage) {
    this.field = this.generateField(y, x, percentage);
  }

  print() {

    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(''));
    }
  }

  generateField(y, x, percentage) {

    let playGround = [];
    percentage = percentage / 100;

    // Random number generator for playGround chars
    const oneOrTwo = () => {

        let randomValue = Math.random();

        if (randomValue < percentage) {
            return hole;
        } else {
            return fieldCharacter;
        }
    }
    // Setting the playGround
    for (let i = 0; i < y; i++) {

        playGround[i] = [];

      for (let j = 0; j < x; j++) {

        playGround[i][j] = oneOrTwo();

        }
    }

    // Setting the player initial position
    playGround[0][0] = pathCharacter;


    // Setting the hat
    let hatYPos, hatXPos;

    do {
    hatYPos = Math.floor(Math.random() * y);
    hatXPos = Math.floor(Math.random() * x);
    } while (hatYPos === 0 && hatXPos === 0);
    
    playGround[hatYPos][hatXPos] = hat;
    
    // Printing the generated field
    for (let i = 0; i < playGround.length; i++) {
            console.log(playGround[i].join(''));
    }
  }

  move(input) {

    let moveY = 0;
    let moveX = 0;

    switch(input) {
      case 'l':
        moveX--;
        break;
      case 'r':
        moveX++;
        break;
      case 'u':
        moveY++;
        break;
      case 'd':
        moveY--;
        break;
      default:
        return console.log('invalid input');
        break;
    }
    return { moveY: moveY, moveX: moveX };
  }

  game() {
    let gameOn = true;
    let input;

    this.print();
    
    while(gameOn) {

      input = prompt('Which way? (Up = U, Down = D, Left = L, Right = R || Quit = Q)\n');

      if (input === 'q') {
        return 0;
      }
      this.move(input);

      this.field[playerPosY][playerPosX] = pathCharacter;
    }

  }
}

//Field.generateField(10,10,30);

const myGame = new Field;

myGame.print();