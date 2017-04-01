import React, { Component, PropTypes } from 'react';

export default class LoggedOutBottomContent extends Component {
    render() {
        return (
            <div>
                log in here!
                <br />
                <input />
                <br />
                <input type = 'password' />
                <br />
                <button type = 'submit' onClick = { this.props.handleLogin }>
                    log in!
                </button>
            </div>
        );
    }
}

LoggedOutBottomContent.propTypes = {
    handleLogin: PropTypes.func.isRequired,
};
