import React, { Component } from 'react';
import { grey600 } from 'material-ui/styles/colors';
import Header from './Header';
import InitialTopContent from './InitialTopContent';
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

// TODO: restructure for dynamic list manipulation
const initialState = {
    loggedIn: false,
    ageChosen: false,
    mode: 'none',
    bottomVisible: false,
    activeGames: [],
    lists: [
        {
            name: "Young",
            games: [
                'game-one',
                'game-two',
            ]
        },
        {
            name: "Middle",
            games: [
                'game-three',
                'game-four',
            ]
        },
        {
            name: "Old",
            games: [
                'game-five',
                'game-six',
            ]
        },
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

    handleLogin = () => this.setState({
        loggedIn: true,
        mode: 'adult',
        activeGames: [],
    });
    handleLogout = () => this.setState({
        loggedIn: false,
        mode: 'none',
        ageChosen: false,
    });

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

    handleListSelection = (listName) => {
        let list = this.getList(listName);
        this.setState(
            {
                ageChosen: true,
                activeGames: list.games,
            },
        );
    };

    handleModeSwitch = () => {
        if (this.state.mode === 'adult') {
            this.setState({ mode: 'child', ageChosen: false, bottomVisible: false });
        } else if (this.state.mode === 'child') {
            this.setState({ mode: 'adult' });
        }
    };

    handleListChange = () => this.setState({
        ageChosen: false,
        bottomVisible: false,
    });
    
    getList = (name) => {
        let list = this.state.lists.filter((list) => {
            if(list.name === name) {
                return true;
            }
        });
        return list[0];
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

        let topContent;
        if (!this.state.ageChosen) {
            topContent = (
                <InitialTopContent
                    listHandle = { this.handleListSelection }
                    lists = { this.state.lists }
                />
            );
        }

        let bottomContent;
        if (this.state.loggedIn && this.state.mode === 'adult') {
            bottomContent = (
                <LoggedInBottomContent
                    lists = { this.state.lists }
                    handleLogout = { this.handleLogout }
                    handleAddGame = { this.handleAddGame }
                    handleModeSwitch = { this.handleModeSwitch }
                />
            );
        } else {
            bottomContent = (
                <LoggedOutBottomContent
                    mode = { this.state.mode }
                    handleLogin = { this.handleLogin }
                    handleListChange = { this.handleListChange }
                />
            );
        }

        let activeGames = this.state.activeGames;
        if (this.state.mode === 'adult') {
            activeGames = [];
        }

        return (
            <div style = { { overflow: 'hidden' } }>
                <Header
                    open = { this.state.bottomVisible }
                    loggedIn = { this.state.loggedIn }
                    list = { activeGames }
                    onClickIcon = { this.handleClickIcon }
                    handleAddGame = { this.handleAddGame }
                />
                <div style = { styleOne }>
                    { topContent }
                </div>
                <div style = { styleTwo }>
                    { bottomContent }
                </div>
            </div>
        );
    }
}
