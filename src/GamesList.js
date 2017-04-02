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
    constructor() {
        super();
        this.state = {
            hover: false,
        };
    }

    handleDragOver = (event) => {
        event.preventDefault();
        this.setState({ hover: true });
    };

    handleDrop = (event) => {
        event.preventDefault();
        const fromListName = event.dataTransfer.getData('from-list-name');
        const gameId = event.dataTransfer.getData('game-id');
        this.props.handleAddGame(fromListName, this.props.listName, gameId);
        this.setState({ hover: false });
    };

    render() {
        let listTitle;
        if (this.props.title) {
            listTitle = <h3 style = { h3Style }>{ this.props.title }</h3>;
        }

        return (
            <div
                style = { style }
                onDragOver = { this.handleDragOver }
                onDrop = { this.handleDrop }
            >
                { listTitle }

                {/*{ this.state.hover ? 'hover!' : 'no hover!' }*/}

                {
                    this.props.list.map((game, index) => {
                        // 'key' prop encouraged when rendering with 'map'.
                        return (
                            <GameIcon
                                key = { game + index }
                                name = { game }
                                fromListName = { this.props.listName }
                            />
                        );
                    })
                }
            </div>
        );
    }
}

GamesList.propTypes = {
    list: PropTypes.array.isRequired,
    listName: PropTypes.string.isRequired,
    title: PropTypes.string,
    handleAddGame: PropTypes.func.isRequired,
};
