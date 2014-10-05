// these are hard wired but meh who cares for now
window.onload = function() {
	var TILE_WIDTH = 100
	var TILE_HEIGHT = 100;

	var CELL_WIDTH = 25;
	var CELL_HEIGHT = 25;

	var SIZE = 16;
	var board_state = new music_board(SIZE);

	var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

	var frame_counter = 0;
	var column_counter = 0;
	
	LENGTH = 250

	var notes = new Howl({
			urls:['assets/audio/major_pentatonic_eighths_marimba.ogg'],
			volume:0.5,
			sprite:{
				0:[0,LENGTH],
				1:[1000,LENGTH],
				2:[2000,LENGTH],
				3:[3000,LENGTH],
				4:[4000,LENGTH],
				5:[5000,LENGTH],
				6:[6000,LENGTH],
				7:[7000,LENGTH],
				8:[8000,LENGTH],
				9:[9000,LENGTH],
				10:[10000,LENGTH],
				11:[11000,LENGTH],
				12:[12000,LENGTH],
				13:[13000,LENGTH],
				14:[14000,LENGTH],
				15:[15000,LENGTH]
			}
		});


	function preload() {
		//game.load.audio('major_pentatonic', 'assets/audio/outputMozart.wav');
		game.load.image('dormant_square', 'assets/images/dormant_square.png');
		game.load.image('active_square', 'assets/images/active_square.png');

	}

	function create() {
		alert(board_state.board);

		this.game.board_sprites = draw_board(board_state.board)

		/*
		fx = game.add.audio('major_pentatonic');
		fx.play();

		fx = setup_notes();
		fx.play();
		*/
	}

	function update() {
		
		frame_counter = frame_counter % 15;
		column_counter = column_counter % SIZE;
		
		if (frame_counter === 0) {
			//alert(column_counter);
			for (i = 0; i < SIZE; i ++) {
				if (board_state.board[i][column_counter] == 1) {
					notes.play(i.toString());
					//notes.fade(1,0,500);
				}
			}
			column_counter += 1;
		}
		
		frame_counter += 1;
	}
		
	/**
		frame_counter = frame_counter % 60;
		column_counter = column_counter % SIZE;
		
		if (frame_counter == 0) {
			for (i = 0; i < SIZE; i ++) {
				if (board_state.board[i][column_counter] == 1) {
					fx.play(i.toString());
					alert(column_counter);
				}
			}
		}
		
		
		frame_counter += 1;
		column_counter += 1;
		**/
	

	function setup_notes() {
		fx = game.add.audio('major_pentatonic');
		for (i = 0; i < SIZE; i++) {
			key = i.toString();
			start = i;
			duration = i;
			fx.addMarker(key, start, duration);
		}
		return fx;
	}

	function draw_board(board) {
		var sprites_array = [];
		for (column = 0; column < SIZE; column++) {
			sprite_column = [];
			for (row = 0; row < SIZE; row++) {
				sprite_column.push(draw_cell(board[column][row], column, row));
			}
			sprites_array.push(sprite_column);
		}
		return sprites_array;
	}

	function draw_cell(value, row, column) {
		var cell;
		if (value === 0) {
			cell = game.add.sprite(column * CELL_WIDTH, row * CELL_HEIGHT, 'dormant_square');
		} else {
			cell = game.add.sprite(column * CELL_WIDTH, row * CELL_HEIGHT, 'active_square');
		}

		cell.scale.x = CELL_WIDTH/TILE_WIDTH;
		cell.scale.y = CELL_HEIGHT/TILE_HEIGHT;
		return cell;
	}
}