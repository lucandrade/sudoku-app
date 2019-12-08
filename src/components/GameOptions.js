import React, { Component } from 'react';

import { toString } from '../config';

export default class GameOptions extends Component {
    handleToggleOption(option) {
        this.props.onToggleOption(option);
    }

    render() {
        const { options, level } = this.props;

        return (
            <div className="options">
                <div className="buttons menu-buttons">
                    <div className="button-option">
                        <span className="level">
                            <strong>Dificulty: </strong>
                            <span>{toString(level)}</span>
                        </span>
                    </div>
                    <div className="button-option">
                        <span onClick={this.handleToggleOption.bind(this, 'errors')}>
                            { !options.errors ? 'Show' : 'Hide' } Errors
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
