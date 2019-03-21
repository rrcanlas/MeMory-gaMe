# **Memory Game Project**

This game consists of random icon cards that **toughens** the players memory.

## Goal

To gain star :star: points, the player needs to **match two cards** with lesser moves. 

## Click [here](https://rrcanlas.github.io/MeMory-gaMe/) to Start Playing

## Directions for the Game 

	* Click the card :hearts: to show the hidden icon.

	* Match it to the 2nd card :hearts:. Keep the pattern up until all cards match.

	* Once all matched cards :diamonds: been completed a message pops out that shows the result.  

	* Click reset button to play the game again or close it to see the recent game board activity.

	* Another option is to click restore icon :repeat: to reset the game.

## Building Out the Games Functionality

This project originally has some **HTML** and **CSS** styling which was provided by UDACITY. With the furnished HTML and CSS files, added elements to popup a modal was designed to congratulate:tada:, show the players performance with a button that allows the player to reset the game. An HTML entity to close the modal and show previously played game board is sited on modals upper right corner and a reset button was included. An element for a star :star: and time format :zero::zero:::zero::zero:::zero::zero: is also added. 

I used **app.js** file for the script to modify the HTML and CSS files. The script randomly shuffles the cards, initializes the time :clock1:, the number of moves :point_up_2:(clicked cards) to 0 and shows 4 stars :star::star::star::star:. Set's the time to start incrementing, validates the matched and unmatched cards and gives the function for the restart icon that allows the player to reset the game board. A modal appears when the user wins :tada: the game. Displays how much time :clock1:, moves :point_up_2: and star :star: ratings the player took to finish the game:slot_machine:.



