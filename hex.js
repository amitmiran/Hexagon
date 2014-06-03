angular.module("HexGame", ["Helpers"])
    .controller("BoardController", function ($scope, $board) {
        $board.init();
        $scope.boardItems = $board.getBoard();
        $scope.showPossibleMoves = function (hexHovered) {
            $board.getMoveOptions(hexHovered);


        };
        $scope.hideHoverForAll = function () {
            $board.clearUiStatus("cloneable");

        };
        $scope.move = function (hex) {
            hex.isSelected = !hex.isSelected;
        }
    });

var KnownStates = {
    hole: "hole",
    empty: "empty"
};

function Hex(index, state) {
    this.state = state || "empty";
    this.index = index;
}






