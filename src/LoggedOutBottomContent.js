import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    textAlign: 'center',
    paddingTop: '20px',
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
    textAlign: 'left',
};

const initialState = {
    usernameValue: "",
    passwordValue: "",
    userError: false,
    passError: false,
};

export default class LoggedOutBottomContent extends Component {
    constructor() {
        super();
        this.state = initialState;
    }
    
    handleLoginClick = () => {
        let userVal = this.state.usernameValue;
        let passVal = this.state.passwordValue;
        let userValid = true;
        let passValid = true;
        if(userVal !== "user") userValid = false;
        if(passVal !== "pass") passValid = false;
        if(!userValid || !passValid) {
            let newState = {};
            if(!userValid) newState.userError = true;
            if(!passValid) newState.passError = true;
            this.setState(newState);
        }
        if(userValid && passValid) {
            this.props.handleLogin();
        }
    };
    
    handleUsernameChange = (e) => {
        this.setState({ usernameValue: e.target.value });
        if(this.state.userError) this.setState({userError: false});
    };
    
    handlePasswordChange = (e) => {
        this.setState({ passwordValue: e.target.value });
        if(this.state.passError) this.setState({passError: false});
    };
    
    render() {
        
        let loginButtonText = this.props.mode === 'child' ? 'Switch to Adult Mode' : 'Log In!';
        
        return (
            <div style = { style }>
                <RaisedButton
                    label = 'Switch Games'
                    onClick = { this.props.handleListChange }
                />
                <Paper style = { paperStyle } zDepth = { 2 }>
                    <p style = { loginStyle }>Just for KIX</p>
                    <div style = { inputWrapStyle }>
                        <TextField
                            floatingLabelText = 'Username'
                            value = { this.state.usernameValue }
                            onChange = { this.handleUsernameChange }
                            errorText = { this.state.userError }
                        />
                        <br />
                        <TextField
                            floatingLabelText = 'Password'
                            type = 'password'
                            value = { this.state.passwordValue }
                            onChange = { this.handlePasswordChange }
                            errorText = { this.state.passError }
                        />
                    </div>
                    <br />
                    <RaisedButton
                        style = { buttonStyle }
                        label = { loginButtonText }
                        type = 'submit'
                        onClick = { this.handleLoginClick }
                    />
                </Paper>
            </div>
        );
    }
}

LoggedOutBottomContent.propTypes = {
    mode: PropTypes.string.isRequired,
    handleLogin: PropTypes.func.isRequired,
    handleListChange: PropTypes.func.isRequired,
};
