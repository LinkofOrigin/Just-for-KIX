import { Game } from './constants';

const initialState = {
    loggedIn: false,
    ageChosen: false,
    mode: 'none',
    bottomVisible: false,
    activeGame: Game.One,
    currentGamesList: [],
    lists: [
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
    inactiveList: [
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
    ]
};

export default initialState;
