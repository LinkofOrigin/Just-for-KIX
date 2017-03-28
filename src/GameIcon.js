import React, { PropTypes } from 'react';

let sideLength = '50px';

const style = {
    margin: '10px',
    display: 'inline-block',
    backgroundColor: '#333',
    color: '#fff',
    width: sideLength,
    height: sideLength,
    textAlign: 'center',
    fontSize: '13px',
    cursor: 'pointer',
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
