//Farris Kabalaoui
//Web Application Architechture
//Dr.Roberson
//01/17/2022
// cards array holds all cards
let card = document.getElementsByClassName('card');
let cards = [...card];

// deck of all cards in game
const deck = document.getElementById('card-deck');

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName('match');

// array for opened cards
var openedCards = [];

// shuffle function
// @description shuffles cards
// @param {array}
// @returns shuffledarray
//loop  over  the  array  and  swap  each  element  with  another  random  spot  in  the  array  here. 
//updating the array that was passed in.
function shuffle(array){
    var thisIndex = array.length, indexRandom;
    //while there are stuff to shuffle
    while (thisIndex !== 0) {
        //pick an element still there
        indexRandom = Math.floor(Math.random() * thisIndex);
        thisIndex -= 1;
        // swap it with the current element 
        [array[thisIndex] , array[indexRandom]]=
        [array[indexRandom],array[thisIndex]];
       
    }
    //return the array
    return array;
}

// @description starts a new game when refreshed / loads
document.body.onload = startGame();


// startGame function
// @description function to start a new play 
// @param {}
// @returns nothing
function startGame(){
    //empty the openCards Array
    openedCards = [];
    //shuffle the deck of cards
    cards = shuffle(cards);



    for (var i = 0; i < cards.length; i++){
        // empty out the deck element
         openedCards = [];
        //insert cards back after shuffle
        [].forEach.call(cards, function(webfont) {
        deck.append(webfont);
      });
      
    
        
        //Remove the show, open, match, and disabled CSS classes from all the cards 
        cards[i].classList.remove("show", "open", "match", "disabled");
    }

}
// displayCard function
// @description toggles open, show, and disables classes to display cards
// @param {}
// @returns nothing

var displayCard = function(){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
}


// cardOpen function
// @description add opened cards to OpenedCards list and check if cards are match or not
// @param {}
// @returns nothing
function cardOpen(){
    //add the card
    openedCards.push(this);
    var length = openedCards.length;
    //If there are two opened cards AND they match call the matched function 
    //else
    
    if((length === 2) && (openedCards[0].type === openedCards[1].type)){
            matched();
    } else{
        //If there are two opened cards and they don’t match call the unmatched function 
            unmatched();
    }
};


// matched function
// @description update cards when cards match
// @param {}
// @returns nothing
function matched(){
    // add match and disable classes to the opened cards
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    // remove show open and no-event, + unmatched in order to make inccorrect matches work. 
    openedCards[0].classList.remove("show", "open", "no-event","unmatched");
    openedCards[1].classList.remove("show", "open", "no-event","unmatched");
    //empty array of cards
    openedCards = [];


}

// unmatched function
// description update cards when cards don't match
// @param {}
// @returns nothing
function unmatched(){
    //set the unmatched class on open cards 
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    //call disable function
    disable();
    //set timout with time of 1100
    setTimeout(function(){
        //set show, open, and no event classes on opened cards
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        //call enable 
        enable();
        //empty array of cards
    openedCards = [];
    },1100);
}

// disable function
// @description disable cards temporarily
// @param {}
// @returns nothing

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

// enable function
// @description enable cards and disable matched cards
// @param {}
// @returns nothing
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

//Write a loop to attach two event listeners to each card: one for displayCard and one for cardOpen 
// loop to add event listeners to each card to call displayCard and cardOpen functions
// for loop < cards.length

for (var i = 0; i < cards.length; i++){
    card = cards[i];
    //event listener for displayCard
    card.addEventListener("click", displayCard);
    //event listener for cardOpen
    card.addEventListener("click", cardOpen);
};