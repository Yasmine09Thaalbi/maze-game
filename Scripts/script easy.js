let interval = 60;

//////*  FUNCTIONS *//////////

function startGame(game) {
  document.querySelector(".welcome").classList.add("cached");
  document.querySelector(".row").classList.remove("cached");
  startTimer(game);
  playSound.play();
}

function replayGame(){
  game = new Game(new Point(0, 0) ,new Point(5,5) , 60);
  document.querySelector(".win-result").classList.add("cached");
  document.querySelector(".lose-result").classList.add("cached");
  document.querySelector(".row").classList.remove("cached");
  clearInterval(interval);
  game.isWin = false;

  reDrawmMaze(game);
  time=document.querySelector(".Timer");
  time.textContent='01:00' ;
  startTimer(game);
  playSound.currentTime = 0;
  playSound.play();
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
  let minutes = Math.floor(game.timer / 60);
  let seconds = game.timer % 60;
  document.querySelector("#time").innerText = `Remaining Time: ${
  minutes < 10 ? 0 : ""
  }${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
  document.querySelector(".welcome").classList.add("cached");
  document.querySelector(".row").classList.add("cached");
  

}

function startTimer(game) {
  interval = setInterval(() => {
    if (game.timer <= 0) {
      game.islose=true;
      loseGame();
      clearInterval(interval);
    } else if (game.isWin) {
      clearInterval(interval);
      winGame();
      
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
     
      }
    }
    moveLeft() {
      if (this.j >= 1 && game.maze[this.i][this.j].leftWall == false) {
        this.j -= 1;
  
      }
    }
    moveDown() {
      if (this.i < 5 && game.maze[this.i][this.j].bottomWall == false) {
        this.i += 1;
    
      }
    }
  
    moveRight() {
      if (this.j < 5 && game.maze[this.i][this.j].rightWall == false) {
        this.j += 1;
      }
    }

}

class Game {
    maze = [
     [
       new Cell(true, true, false, false),
       new Cell(true, false, false, true),
       new Cell(true, false, true, false),
       new Cell(true, false, true, false),
       new Cell(true, false, false,false),
       new Cell(true, true, true, false),
     ],
     [
       new Cell(false, false,false, true),
       new Cell(false, true, true, false),
       new Cell(true, false, false, true),
       new Cell(true, false, true, false),
       new Cell(false, true, true, false),
       new Cell(true, true, false, true),
     ],
     [
       new Cell(false, false, true, true),
       new Cell(true, true, true, false),
       new Cell(false, true, false, true),
       new Cell(true, false, false, true),
       new Cell(true, true, false, false),
       new Cell(false, true, false, true),
       
     ],
     [
         new Cell(true, false, false, true),
         new Cell(true, false, false, false),
         new Cell(false, true, true, false),
         new Cell(false, true, false, true),
         new Cell(false, true,false, true),
         new Cell(false, true, false, true),
         
     ],
     [
       new Cell(false, true, false, true),
       new Cell(false, true, true, true),
       new Cell(true, false, false,true),
       new Cell(false, true, true, false),
       new Cell(false, true,false, true),
       new Cell(false, true, false, true),
       
     ],
     [
       new Cell(false, false,true, true),
       new Cell(true, false, true, false),
       new Cell(false, false, true,false),
       new Cell(true, true, true, false),
       new Cell(false, false, true, true),
       new Cell(false, false, true, false),
     
     ],
   ];

  isLose = false;


  constructor(person, goal, timer) {
    this.person = person;
    this.goal = goal;
    this.timer = timer;
  }

  get isWin (){
      return  this.person.i === this.goal.i && this.person.j === this.goal.j;
 
    }
}

/////////* DRAWINGS *////////

function drawMaze(maze){
for (var i = 0; i < 6; i++) {
    var gameRow = document.createElement("div");
    gameRow.classList.add("game-row");
  
    for (var j = 0; j < 6; j++) {
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

//fonction qui efface la precendente et avance la suivante : 
function drawPerson(person){
  //ajouter le point dans l'html:
  document.querySelector(".person")?.remove();
  var personDiv = document.createElement("div");
  personDiv.classList.add("person");
  document.getElementById(person.i + "" + person.j).appendChild(personDiv);

}

///////////////////////////////////////
var game = new Game(new Point(0, 0) ,new Point(5,5) , 60);


drawMaze(game.maze);
drawPerson(game.person);

///////////////////////////////////////


document.addEventListener("keydown", (ev) => { 
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
     drawPerson(game.person);

});




