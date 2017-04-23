import React, { Component } from 'react';
import Header from './Header';
import InitialTopContent from './InitialTopContent';
import LoggedInBottomContent from './LoggedInBottomContent';
import LoggedOutBottomContent from './LoggedOutBottomContent';
import initialState from './initial-state';

import { adultLight, adultDark, childLight, GameImage } from './constants';

const styles = {
    bottom: {
        height: '90vh',
        background: adultDark,
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
            adultMode: false,
        });
    };

    handleLogin = () => this.setState({
        loggedIn: true,
        currentGamesList: [],
    });
    handleLogout = () => this.setState({
        loggedIn: false,
        adultMode: false,
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
        if (this.state.adultMode) {
            this.setState({
                adultMode: false,
                showGameSelection: true,
            });
        } else {
            this.setState({
                adultMode: true,
            });
        }
    };

    handleShowLists = () => {
        this.setState({
            showGameSelection: true,
        });
    };

    handleHideLists = () => {
        this.setState({
            showGameSelection: false,
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

    handleToggleUserMode = () => {
        this.setState({
            adultMode: !this.state.adultMode,
            loggedIn: false,
        });
    };

    render() {
        const bottomVisible = this.state.adultMode;

        const styleOne = Object.assign({}, styles.bottom);
        styleOne.height = bottomVisible ? '0' : '90vh';
        styleOne.overflow = bottomVisible ? 'hidden' : 'default';

        styleOne.backgroundImage = `url(${GameImage.get(this.state.activeGame)})`;
        styleOne.backgroundSize = 'cover';
        styleOne.backgroundPosition = 'center';

        const styleTwo = Object.assign({}, styles.bottom);
        styleTwo.height = bottomVisible ? '90vh' : '0';
        styleTwo.overflow = bottomVisible ? 'default' : 'hidden';

        let activeGames = this.state.currentGamesList;
        if (this.state.loggedIn) {
            activeGames = [];
        }

        const showSwitchGamesButton = !this.state.loggedIn && this.state.activeGame !== undefined;

        return (
            <div style = { { overflow: 'hidden' } }>
                <Header
                    listSelectionOpen = { this.state.showGameSelection }
                    bottomContentOpen = { bottomVisible }
                    list = { activeGames }
                    handleAddGame = { this.handleAddGame }
                    onChangeActiveGame = { this.handleChangeActiveGame }
                    showListSelectionButton = { showSwitchGamesButton }
                    onShowLists = { this.handleShowLists }
                    onHideLists = { this.handleHideLists }
                    onToggleUserMode = { this.handleToggleUserMode }
                    adultMode = { this.state.adultMode }
                />
                <div style = { styleOne }>
                    <InitialTopContent
                        listHandle = { this.handleListSelection }
                        lists = { this.state.lists }
                        style = { { display: this.state.showGameSelection ? 'block' : 'none' } }
                    />
                </div>
                <div style = { styleTwo }>
                    {
                        this.state.loggedIn && this.state.adultMode
                            ? <LoggedInBottomContent
                                lists = { this.state.lists }
                                handleLogout = { this.handleLogout }
                                handleAddGame = { this.handleAddGame }
                                handleModeSwitch = { this.handleModeSwitch }
                                handleTitleEdit = { this.handleTitleEdit }
                                handleAddList = { this.handleAddList }
                                handleDeleteList = { this.handleDeleteList }
                            />
                            : <LoggedOutBottomContent
                                adultMode = { this.state.adultMode }
                                handleLogin = { this.handleLogin }
                            />
                    }
                </div>
            </div>
        );
    }
}
