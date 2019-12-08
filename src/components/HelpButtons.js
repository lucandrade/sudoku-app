import React, { Component } from 'react';

export default class HelpButtons extends Component {
    render() {
        return (
            <div className="panel-help">
                <div className="panel-row">
                    <div className="panel-button">
                        1
                    </div>
                    <div className="panel-button">
                        2
                    </div>
                </div>
                <div className="panel-row">
                    <div className="panel-button button-new-game" onClick={this.props.onStopGame}>
                        New
                    </div>
                </div>
            </div>
        );
    }
}
