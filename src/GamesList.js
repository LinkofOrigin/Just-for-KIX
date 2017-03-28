import React, { Component, PropTypes } from 'react';

import GameIcon from './GameIcon';

const style = {
    margin: '10px 0 10px 10px',
    fontFamily: 'Arial',
};

const h3Style = {
    margin: '0 0 10px 0',
};

export default class GamesList extends Component {
    render() {
        let listTitle;
        if (this.props.title) {
            listTitle = <h3 style = { h3Style }>{ this.props.title }</h3>;
        }

        return (
            <div style = { style }>
                { listTitle }
                {
                    this.props.list.map((game) => {
                        return (
                            // 'key' prop encouraged when rendering with 'map'.
                            <GameIcon key = { game } name = { game } />
                        );
                    })
                }
            </div>
        );
    }
}

GamesList.propTypes = {
    list: PropTypes.array.isRequired,
    title: PropTypes.string,
};
