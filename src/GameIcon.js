import React, { PropTypes } from 'react';

import { gameIconMarginVH, gameIconSideLengthVH, GameImage } from './constants';

const style = {
    margin: `${gameIconMarginVH}vh`,
    marginRight: 0,
    display: 'inline-block',
    backgroundSize: 'cover',
    color: '#fff',
    width: `${gameIconSideLengthVH}vh`,
    height: `${gameIconSideLengthVH}vh`,
    textAlign: 'center',
    fontSize: '13px',
    cursor: 'pointer',
    verticalAlign: 'top',
};

function dragStart(event) {
    const fromListName = event.target.getAttribute('data-tag');
    event.dataTransfer.setData('from-list-name', fromListName);
    event.dataTransfer.setData('game-id', event.target.id);
}

const GameIcon = ({ fromListName, name }) => {
    const iconStyle = Object.assign({}, style);
    iconStyle.backgroundImage = `url(${GameImage.get(name)})`;

    return (
        <div
            id = { name }
            draggable = 'true'
            onDragStart = { dragStart }
            style = { iconStyle }
            data-tag = { fromListName }
        />
    );
};

GameIcon.propTypes = {
    fromListName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default GameIcon;
