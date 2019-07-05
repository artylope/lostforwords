
document.querySelector('#user-word').autofocus;

var randomStr = "";


var displayWord = document.querySelector('#display-word');

var getWord = function(){
  var userWord = document.querySelector('#user-word').value;
  console.log(userWord);
  displayTiles(userWord);
}

var displayTiles = function(word){

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




//get a list of accepted Words

//check win
//letters of words exist in random string
//
