import React, { PropTypes } from 'react';

import { gameIconMarginVH, gameIconSideLengthVH } from './constants';

const style = {
    margin: `${gameIconMarginVH}vh`,
    marginRight: 0,
    display: 'inline-block',
    backgroundColor: '#333',
    color: '#fff',
    width: `${gameIconSideLengthVH}vh`,
    height: `${gameIconSideLengthVH}vh`,
    textAlign: 'center',
    fontSize: '13px',
    cursor: 'pointer',
};

function dragStart(event) {
    const fromListName = event.target.getAttribute('data-tag');
    event.dataTransfer.setData('from-list-name', fromListName);
    event.dataTransfer.setData('game-id', event.target.id);
}

const GameIcon = ({ fromListName, name }) => {
    return (
        <div
            id = { name }
            draggable = 'true'
            onDragStart = { dragStart }
            style = { style }
            data-tag = { fromListName }
        >
            { name }
        </div>
    );
};

GameIcon.propTypes = {
    fromListName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default GameIcon;
