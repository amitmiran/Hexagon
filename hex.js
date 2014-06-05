angular.module("HexGame", ["Helpers"])
    .controller("BoardController", function ($scope, $board, $players) {
        $board.init();
        $scope.beginJournyHex = null;
        $scope.boardItems = $board.getBoard();
        $scope.showPossibleMoves = function (hexHovered) {
            if ($players.isPlayer(hexHovered) && $board.IsCurrentPlayer(hexHovered)) {
                $board.clearUiStatus("cloneable");
                $board.getMoveOptions(hexHovered,2,hexHovered.index);
            }
        };
        $scope.hideHoverForAll = function () {
            $board.clearUiStatus("cloneable");
        };
        $scope.hideAllSelected = function () {
            $board.clearUiStatus("select");
        };
        $scope.beginJourny = function (hex) {
            if (!$scope.beginJournyHex && $players.getCurrentPlayer() == hex.state) {
                $scope.beginJournyHex = hex;
            }
            else {
                $board.move($scope.beginJournyHex, hex);
                $scope.beginJournyHex = null;
                $scope.hideAllSelected();
            }
        };
        $scope.move = function (hex) {
            $scope.hideAllSelected();
            $board.setSelected(hex);
            $scope.beginJourny(hex);
        };

        $scope.getCurrentPlayer = function () {
            return $players.getCurrentPlayer();
        };
    });

var KnownStates = {
    hole: "hole",
    empty: "empty"
};

function Hex(index, state) {
    this.state = state || "empty";
    this.index = index;
}






