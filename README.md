# Pacman Unicode

Pacman Game built using [BaconJS](http://baconjs.github.io/) and [unicodetiles.js](http://tapiov.net/unicodetiles.js/).

## API

### PacmanGame

#### Functions

PacmanGame(parent): Creates a pacman game object.
start(): Starts the game.
tick(): Updates the game logic, renders the game.
spawnGhost(color): Spawns a new ghost.
updateGhosts(): Updates every ghost in the game.
movePacman(p1V): Moves the pacman in the specified direction.


#### Callbacks

onPacmanMove(moveV): Called if present, when user requests Pacman to move by pressing a key.
