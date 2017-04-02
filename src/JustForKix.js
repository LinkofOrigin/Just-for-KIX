import React, { Component } from 'react';
import { grey600 } from 'material-ui/styles/colors';
import Header from './Header';
import LoggedInBottomContent from './LoggedInBottomContent';
import LoggedOutBottomContent from './LoggedOutBottomContent';

const superMarioImage = require('./img/smb.jpg');

const styles = {
    bottom: {
        height: '90vh',
        background: grey600,
        transition: 'all 0.5s ease',
    },
};

const initialState = {
    loggedIn: false,
    bottomVisible: false,
    activeGames: [
        'game-one',
        'game-two',
    ],
    inactiveGamesYoung: [
        'game-three',
        'game-four',
    ],
    inactiveGamesMiddle: [
        'game-five',
        'game-six',
    ],
    inactiveGamesOld: [
        'game-seven',
    ],
};

export default class JustForKix extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    handleClickIcon = () => {
        // similar to this.state.bottomVisible = !this.state.bottomVisible;
        // but modifying state with this method causes component to re-render.
        this.setState({ bottomVisible: !this.state.bottomVisible });
    };

    handleLogin = () => this.setState({ loggedIn: true });
    handleLogout = () => this.setState({ loggedIn: false });

    handleAddGame = (fromListName, toListName, gameId) => {
        const toList = this.state[toListName];
        toList.push(gameId);

        // remove from list.
        const fromList = this.state[fromListName];
        const index = fromList.indexOf(gameId);
        if (index > -1) {
            fromList.splice(index, 1);
        }

        const newState = {};
        newState[toListName] = toList;
        newState[fromListName] = fromList;

        this.setState(newState);
    };

    render() {
        const styleOne = Object.assign({}, styles.bottom);
        styleOne.height = this.state.bottomVisible ? '0' : '90vh';
        styleOne.overflow = this.state.bottomVisible ? 'hidden' : 'default';

        styleOne.backgroundImage = `url(${superMarioImage})`;
        styleOne.backgroundSize = 'cover';
        styleOne.backgroundPosition = 'center bottom';

        const styleTwo = Object.assign({}, styles.bottom);
        styleTwo.height = this.state.bottomVisible ? '90vh' : '0';
        styleTwo.overflow = this.state.bottomVisible ? 'default' : 'hidden';

        let bottomContent;
        if (this.state.loggedIn) {
            bottomContent = (
                <LoggedInBottomContent
                    inactiveGamesYoung = { this.state.inactiveGamesYoung }
                    inactiveGamesMiddle = { this.state.inactiveGamesMiddle }
                    inactiveGamesOld = { this.state.inactiveGamesOld }
                    handleLogout = { this.handleLogout }
                    handleAddGame = { this.handleAddGame }
                />
            );
        } else {
            bottomContent = (
                <LoggedOutBottomContent
                    handleLogin = { this.handleLogin }
                />
            );
        }

        return (
            <div style = { { overflow: 'hidden' } }>
                <Header
                    open = { this.state.bottomVisible }
                    loggedIn = { this.state.loggedIn }
                    list = { this.state.activeGames }
                    onClickIcon = { this.handleClickIcon }
                    handleAddGame = { this.handleAddGame }
                />
                <div style = { styleOne }>
                    {/*<div>Game to play!</div>*/}
                </div>
                <div style = { styleTwo }>
                    { bottomContent }
                </div>
            </div>
        );
    }
}
