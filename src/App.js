import React from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import JustForKix from './JustForKix';

// example of a 'stateless' react component (no 'this').
const App = () => {
    return (
        <MuiThemeProvider muiTheme = { getMuiTheme(lightBaseTheme) }>
            <JustForKix />
        </MuiThemeProvider>
    );
};

export default App;
