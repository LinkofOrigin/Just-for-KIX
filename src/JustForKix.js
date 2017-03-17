import React, { Component } from 'react';
import { grey600, grey800 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Settings from 'material-ui/svg-icons/action/settings';

import GamesList from './GamesList';

const styles = {
    bottom: {
        height: '90vh',
        background: grey600,
        transition: 'all 0.5s ease'
    },
    gear: {
        width: '8vh',
        height: '8vh',
        position: 'absolute',
        right: '1vh',
        top: '1vh',
    },
    gearIcon: {
        width: '100%',
        height: '100%',
    },
    top: {
        width: '100%',
        height: '10vh',
        display: 'block',
        overflow: 'hidden',
    },
};

const initialState = {
    settingsOpen: false,
    activeGames: [
        'game-one',
        'game-two',
    ],
    inactiveGames: [
        'game-three',
        'game-four',
        'game-five',
    ],
};

export default class JustForKix extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    handleClickSettings = () => {
        // similar to this.state.settingsOpen = !this.state.settingsOpen;
        // but modifying state with this method causes component to re-render.
        this.setState({ settingsOpen: !this.state.settingsOpen });
    };

    render() {
        const gearStyle = Object.assign({}, styles.gearIcon);
        gearStyle.color = this.state.settingsOpen ? grey600 : grey800;
        
        const styleOne = Object.assign({}, styles.bottom);
        styleOne.height = this.state.settingsOpen ? '0' : '90vh';
        styleOne.overflow = this.state.settingsOpen ? 'hidden' : 'default';
        const styleTwo = Object.assign({}, styles.bottom);
        styleTwo.height = this.state.settingsOpen ? '90vh' : '0';
        styleTwo.overflow = this.state.settingsOpen ? 'default' : 'hidden';
        
        return (
            <div style = {{overflow: 'hidden'}}>
                <div style = { styles.top }>
                    <GamesList
                        list = { this.state.activeGames }
                    />
                    <IconButton
                        style = { styles.gear }
                        onClick = { this.handleClickSettings }
                        iconStyle = { gearStyle }
                    >
                        <Settings />
                    </IconButton>
                </div>
                <div style = { styleOne }>
                    <div>Game to play!</div>
                </div>
                <div style = { styleTwo }>
                    <GamesList list = { this.state.inactiveGames } />
                </div>
            </div>
        );
    }
}
