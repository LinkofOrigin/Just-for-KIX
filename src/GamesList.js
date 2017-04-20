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

const initialState = 
    {
        hover: false,
        editing: false,
        title: "",
    };

export default class GamesList extends Component {
    constructor() {
        super();
        this.state = initialState;
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
    
    handleTitleEdit = (e) => {
        e.preventDefault();
        let newName = document.getElementById(this.props.title).value;
        console.log(newName);
        this.setState({editing: false});
        this.props.handleTitleEdit(this.props.title, newName);
    };
    
    handleTitleChange = (e) => {
        this.setState({ title: e.target.value });
    };
    
    handleEditing = () => {this.setState({editing: true})};
    
    render() {
        let listTitle;
        if (this.props.title) {
            if(this.props.editable) {
                listTitle = <h3 onClick = { this.handleEditing } style = { h3Style }>{ this.props.title }</h3>;
            } else {
                listTitle = <h3 style = { h3Style }>{ this.props.title }</h3>;
            }
                    
        }

        const style = Object.assign({}, defaultStyle);
        
        let titleContent = listTitle;
        let dragOverFunc = false;
        let dragLeaveFunc = false;
        let dropFunc = false;
        if (this.props.editable) {
            dragOverFunc = this.handleDragOver;
            dragLeaveFunc = this.handleDragLeave;
            dropFunc = this.handleDrop;
            
            if(this.state.editing) {
                titleContent =
                    <form onSubmit = { this.handleTitleEdit }>
                        <input
                            id = { this.props.title }
                            placeholder = "List Title"
                            value = { this.state.title }
                            onChange = { this.handleTitleChange } />
                        <button type = "submit">Save</button>
                    </form>;
            }
        }

        if (this.state.hover) {
            style.backgroundColor = 'gray';
        }
        
        return (
            <div style = { rootStyle }>
                { titleContent } 
                
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
    handleTitleEdit: PropTypes.func,
};
