import React, { Component } from 'react';

import * as Config from '../config';

export default class Home extends Component {
    handleChangeLevel(level) {
        this.props.onChangeLevel(level);
    }

    render() {
        const { level } = this.props;

        return (
            <div className="home">
                <div className="options">
                    <ul className="main-menu">
                        <li
                            className={level === Config.EASY ? 'selected' : ''}
                            onClick={this.handleChangeLevel.bind(this, Config.EASY)}>
                            <div>
                                <span>Easy</span>
                            </div>
                        </li>
                        <li
                            className={level === Config.MEDIUM ? 'selected' : ''}
                            onClick={this.handleChangeLevel.bind(this, Config.MEDIUM)}>
                            <div>
                                <span>Medium</span>
                            </div>
                        </li>
                        <li
                            className={level === Config.HARD ? 'selected' : ''}
                            onClick={this.handleChangeLevel.bind(this, Config.HARD)}>
                            <div>
                                <span>Hard</span>
                            </div>
                        </li>
                        <li
                            className={level === Config.INSANE ? 'selected' : ''}
                            onClick={this.handleChangeLevel.bind(this, Config.INSANE)}>
                            <div>
                                <span>Insane</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="buttons">
                    <button className="button round play big" onClick={this.props.onStartGame}>
                        Play
                    </button>
                </div>
            </div>
        );
    }
}
