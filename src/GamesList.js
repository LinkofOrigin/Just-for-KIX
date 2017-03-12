import React, { Component, PropTypes } from 'react';

import GameIcon from './GameIcon';

export default class GamesList extends Component {
    render() {
        return (
            <div>
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
};
