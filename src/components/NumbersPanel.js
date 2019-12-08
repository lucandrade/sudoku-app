import React, { Component } from 'react';

export default class NumbersPanel extends Component {
    handleClickNumber(number) {
        this.props.onClickNumber(number);
    }

    renderButtons() {
        const views = [];
        const buttons = [];

        for (let a = 1; a <= 9; a += 1) {
            buttons.push(
                <div
                    key={a}
                    className="number panel-button"
                    onClick={this.handleClickNumber.bind(this, a)}>
                    <span>{a}</span>
                </div>
            );
        }
        buttons.push(
            <div
                key="delete"
                className="number panel-button"
                onClick={this.props.onClickDelete}>
                <span>&#10006;</span>
            </div>
        );

        views.push(
            <div className="numbers" key="1">
                {buttons.slice(0, 5)}
            </div>
        );

        views.push(
            <div className="numbers" key="2">
                {buttons.slice(5)}
            </div>
        );

        return views;
    }

    render() {
        return (
            <div className="panel-numbers">
                {this.renderButtons()}
            </div>
        );
    }
}
