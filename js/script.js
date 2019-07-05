var displayWord = document.querySelector('#display-word');
document.querySelector('#user-word').autofocus;

var check1;
var check2;


var inputBox = document.querySelector('#user-word');

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

var isValidLetters = function(word){
  return true;
}

var checkWord = function(word){
  console.log('checking ' + word);

  check1 = isInList(word);
  check2 = isValidLetters(word);

  console.log(check1);
  console.log(check2);

  if ( check1 === true && check2 === true){
    console.log('+1 yay!');
  } else {
    console.log('meh!');
  }
}

inputBox.addEventListener('input', function(event){
  console.clear();
  console.log('start');
  displayTiles(event.target.value);
  console.log(event);
  console.log('end');
})

inputBox.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      console.log('enter ' + event.target.value);
      checkWord(event.target.value);
      displayWord.innerHTML = "";
      inputBox.value = ""
    }
});


var randomStr = "";




//in input box, if not empty, on enter, submitwords
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

//display random string in the random string div
var displayRandomStr = function(randomStr){
  var randomStringDiv = document.querySelector('#random-string');
  randomStringDiv.innerText = randomStr;
}

//generate random string
var generateRandomStr = function (length){
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

randomStr = generateRandomStr(10);
console.log(randomStr);
displayRandomStr(randomStr);
