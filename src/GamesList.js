import React, { Component, PropTypes } from 'react';

import GameIcon from './GameIcon';

import { gameIconMarginVH, gameIconSideLengthVH } from './constants';

const rootStyle = {
    fontFamily: 'Roboto',
};

const defaultStyle = {
    minHeight: `${(2 * gameIconMarginVH) + gameIconSideLengthVH}vh`,
    margin: gameIconMarginVH,
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

    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState({ hover: false });
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

        const style = Object.assign({}, defaultStyle);
        
        let dragOverFunc = false;
        let dragLeaveFunc = false;
        let dropFunc = false;
        if(this.props.editable) {
            dragOverFunc = this.handleDragOver;
            dragLeaveFunc = this.handleDragLeave;
            dropFunc = this.handleDrop;
        }
        
        if (this.state.hover) {
            style.backgroundColor = 'gray';
        }

        return (
            <div style = { rootStyle }>
                { listTitle }
                <div
                    style = { style }
                    onDragOver = { dragOverFunc }
                    onDragLeave = { dragLeaveFunc }
                    onDrop = { dropFunc }
                >
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
            </div>
        );
    }
}

GamesList.propTypes = {
    list: PropTypes.array.isRequired,
    listName: PropTypes.string.isRequired,
    title: PropTypes.string,
    editable: PropTypes.bool.isRequired,
    handleAddGame: PropTypes.func.isRequired,
};
