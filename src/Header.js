import React, { Component, PropTypes } from 'react';

import { grey200, grey800 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Settings from 'material-ui/svg-icons/action/settings';
import ViewModule from 'material-ui/svg-icons/action/view-module';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Toggle from 'material-ui/Toggle';
import Person from 'material-ui/svg-icons/social/person-outline';
import { gameIconMarginVH, gameIconSideLengthVH } from './constants';
import GamesList from './GamesList';

const styles = {
    headerItem: {
        float: 'left',
        height: `${gameIconSideLengthVH}vh`,
        marginLeft: `${2 * gameIconMarginVH}vh`,
    },
    centeredHeaderItem: {
        position: 'relative', top: '50%', transform: 'translateY(-50%)'
    },
    icon: {
        width: '100%',
        height: '100%',
    },
    headerRightContainer: {
        position: 'absolute',
        right: `${gameIconMarginVH}vh`,
        top: `${gameIconMarginVH}vh`,
    },
    iconContainer1: {
        cursor: 'pointer',
        width: `${gameIconSideLengthVH}vh`,
        height: `${gameIconSideLengthVH}vh`,
    },
    iconContainer2: {
        cursor: 'pointer',
        width: `${gameIconSideLengthVH}vh`,
        height: `${gameIconSideLengthVH}vh`,
    },
    listChangeButton: {
        position: 'absolute',
        right: `${gameIconSideLengthVH + (2 * gameIconMarginVH)}vh`,
        top: `${gameIconMarginVH}vh`,
    },
    defaultIconStyle: {
        color: grey800,
        width: '100%',
        height: '100%',
        margin: 0,
    },
    top: {
        width: '100%',
        height: `${(2 * gameIconMarginVH) + gameIconSideLengthVH}vh`,
        display: 'block',
        overflow: 'hidden',
    },
    divider: {
        height: '100%',
        width: '1px',
        backgroundColor: grey800,
    }
};

export default class Header extends Component {
    onShowHideLists = () => {
        if (this.props.listSelectionOpen) {
            this.props.onHideLists();
        } else {
            this.props.onShowLists();
        }
    };

    render() {
        const listIconStyle = Object.assign({}, styles.defaultIconStyle);
        const personIconStyle = Object.assign({}, styles.defaultIconStyle);
        const settingsIconStyle = Object.assign({}, styles.defaultIconStyle);

        if (this.props.loggedIn && this.props.bottomContentOpen) {
            settingsIconStyle.transform = 'rotate(90deg)';
        }

        const headerStyle = Object.assign({}, styles.top);
        if (this.props.loggedIn) {
            if (this.props.mode === 'adult') {
                headerStyle.backgroundColor = '#2150B5';
            } else if (this.props.mode === 'child') {
                headerStyle.backgroundColor = '#3BED50';
            }
        }

        let iconContainer1 = Object.assign({}, styles.iconContainer1);
        let depthIcon1 = 3;
        if (this.props.bottomContentOpen) {
            iconContainer1.backgroundColor = grey200;
            depthIcon1 = 1;
        }

        let iconContainer2 = Object.assign({}, styles.iconContainer2);
        let depthIcon2 = 3;
        if (this.props.listSelectionOpen) {
            iconContainer2.backgroundColor = grey200;
            depthIcon2 = 1;
        }

        return (
            <div style = { headerStyle }>

                {
                    this.props.list.length !== 0 ?
                        <GamesList
                            list = { this.props.list }
                            listName = 'activeGames'
                            editable = { false }
                            handleAddGame = { this.props.handleAddGame }
                            onClickGame = { this.props.onChangeActiveGame }
                        />
                    :
                    []
                }
                <div style = { styles.headerRightContainer }>
                    {
                        this.props.showListSelectionButton
                            ? <div style = { styles.headerItem }>
                                <Paper
                                    zDepth = { depthIcon2 }
                                    style = { iconContainer2 }
                                    onClick = { this.onShowHideLists }
                                >
                                    <IconButton
                                        style = { styles.icon }
                                        iconStyle = { listIconStyle }
                                    >
                                        <ViewModule />
                                    </IconButton>
                                </Paper>
                            </div>
                            : null
                    }
                    {
                        // person icon
                        !this.props.loggedIn
                            ? <div style = { styles.headerItem }>
                                <Paper
                                    zDepth = { depthIcon1 }
                                    style = { iconContainer1 }
                                    onClick = { this.props.onClickIcon }
                                >
                                    <IconButton
                                        style = { styles.icon }
                                        iconStyle = { personIconStyle }
                                    >
                                        <Person />
                                    </IconButton>
                                </Paper>
                            </div>
                            : null
                    }
                    {
                        // settings icon
                        this.props.loggedIn
                            ? <div style = { styles.headerItem }>
                                <Paper
                                    zDepth = { depthIcon1 }
                                    style = { iconContainer1 }
                                    onClick = { this.props.onClickIcon }
                                >
                                    <IconButton
                                        style = { styles.icon }
                                        iconStyle = { settingsIconStyle }
                                    >
                                        <Settings />
                                    </IconButton>
                                </Paper>
                            </div>
                            : null
                    }
                    <div style = { styles.headerItem }>
                        <div style = { styles.divider }></div>
                    </div>
                    <div style = { styles.headerItem }>
                        <div style = { styles.centeredHeaderItem }>
                            <Toggle label = 'Child mode' />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    listSelectionOpen: PropTypes.bool.isRequired,
    bottomContentOpen: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
    adultColor: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    onClickIcon: PropTypes.func.isRequired,
    handleAddGame: PropTypes.func.isRequired,
    onChangeActiveGame: PropTypes.func.isRequired,
    onShowLists: PropTypes.func.isRequired,
    onHideLists: PropTypes.func.isRequired,
    showListSelectionButton: PropTypes.bool.isRequired,
};
