import React, { Component } from 'react';

import BoardCell from './BoardCell';

export default class BoardLine extends Component {
    renderCells() {
        const { cells } = this.props;
        return cells.map((cell, i) => (<BoardCell key={i} cell={cell} {...this.props} />));
    }

    render() {
        return (
            <div className="board-line">{this.renderCells()}</div>
        );
    }
}
