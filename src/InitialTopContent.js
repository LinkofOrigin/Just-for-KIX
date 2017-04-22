import React, { Component, PropTypes } from 'react';

import { gameListIconMarginVH, gameListIconSideLengthVH } from './constants';

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
        width: `${gameListIconSideLengthVH}vh`,
        height: `${gameListIconSideLengthVH}vh`,
        margin: `${gameListIconMarginVH * 2}vh ${gameListIconMarginVH}vh 0 ${gameListIconMarginVH}vh`,
        lineHeight: `${gameListIconSideLengthVH}vh`,
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
                            if (index !== 0 && list.games.length !== 0) {
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
