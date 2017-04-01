import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    textAlign: 'center',
};

const paperStyle = {
    width: '90%',
    margin: '20px auto',
    padding: '15px',
};

const buttonStyle = {
    marginTop: '10px',
};

const inputWrapStyle = {
    display: 'inline-block',
    textAlign: 'right',
};

const loginStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '15px',
    marginBottom: '0',
    padding: '0',
};

export default class LoggedOutBottomContent extends Component {
    render() {
        return (
            <div style = { style }>
                <Paper style = { paperStyle } zDepth = { 2 }>
                    <p style = { loginStyle }>Login</p>
                    <div style = { inputWrapStyle }>
                        <TextField floatingLabelText = 'Username' />
                        <br />
                        <TextField floatingLabelText = 'Password' type = 'password' />
                    </div>
                    <br />
                    <RaisedButton
                        style = { buttonStyle }
                        label = 'Log In!'
                        type = 'submit'
                        onClick = { this.props.handleLogin }
                    />
                </Paper>
            </div>
        );
    }
}

LoggedOutBottomContent.propTypes = {
    handleLogin: PropTypes.func.isRequired,
};
