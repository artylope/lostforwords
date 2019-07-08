var displayWord = document.querySelector('#display-word');
var inputBox = document.querySelector('#user-word');
var randomStringDiv = document.querySelector('#random-string');

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

//fucntion to count number of characters
var countChar = function(string){

  //make all lower case
  string = string.toLowerCase();
  //remove special characters
  string = string.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');
  //remove space
  string = string.split(' ').join('');
  // console.log(string);

   //array to store the counts
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
  console.log(counts);
  return counts;
}



randomStr = generateRandomStr(3,7);
console.log(randomStr);
displayRandomStr(randomStr);

// this function checks if the userWord is an actual word in the dictionary (words collected in the wordList array in words.js)
var isInList = function(word){
  var status = "";
  console.log('isInList Check');
  for (var i = 0; i < wordList.length; i++){
    //console.log("word is  " + i + "  " + wordList[i]);
    if (word === wordList[i]){
      console.log(word);
      console.log(wordList[i]);
      console.log('found in list !!!!');
      status = true;
      break;
    } else {
      // console.log("not found in list");
      status = false;
      //return false;
    }
  }
  // console.log("status: " + status);
  return status;
}

// this function checks if the userWord is in the randomStr generated.
var isInStr = function(word,string){
  var status = false;
  var lettersMatched = [];
  lettersMatchedCount = 0;

  console.log("isInStr Check");

  wordCount       = countChar(word);
  randomStrCount  = countChar(string);
  // console.log("after countChar");

  //how to compare? 
  for(var i = 0; i< Object.keys(wordCount).length; i++){
    // console.log("in the loop");
    for (var j = 0; j< Object.keys(randomStrCount).length; j++){
      // console.log("in the inner loop");
      if(Object.keys(wordCount)[i] === Object.keys(randomStrCount)[j]) {

        console.log( Object.keys(wordCount)[i] + " match with " + Object.keys(randomStrCount)[j]);

        if (Object.values(wordCount)[i] <= Object.values(randomStrCount)[j]){
          console.log( Object.values(wordCount)[i] + " is equal/lesser than " + Object.values(randomStrCount)[j]);

          for(var k = 0; k < Object.values(wordCount)[i]; k++ ){
            lettersMatched.push(true);
          }

          console.log('letters matched' + lettersMatched);
        }
      }
    }
  }

  for (var k = 0; k < lettersMatched.length; k++){
    if (lettersMatched[k] === true ){
      lettersMatchedCount = lettersMatchedCount +1;
      console.log('letters matched count' + lettersMatchedCount);
    }
  }

  if (lettersMatchedCount === userWord.length){
    status = true;
  }

  console.log("is in string " + status);
  return status;
}

// this function checks if the userWord has already been guessed as part of this random string.
var NotGuessedBefore = function(word){

  var status = true;

  for (var i=0; i < wordsGuessed.length; i++){
    if (word === wordsGuessed[i]){
      status = false;
      break;
    }
  }

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
  checkNotGuessedBefore  = NotGuessedBefore(word);
  // console.log(checkInList);
  // console.log(checkInStr);

  if ( checkInList === true && checkInStr === true && checkNotGuessedBefore === true){

    wordsGuessed.push(word);

    score += 1;
    displayScore(score);
    console.log('words guessed: ' + wordsGuessed);
    console.log('total score ' + score);
    var tiles = document.querySelector('#display-word').childNodes;
    for (var i = 0; i < tiles.length; i++){
      tiles[i].classList.add("correct");
    }

    setTimeout(function(){
      displayWord.innerHTML = "";
      inputBox.value = "";
    },500);

  } else {
    console.log('meh!');
    var tiles = document.querySelector('#display-word').childNodes;
    for (var i = 0; i < tiles.length; i++){
      tiles[i].classList.add("wrong");
    }
    setTimeout(function(){
      displayWord.innerHTML = "";
      inputBox.value = "";
    },500);
  }
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
    wordsGuessed = [];
  } else if (event.key === '0') {
    document.location.reload();
  }
});


//keep an array of all guessed words, make sure not repeated
//reject special characters
//add timer
//should give more points to longer words

//using difficult letters give more points, like scrabble.
//get all possible words from the generated string.
//- points if reset string or make time shorter (if no more words possible)
