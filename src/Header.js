import React, { Component, PropTypes } from 'react';

import { grey200, grey800 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ViewModule from 'material-ui/svg-icons/action/view-module';
import Toggle from 'material-ui/Toggle';
import { Scrollbars } from 'react-custom-scrollbars';
import { gameIconMarginVH, gameIconSideLengthVH } from './constants';
import GamesList from './GamesList';

import { adultLight, adultDark, adultMiddle, childLight, childDark, childMiddle } from './constants';

const styles = {
    root: {
        width: '100%',
        height: `${(2 * gameIconMarginVH) + gameIconSideLengthVH}vh`,
        display: 'flex',
        justifyContent: 'flex-end',
        flexFlow: 'row',
        overflow: 'hidden',
    },
    listCont: {
        display: 'inline-flex',
        width: '100%',
        height: '100%',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
    },
    headerItem: {
        float: 'left',
        height: `${gameIconSideLengthVH}vh`,
        paddingLeft: `${gameIconMarginVH}vh`,
        paddingRight: `${gameIconMarginVH}vh`,
        marginTop: 'auto',
        marginBottom: 'auto',
        fontFamily: 'Roboto, sans-serif',
    },
    toggleGroupItem: {
        display: 'inline-block',
        margin: '0 3px',
    },
    toggleGroup: {
        display: 'flex',
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        paddingRight: '10px',
    },
    icon: {
        width: '100%',
        height: '100%',
    },
    headerRightContainer: {
        display: 'inline-flex',
        whitespace: 'nowrap',
        float: 'right',
    },
    listIconContainerDefault: {
        cursor: 'pointer',
        width: `${gameIconSideLengthVH}vh`,
        height: `${gameIconSideLengthVH}vh`,
    },
    iconStyle: {
        color: grey800,
        width: '100%',
        height: '100%',
        margin: 0,
    },
    divider: {
        height: '100%',
        width: '1px',
        backgroundColor: grey800,
    },
};

const toggleStyles = {
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
        const rootStyle = Object.assign({}, styles.root);
        if (this.props.adultMode) {
            rootStyle.backgroundColor = adultMiddle;
        } else {
            rootStyle.backgroundColor = childMiddle;
        }

        const listIconContainer = Object.assign({}, styles.listIconContainerDefault);
        let depthIcon2 = 3;
        if (this.props.listSelectionOpen) {
            listIconContainer.backgroundColor = grey200;
            depthIcon2 = 1;
        }

        return (
            <div style = { rootStyle }>
                <div style = { styles.listCont }>
                    {
                        this.props.list.length !== 0 ?
                            <Scrollbars
                                autoHeight
                                hideTracksWhenNotNeeded
                            >
                                <GamesList
                                    list = { this.props.list }
                                    listName = 'activeGames'
                                    editable = { false }
                                    handleAddGame = { this.props.handleAddGame }
                                    onClickGame = { this.props.onChangeActiveGame }
                                />
                            </Scrollbars>
                                :
                                null
                    }
                </div>
                <div style = { styles.headerRightContainer }>
                    {
                        this.props.showListSelectionButton
                            ? <div style = { styles.headerItem }>
                                <Paper
                                    zDepth = { depthIcon2 }
                                    style = { listIconContainer }
                                    onClick = { this.onShowHideLists }
                                >
                                    <IconButton
                                        style = { styles.icon }
                                        iconStyle = { styles.iconStyle }
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
                    <div
                        style = { Object.assign({}, styles.headerItem, { cursor: 'pointer' }) }
                        onClick = { this.handleToggleUserMode }
                    >
                        <div style = { styles.toggleGroup }>
                            <div style = { styles.toggleGroupItem }>
                                CHILD
                            </div>
                            <div style = { styles.toggleGroupItem }>
                                <Toggle
                                    toggled = { this.props.adultMode }
                                    onToggle = { this.handleToggleUserMode }
                                    thumbStyle = { toggleStyles.thumbOff }
                                    trackStyle = { toggleStyles.trackOff }
                                    thumbSwitchedStyle = { toggleStyles.thumbSwitched }
                                    trackSwitchedStyle = { toggleStyles.trackSwitched }

                                    inputStyle = { { marginLeft: '0' } }
                                    elementStyle = { { marginLeft: '0' } }
                                />
                            </div>
                            <div style = { styles.toggleGroupItem }>
                                ADULT
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
