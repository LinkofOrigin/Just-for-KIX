import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AddCircle from 'material-ui/svg-icons/content/add-circle';

import GamesList from './GamesList';

const styles = {
    root: {
        padding: '10px',
        overflowY: 'scroll',
        height: '100%',
    },
    buttonConStyle: {
        marginTop: '30px',
        textAlign: 'center',
    },
    buttonStyle: {
        margin: '0 20px',
    },
    tooltipStyle: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        color: '#DDD',
        textAlign: 'center',
    },
    addButtonStyle: {
        backgroundColor: '#198526',
        borderRadius: '0',
    },
    newListContStyle: {
        height: '0',
        overflow: 'hidden',
    },
    titleFormStyle: {
        display: 'inline-block',
        backgroundColor: 'white',
        padding: '0 15px 15px 15px',
        borderRadius: '10px',
    },
    titleTextStyle: {
        display: 'inline-block',
        marginRight: '20px',
        marginBottom: '10px',
    },
    titleSaveButtonStyle: {
        position: 'relative',
        top: '50%',
    },
};

export default class LoggedInBottomContent extends Component {
    constructor() {
        super();
        this.state = {
            newListText: '',
            error: false,
            showNewList: false,
        };
    }

    handleNewListCreate = (e) => {
        e.preventDefault();
        const success = this.props.handleAddList(this.state.newListText);
        if (!success) {
            this.setState({
                error: 'A list with that name already exists! List names must be unique.',
            });
        } else {
            this.setState({
                showNewList: false,
            });
        }
    };

    handleAddListClick = () => {
        this.setState({
            newListText: '',
            showNewList: !this.state.showNewList,
        },
            () => {
                if (this.state.showNewList) {
                    this.refs.newListTitleRef.focus();
                }
            });
    };

    handleNewListTitleChange = (e) => {
        this.setState({
            newListText: e.target.value,
            error: false,
        });
    };

    render() {
        const newListContStyle = Object.assign({}, styles.newListContStyle);
        if (this.state.showNewList) {
            newListContStyle.height = 'auto';
        }

        return (
            <div style = { styles.root }>
                <div style = { styles.tooltipStyle }>Click and drag games to organize lists</div>
                {/*<div style = { styles.buttonConStyle }>*/}
                    {/*<RaisedButton*/}
                        {/*label = 'Switch to Child Mode'*/}
                        {/*style = { styles.buttonStyle }*/}
                        {/*overlayStyle = { { backgroundColor: childColor } }*/}
                        {/*onClick = { this.props.handleModeSwitch }*/}
                    {/*/>*/}
                    {/*<RaisedButton*/}
                        {/*label = 'Log Out'*/}
                        {/*style = { styles.buttonStyle }*/}
                        {/*onClick = { this.props.handleLogout }*/}
                    {/*/>*/}
                {/*</div>*/}
                <RaisedButton
                    label = 'Add a List'
                    labelColor = 'white'
                    labelPosition = 'after'
                    icon = { <AddCircle /> }
                    onClick = { this.handleAddListClick }
                    style = { { marginTop: '5px', marginBottom: '15px' } }
                    overlayStyle = { styles.addButtonStyle }
                />
                <div style = { newListContStyle }>
                    <form style = { styles.titleFormStyle } onSubmit = { this.handleNewListCreate }>
                        <TextField
                            floatingLabelText = 'New List Title'
                            hintText = 'New List Title'
                            ref = { 'newListTitleRef' }
                            value = { this.state.newListText }
                            errorText = { this.state.error }
                            onChange = { this.handleNewListTitleChange }
                            style = { styles.titleTextStyle }
                        />
                        <br />
                        <RaisedButton
                            style = { styles.titleSaveButtonStyle }
                            label = 'Save'
                            onClick = { this.handleCancelTitleEdit }
                        />
                    </form>
                </div>
                {
                    this.props.lists.map((list, index) => {
                        if (index !== 0) {
                            return (
                                <GamesList
                                    key = { list.name + index }
                                    title = { list.name }
                                    list = { list.games }
                                    listName = { list.name }
                                    editable
                                    handleAddGame = { this.props.handleAddGame }
                                    handleTitleEdit = { this.props.handleTitleEdit }
                                    handleDeleteList = { this.props.handleDeleteList }
                                />);
                        }
                    },
                    )
                }
                <GamesList
                    title = { this.props.lists[0].name }
                    list = { this.props.lists[0].games }
                    listName = { this.props.lists[0].name }
                    inactive
                    editable
                    handleAddGame = { this.props.handleAddGame }
                    handleTitleEdit = { this.props.handleTitleEdit }
                    handleDeleteList = { this.props.handleDeleteList }
                />
            </div>
        );
    }
}

LoggedInBottomContent.propTypes = {
    lists: PropTypes.array.isRequired,
    handleLogout: PropTypes.func.isRequired,
    handleAddGame: PropTypes.func.isRequired,
    handleTitleEdit: PropTypes.func,
    handleAddList: PropTypes.func,
    handleDeleteList: PropTypes.func,
};
