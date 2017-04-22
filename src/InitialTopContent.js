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

    handleSelection = (event) => {
        this.props.listHandle(event.target.id);
    };

    render() {
        return (
            <div style = { styles.ageChoiceStyle }>
                <div style = { styles.boxContStyle }>
                    {
                        this.props.lists.map((list, index) => {
                            if (index !== 0) {
                                return (
                                    <div
                                        key = { list.name + index }
                                        id = { list.name }
                                        style = { styles.boxChoiceStyle }
                                        onClick = { this.handleSelection }
                                    >
                                        { list.name }
                                    </div>
                                );
                            }
                        },
                        )
                    }
                </div>
            </div>
        );
    }
}

InitialTopContent.propTypes = {
    listHandle: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
};
