function music_board(size) {
	var board = new Array(size);
	for (i = 0; i < size; i++) {
		board[i] = new Array(size);
	}

	// Populate board with random values
    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            board[i][j] = Math.floor((Math.random() * 2));
        }
    }

    this.board_state = board;
	this.size = size;
}