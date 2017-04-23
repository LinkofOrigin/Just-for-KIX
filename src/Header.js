import React, { Component, PropTypes } from 'react';

import { grey200, grey800 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ViewModule from 'material-ui/svg-icons/action/view-module';
import Toggle from 'material-ui/Toggle';
import { gameIconMarginVH, gameIconSideLengthVH } from './constants';
import GamesList from './GamesList';

import { adultLight, adultDark, adultMiddle, childLight, childDark, childMiddle } from './constants';

const styles = {
    headerItem: {
        float: 'left',
        height: `${gameIconSideLengthVH}vh`,
        marginLeft: `${2 * gameIconMarginVH}vh`,
        fontFamily: 'Roboto, sans-serif',
    },
    toggleLabel: {
        verticalAlign: 'middle', // somehow this works????
        display: 'inline-block',
        margin: '0 3px',
    },
    centeredHeaderItem: {
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
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
    },
    thumbOff: {
        backgroundColor: childLight,
    },
    trackOff: {
        backgroundColor: childDark,
    },
    thumbSwitched: {
        backgroundColor: adultLight,
    },
    trackSwitched: {
        backgroundColor: adultDark,
    },
};

export default class Header extends Component {
    onShowHideLists = () => {
        if (this.props.listSelectionOpen) {
            this.props.onHideLists();
        } else {
            this.props.onShowLists();
        }
    };

    handleToggleUserMode = () => {
        this.props.onToggleUserMode();
    };

    render() {
        const listIconStyle = Object.assign({}, styles.defaultIconStyle);

        const headerStyle = Object.assign({}, styles.top);
        if (this.props.adultMode) {
            headerStyle.backgroundColor = adultMiddle;
        } else {
            headerStyle.backgroundColor = childMiddle;
        }

        let iconContainer2 = Object.assign({}, styles.iconContainer2);
        let depthIcon2 = 3;
        if (this.props.listSelectionOpen) {
            iconContainer2.backgroundColor = grey200;
            depthIcon2 = 1;
        }

        const toggleLabel = this.props.adultMode ? 'Adult mode' : 'Child mode';

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
                    <div style = { styles.headerItem }>
                        <div style = { styles.divider } />
                    </div>
                    <div style = { styles.headerItem }>
                        <div style = { styles.centeredHeaderItem }>
                            <div style = { styles.toggleLabel }>
                                <div>CHILD</div>
                            </div>
                            <div style = { styles.toggleLabel }>
                                <Toggle
                                    toggled = { this.props.adultMode }
                                    onToggle = { this.handleToggleUserMode }
                                    thumbStyle = { styles.thumbOff }
                                    trackStyle = { styles.trackOff }
                                    thumbSwitchedStyle = { styles.thumbSwitched }
                                    trackSwitchedStyle = { styles.trackSwitched }

                                    inputStyle = { { marginLeft: '0' } }
                                    elementStyle = { { marginLeft: '0' } }
                                />
                            </div>
                            <div style = { styles.toggleLabel }>
                                <div>ADULT</div>
                            </div>
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
    list: PropTypes.array.isRequired,
    handleAddGame: PropTypes.func.isRequired,
    onChangeActiveGame: PropTypes.func.isRequired,
    onShowLists: PropTypes.func.isRequired,
    onHideLists: PropTypes.func.isRequired,
    showListSelectionButton: PropTypes.bool.isRequired,

    onToggleUserMode: PropTypes.func.isRequired,
    adultMode: PropTypes.bool.isRequired,
};
