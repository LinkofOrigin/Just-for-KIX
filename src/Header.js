import React, { Component, PropTypes } from 'react';

import { gameIconMarginVH, gameIconSideLengthVH } from './constants';

import { grey600, grey800 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Settings from 'material-ui/svg-icons/action/settings';
import Person from 'material-ui/svg-icons/social/person-outline';
import GamesList from './GamesList';


const styles = {
    icon: {
        width: `${gameIconSideLengthVH}vh`,
        height: `${gameIconSideLengthVH}vh`,
        position: 'absolute',
        right: `${gameIconMarginVH}vh`,
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

        if (this.props.loggedIn && this.props.open) {
            iconStyle.transform = 'rotate(90deg)';
        }

        return (
            <div style = { styles.top }>
                <GamesList
                    list = { this.props.list }
                    handleAddGame = { this.props.handleAddGame }
                    listName = 'activeGames'
                />
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
    list: PropTypes.array.isRequired,
    onClickIcon: PropTypes.func.isRequired,
    handleAddGame: PropTypes.func.isRequired,
};
