import { adultDark } from './constants';
import { grey300, grey700, darkBlack } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default getMuiTheme({
    palette: {
        primary1Color: adultDark,
        // accent1Color: grey300,
        // textColor: darkBlack,
    },
});
