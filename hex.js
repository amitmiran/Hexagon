angular.module("HexGame", ["Helpers"])


    .controller("BoardController", function ($scope, $board) {


        $board.init();

        $scope.boardItems = $board.getBoard();
        $scope.showPossibleMoves = function (hexHovered) {
            $board.getMoveOptions(hexHovered);


        }

        $scope.hideHoverForAll = function () {
            $board.clearUiStatus("cloneable");

        };


        $scope.move = function (hex) {
            hex.isSelected = true;

        }


    })


    .factory("$board", function () {
        var boardSize = 4;
        var boardItems = [];
        var boardMap = {};


        var graph = {
            "1_2": true,
            "1_3": true,
            "2_7": true,
            "3_8": true,
            "3_5": true,
            "8_5": true,
            "9_5": true,
            "9_6": true,
            "10_6": true
        };
        var getJoinedKey = function (hex1, hex2) {
            return hex1.index + "_" + hex2.index;
        }
        return {

            init: function () {
                var index = 1;
                var itemsInRow = 1;
                for (var i = 0; i < boardSize; i++) {

                    var row = [];
                    for (var j = 0; j < itemsInRow; j++) {

                        var state = undefined;


                        if (index == 1) {
                            state = "red";
                        }

                        if (index == 9) {
                            state = "blue";
                        }
                        var hex = new Hex(index, state);
                        if (hex.index == 4) {
                            hex.state = KnownStates.hole;
                        }
                        row.push(hex);

                        boardMap[index] = hex;

                        index++;
                    }
                    boardItems.push(row);
                    itemsInRow = itemsInRow + 1;
                }
            },
            getBoard: function () {
                return boardItems;
            },
            getHexByIndex: function (index) {

                var x = boardMap[index];
                return x;

            },
            move: function (hex1, hex2) {
                var isLegalMove = this.isLegalMove(hex1, hex2);
                if (hex1.state == hex2.state || hex2.state == KnownStates.hole || !isLegalMove) return {hasMoved: false};

                //do move
                hex2.state = hex1.state;
                return  {hasMoved: true};

            },
            getMoveOptions: function (hex) {
                var _that = this;
                var hexes = []

                angular.forEach(graph, function (object, key) {

                    var findArcs = function (str_regex) {
                        var patt = new RegExp(str_regex);

                        var res = patt.exec(key);
                        if (res) {
                            var hex_index = res[1];
                            var hex_obj = _that.getHexByIndex(hex_index);
                            if (hex_obj && hex_obj.state != KnownStates.hole)
                                hexes.push(hex_obj);


                        }
                    }

                    findArcs("^(.*)_" + hex.index + "$");
                    findArcs("^" + hex.index + "_(.*)$");


                });

                this.modifyStatus(hexes);

            },
            modifyStatus: function (hexes) {
                this.clearUiStatus("cloneable");
                angular.forEach(hexes, function (hex) {
                    hex.uiStatus = "cloneable";
                });
            },
            isLegalMove: function (hex1, hex2) {
                var key = getJoinedKey(hex1, hex2);
                var key_reverse = getJoinedKey(hex2, hex1);
                return graph[key] || graph[key_reverse] || false;
            },
            clearUiStatus: function (statusToClear) {
                angular.forEach(boardMap, function (hex) {
                    if (hex.uiStatus == statusToClear)
                        hex.uiStatus = "";

                });

            }

        }
    })


var KnownStates = {
    hole: "hole",
    empty: "empty"
}

function Hex(index, state) {

    this.state = state || "empty";
    this.index = index;


}






