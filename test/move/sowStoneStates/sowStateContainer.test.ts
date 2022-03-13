import {SowStateContainer} from "../../../src/move/sowStoneStates/sowStateContainer";
import {Game} from "../../../src/game/gameModels";
import {ERROR_MESSAGES} from "../../../src/lib/error/errorConstants";

const players = [
    "622e3a3a008e0123a0b076a2",
    "622e3a78008e0123a0b076a4",
];

function createDefaultGame() {
    // @ts-ignore
    return new Game(players, 6, 6, false, 0);
}

describe("SowStateContainer", () => {
    describe("makeMove", () => {

        test("should throw exception if selected pit is out of area", async () => {
            expect(() => new SowStateContainer(createDefaultGame(), 7)).toThrow(ERROR_MESSAGES.moveInvalid);
        });

        test("should throw exception if selected pit stone count is 0", async () => {
            const game = createDefaultGame();
            game.board.pits[game.turnPlayerIndex][0] = 0;
            const stateContainer = new SowStateContainer(game, 0);
            expect(() => stateContainer.makeMove()).toThrow(ERROR_MESSAGES.moveInvalid);
        });

        test("Last stone lands on home pit. Turn should not be changed.", async () => {
            const game = createDefaultGame();
            const stateContainer = new SowStateContainer(game, 0);

            stateContainer.makeMove();
            expect(game.board.homes).toEqual([1, 0]);
            expect(game.board.pits).toEqual([[0, 7, 7, 7, 7, 7], [6,6,6,6,6,6]]);
            expect(game.isFinished).toEqual(false);
            expect(game.turnPlayerIndex).toEqual(0);
        });

        test("Last stone lands on active pit. Turn should be changed.", async () => {
            const game = createDefaultGame();
            game.board.pits[game.turnPlayerIndex] = [6, 6, 3, 6, 6, 6];
            const stateContainer = new SowStateContainer(game, 2);

            stateContainer.makeMove();
            expect(game.board.homes).toEqual([0, 0]);
            expect(game.board.pits).toEqual([[6, 6, 0, 7, 7, 7], [6,6,6,6,6,6]]);
            expect(game.isFinished).toEqual(false);
            expect(game.turnPlayerIndex).toEqual(1);
        });

        test("Last stone lands on active not empty pit. By passing all areas..", async () => {
            const game = createDefaultGame();
            game.turnPlayerIndex = 1;
            game.board.pits[game.turnPlayerIndex] = [0, 0, 1, 0, 11, 0];
            const stateContainer = new SowStateContainer(game, 4);

            stateContainer.makeMove();
            expect(game.board.homes).toEqual([0, 1]);
            expect(game.board.pits).toEqual([[7, 7, 7, 7, 7, 7], [1,1,2,0,0,1]]);
            expect(game.isFinished).toEqual(false);
            expect(game.turnPlayerIndex).toEqual(0);
        });

        test("Last stone lands on active pit. With little movement.", async () => {
            const game = createDefaultGame();
            game.turnPlayerIndex = 1;
            game.board.pits[game.turnPlayerIndex] = [1, 0, 0, 1, 2, 0];
            const stateContainer = new SowStateContainer(game, 0);

            stateContainer.makeMove();
            expect(game.board.homes).toEqual([0, 7]);
            expect(game.board.pits).toEqual([[6, 0, 6, 6, 6, 6], [0, 0, 0, 1, 2, 0]]);
            expect(game.isFinished).toEqual(false);
            expect(game.turnPlayerIndex).toEqual(0);
        });

        test("Last stone lands on active empty pit. By passing all areas..", async () => {
            const game = createDefaultGame();
            game.turnPlayerIndex = 1;
            game.board.pits[game.turnPlayerIndex] = [0, 0, 1, 0, 11, 0];
            const stateContainer = new SowStateContainer(game, 4);

            stateContainer.makeMove();
            expect(game.board.homes).toEqual([0, 1]);
            expect(game.board.pits).toEqual([[7, 7, 7, 7, 7, 7], [1,1,2,0,0,1]]);
            expect(game.isFinished).toEqual(false);
            expect(game.turnPlayerIndex).toEqual(0);
        });

        test("Last stone lands on opponent empty pit. Turn should be changed.", async () => {
            const game = createDefaultGame();
            game.turnPlayerIndex = 0;
            game.board.pits = [[6, 6, 6, 6, 6, 3], [ 1, 0, 0, 0, 0, 0 ]];
            const stateContainer = new SowStateContainer(game, 5);

            stateContainer.makeMove();
            expect(game.board.homes).toEqual([1, 0]);
            expect(game.board.pits).toEqual([[6, 6, 6, 6, 6, 0], [2, 1, 0, 0, 0, 0]]);
            expect(game.isFinished).toEqual(false);
            expect(game.turnPlayerIndex).toEqual(1);
        });

        test("Finish game by landing on active pit. First get opposite stones." +
            "Then game finished and points will be calculated.", async () => {
            const game = createDefaultGame();
            game.turnPlayerIndex = 0;
            game.board.homes = [13, 3];
            game.board.pits = [[1, 0, 0, 0, 0, 0], [0, 11, 0, 8, 2, 3]];

            const stateContainer = new SowStateContainer(game, 0);
            stateContainer.makeMove();
            expect(game.board.homes).toEqual([25, 16]);
            expect(game.board.pits).toEqual([[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]]);
            expect(game.isFinished).toEqual(true);
            // Turn is not important...
        });
    });
});