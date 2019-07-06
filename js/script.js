var displayWord = document.querySelector('#display-word');
var inputBox = document.querySelector('#user-word');
var randomStringDiv = document.querySelector('#random-string');

var randomStr = "";
var userWord = "";

var checkInList;
var checkInStr;


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
  randomStringDiv.innerText = randomStr.toUpperCase();
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

// this function passes the word into 2 checks (isInStr and isInList), if passes 2 checks, user gets 1 point, else no points.
var checkUserWord = function(word){
  console.log('checking ' + word);

  checkInList = isInList(word);
  checkInStr  = isInStr(word,randomStr);

  // console.log(checkInList);
  // console.log(checkInStr);

  if ( checkInList === true && checkInStr === true){
    console.log('+1 yay!');
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
  console.log('start');
  userWord = (event.target.value).toLowerCase();
  var displayUserWord = userWord.toUpperCase();
  displayTiles(displayUserWord);
  console.log(event);
  console.log('end');
})

// add event listener to the input box, detect user enter to submit words for check and clear the inputs
inputBox.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      console.log('enter ' + event.target.value);
      checkUserWord(userWord);
      displayWord.innerHTML = "";
      inputBox.value = "";
    }
});
