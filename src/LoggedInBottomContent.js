import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import GamesList from './GamesList';

const styles = {
    root: {
        padding: '10px',
    },
    buttonConStyle: {
        marginTop: '30px',
        textAlign: 'center',
    },
    buttonStyle: {
        margin: '0 20px',
    },
};

const initialState = {
    lists: {

    },
};

export default class LoggedInBottomContent extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    render() {
        return (
            <div style = { styles.root }>
                <GamesList
                    title = 'Young'
                    list = { this.props.inactiveGamesYoung }
                    editable
                    handleAddGame = { this.props.handleAddGame }
                    listName = 'inactiveGamesYoung'
                />
                <GamesList
                    title = 'Middle'
                    list = { this.props.inactiveGamesMiddle }
                    editable
                    handleAddGame = { this.props.handleAddGame }
                    listName = 'inactiveGamesMiddle'
                />
                <GamesList
                    title = 'Old'
                    list = { this.props.inactiveGamesOld }
                    editable
                    handleAddGame = { this.props.handleAddGame }
                    listName = 'inactiveGamesOld'
                />
                <div style = { styles.buttonConStyle }>
                    <RaisedButton
                        label = 'Switch to Child Mode'
                        style = { styles.buttonStyle }
                        onClick = { this.props.handleModeSwitch }
                    />
                    <RaisedButton
                        label = 'Log Out'
                        style = { styles.buttonStyle }
                        onClick = { this.props.handleLogout }
                    />
                </div>
            </div>
        );
    }
}

LoggedInBottomContent.propTypes = {
    inactiveGamesYoung: PropTypes.array.isRequired,
    inactiveGamesMiddle: PropTypes.array.isRequired,
    inactiveGamesOld: PropTypes.array.isRequired,
    handleLogout: PropTypes.func.isRequired,
    handleModeSwitch: PropTypes.func.isRequired,
};
