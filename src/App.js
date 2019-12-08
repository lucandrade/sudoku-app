import React, { Component } from 'react';

import Home from './screens/Home';
import Board from './screens/Board';
import CreateGame from './functions/CreateGame';
import * as Config from './config';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: null,
            // game: CreateGame(Config.HARD),
            level: Config.EASY,
            selection: {
                row: null,
                col: null,
                number: null,
                index: null,
            },
            options: {
                visible: false,
                numbers: true,
                errors: true,
            },
        };
    }

    UNSAFE_componentWillMount() {
        window.document.body.addEventListener('keydown', this.handleKeyboardType.bind(this));
        window.document.body.addEventListener('click', this.handleMouseClick.bind(this));
    }

    handleKeyboardType(e) {
        const event = e || window.event;
        const { selection } = this.state;

        // numerid keys
        if (selection.index !== null && (e.keyCode > 48 && e.keyCode <= 57)) {
            this.handleClickNumber(Number.parseInt(event.key));
        }
    }

    handleMouseClick(e) {
        const { target } = e;
        const { options } = this.state;

        if (!options.visible) {
            return;
        }

        const parents = [];
        let el = target;

        while (true) {
            el = el.parentElement.closest('.menu-buttons');

            if (!el) {
                break;
            }
            
            parents.push(el);
        }

        if (parents.length === 0) {
            options.visible = false;
            this.setState({ options });
        }
    }

    handleChangeLevel(level) {
        this.setState({
            level,
        });
    }

    handleStartGame() {
        this.setState({
            game: CreateGame(this.state.level),
        });
    }

    handleStopGame() {
        this.setState({
            game: null,
            selection: {
                row: null,
                col: null,
                number: null,
                index: null,
            },
            options: {
                visible: false,
                numbers: true,
                errors: true,
            },
        });
    }

    handleClickCell(index) {
        const { game, selection } = this.state;

        if (!game.hasOwnProperty(index)) {
            return;
        }
        
        game.forEach(i => i.selected = false);
        game[index].selected = true;

        let selectedNumber = selection.number;

        if (!game[index].guess) {
            selectedNumber = null;
        } else if (game[index].guess !== selection.number) {
            selectedNumber = game[index].guess;
        }

        this.setState({
            selection: {
                row: game[index].row,
                col: game[index].column,
                number: selectedNumber,
                index,
            },
            game,
        });
    }

    isGameFinished(game) {
        return game.reduce((a, b) => {
            if (b.disabled) {
                return a;
            }
            
            if (!b.guess) {
                a = false;
            } else if (b.guess !== b.correct) {
                a = false;
            }

            return a;
        }, true);
    }

    handleClickNumber(number) {
        let { game, selection } = this.state;

        selection.number = number;

        if (selection.index === null) {
            this.setState({ selection });
            return;
        }

        if (game[selection.index].disabled === true) {
            return;
        }
        
        if (game[selection.index].guess === number) {
            selection.number = null;
            game[selection.index].guess = '';
        } else {
            selection.row = game[selection.index].row;
            selection.col = game[selection.index].column;
            game[selection.index].guess = number;

            if (this.isGameFinished(game)) {
                game = null;
            }
        }

        this.setState({ game, selection });
    }

    handleClickDelete() {
        const { game, selection } = this.state;

        game.forEach(i => {
            if (i.selected === true && i.disabled !== true) {
                i.guess = '';
                selection.number = null;
            }
        });

        this.setState({game, selection});
    }

    handleToggleOption(option) {
        const { options } = this.state;
        options[option] = !options[option];

        this.setState({options});
    }

    render() {
        if (this.state.game !== null) {
            return (
                <Board
                    level={this.state.level}
                    game={this.state.game}
                    selection={this.state.selection}
                    options={this.state.options}
                    onClickCell={this.handleClickCell.bind(this)}
                    onClickNumber={this.handleClickNumber.bind(this)}
                    onClickDelete={this.handleClickDelete.bind(this)}
                    onToggleOption={this.handleToggleOption.bind(this)}
                    onStopGame={this.handleStopGame.bind(this)} />
            );
        }

        return (
            <Home
                level={this.state.level}
                onChangeLevel={this.handleChangeLevel.bind(this)}
                onStartGame={this.handleStartGame.bind(this)} />
        );
    }
}
