import React, { PropTypes } from 'react';

const style = {
    marginRight: '10px',
    display: 'inline-block',
};

const GameIcon = ({ name }) => {
    return (
        <div style = { style }>
            { name }
        </div>
    );
};

GameIcon.propTypes = {
    name: PropTypes.string.isRequired,
};

export default GameIcon;
