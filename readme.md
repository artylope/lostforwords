[Lost for Words](https://artylope.github.io/lostforwords/)

# About the Game

Lost for words is a word game that challenges the player to form as many words as possible out of the random letter tiles generated. The player has 1 minute for the challenge. The longer the word, the more points the player is awarded.

# Technologies and resources

- HTML, CSS and JS
- a base list of words taken from [Mieliestronk's list of more than 58 000 English words](http://www.mieliestronk.com/wordlist.html) 
- Use of [this site](http://www.convertcsv.com/csv-to-json.htm) to convert the list of words to a json array

# Approach Taken
1. Show the instructions and a start game button in the intro screen. When user press the button, the game will start a 1 minute timer and go into the in-game screen. 
2. Game will generate a string of random letters. Also make sure out of the 10 letters generated, there are 3 vowels and 7 consonants. Display it.
3. When user key in any characters, the game display it in the "tiles" look.
4. When user presses "enter", the word is submitted and the game does 3 checks.

---- Check if the word can be formed from the string. Compares the number of each letters. 


---- Check if the word is a "valid" word. Check against the list of words. 


---- Check if the word has been guessed before. To prevent the user from keep entering the same word to get points. 


5. If correct, based on the length of word entered, assign scores. 2-3 letters (1 point). Each extra letter add 1 more point.
6. When time is up, the end game screen pops up and shows the score and the respective button to go back to main or replay the game. 

# Installation Instructions 
None. Just run index.html.

# Unsolved Problems
1. Highlight the word that has been guessed before. 
2. +1 Animation to look nicer. 
3. Input to reject special characters
4. When the keys are typed show that effect of keys typed in the respective tile.
5. Get all possible words from the generated string, show hints.
6. - points or -time if reset string or make time shorter 
7. Change the string if no more words possible for the string.
8. Add some shakes. CSS Shakes
9. Add some audio



