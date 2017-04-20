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
    render() {
        return (
            <div style = { styles.root }>
                {
                    this.props.lists.map((list, index) =>
                        <GamesList
                            key = { list.name + index }
                            title = { list.name }
                            list = { list.games }
                            listName = { list.name }
                            editable = { true }
                            handleAddGame= { this.props.handleAddGame }
                            handleTitleEdit = { this.props.handleTitleEdit }
                        />
                    )
                }
                
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
    handleAddGame: PropTypes.func.isRequired,
    handleTitleEdit: PropTypes.func,
};
