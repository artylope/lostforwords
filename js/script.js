var displayWord = document.querySelector('#display-word');
var inputBox = document.querySelector('#user-word');
var randomStringDiv = document.querySelector('#random-string');

var randomStr = "";
var userWord = "";

var score = 0;

var checkInList;
var checkInStr;
var checkNotGuessedBefore;


//generate random string
var generateRandomStr = function (length){
   var result           = '';
   var characters       = 'abcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

//display random string in the random string div
var displayRandomStr = function(string){
  randomStringDiv.innerText = string.toUpperCase();
  var randomStringTiles = string.split('');
  randomStringDiv.innerHTML = "";

  for(var i = 0; i < randomStringTiles.length; i++){
    var tile = document.createElement('div');
    tile.innerText = randomStringTiles[i];
    tile.setAttribute('class', 'tile');
    tile.classList.add("smaller");
    randomStringDiv.appendChild(tile);
  }

}

randomStr = generateRandomStr(10);
console.log(randomStr);
displayRandomStr(randomStr);

// this function checks if the userWord is an actual word in the dictionary (words collected in the wordList array in words.js)
var isInList = function(word){
  var status = "";
  console.log('works');
  for (var i = 0; i < wordList.length; i++){
    //console.log("word is  " + i + "  " + wordList[i]);
    if (word === wordList[i]){
      console.log(word);
      console.log(wordList[i]);
      console.log('match');
      //console.log("yey")
      status = true;
      break;
    } else {
      //console.log("meh");
      status = false;
      //return false;
    }
  }
  console.log("status: " + status);
  return status;
}

// this function checks if the userWord is in the randomStr generated.
var isInStr = function(word,string){

  string = string.split('');
  word = word.split('');
  console.log('is valid letters   ');
  console.log(string);
  console.log(word);

  return true;
}

// this function checks if the userWord has already been guessed as part of this random string.
var NotGuessedBefore = function(word){

  console.log('in not part of previously guessed word');
  console.log(word);

  return true;
}

// this function passes the word into 3 checks (isInStr,  isInList and NotGuessedBefore), if passes 2 checks, user gets 1 point, else no points.
var checkUserWord = function(word){
  console.log('checking ' + word);

  checkInList            = isInList(word);
  checkInStr             = isInStr(word,randomStr);
  checkNotGuessedBefore  = NotGuessedBefore(word);
  // console.log(checkInList);
  // console.log(checkInStr);

  if ( checkInList === true && checkInStr === true){
    score += 1;
    console.log('total score ' + score);
  } else {
    console.log('meh!');
  }
}


//displaying the words into tiles. creating tiles on demand.
var displayTiles = function(word){

  console.log(word);
  var userTiles = word.split('');
  console.log(userTiles);
  // displayWord.innerText = '';

  displayWord.innerHTML = "";

  for(var i = 0; i < userTiles.length; i++){
    var tile = document.createElement('div');
    tile.innerText = userTiles[i];
    tile.setAttribute('class', 'tile');
    displayWord.appendChild(tile);
  }

}


// add event listener to input box, detect any input and display the word in the tiles
inputBox.addEventListener('input', function(event){
  console.clear();
  console.log(event);
  console.log('start');
  userWord = (event.target.value).toLowerCase();
  var displayUserWord = userWord.toUpperCase();
  displayTiles(displayUserWord);
  console.log(event);
  console.log('end');
    if (event.target.value.includes(' ')) {
      userWord = "";
      displayWord.innerHTML = "";
      inputBox.value = "";
      console.log('clear');
    }
})

// add event listener to the input box, detect user enter to submit words for check and clear the inputs
inputBox.addEventListener('keypress', function (event) {
    console.log(event);
    if (event.key === 'Enter') {
      console.log('enter ' + event.target.value);
      checkUserWord(userWord);
      displayWord.innerHTML = "";
      inputBox.value = "";
    } else if (event.key === ' ') {
      userWord = "";
      displayWord.innerHTML = "";
      inputBox.value = "";
    }
});

//check if can form word from random string, enough letters.
//keep an array of all guessed words, make sure not repeated
//reject special characters


//should give more points to longer words
//make random strinng generator better. at least 2 vowels
//get all possible words from the generated string.
//- points if reset string or make time shorter (if no more words possible)
//using difficult letters give more points, like scrabble.
//wrong word something happen.
