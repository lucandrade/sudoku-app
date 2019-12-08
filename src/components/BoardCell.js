import React, { Component } from 'react';

export default class BoardCell extends Component {
    handleClickCell(index) {
        this.props.onClickCell(index);
    }

    render() {
        const { cell, selection, options } = this.props;
        const classes = ['board-cell'];

        if (cell.row === selection.row || cell.column === selection.col) {
            classes.push('highlighted');
        }

        if (cell.selected) {
            classes.push('focused');
        }

        if (cell.disabled) {
            classes.push('disabled');
        }

        if (selection.number === cell.guess) {
            classes.push('selected');
        }

        if (cell.guess && cell.guess !== cell.correct && options.errors === true) {
            classes.push('error');
        }

        return (
            <div
                className={classes.join(' ')}
                onClick={this.handleClickCell.bind(this, cell.index)}>
                {cell.guess}
            </div>
        );
    }
}
