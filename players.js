/**
 * Created by amit on 03/06/14.
 */
angular.module("HexGame")

    .factory("$players", function () {
        var players = ["red", "blue"];
        var usedPlayers = 0;
        var currentPlayer = players[0];
        return {
            getAvailablePlayer: function () {
                var player = players[usedPlayers];
                usedPlayers++;
                return player;
            },
            isPlayer: function (hex) {

                var isPlayer = false;
                angular.forEach(players, function (player) {
                    if (hex.state == player) {
                        isPlayer = true;
                    }
                });
                return isPlayer;
            },
            nextTurn: function () {
                for (var i = 0; i < players.length; i++) {
                    if (players[i] == currentPlayer) {
                        if (i + 1 >= players.length) {
                            currentPlayer = players[0];
                        }
                        else {
                            currentPlayer = players[i + 1];
                        }
                        break;
                    }
                }
            },
            getCurrentPlayer: function () {
                return currentPlayer;
            }
        };
    });