const gameIntroScreen   = document.querySelector('#game-intro');
const inGameScreen      = document.querySelector('#in-game');
const gameEndScreen     = document.querySelector('#game-end');
const game321Screen     = document.querySelector('#game-321');
const instructionScreen = document.querySelector('#instruction');

const starter   = document.querySelector('#starter');

const timebar  = document.querySelector('#timebar');
const time            = 10; //in seconds
var timeLeft          = time;

var gameRunning     = false;



var returnIntro = function(){
  console.clear();
  gameIntroScreen.style.visibility = 'visible';
  inGameScreen.style.visibility = 'hidden';
  gameEndScreen.style.visibility = 'hidden';
  game321Screen.style.visibility = 'hidden';
  instructionScreen.style.visibility = 'visible';
}


var startGame = function(){
  //reset timer
  console.log('start game');
  gameIntroScreen.style.visibility = 'hidden';
  inGameScreen.style.visibility = 'visible';
  gameEndScreen.style.visibility = 'hidden';
  game321Screen.style.visibility = 'hidden';
  instructionScreen.style.visibility = 'visible';

  gameRunning = true;
  console.clear();
  timeLeft = time;
  startTimer();
}


var start321 = function(){
  var counter = 3;
  starter.innerText = counter;

  gameIntroScreen.style.visibility = 'hidden';
  inGameScreen.style.visibility = 'hidden';
  gameEndScreen.style.visibility = 'hidden';
  game321Screen.style.visibility = 'visible';
  instructionScreen.style.visibility = 'hidden';

  var display321 = setInterval(
    function(){
      counter = counter - 1;
      starter.innerText = counter;
      if(counter === 0){
        starter.innerText = "Go!";
      }
    }
  , 1000);

  setTimeout(function(){
    clearInterval(display321);
    startGame();
  }, 4000);
}

var startTimer = function(){
    var countdown = setInterval( function(){
        // console.log('timeleft ' + timeLeft);
        // console.log('gameRunning = ' + gameRunning);

        timebar.style.width = ((timeLeft/time)*100) + "%";

        timeLeft = timeLeft - .1;
      },100);

    var stopTimer = setTimeout(
                      function(){
                        gameRunning = false;
                        console.log('gameRunning = ' + gameRunning);
                        endGame();
                        clearInterval(countdown);
                      }, (time * 1000)
                    );
}

var endGame = function(){
  gameIntroScreen.style.visibility = 'visible';
  inGameScreen.style.visibility = 'hidden';
  gameEndScreen.style.visibility = 'visible';
  game321Screen.style.visibility = 'hidden';
  instructionScreen.style.visibility = 'hidden';
}
