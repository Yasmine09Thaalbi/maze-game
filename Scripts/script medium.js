let interval = 120;
let rockeaten=false ;

//////*  FUNCTIONS *//////////
function startGame(game) {
  document.querySelector(".welcome").classList.add("cached");
  document.querySelector(".row").classList.remove("cached");
  startTimer(game);
  playSound.play();
}

function replayGame(){
  game = new Game(new Point(0, 1) ,new Point(7,6) , 120);
  document.querySelector(".win-result").classList.add("cached");
  document.querySelector(".lose-result").classList.add("cached");
  document.querySelector(".row").classList.remove("cached");
  clearInterval(interval);
  game.isWin = false;
  reDrawmMaze(game);
  drawPrices(game.prices);
  drawRocks(game.rocks);
  drawClocks(game.clocks);
  drawQuestions(game.questions);
  time=document.querySelector(".Timer");
  time.textContent='02:00' ;
  startTimer(game);
  playSound.currentTime = 0;
  playSound.play();
}

function startTimer(game) {
  interval = setInterval(() => {
    if (game.timer <= 0) {
      loseGame();
      clearInterval(interval);
    } else if (game.isWin) {
      winGame();
      clearInterval(interval);
    } else  {
      game.timer--;
      let minutes = Math.floor(game.timer / 60);
      let seconds = game.timer % 60;
      document.querySelector(".Timer").innerText = `${
        minutes < 10 ? 0 : ""
      }${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
    }
  }, 1000);
}

function loseGame (){
  playSound.pause();
  loseSound.play();

  game.isLose = true;
  document.querySelector(".welcome").classList.add("cached");
  document.querySelector(".row").classList.add("cached");
  document.querySelector(".lose-result").classList.remove("cached");

}

function winGame(){
  playSound.pause();
  winSound.play();

  document.querySelector(".win-result").classList.remove("cached");
  document.querySelector("#score").innerText = `Final Score: ${game.score}`;
  let minutes = Math.floor(game.timer / 60);
  let seconds = game.timer % 60;
  document.querySelector("#time").innerText = `Remaining Time: ${
  minutes < 10 ? 0 : ""
  }${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
  document.querySelector(".welcome").classList.add("cached");
  document.querySelector(".row").classList.add("cached");
  

}


///////*  CLASSES */////////

class Cell {
    constructor(topWall, rightWall, bottomWall, leftWall) {
      this.topWall = topWall;
      this.rightWall = rightWall;
      this.bottomWall = bottomWall;
      this.leftWall = leftWall;
    }
}
  
class Point {
    constructor(i, j) {
      this.i = i;
      this.j = j;
    }
  
    moveUp() {
      if (this.i >= 1 && game.maze[this.i][this.j].topWall == false) {
        this.i -= 1;
        game.distance++;
      }
    }
  
    moveLeft() {
      if (this.j >= 1 && game.maze[this.i][this.j].leftWall == false) {
        this.j -= 1;
        game.distance++;
      }
    }
  
    moveDown() {
      if (this.i <= 6 && game.maze[this.i][this.j].bottomWall == false) {
        this.i += 1;
        game.distance++;
      }
    }
  
    moveRight() {
      if (this.j <= 6 && game.maze[this.i][this.j].rightWall == false) {
        this.j += 1;
        game.distance++;
      }
    }
    
  eat(items) {
    for (let item of items) {
      if (this.i === item.i && this.j === item.j && item.isEaten == false) {
        item.isEaten = true;
        
        if(item.isRock)
        {
          rockeaten=true;
        }
        else{
          if (item.isClock) {
            game.timer += 5; 
          }
        }
      }
    }
  }
}
class Item extends Point {
  constructor(i, j, isEaten = false) {
    super(i, j);
    this.isEaten = isEaten;
  }
}

class clock extends Item {
  isClock = true;
}

class rock extends Item {
  isRock =true ; 
}

class Game {
    maze = [
      [
        new Cell(true, true, false, true),
        new Cell(false, false, true, true),
        new Cell(true, true, false, false),
        new Cell(true, false, false, true),
        new Cell(true, true, false, false),
        new Cell(true, false, true, true),
        new Cell(true, false, false, false),
        new Cell(true, true, false, false),
       
      ],
      [
          new Cell(false, true, false, true),
          new Cell(true, true, false, true),
          new Cell(false, true, false, true),
          new Cell(false, true, false, true),
          new Cell(false, false, true, true),
          new Cell(true, true, false, false),
          new Cell(false, true, false, true),
          new Cell(false, true, true, true),
      ],
      [
          new Cell(false, false, false, true),
          new Cell(false, false, true, false),
          new Cell(false, false, false, false),
          new Cell(false, true, true, false),
          new Cell(true, true, false, true),
          new Cell(false, true, true, true),
          new Cell(false, false, false, true),
          new Cell(true, true, true, false),
      ],
      [
          new Cell(false, true, true, true),
          new Cell(true, true, false, true),
          new Cell(false, false, true, true),
          new Cell(true, false, true, false),
          new Cell(false, false, true, false),
          new Cell(true, false, false, false),
          new Cell(false, true, false, false),
          new Cell(true, true, false, true),
      ],
      [
          new Cell(true, false, false, true),
          new Cell(false, false, true, false),
          new Cell(true, false, false, false),
          new Cell(true, true, true, false),
          new Cell(true, true, false, true),
          new Cell(false, true, true, true),
          new Cell(false, false, false, true),
          new Cell(false, true, false, false),
      ],
      [
          new Cell(false, true, true, true),
          new Cell(true, true, false, true),
          new Cell(false, true, false, true),
          new Cell(true, false, true, true),
          new Cell(false, false, false, false),
          new Cell(true, false, true, false),
          new Cell(false, true, false, false),
          new Cell(false, true, true, true),
      ],
      [
          new Cell(true, false, true, true),
          new Cell(false, false, false, false),
          new Cell(false, false, true, false),
          new Cell(true, false, true, false),
          new Cell(false, true, true, false),
          new Cell(true, true, false, true),
          new Cell(false, false, true, true),
          new Cell(true, true, false, false),
      ],
      [
          new Cell(true, false, true, true),
          new Cell(false, false, true, false),
          new Cell(true, true, true, false),
          new Cell(true, false, true, true),
          new Cell(true, false, true, false),
          new Cell(false, false, true, false),
          new Cell(true, false, false, false),
          new Cell(false, true, true, false),
      ],
      
    ];

    isLose = false;
    distance = 0;

  constructor(person, goal, timer) {
    this.person = person;
    this.goal = goal;
    this.timer = timer;
    this.prices = generatePricesList(this);
    this.rocks = generateRocksList(this);
    this.clocks = generateClocksList(this);
    this.questions = generateQuestionsList(this) ;

  }
  get eatenPricesNumber() {
    return this.prices.filter((price) => price.isEaten).length;
  }
  get eatenQuestionsNumber() {
    return this.questions.filter((question) => question.isEaten).length;
  }

  get eatenrocksNumber() {
    return this.rocks.filter((rock) => rock.isEaten).length;
  }

  get isWin (){
      return  this.person.i === this.goal.i && this.person.j === this.goal.j;
  }

  get score() {
    return (
      this.eatenPricesNumber * 5 +
      this.eatenQuestionsNumber * -3 +
      this.timer  -
      (this.distance == 0 ? 0 : Math.floor(64 / this.distance))
    );
  }
}


/////////* DRAWINGS *////////

function drawMaze(maze){
  for (var i = 0; i <8; i++) {
    var gameRow = document.createElement("div");
    gameRow.classList.add("game-row");
  
    for (var j = 0; j < 8; j++) {
      var div = document.createElement("div");
  
      div.id = i + "" + j;
      div.classList.add("game-cell");
      if (maze[i][j].topWall) div.classList.add("top-border");
      if (maze[i][j].rightWall) div.classList.add("right-border");
      if (maze[i][j].bottomWall) div.classList.add("bottom-border");
      if (maze[i][j].leftWall) div.classList.add("left-border");
      gameRow.appendChild(div);
    }
    document.querySelector(".maze").appendChild(gameRow);
  }
}
function reDrawmMaze(game){
  document.querySelector(".maze").remove();
  let maze = document.createElement("div");
  maze.classList.add("maze");
  document.querySelector(".game-board").appendChild(maze);
  drawMaze(game.maze);
  drawPerson(game.person);


}
function drawPerson(person){
document.querySelector(".person")?.remove();
var personDiv = document.createElement("div");
personDiv.classList.add("person");
document.getElementById(person.i + "" + person.j).appendChild(personDiv);

}

function drawPrices(prices) {
  for (let img of document.querySelectorAll(".price")) {
    img.remove();
  }
  for (let price of prices) {
    if (price.isEaten == false) {
      let priceDiv = document.createElement("img");
      priceDiv.classList.add("price");
      priceDiv.setAttribute("src", "coffre.png");
      document.getElementById(`${price.i}${price.j}`).appendChild(priceDiv);
    }
  }
}

function drawRocks(rocks) {
  for (let img of document.querySelectorAll(".rock")) {
    img.remove();
  }
  for (let rock of rocks) {
    if (rock.isEaten == false) {
      let rockDiv = document.createElement("img");
      rockDiv.classList.add("rock");
      rockDiv.setAttribute("src", "roche.png");
      document.getElementById(`${rock.i}${rock.j}`).appendChild(rockDiv);
    }
  }
}

function drawClocks(clocks) {
  for (let img of document.querySelectorAll(".clock")) {
    img.remove();
  }
  for (let clock of clocks) {
    if (clock.isEaten == false) {
      let clockDiv = document.createElement("img");
      clockDiv.classList.add("clock");
      clockDiv.setAttribute("src", "temps.png");
      document.getElementById(`${clock.i}${clock.j}`).appendChild(clockDiv);
    }
  }
}

function drawQuestions(questions) {
  for (let img of document.querySelectorAll(".question")) {
    img.remove();
  }
  for (let question of questions) {
    if (question.isEaten == false) {
      let questionDiv = document.createElement("img");
      questionDiv.classList.add("question");
      questionDiv.setAttribute("src", "question.png");
      document.getElementById(`${question.i}${question.j}`).appendChild(questionDiv);
    }
  }
}


function generateRandomPoint(game, exceptions, isClock = false, isRock=false ) {
  let randomI = 0;
  let randomJ = 0;
  do {
    randomI = Math.floor(Math.random() * 8);
    randomJ = Math.floor(Math.random() * 8);
  } while (
    (randomI == game.person.i && randomJ == game.person.j)||
    exceptions.findIndex(
      (exception) => exception.i == randomI && exception.j == randomJ
    ) != -1
  );
  if (isClock) {
    return new clock(randomI, randomJ);
  } else if (isRock) {
    return new rock(randomI, randomJ);
  }else {
    return new Item(randomI, randomJ);
  }
}

function generatePricesList(game) {
  let valueList = [];
  return Array.from(Array(6), (_) => {
    let value = generateRandomPoint(game, valueList);
    valueList.push(value);
    return value;
  });
}

function generateRocksList(game) {
  let valueList = [];
  return Array.from(Array(6), (_) => {
    let value = generateRandomPoint(game, [...valueList, ...game.prices],false,true);
    valueList.push(value);
    return value;
  });
}

function generateClocksList(game) {
  let valueList = [];
  return Array.from(Array(3), (_) => {
    let value = generateRandomPoint(
      game,
      [...valueList, ...game.prices, ...game.rocks],
      true
    );
    valueList.push(value);
    return value;
  });
}

function generateQuestionsList(game) {
  let valueList = [];
  return Array.from(Array(3), (_) => {
    let value = generateRandomPoint(
      game,
      [...valueList, ...game.prices, ...game.rocks , ...game.clocks],
      true
    );
    valueList.push(value);
    return value;
  });
}



///////////////////

var game = new Game(new Point(0, 1) ,new Point(7,6),120);

drawMaze(game.maze);
drawPerson(game.person);
drawPrices(game.prices);
drawRocks(game.rocks);
drawClocks(game.clocks);
drawQuestions(game.questions);



////////////////////

document.addEventListener("keydown", (ev) => {
  if (!game.isLose && !game.isWin)
  {
    switch (ev.key) {
      case "ArrowUp":
        game.person.moveUp();
        break;
      case "ArrowRight":
        game.person.moveRight();
        break;
      case "ArrowDown":
        game.person.moveDown();
        break;
      case "ArrowLeft":
        game.person.moveLeft();
        break;
      default:
        break;
    }
  }

  
  game.person.eat([...game.prices, ...game.rocks, ...game.clocks,...game.questions]);
    if (game.person.i === game.goal.i && game.person.j === game.goal.j) {
      game.isWin = true;
      winGame(game);
    }
    if(rockeaten)
     {
      rockeaten = false;
      randomvalues(game);
     }
     else {
      document.querySelector(".affichage").innerHTML='';
      drawPerson(game.person);
      drawPrices(game.prices);
      drawRocks(game.rocks);
      drawClocks(game.clocks);
      drawQuestions(game.questions);
    }

  });
function randomvalues(game)
{
  let x = Math.floor(Math.random() * 3);
  
  switch(x){
    case 0 :
      {
        game.score += 3 ;
      drawPerson(game.person);
      drawPrices(game.prices);
      drawRocks(game.rocks);
      drawClocks(game.clocks);
      drawQuestions(game.questions);

      document.querySelector(".affichage").classList.remove("cached");
      document.querySelector(".affichage").innerHTML='You Win 3 Gold Coins 💸💰';
      }
      break;
    case 1 :
      { game.score-= 3 ;
       
        drawPerson(game.person);
        drawPrices(game.prices);
        drawRocks(game.rocks);
        drawClocks(game.clocks);
        drawQuestions(game.questions);
        document.querySelector(".affichage").classList.remove("cached");
        document.querySelector(".affichage").innerHTML='Oops! You Lose 3 Gold Coins 💸💰';
      }
      
      break;
    case 2 :
      {
        game.person=new Point(0, 1);
      drawPerson(game.person);
      drawPrices(game.prices);
      drawRocks(game.rocks);
      drawClocks(game.clocks);
      drawQuestions(game.questions);
      document.querySelector(".affichage").classList.remove("cached");
      document.querySelector(".affichage").innerHTML='Oops! You Should Start Again😢';
      }
      
      break;

  }
}