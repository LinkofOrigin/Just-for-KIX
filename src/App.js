import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import JustForKix from './JustForKix';
import muiTheme from './mui-theme';

// example of a 'stateless' react component (no 'this').
const App = () => {
    return (
        <MuiThemeProvider muiTheme = { muiTheme }>
            <JustForKix />
        </MuiThemeProvider>
    );
};

export default App;
