import React, { Component } from 'react';
import { grey600 } from 'material-ui/styles/colors';
import Header from './Header';
import InitialTopContent from './InitialTopContent';
import LoggedInBottomContent from './LoggedInBottomContent';
import LoggedOutBottomContent from './LoggedOutBottomContent';
import initialState from './initial-state';

const superMarioImage = require('./img/smb.jpg');

const styles = {
    bottom: {
        height: '90vh',
        background: grey600,
        transition: 'all 0.5s ease',
    },
};

export default class JustForKix extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    getList = (name) => {
        const returnList = this.state.lists.filter((list) => {
            if (list.name === name) {
                return true;
            }
        });
        return returnList[0];
    };

    getListIndex = (name) => {
        return this.state.lists.findIndex((list) => {
            if (list.name === name) {
                return true;
            }
        });
    };

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
        const newLists = this.state.lists;
        const toListInd = this.getListIndex(toListName);
        newLists[toListInd].games.push(gameId);

        // remove from list.
        const fromListInd = this.getListIndex(fromListName);
        const index = newLists[fromListInd].games.indexOf(gameId);
        if (index > -1) {
            newLists[fromListInd].games.splice(index, 1);
        }

        const newState = {};
        newState.lists = newLists;

        this.setState(newState);
    };

    handleListSelection = (listName) => {
        const list = this.getList(listName);
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

    handleTitleEdit = (oldName, newName) => {
        const newState = {};
        newState.lists = this.state.lists;

        const oldList = this.getListIndex(oldName);
        const newList = this.getListIndex(newName);
        console.log(oldList);
        console.log(newList);
        if (newList > -1 && oldList !== newList) {
            console.log('error!!!!');
            return false;
        }
        newState.lists[oldList].name = newName;
        this.setState(newState);

        return true;
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
                    handleTitleEdit = { this.handleTitleEdit }
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
