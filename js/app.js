/* 
 * Project 2 - Memory Game - May 30 2018 by Rose Canlas 
 */

/*
 * Create a list that holds all of your cards
 */

/*
 * list of cards
 */

// querySelectorAll returns a Nodelist not an array
// need to convert to array by using Array.from

var cards = Array.from(document.querySelectorAll('.card'));
var clickedClassNames = [];
var clickedCards = [];
var checker = 0;
var restartCards = [];

var arraysToShuffle = [
  'fa fa-diamond',
  'fa fa-diamond',
  'fa fa-paper-plane-o',
  'fa fa-paper-plane-o',
  'fa fa-anchor',
  'fa fa-anchor',
  'fa fa-bolt',
  'fa fa-bolt',
  'fa fa-cube',
  'fa fa-cube',
  'fa fa-leaf',
  'fa fa-leaf',
  'fa fa-bicycle',
  'fa fa-bicycle',
  'fa fa-bomb',
  'fa fa-bomb'
];


// shuffles the cards

var shuffledArray = shuffle(arraysToShuffle);
var icons = document.querySelectorAll('.card i');

for (var i = 0; i < icons.length; i++) {
  console.log('Class Name:' + shuffledArray[i]);
  icons.item(i).className = shuffledArray[i];
  console.log(icons.item(i));
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided 'shuffle' method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// clicking of restart icon

$('.restart').click(function(e) {
  e.preventDefault(); 
  
  
  //closing all the deck of card for a new game 

  for (const restartCard of restartCards) {

    restartCard.classList.remove('open');
    restartCard.classList.remove('show');
    restartCard.classList.remove('match');    
    restartCards = [];
    
  }
    timerToZero();
    shuffle(arraysToShuffle);
});

var allStars = document.querySelectorAll('.stars li');

// initializing variables back to 0

function timerToZero() {
  starTimer.innerText = '00:00:00';
  clearInterval(intervalid);
  seconds = 0;
  numOfClicks = 0;
  moves.innerText = 0;
  matchedCards = 0;
  starsRewards = 65;
  
  for (var i = 0; i < allStars.length; i++){

      allStars[i].style.visibility = 'visible';
  }
}

//adding of zero for the hour, minute, seconds

function addZero(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
}

var starTimer = document.querySelector('.timerSec');
var moves = document.querySelector('.moves');
var intervalid = 0;
var seconds = 0;
var starsRewards = 65;

// time setting changing seconds to minutes to hours

function timerIncrement() { 
  seconds++;  
  var h = addZero(Math.floor(seconds / 3600));
  var m = addZero(Math.floor(seconds / 60) % 60);
  var s = addZero(Math.floor(seconds) % 60);
  starTimer.innerText =  h + ':' + m + ':' + s;
}

// star icon decrease function

function star() {

  if (numOfClicks === 17) {

    //console.log(allStars[i]);
    for (var i = 0; i < allStars.length; i++){
      if(i > 2){
        allStars[i].style.visibility = 'hidden';
      }
    }   
  }

  if (numOfClicks === 34) {  
    
    for(var j = 0; j < allStars.length; j++){
      if(j > 1){
        allStars[j].style.visibility = 'hidden';
      }
    }
  }

  if (numOfClicks === 50) {  
    
    for(var k = 0; k < allStars.length; k++){
      if(k > 0){
        allStars[k].style.visibility = 'hidden';
      }
    }
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of 'open' cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

var numOfClicks = 0;
var matchedCards = 0;

/*
 * clicking of cards
 */

for (i = 0; i < cards.length; i++) {

    cards[i].addEventListener('click', function(e) {
        e.preventDefault();

        clearInterval(intervalid);
        timerIncrement();
        intervalid = setInterval(timerIncrement, 1000);
        numOfClicks++;
        moves.innerText = numOfClicks;
        star();
        
        // array for the restart button

        restartCards.push(this);

        // validation for cards that doesn't matched to be closed

        if (checker === 1) {

            clickedCards[0].classList.remove('open');
            clickedCards[0].classList.remove('show');           

            clickedCards[1].classList.remove('open'); 
            clickedCards[1].classList.remove('show');
                      
            clickedCards = [];
            clickedClassNames = [];
            checker = 0;

        }

        // validation for the first card to remain open 

        if (checker === 0) {
        
            var icon = this.querySelector('i').className;

            clickedClassNames.push(icon);
            clickedCards.push(this);
            
            this.classList.add('open');
            this.classList.add('show');
           
            checker = 0;

        }

        //two cards comparison

        if(clickedClassNames.length === 2) {
          
          if(clickedClassNames[0] === clickedClassNames[1]) {

              //matched 

              clickedCards[0].classList.add('match');
              clickedCards[1].classList.add('match');
              clickedCards[0].classList.remove('show');
              clickedCards[1].classList.remove('show');
              
              clickedClassNames = [];
              clickedCards = [];
              matchedCards++;
              if (matchedCards === 8) {
                modalScore();
              }     
          }
          else {

              //not match 

              clickedCards[1].classList.add('show');
              clickedCards[1].classList.add('open');
              
              checker = 1;
              starsRewards--;
                    
          }  // end of 2 cards comparison
                  
        }  // end of checking array length for 2 cards
      
    });  //end of clicking of cards 
    
}  //end of for loop 


 
var modal = document.getElementById('modalDisplay');
var reset = document.getElementById('reset');
var close = document.getElementsByClassName('close')[0];

//modal

function modalScore() {
  var timeModal = starTimer.innerText;
  var moveModal = numOfClicks;
  var starModal = 0;
  clearInterval(intervalid);

// checking of stars gained depending on moves

  if (moveModal <= 16) {
    starModal = 4;
  }
  if (moveModal > 16 && moveModal <= 33 ) {
    starModal = 3;
  }
  if (moveModal > 33 && moveModal <= 49 ) {
    starModal = 2;
  }
  if (moveModal > 49 && moveModal <= 65 ) {
    starModal = 1;
  }

//  time spent, clicked cards, stars gained description on the congratulations modal 

  var modalMessage = '  In ' +  timeModal  + ' min(s)/seconds with ' + moveModal +  
                        ' moves.';  
  var modalStars =  'You won: ' + starModal  + ' star(s)!';
  
  $(".win-moves").text(modalMessage);
  $(".win-stars").text(modalStars);

  modal.style.display = 'block';
  
  //console.log(starTimer.innerText);
  //console.log(numOfClicks);
  //console.log(starsRewards);
  //console.log(starModal);
  //console.log(modalMessage);
  //timerToZero()

}

// reset button function to remove the modal, initialize variable and back to a new game

reset.addEventListener('click', function(r) {
modal.style.display = 'none';
r.preventDefault(); 

// closing all the deck of cards for a new game

for (const restartCard of restartCards) {

  restartCard.classList.remove('open');
  restartCard.classList.remove('show');
  restartCard.classList.remove('match');    
  restartCards = [];
  
}
  timerToZero();
  shuffle(arraysToShuffle);

});

// close button to remove modal and back to the previous game

close.addEventListener('click', function() {
  modal.style.display = 'none';
});
