var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });


function preload() {
	game.load.audio('major_pentatonic', 'Assets/audio/major_pentatonic.ogg');
	game.load.image('dormant_square', 'assets/graphics/dormant_square.png');

}

function create() {

}

function update() {
}