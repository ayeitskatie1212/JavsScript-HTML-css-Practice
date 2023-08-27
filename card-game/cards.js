let assignedCards = [0, 1, 2, 3, 4, 5];
let oneFlipped = false; // Tracks if one cards has already been flipped
let cardFaces = [
  "1clubs.png",
  "1hearts.png",
  "2clubs.png",
  "2hearts.png",
  "3clubs.png",
  "3hearts.png",
];
let flippedCards = [];
let card1 = {
  cardElement: document.getElementById("card1"),
  clickable: true,
  src: "back.png",
  assignedCardIndex: assignedCards[0],
};
let card2 = {
  cardElement: document.getElementById("card2"),
  clickable: true,
  src: "back.png",
  assignedCardIndex: assignedCards[1],
};
let card3 = {
  cardElement: document.getElementById("card3"),
  clickable: true,
  src: "back.png",
  assignedCardIndex: assignedCards[2],
};
let card4 = {
  cardElement: document.getElementById("card4"),
  clickable: true,
  src: "back.png",
  assignedCardIndex: assignedCards[3],
};
let card5 = {
  cardElement: document.getElementById("card5"),
  clickable: true,
  src: "back.png",
  assignedCardIndex: assignedCards[4],
};
let card6 = {
  cardElement: document.getElementById("card6"),
  clickable: true,
  src: "back.png",
  assignedCardIndex: assignedCards[5],
};
cards = [card1, card2, card3, card4, card5, card6];
let timeoutID = setTimeout(()=>{}, 0);

window.onload = function () {
  restartGame();
};
document.getElementById("restartButton").addEventListener("click", restartGame);
card1.cardElement.addEventListener("click", processClick.bind(card1));
card2.cardElement.addEventListener("click", processClick.bind(card2));
card3.cardElement.addEventListener("click", processClick.bind(card3));
card4.cardElement.addEventListener("click", processClick.bind(card4));
card5.cardElement.addEventListener("click", processClick.bind(card5));
card6.cardElement.addEventListener("click", processClick.bind(card6));

function restartGame() {
  clearTimeout(timeoutID);
  randomizeAssignments(assignedCards);
  cards.forEach((card) => resetCard(card));
  numClicked = 0;
  flippedCards = [];
}

// When a card is clicked, check if its clickable. If so, act accordingly
function processClick() {
  if (this.clickable && this.src === "back.png") {
    this.src = cardFaces[this.assignedCardIndex];
    this.cardElement.src = this.src;
    flippedCards.push(this);
    if (oneFlipped) {
      tryToMatch();
    } else {
      oneFlipped = true;
    }
  }
}

// Reset the cards back to their original state
function resetCard(card) {
  card.src = "back.png";
  card.cardElement.src = "back.png";
  card.clickable = true;
}

function tryToMatch() {
    console.log("trying to match");
  let matchMade = false;
  let flipped1 = flippedCards[0];
  let flipped2 = flippedCards[1];
  let flippedIndices = [flipped1.assignedCardIndex, flipped2.assignedCardIndex];
  if (
    (flippedIndices.includes(0) && flippedIndices.includes(1)) ||
    (flippedIndices.includes(2) && flippedIndices.includes(3)) ||
    (flippedIndices.includes(4) && flippedIndices.includes(5))
  ) {
    matchMade = true;
  }
  // Make them all unclickable
  let clickableCards = [];
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].clickable) {
      clickableCards.push(cards[i]);
      cards[i].clickable = false;
    }
  }

  // After 1.5 seconds, make them clickable again, and remove or flip them back
  console.log("before timeout");
  console.log(matchMade)
  timeoutID = setTimeout(function() {
    console.log("after timeout");
    console.log(matchMade)
    clickableCards.forEach((card) => {
      card.clickable = true;
    });
    if (matchMade) {
      // Change the cards to blank, and set as unclickable
      console.log("Match!");
      flipped1.cardElement.src = "clear.png";
      flipped2.cardElement.src = "clear.png";
      flipped1.clickable = false;
      flipped2.clickable = false;
      flipped1.src = "clear.png";
      flipped2.src = "clear.png";
    } else {
      console.log("no match!");
      // Flip the cards back to standard state
      flipped1.cardElement.src = "back.png";
      flipped2.cardElement.src = "back.png";
      flipped1.clickable = true;
      flipped2.clickable = true;
      flipped1.src = "back.png";
      flipped2.src = "back.png";
    }
  }, 1500);

  flippedCards = [];
  oneFlipped = false;
  return matchMade;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

function randomizeAssignments(assignedCards) {
  //TODO: randomize the order of the cards
    for (var i = 0; i < assignedCards.length; i++) {
        var randomIndex = getRandomInt(0, assignedCards.length);
        var temp = assignedCards[i];
        assignedCards[i] = assignedCards[randomIndex];
        assignedCards[randomIndex] = temp;
    }
    for (var i = 0; i < cards.length; i++) {
        cards[i].assignedCardIndex = assignedCards[i];
    }
  return assignedCards;
}
