import React, { Component } from 'react';
import { chunk } from 'lodash';

import BoardLine from '../components/BoardLine';
import GameOptions from '../components/GameOptions';
import NumbersPanel from '../components/NumbersPanel';
import HelpButtons from '../components/HelpButtons';

export default class Board extends Component {
    renderLines() {
        const { game } = this.props;
        const lines = chunk(game, 9);
        return lines.map((line, i) => <BoardLine key={i} cells={line} {...this.props} />);
    }

    render() {
        return (
            <div className="game" style={{ width: '100%' }}>
                <GameOptions {...this.props} />
                <div className="board">
                    {this.renderLines()}
                </div>
                <div className="panel-buttons">
                    <NumbersPanel
                        onClickNumber={this.props.onClickNumber}
                        onClickDelete={this.props.onClickDelete} />
                    <HelpButtons onStopGame={this.props.onStopGame} />
                </div>
            </div>
        );
    }
}
