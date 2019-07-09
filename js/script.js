var displayWord = document.querySelector('#display-word');
var inputBox = document.querySelector('#user-word');
var randomStringDiv = document.querySelector('#random-string');
var guessedWords = document.querySelector('#guessed-words');
var feedbackScore = document.querySelector('#feedback-score');

var randomStr = "";
var userWord = "";

var score = 0;

var checkInList;
var checkInStr;
var checkNotGuessedBefore;

var wordCount;
var randomStrCount;

var lettersMatched = [];
var lettersMatchedCount = 0;

var wordsGuessed = [];

var timer = 12; //in seconds
var runningTime = timer;
var background = document.querySelector('#background');

var gameRunning = false;



window.onload = function() {
  randomStr = generateRandomStr(3,7);
  // console.log(randomStr);
  displayRandomStr(randomStr);
};


//function to shuffle generated string
var shuffleStr = function(string){
    var a = string.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

//generate random string
var generateRandomStr = function (vowelsNum, consonantsNum){
   var result           = '';

   var vowels           = 'aeiou';
   var vowelsLength     = vowels.length;
   for ( var i = 0; i < vowelsNum; i++ ) {
      result += vowels.charAt(Math.floor(Math.random() * vowelsLength));
   }

   var consonants       = 'bcdfghjklmnpqrstvwxyz';
   var consonantsLength = consonants.length;
   for ( var j = 0; j < consonantsNum; j++ ) {
      result += consonants.charAt(Math.floor(Math.random() * consonantsLength));
   }

   result = shuffleStr(result);
   return result;
}

//display random string in the random string div as tiles
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

//function to count number of characters and make it into an object.
var countChar = function(string){

  //make all lower case
  string = string.toLowerCase();
  //remove special characters
  string = string.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');
  //remove space
  string = string.split(' ').join('');
  // console.log(string);

  //make into an array to store the counts
  var counts = {};
  var letter, count;
  for (var i =0 ; i < string.length; i++) {

      letter = string.charAt(i);
      count = counts[letter];

      if (counts[letter] >= 1){
        counts[letter] ++;
      } else {
        counts[letter] = 1;
      }
  }

  return counts;
}

// this function checks if the userWord is an actual word in the dictionary (words collected in the wordList array in words.js)
var isInList = function(word){

  var status = "";
  console.log('isInList Check');
  for (var i = 0; i < wordList.length; i++){
    //console.log("word is  " + i + "  " + wordList[i]);
    if (word === wordList[i]){
      console.log('user types: ' + word);
      console.log('matches with ' + wordList[i] + ' in dictionary');
      // console.log('found in list !!!!');
      status = true;
      break;
    } else {
      // console.log("not found in list");
      status = false;
      //return false;
    }
  }
  // console.log("status: " + status);
  if (status === false){
    console.log('Check 1: FAIL not found in dictionary');
  } else if (status === true){
    console.log('Check 1: PASS found in dictionary!');
  }

  return status;

}

// this function checks if the userWord is in the randomStr generated.
var isInStr = function(word,string){
  var status = false;
  var lettersMatched = [];
  lettersMatchedCount = 0;

  // console.log("isInStr Check");

  wordCount       = countChar(word);
  randomStrCount  = countChar(string);
  // console.log("after countChar");

  var wordCountKeys   = Object.keys(wordCount);
  var wordCountValues = Object.values(wordCount);

  var randomStrCountKeys   = Object.keys(randomStrCount);
  var randomStrCountValues = Object.values(randomStrCount);

  //how to compare? 
  for(var i = 0; i< wordCountKeys.length; i++){
    // console.log("in the loop");
    for (var j = 0; j< randomStrCountKeys.length; j++){
      // console.log("in the inner loop");
      if( wordCountKeys[i] === randomStrCountKeys[j]) {

        // console.log( wordCountKeys[i] + " match with " + randomStrCountKeys[j]);

        if (wordCountValues[i] <= randomStrCountValues[j]){
          // console.log( wordCountValues[i] + " is equal/lesser than " + randomStrCountValues[j]);

          for(var k = 0; k < wordCountValues[i]; k++ ){
            lettersMatched.push(true);
          }

          // console.log('letters matched' + lettersMatched);
        }
      }
    }
  }

  for (var k = 0; k < lettersMatched.length; k++){
    if (lettersMatched[k] === true ){
      lettersMatchedCount = lettersMatchedCount +1;
      // console.log('letters matched count' + lettersMatchedCount);
    }
  }

  if (lettersMatchedCount === userWord.length){
    status = true;
  }

  // console.log("is in string " + status);
  if (status === false){
    console.log('Check 2: FAIL cannot form word from list');
  } else if (status === true){
    console.log('Check 2: PASS can form word from list!');
  }
  return status;
}

// this function checks if the userWord has already been guessed as part of this random string.
var notGuessedBefore = function(word){
  // console.log('in not guessed before check');
  var status = true;

  for (var i=0; i < wordsGuessed.length; i++){
    if (word === wordsGuessed[i]){
      status = false;
      console.log('Check 3: FAIL Guessed this word before');
      break;
    }
  }
  console.log('Check 3: PASS New word');
  return status;
}

//this function display the score

var displayScore = function(score){
  var scoreDiv = document.querySelector('#score');
  scoreDiv.innerText = score;
}

// this function passes the word into 3 checks (isInStr,  isInList and NotGuessedBefore), if passes 2 checks, user gets 1 point, else no points.
var checkUserWord = function(word){
  // console.log('checking ' + word);

  checkInList            = isInList(word);
  checkInStr             = isInStr(word,randomStr);
  checkNotGuessedBefore  = notGuessedBefore(word);
  // console.log(checkInList);
  // console.log(checkInStr);

  if ( checkInList === true && checkInStr === true && checkNotGuessedBefore === true){

    wordsGuessed.push(word);
    awardScore(word);
    // score += 1;
    displayScore(score);
    console.log('words guessed: ' + wordsGuessed);
    console.log('total score ' + score);
    displayGuessedWord(word);

    var tiles = document.querySelector('#display-word').childNodes;
    for (var i = 0; i < tiles.length; i++){
      tiles[i].classList.add("correct");
    }

    inputBox.value = "";
    setTimeout(function(){
      displayWord.innerHTML = "";
    },500);

  } else {
    console.log('No score added');
    inputBox.value = "";
    var tiles = document.querySelector('#display-word').childNodes;
    for (var i = 0; i < tiles.length; i++){
      tiles[i].classList.add("wrong");
    }
    setTimeout(function(){
      displayWord.innerHTML = "";
    },500);
  }
}

//displaying the words into tiles. creating tiles on demand.
var displayGuessedWord = function(word){

  // guessedWords.innerHTML = "";
    var eachWord = document.createElement('div');
    eachWord.innerText = word;
    eachWord.setAttribute('class', 'each-word');
    guessedWords.appendChild(eachWord);

}

//displaying the words into tiles. creating tiles on demand.
var displayTiles = function(word){

  // console.log(word);
  var userTiles = word.split('');
  // console.log(userTiles);
  // displayWord.innerText = '';

  displayWord.innerHTML = "";

  for(var i = 0; i < userTiles.length; i++){
    var tile = document.createElement('div');
    tile.innerText = userTiles[i];
    tile.setAttribute('class', 'tile');
    displayWord.appendChild(tile);
  }

}

//a function to give scroe
var awardScore = function(word){
  var amountToAdd = 0;

  if(word.length <= 3){
    amountToAdd = 1;

  } else if (word.length > 3){
    amountToAdd = 1 + (word.length - 3);
  }

  score = score + amountToAdd;
  var scoreToAdd = document.createElement('div');
  scoreToAdd.setAttribute('class','add-score');
  scoreToAdd.innerText = "+" + amountToAdd;
  feedbackScore.appendChild(scoreToAdd);

  setTimeout( function(){
    feedbackScore.innerHTML = '';
  }, 600 );

  return amountToAdd;
}
// add event listener to input box, detect any input and display the word in the tiles
inputBox.addEventListener('input', function(event){
  console.clear();
  // console.log(event);
  // console.log('start');
  userWord = (event.target.value).toLowerCase();
  userWord = userWord.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');
  userWord = userWord.split(' ').join('');
  var displayUserWord = userWord.toUpperCase();
  displayTiles(displayUserWord);
  // console.log(event);
  // console.log('end');
    if (event.target.value.includes(' ')) {
      userWord = "";
      displayWord.innerHTML = "";
      inputBox.value = "";
      // console.log('clear');
    }

    if (event.target.value.includes('1')){
      userWord = "";
      displayWord.innerHTML = "";
      inputBox.value = "";
    }

})



// add event listener to the input box, detect user enter to submit words for check and clear the inputs
inputBox.addEventListener('keypress', function (event) {
    // console.log(event);
    if (event.key === 'Enter') {
      // console.log('enter ' + event.target.value);
      checkUserWord(userWord);
      // displayWord.innerHTML = "";
      inputBox.value = "";
    } else if (event.key === ' ') {
      userWord = "";
      displayWord.innerHTML = "";
      inputBox.value = "";
    }
});

//add event listener to reset random String

document.addEventListener('keypress', function(event){
  if (event.key === '1') {
    randomStr = generateRandomStr(3,7);
    displayRandomStr(randomStr);
    guessedWords.innerHTML='';
    wordsGuessed = [];

  } else if (event.key === '0') {
    document.location.reload();
  }
});


//reject special characters
//add timer and screens

//highlight words that guessed before
//when the keys are typed show that feedback in the respective tile.

//get all possible words from the generated string.
//- points or -time if reset string or make time shorter (if no more words possible)
