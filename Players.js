/**
 * Created by eldar on 03/06/14.
 */
angular.module("HexGame")

    .factory("$players", function () {
        return {
            setPlayerTurn: function (player) {
                this.currentPlayer = player;
            }
        }
    })