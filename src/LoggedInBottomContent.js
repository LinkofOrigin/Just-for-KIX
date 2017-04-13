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
                    list = { this.props.lists[0] }
                    editable
                    handleAddGame = { this.props.handleAddGame }
                    listName = 'inactiveGamesYoung'
                />
                <GamesList
                    title = 'Middle'
                    list = { this.props.lists[1] }
                    editable
                    handleAddGame = { this.props.handleAddGame }
                    listName = 'inactiveGamesMiddle'
                />
                <GamesList
                    title = 'Old'
                    list = { this.props.lists[2] }
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
    lists: PropTypes.array.isRequired,
    handleLogout: PropTypes.func.isRequired,
    handleModeSwitch: PropTypes.func.isRequired,
    handleAddGame: PropTypes.func.isRequred,
};
