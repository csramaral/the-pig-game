/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, dice1DOM, gamePlaying, prevDice1, maxPoints;

dice1DOM = document.querySelector('#dice1');
dice2DOM = document.querySelector('#dice2');

newGame();

prevDice1 = 0;
prevDice2 = 0;

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
    
        // 2. Display the result
        dice1DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dice1 + '.png';
        
        dice2DOM.style.display = 'block';
        dice2DOM.src = 'dice-' + dice2 + '.png';
        
    
        // 3. Update the round if result is NOT a 1
        if ((prevDice1 === 6 || prevDice2 === 6 ) && (dice1 === 6 || dice2 === 6 )) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            changeActivePlayer();
        } else if (dice1 !== 1 && dice2 !== 1) {
            roundScores += dice1;
            roundScores += dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        } else {
            changeActivePlayer();
        }
        prevDice1 = dice1;
        prevDice2 = dice2;
    }

});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying) {
        // Updating the GLOBAL score
        scores[activePlayer] += roundScores;
    
        // Updating the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
        // Check if the user won the game
        if(scores[activePlayer] >= maxPoints) {
            finishGame();
        } else {
            // Change active player
            changeActivePlayer();
        }

    }

});

document.querySelector('.btn-new').addEventListener('click', newGame);

function changeActivePlayer() {
    document.querySelector('#current-' + activePlayer).textContent = 0;
    roundScores = 0;

    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer = (activePlayer + 1) % 2;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

    dice1DOM.style.display = 'none';
    dice2DOM.style.display = 'none';
    prevDice1 = 0;
    prevDice2 = 0;
}

function newGame() {
    scores = [0, 0];
    roundScores = 0;
    var pointsInput = document.getElementById('target-points');
    console.log('custom points:' + pointsInput.value);
    if (!pointsInput) {
        maxPoints = 100;
    } else {
        maxPoints = pointsInput.value;
    }
    console.log('Max points: ' + maxPoints);
    pointsInput.value = "";

    document.querySelector('#dice1').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';
    
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // Selects the starting player in a random way
    activePlayer = Math.floor(Math.random() * 10) % 2;
    console.log(activePlayer);

    if(activePlayer === 0) {
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
    } else {
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');

    }
    gamePlaying = true;
}

function finishGame() {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
    dice1DOM.style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
}

