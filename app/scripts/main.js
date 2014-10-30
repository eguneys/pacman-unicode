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
    
    var spawnStream = Bacon.sequentially(800, [
        PacmanGame.GhostColors.ORANGE,
        PacmanGame.GhostColors.BLUE,
        PacmanGame.GhostColors.GREEN,
        PacmanGame.GhostColors.PURPLE,
        PacmanGame.GhostColors.WHITE,
    ]).delay(2500);

    spawnStream.onValue(function(ghost) {
        game.spawnGhost(ghost);
    });

    var ghostStream = Bacon.interval(1000, 0);


    ghostStream.subscribe(function() {
        game.updateGhosts();
        //game.tick();
    });

    var combinedTickStream = new Bacon.Bus();

    combinedTickStream.plug(moveStream);
    combinedTickStream.plug(ghostStream);

    combinedTickStream.subscribe(function() {
        game.tick();
    });


    
    game.start();

    // var timerStream = Bacon.interval(30, 0);
    
    // timerStream.subscribe(function() {
    //     game.tick();
    // });
});
