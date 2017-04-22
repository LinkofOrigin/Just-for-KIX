import React, { Component } from 'react';
import { grey600 } from 'material-ui/styles/colors';
import Header from './Header';
import InitialTopContent from './InitialTopContent';
import LoggedInBottomContent from './LoggedInBottomContent';
import LoggedOutBottomContent from './LoggedOutBottomContent';
import initialState from './initial-state';

import { GameImage } from './constants';

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

    handleChangeActiveGame = (newGame) => {
        this.setState({
            activeGame: newGame,
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
        currentGamesList: [],
    });
    handleLogout = () => this.setState({
        loggedIn: false,
        mode: 'none',
        showGameSelection: true,
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
        const gamesList = this.getList(listName).games;

        this.setState(
            {
                activeGame: gamesList.length > 0 ? gamesList[0] : undefined,
                showGameSelection: false,
                currentGamesList: gamesList,
            },
        );
    };

    handleModeSwitch = () => {
        if (this.state.mode === 'adult') {
            this.setState({ mode: 'child', showGameSelection: true, bottomVisible: false });
        } else if (this.state.mode === 'child') {
            this.setState({ mode: 'adult' });
        }
    };

    handleListChange = () => {
        this.setState({
            showGameSelection: !this.state.showGameSelection,
            bottomVisible: false,
        });
    };

    handleTitleEdit = (oldName, newName) => {
        const newState = {};
        newState.lists = this.state.lists;

        const oldList = this.getListIndex(oldName);
        const newList = this.getListIndex(newName);
        if (newList > -1 && oldList !== newList) {
            return false;
        }
        newState.lists[oldList].name = newName;
        this.setState(newState);

        return true;
    };

    handleAddList = (newName) => {
        const newState = {};
        newState.lists = this.state.lists;

        const newList = this.getListIndex(newName);
        if (newList > -1) {
            return false;
        }
        newState.lists.push({ name: newName, games: [] });
        this.setState(newState);

        return true;
    };

    handleDeleteList = (name) => {
        const newState = {};
        newState.lists = this.state.lists;
        const listToDelete = this.getListIndex(name);
        newState.lists[0].games =
            newState.lists[0].games.concat(newState.lists[listToDelete].games);
        newState.lists.splice(listToDelete, 1);
        this.setState(newState);
    };

    render() {
        const styleOne = Object.assign({}, styles.bottom);
        styleOne.height = this.state.bottomVisible ? '0' : '90vh';
        styleOne.overflow = this.state.bottomVisible ? 'hidden' : 'default';

        styleOne.backgroundImage = `url(${GameImage.get(this.state.activeGame)})`;
        styleOne.backgroundSize = 'cover';
        styleOne.backgroundPosition = 'center';

        const styleTwo = Object.assign({}, styles.bottom);
        styleTwo.height = this.state.bottomVisible ? '90vh' : '0';
        styleTwo.overflow = this.state.bottomVisible ? 'default' : 'hidden';

        let topContent;
        if (this.state.showGameSelection) {
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
                    handleAddList = { this.handleAddList }
                    handleDeleteList = { this.handleDeleteList }
                />
            );
        } else {
            bottomContent = (
                <LoggedOutBottomContent
                    mode = { this.state.mode }
                    handleLogin = { this.handleLogin }
                />
            );
        }

        let activeGames = this.state.currentGamesList;
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
                    onChangeActiveGame = { this.handleChangeActiveGame }
                    handleListChange = { this.handleListChange }
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
