describe("Board", function () {

    var directiveStr = '<li     class="hex"></li>';

    var element;
    var $scope;
    var compile;
    var board;
    beforeEach(module("Helpers"))
    beforeEach(module("HexGame"))
    beforeEach(inject(function ($compile, $rootScope, $board) {
        $scope = $rootScope;
        element = angular.element(directiveStr);
        compile = $compile;
        console.log("before each");
        board = $board;
        board.init();

    }));
    afterEach(function () {
        console.log("after each");
    });


    it("should not move if same state", function () {

        var hex1 = new Hex(1);
        var hex2 = new Hex(2);
        hex1.state = hex2.state = "somestate";

        var result = board.move(hex1, hex2);
        $('body').append(element);
        expect(result.hasMoved).toEqual(false);
    });

    it("should not move if black hole", function () {

        var hex1 = new Hex(1);
        hex1.state = "sheker";
        var hex2 = new Hex(2);
        hex2.state = KnownStates.hole;
        var result = board.move(hex1, hex2);
        $('body').append(element);
        expect(result.hasMoved).toEqual(false);
    });
    it("should not move", function () {

        var hex1 = new Hex(1);
        hex1.state = "sdfsdf";

        var hex2 = new Hex(4);
        var result = board.move(hex1, hex2);


        $('body').append(element);
        expect(result.hasMoved).toEqual(false);
    });


    it("should move", function () {

        var hex1 = new Hex(1);
        hex1.state = "sdfsdf";

        var hex2 = new Hex(2);
        var result = board.move(hex1, hex2);
        $('body').append(element);
        expect(result.hasMoved).toEqual(true);
        expect(hex2.state).toEqual(hex1.state);
    });

    it("should return hex move options", function () {

        var hex1 = new Hex(1);
        var result = board.getMoveOptions(hex1);

        expect(result[0].index).toEqual(2);
        expect(result[1].index).toEqual(3);
    });


    it("should return hex move option withoutholes", function () {

        var hex1 = new Hex(2);
        var result = board.getMoveOptions(hex1);
        expect(2).toEqual(result.length);
    });


});





















