import React, { Component, PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Edit from 'material-ui/svg-icons/image/edit';
import GameIcon from './GameIcon';

import { gameIconMarginVH, gameIconSideLengthVH } from './constants';

const rootStyle = {
    fontFamily: 'Roboto',
};

const defaultStyle = {
    minHeight: `${(2 * gameIconMarginVH) + gameIconSideLengthVH}vh`,
    margin: gameIconMarginVH,
};

const titleFormStyle = {
    display: 'inline-block',
    backgroundColor: 'white',
    padding: '0 15px 15px 15px',
    borderRadius: '10px',
};

const titleSaveButtonStyle = {
    position: 'relative',
    top: '50%',
};

const h3Style = {
    display: 'inline-block',
    margin: '0 0 10px 0',
    paddingRight: '10px',
};

const editStyle = {
    marginRight: '5px',
    position: 'relative',
    top: '5px',
};

const titleTextStyle = {
    display: 'inline-block',
    marginRight: '20px',
    marginBottom: '10px',
};

const initialState = {
    hover: false,
    editing: false,
    title: '',
    error: false,
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
        const newName = this.state.title;
        const success = this.props.handleTitleEdit(this.props.title, newName);
        if (success) {
            this.setState({ editing: false });
        } else {
            this.setState({
                error: 'A list with that name already exists! List names must be unique.',
            });
        }
    };

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value,
            error: false,
        });
    };

    handleEditing = () => {
        this.setState({
            editing: true,
            title: this.props.title,
        },
            () => {
                this.refs.listTitle.focus();
            },
        );
    };

    render() {
        const editableH3Style = Object.assign({}, h3Style);
        editableH3Style.cursor = 'pointer';

        let listTitle;
        if (this.props.title) {
            if (this.props.editable) {
                listTitle = (
                    <h3
                        onClick = { this.handleEditing }
                        style = { editableH3Style }
                    >
                        <Edit style = { editStyle } />{ this.props.title }
                    </h3>);
            } else {
                listTitle = (
                    <h3 style = { h3Style }>
                        { this.props.title }
                    </h3>);
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

            if (this.state.editing) {
                titleContent =
                    (<form style = { titleFormStyle } onSubmit = { this.handleTitleEdit }>
                        <TextField
                            floatingLabelText = 'List Title'
                            hintText = 'List Title'
                            ref = { 'listTitle' }
                            value = { this.state.title }
                            errorText = { this.state.error }
                            onChange = { this.handleTitleChange }
                            style = { titleTextStyle }
                        />
                        <br />
                        <RaisedButton
                            style = { titleSaveButtonStyle }
                            label = 'Save'
                            type = 'submit'
                        />
                    </form>);
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
    inactive: PropTypes.bool,
    title: PropTypes.string,
    editable: PropTypes.bool.isRequired,
    handleAddGame: PropTypes.func.isRequired,
    handleTitleEdit: PropTypes.func,
    handleDeleteList: PropTypes.func,
};
