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
        if(userVal !== "user") this.setState({userError: true});
        if(passVal !== "pass") this.setState({passError: true});
        if(!this.state.userError && !this.state.passError) {
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
        return (
            <div style = { style }>
                <Paper style = { paperStyle } zDepth = { 2 }>
                    <p style = { loginStyle }>Just for KIX</p>
                    <div style = { inputWrapStyle }>
                        <TextField
                            floatingLabelText = 'Username'
                            value = { this.state.usernameValue }
                            onChange = { this.handleUsernameChange }
                            errorText = {this.state.userError}
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
                        label = 'Log In!'
                        type = 'submit'
                        onClick = { this.handleLoginClick }
                    />
                </Paper>
            </div>
        );
    }
}

LoggedOutBottomContent.propTypes = {
    handleLogin: PropTypes.func.isRequired,
};
