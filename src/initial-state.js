import { Game } from './constants';

const initialState = {
    loggedIn: false,
    ageChosen: false,
    mode: 'none',
    bottomVisible: false,
    activeGames: [],
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
};

export default initialState;
