import React, { PropTypes } from 'react';

import { gameIconSideLengthPixels } from './constants';

const style = {
    margin: '10px',
    display: 'inline-block',
    backgroundColor: '#333',
    color: '#fff',
    width: gameIconSideLengthPixels,
    height: gameIconSideLengthPixels,
    textAlign: 'center',
    fontSize: '13px',
    cursor: 'pointer',
};

function dragStart(event) {
    const fromListName = event.target.getAttribute('data-tag');
    event.dataTransfer.setData('from-list-name', fromListName);
    event.dataTransfer.setData('game-id', event.target.id);
    console.log();
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
