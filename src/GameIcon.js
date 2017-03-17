import React, { PropTypes } from 'react';
import { grey300 } from 'material-ui/styles/colors';

const style = {
    margin: '10px',
    display: 'inline-block',
    backgroundColor: '#333',
    width: '50px',
    height: '50px',
    textAlign: 'center',
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
