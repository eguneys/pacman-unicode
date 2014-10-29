/* global Bacon, PacmanGame */
'use strict';

$(document).ready(function() {
    var game = new PacmanGame($('.game-area')[0]);


    var moveStream = Bacon.fromBinder(function(sink) {
        game.onPacmanMove = function(moveV) {
            sink(moveV);
        };
    });

    moveStream.onValue(function(moveV) {
        game.movePacman(moveV);
        //game.tick();
    });
    
    var ghostStream = Bacon.sequentially(800, [
        PacmanGame.GhostColors.ORANGE,
        PacmanGame.GhostColors.BLUE,
        PacmanGame.GhostColors.GREEN,
        PacmanGame.GhostColors.PURPLE,
        PacmanGame.GhostColors.WHITE,
    ]).delay(2500);

    ghostStream.onValue(function(ghost) {
        game.spawnGhost(ghost);
    });

    var updateStream = Bacon.interval(1000, 0);


    updateStream.subscribe(function() {
        game.updateGame();
        //game.tick();
    });

    var combinedTickStream = new Bacon.Bus();

    combinedTickStream.plug(moveStream);
    combinedTickStream.plug(updateStream);

    combinedTickStream.subscribe(function() {
        game.tick();
    });


    
    game.start();

    // var timerStream = Bacon.interval(30, 0);
    
    // timerStream.subscribe(function() {
    //     game.tick();
    // });
});
