function music_board(size) {
	var board_state = new Array(size);
	for (i = 0; i < size; i++) {
		board_state[i] = new Array(size);
	}

	// Populate board with random values
    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            if (i===j) {
                board_state[i][j] = 1
            } else {
                board_state[i][j] = 0
            }
            //board_state[i][j] = Math.floor((Math.random() * 2));
        }
    }

    this.board = board_state;
}