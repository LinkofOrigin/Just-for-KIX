import { Game } from './constants';

const initialState = {
    loggedIn: false,
    showGameSelection: true,
    mode: 'none',
    bottomVisible: false,
    activeGame: Game.One,
    currentGamesList: [],
    lists: [
        {
            name: 'Inactive Games',
            games: [
                Game.Seven,
                Game.Eight,
                Game.Nine,
                Game.Ten,
                Game.Eleven,
                Game.Twelve,
                Game.Thirteen,
                Game.Fourteen,
                Game.Fifteen,
                Game.Sixteen,
                Game.Seventeen,
            ],
        },
        {
            name: 'Young',
            games: [
                Game.One,
                Game.Two,
            ],
        },
        {
            name: 'Middle',
            games: [
                Game.Three,
                Game.Four,
            ],
        },
        {
            name: 'Old',
            games: [
                Game.Five,
                Game.Six,
            ],
        },
    ],
};

export default initialState;
