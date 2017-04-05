import React, { Component, PropTypes } from 'react';

const styles = {
    ageChoiceStyle: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        width: '100%',
        height: '100%',
    },
    boxContStyle: {
        textAlign: 'center',
    },
    boxChoiceStyle: {
        display: 'inline-block',
        width: '11em',
        height: '11em',
        margin: '50px 10px 0 10px',
        lineHeight: '11em',
        backgroundColor: '#333',
        border: '#555 solid 3px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        fontSize: '22px',
        cursor: 'pointer',
    },
};

export default class InitialTopContent extends Component {
    render() {
        return (
            <div style = { styles.ageChoiceStyle }>
                <div style = { styles.boxContStyle }>
                    <div style = { styles.boxChoiceStyle } onClick = { this.props.youngListHandle }>
                        Age 3-7
                    </div>
                    <div style = { styles.boxChoiceStyle } onClick = { this.props.middleListHandle }>
                        Age 8-12
                    </div>
                    <div style = { styles.boxChoiceStyle } onClick = { this.props.oldListHandle }>
                        Age 13-15
                    </div>
                </div>
            </div>  
        );
    }
}

InitialTopContent.propTypes = {
    youngListHandle: PropTypes.func.isRequired,
    middleListHandle: PropTypes.func.isRequired,
    oldListHandle: PropTypes.func.isRequired,
};
