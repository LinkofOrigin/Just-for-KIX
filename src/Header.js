import React, { Component, PropTypes } from 'react';

import { grey600, grey800 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Settings from 'material-ui/svg-icons/action/settings';
import Person from 'material-ui/svg-icons/social/person-outline';
import { gameIconMarginVH, gameIconSideLengthVH } from './constants';
import GamesList from './GamesList';

const styles = {
    icon: {
        width: `${gameIconSideLengthVH}vh`,
        height: `${gameIconSideLengthVH}vh`,
        position: 'absolute',
        right: `${gameIconMarginVH}vh`,
        top: `${gameIconMarginVH}vh`,
    },
    listChangeButton: {
        position: 'absolute',
        right: `${gameIconSideLengthVH + (2 * gameIconMarginVH)}vh`,
        top: `${gameIconMarginVH}vh`,
    },
    defaultIconStyle: {
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
};

export default class Header extends Component {
    render() {
        const iconStyle = Object.assign({}, styles.defaultIconStyle);
        iconStyle.color = this.props.open ? grey600 : grey800;

        const headerStyle = Object.assign({}, styles.top);
        if (this.props.loggedIn) {
            if (this.props.mode === 'adult') {
                headerStyle.backgroundColor = '#2150B5';
            } else if(this.props.mode === 'child') {
                headerStyle.backgroundColor = '#3BED50';
            }
        }

        if (this.props.loggedIn && this.props.open) {
            iconStyle.transform = 'rotate(90deg)';
        }

        return (
            <div style = { headerStyle }>
                <GamesList
                    list = { this.props.list }
                    listName = 'activeGames'
                    editable = { false }
                    handleAddGame = { this.props.handleAddGame }
                    onClickGame = { this.props.onChangeActiveGame }
                />
                {
                    this.props.showSwitchGamesButton
                        ? <RaisedButton
                            style = { styles.listChangeButton }
                            label = 'Switch Games'
                            onClick = { this.props.handleListChange }
                        />
                        : null
                }
                <IconButton
                    style = { styles.icon }
                    onClick = { this.props.onClickIcon }
                    iconStyle = { iconStyle }
                >

                    { this.props.loggedIn ? (<Settings />) : (<Person />) }
                </IconButton>
            </div>
        );
    }
}

Header.propTypes = {
    open: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
    adultColor: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    onClickIcon: PropTypes.func.isRequired,
    handleAddGame: PropTypes.func.isRequired,
    onChangeActiveGame: PropTypes.func.isRequired,
    handleListChange: PropTypes.func.isRequired,
    showSwitchGamesButton: PropTypes.bool.isRequired,
};
