import React, { Component, PropTypes } from 'react';

import { grey600, grey800 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Settings from 'material-ui/svg-icons/action/settings';
import Person from 'material-ui/svg-icons/social/person-outline';
import GamesList from './GamesList';


const styles = {
    gear: {
        width: '8vh',
        height: '8vh',
        position: 'absolute',
        right: '1vh',
        top: '1vh',
    },
    icon: {
        width: '100%',
        height: '100%',
    },
    top: {
        width: '100%',
        height: '10vh',
        display: 'block',
        overflow: 'hidden',
    },
};

export default class Header extends Component {
    render() {
        const gearStyle = Object.assign({}, styles.icon);
        gearStyle.color = this.props.open ? grey600 : grey800;


        if (this.props.loggedIn && this.props.open) {
            gearStyle.transform = 'rotate(90deg)';
        }

        return (
            <div style = { styles.top }>
                <GamesList
                    list = { this.props.list }
                    handleAddGame = { this.props.handleAddGame }
                    listName = 'activeGames'
                />
                <IconButton
                    style = { styles.gear }
                    onClick = { this.props.onClickIcon }
                    iconStyle = { gearStyle }
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
