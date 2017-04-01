import React, { Component, PropTypes } from 'react';

import GamesList from './GamesList';

export default class LoggedInBottomContent extends Component {
    render() {
        return (
            <div>
                <GamesList title = 'Young' list = { this.props.inactiveGamesList } />
                <GamesList title = 'Middle' list = { this.props.inactiveGamesList } />
                <GamesList title = 'Old' list = { this.props.inactiveGamesList } />
                <button type = 'submit' onClick = { this.props.handleLogout }>
                    log out!
                </button>
            </div>
        );
    }
}

LoggedInBottomContent.propTypes = {
    inactiveGamesList: PropTypes.array.isRequired,
    handleLogout: PropTypes.func.isRequired,
};
