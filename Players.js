/**
 * Created by amit on 03/06/14.
 */
angular.module("HexGame")

    .factory("$players", function () {
        var players = ["red", "blue"];
        var usedPlayers = 0;
        return {
            setPlayerTurn: function (player) {
                this.currentPlayer = player;
            },
            getAvailablePlayers: function () {
                var player = players[usedPlayers];
                usedPlayers++;
                return player;
            }
        }
    });