import React, { Component } from 'react';
import { grey600, grey800 } from 'material-ui/styles/colors';
import Settings from 'material-ui/svg-icons/action/settings';

import GamesList from './GamesList';

const styles = {
    bottom: {
        height: '90vh',
        background: grey600,
    },
    gear: {
        width: '8vh',
        height: '8vh',
        position: 'absolute',
        right: '1vh',
        top: '1vh',
    },
    top: {
        width: '100%',
        height: '10vh',
        display: 'block',
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
        const gearStyle = Object.assign({}, styles.gear);
        gearStyle.color = this.state.settingsOpen ? grey600 : grey800;

        const bottomElement = this.state.settingsOpen
            ? <GamesList list = { this.state.inactiveGames } />
            : <div>Game to play!</div>;

        return (
            <div>
                <div style = { styles.top }>
                    <GamesList
                        list = { this.state.activeGames }
                    />
                    <Settings
                        style = { gearStyle }
                        onClick = { this.handleClickSettings }
                    />
                </div>
                <div style = { styles.bottom }>
                    { bottomElement }
                </div>
            </div>
        );
    }
}
