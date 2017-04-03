import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    textAlign: 'center',
};

const paperStyle = {
    width: '90%',
    maxWidth: '700px',
    margin: '20px auto',
    padding: '15px',
};

const buttonStyle = {
    marginTop: '10px',
};

const loginStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '15px',
    marginBottom: '0',
    padding: '0',
};

const inputWrapStyle = {
    display: 'inline-block',
    textAlign: 'right',
};

const initialState = {
    usernameValue: "",
    passwordValue: "",
};

export default class LoggedOutBottomContent extends Component {
    constructor() {
        super();
        this.state = initialState;
    }
    
    handleLoginClick = () => {
        let userVal = this.state.usernameValue;
        console.log(userVal);
        let passVal = this.state.passwordValue;
        console.log(passVal);
    };
    
    handleUsernameChange = (e) => {
        console.log(e.target.value);
        this.setState({ usernameValue: e.target.value })
    };
    
    handlePasswordChange = (e) => {
        this.setState({ passwordValue: e.target.value })
    };
    
    render() {
        return (
            <div style = { style }>
                <Paper style = { paperStyle } zDepth = { 2 }>
                    <p style = { loginStyle }>Just for KIX</p>
                    <div style = { inputWrapStyle }>
                        <TextField
                            floatingLabelText = 'Username'
                            value = { this.state.usernameValue }
                            onChange = { this.handleUsernameChange }
                        />
                        <br />
                        <TextField
                            floatingLabelText = 'Password'
                            type = 'password'
                            value = { this.state.passwordValue }
                            onChange = { this.handlePasswordChange }
                        />
                    </div>
                    <br />
                    <RaisedButton
                        style = { buttonStyle }
                        label = 'Log In!'
                        type = 'submit'
                        onClick = { this.props.handleLoginClick }
                    />
                    
                </Paper>
            </div>
        );
    }
}

LoggedOutBottomContent.propTypes = {
    handleLogin: PropTypes.func.isRequired,
};
