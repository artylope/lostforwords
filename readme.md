[Lost for Words](https://artylope.github.io/lostforwords/)

# About the Game

Lost for words is a word game that challenges the player to form as many words as possible out of the random letter tiles generated. The player has 1 minute for the challenge. The longer the word, the more points the player is awarded.

# Explanations of the Technologies 

- HTML, CSS and JS
- a base list of words taken from [Mieliestronk's list of more than 58 000 English words](http://www.mieliestronk.com/wordlist.html) 
- Use of [this site](http://www.convertcsv.com/csv-to-json.htm) to convert the list of words to a json array

# Approach Taken
1. The game intro screen display the game instructions, when user press start game, the game will
2. Generate a string of random letters. Also make sure out of the 10 letters generated, there are 3 vowels and 7 consonants. Display it.
3. When user key in any characters, the game display it in the "tiles" look.
4. When user presses "enter", the word is submitted and the game does 3 checks.
⋅⋅1. Check if the word can be formed from the string. Compares the number of each letters. 
⋅⋅2. Check if the word is a "valid" word. Check against the list of words. 
⋅⋅3. Check if the word has been guessed before. To prevent the user from keep entering the same word to get points. 
5. If correct, based on the length of word entered, assign scores. 2-3 letters (1 point). Each extra letter add 1 more point.
6. In the background, there is a timer of 1 minute running in the background. When time is up, the end game screen pops up and shows the score.




installation instructions 

unsolved problems
