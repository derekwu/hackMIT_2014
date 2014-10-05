// these are hard wired but meh who cares for now
window.onload = function() {

	function getText() {
		var text = document.getElementById("textbox1").value
		alert(text)
	}

	var TILE_WIDTH = 100
	var TILE_HEIGHT = 100;

	var CELL_WIDTH = 25;
	var CELL_HEIGHT = 25;

	var SIZE = 16;
	var board_state = new music_board(SIZE);

	var game = new Phaser.Game(CELL_WIDTH * SIZE, CELL_HEIGHT * SIZE, Phaser.AUTO, '#game', { preload: preload, create: create, update: update });

	var frame_counter = 0;
	var column_counter = 0;
	var async_counter = 0
	
	var jobIDs = [];
	var binaryArray = [];
	var totalQueries = 0;
	var num_ids_finished = 0;
	var update_complete = false;

	LENGTH = 250
	INTERVALS = 500;

	var notes = new Howl({
			urls:['assets/audio/major_pentatonic_eighths_marimba.ogg'],
			volume:0.5,
			sprite:{
				0:[INTERVALS * 0,LENGTH],
				1:[INTERVALS * 1,LENGTH],
				2:[INTERVALS * 2,LENGTH],
				3:[INTERVALS * 3,LENGTH],
				4:[INTERVALS * 4,LENGTH],
				5:[INTERVALS * 5,LENGTH],
				6:[INTERVALS * 6,LENGTH],
				7:[INTERVALS * 7,LENGTH],
				8:[INTERVALS * 8,LENGTH],
				9:[INTERVALS * 9,LENGTH],
				10:[INTERVALS * 10,LENGTH],
				11:[INTERVALS * 11,LENGTH],
				12:[INTERVALS * 12,LENGTH],
				13:[INTERVALS * 13,LENGTH],
				14:[INTERVALS * 14,LENGTH],
				15:[INTERVALS * 15,LENGTH]
			}
		});


	function preload() {
		game.load.image('dormant_square', 'assets/images/dormant_square.png');
		game.load.image('active_square', 'assets/images/active_square.png');
		game.load.image('highlight_dormant_square', 'assets/images/highlight_dormant_square.png');
		game.load.image('highlight_active_square', 'assets/images/highlight_active_square.png');

		setup();

	}

	function create() {
		this.game.board_sprites = draw_board(board_state.board)
	}
	
	function update() {
		
		frame_counter = frame_counter % 15;
		column_counter = column_counter % SIZE;
		async_counter = async_counter % 15;
		if (async_counter === 0) {

			var isComplete = true

			if (totalQueries > 0) {
				for (var i = 0; i < jobIDs.length; i++) {
					obj_tuple = jobIDs[i];
					if (!obj_tuple[1]) {
						json_response = asynchronous_get(obj_tuple[0]);
						if (json_response.status === "finished") {
							score = json_response.actions[0].result.aggregate.score;
							sentiment = score2sentiment(score);
							binaryArray[i]=sentiment;
							// TODO fix
							obj_tuple[1] = true;
						} else {
							isComplete = false
						}

					}
				}
			}

			if (totalQueries > 0 && isComplete) {
				totalQueries = 0;
				populate_board(binaryArray);

			}
		}
		
		if (frame_counter === 0) {
			for (i = 0; i < SIZE; i ++) {
				prev_column_index = (column_counter - 1) % SIZE
				if (prev_column_index === -1) {
					prev_column_index = SIZE -1
				}
				update_cell(board_state.board[i][prev_column_index], false, i, prev_column_index);
				update_cell(board_state.board[i][column_counter], true, i, column_counter);
				if (board_state.board[i][column_counter] == 1) {
					notes.play((SIZE-1-i).toString());
				}
			}
			column_counter += 1;
		}
		frame_counter += 1;
		async_counter += 1;
	}
	
	function populate_board(binary_array) {
		var result_length = binary_array.length;
		var binary_index = 0;
		for (i = 0; i < SIZE; i++) {
			for (j = 0; j < SIZE; j++) {
				board_state.board[i][j] = binary_array[binary_index];
				update_cell(board_state.board[i][j], false, i, j)
				binary_index = (binary_index + 1) % result_length;
			}
		}
	}

	function score2sentiment(score) {
		if (score >= .5) {
			return 1
		} else {
			return 0
		};
	}
	
	function setup() {
		$("#button1").click(function() {
			var text = $("#textbox1").val();
            queries = text.split(/[?.!]/);
			num_ids_finished = 0;
			update_complete = false;
			text_processing(queries);
        });
	}
	
	function text_processing(queries) {
		jobIDs = [];
		totalQueries = 0
		for (j = 0; j < queries.length; j++) {
			if (queries[j].length > 0) {
				jobID_obj = sentiment_analysis(queries[j], "asynchronous");
				jobID = jobID_obj.jobID;
				jobIDs.push([jobID, false]);
				totalQueries ++;
			}
		}
		binaryArray = new Array(totalQueries);
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

	function update_cell(value, is_highlighted, row, column) {

		cell = game.board_sprites[row][column];
		if (value === 1 && is_highlighted) {
			cell.loadTexture('highlight_active_square');
		} else if (value === 0 && is_highlighted) {
			cell.loadTexture('highlight_dormant_square');
		} else if (value === 1 && !is_highlighted) {
			cell.loadTexture('active_square');
		} else if (value === 0 && !is_highlighted) {
			cell.loadTexture('dormant_square');
		}
	}
}