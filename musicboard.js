function music_board(size_int) {
	this.size = size_int
	var board_state = new Array(size_int);
	for (i = 0; i < size_int; i++) {
		board_state[i] = new Array(size_int);
	}

	// Populate board with random values
    for (i = 0; i < size_int; i++) {
        for (j = 0; j < size_int; j++) {
            board_state[i][j] = Math.floor((Math.random() * 2));
        }
    }

    this.board_state = board;
	this.size = size;
}