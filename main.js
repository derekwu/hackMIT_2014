var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });


function preload() {
}

function create() {
	board_state = new music_board(16);
	alert(board_state.board);
}

function update() {
}