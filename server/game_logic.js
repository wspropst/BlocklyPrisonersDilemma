module.exports = {
    env: {
        // The global state of the game
        players: [], // An array to store the players
        moves: [], // An array to store the moves of the players
        gameMatrix: { // The game matrix
            'cooperate': {
                'cooperate': [2, 2], 
                'defect': [0, 3] 
            },
            'defect': {
                'cooperate': [3, 0], 
                'defect': [1, 1] 
            }
        },
        numberOfRounds: 5, // The number of rounds in the game
        payoff: [0, 0], // The payoff for each player
    },

    // A function to add a player to the game
    addPlayer: function(player) {
        this.env.players.push(player);
    },

    // A function to record a move
    recordMove: function(player, move) {
        this.env.moves.push({player: player, move: move});
    },

    // A function to get the last move of a player
    getLastMove: function(player) {
        for (let i = this.env.moves.length - 1; i >= 0; i--) {
            if (this.env.moves[i].player === player) {
                return this.env.moves[i].move;
            }
        }
        return null;
    },

    // A function to reset the game
    reset: function() {
        this.env.players = [];
        this.env.moves = [];
        this.env.payoff = [0, 0];
    },

    // A function to run the game
    runGame: function(code1, code2) {
        // Reset the game
        this.reset();

        // Run the game for a certain number of rounds
        for (let round = 0; round < this.env.numberOfRounds; round++) {
            // Wrap the code in a function before executing
            let move0 = eval('(function() { let getLastMove = ' + this.getLastMove.toString() + '; let opponent = 1; ' + code1 + '})()');
            let move1 = eval('(function() { let getLastMove = ' + this.getLastMove.toString() + '; let opponent = 0; ' + code2 + '})()');

            // Record the moves
            this.recordMove(0, move0);
            this.recordMove(1, move1);

            // Update the payoff
            let payoff1 = this.env.gameMatrix[move1][move2][0];
            let payoff2 = this.env.gameMatrix[move1][move2][1];
            this.env.payoff[0] += payoff1;
            this.env.payoff[1] += payoff2;
        }

        // Return the result
        return {
            index: this.env.payoff[0] > this.env.payoff[1] ? 0 : 1,
            logs: this.env.moves
        };
    }
};
