import {
    lightGreen200,
    lightGreen400,
    lightGreen700,
    blue200,
    blue400,
    blue700,
} from 'material-ui/styles/colors';

export const gameIconSideLengthVH = 8;
export const gameIconMarginVH = 1;

export const gameListIconSideLengthVH = 14;
export const gameListIconMarginVH = 1;

export const adultLight = blue200; // '#2150B5';
export const adultMiddle = blue400;
export const adultDark = blue700;
export const childLight = lightGreen200; // '#3BED50'
export const childMiddle = lightGreen400;
export const childDark = lightGreen700;

export const Game = {
    One: 'one',
    Two: 'two',
    Three: 'three',
    Four: 'four',
    Five: 'five',
    Six: 'six',
    Seven: 'seven',
    Eight: 'eight',
    Nine: 'nine',
    Ten: 'ten',
    Eleven: 'eleven',
    Twelve: 'twelve',
    Thirteen: 'thirteen',
    Fourteen: 'fourteen',
    Fifteen: 'fifteen',
    Sixteen: 'sixteen',
    Seventeen: 'seventeen',
};

export const GameImage = new Map(
    [
        [Game.One, require('./img/image_1.png')],
        [Game.Two, require('./img/image_2.png')],
        [Game.Three, require('./img/image_3.png')],
        [Game.Four, require('./img/image_4.png')],
        [Game.Five, require('./img/image_5.png')],
        [Game.Six, require('./img/image_6.png')],
        [Game.Seven, require('./img/image_7.png')],
        [Game.Eight, require('./img/image_8.png')],
        [Game.Nine, require('./img/image_9.png')],
        [Game.Ten, require('./img/image_10.png')],
        [Game.Eleven, require('./img/image_11.png')],
        [Game.Twelve, require('./img/image_12.png')],
        [Game.Thirteen, require('./img/image_13.png')],
        [Game.Fourteen, require('./img/image_14.png')],
        [Game.Fifteen, require('./img/image_15.png')],
        [Game.Sixteen, require('./img/image_16.png')],
        [Game.Seventeen, require('./img/image_17.png')],
    ],
);
