import {
    difference,
    sampleSize,
    slice,
} from 'lodash';

const rows = 9;
const columns = 9;
const square = 3;
const total = 81;

function createArrayNumbers() {
    return Array.from(new Array(rows), (val, index) => index + 1);
}

function getCurrentRowFromData(data) {
    return Math.floor(data.length / rows);
}

function getCurrentColumnFromData(data) {
    return data.length % columns;
}

function getRowNumbers(data) {
    if (data.length) {
        const currentRow = getCurrentRowFromData(data);
        const start = currentRow * rows;
        return slice(data, start);
    }

    return [];
}

function getColumnNumbers(data) {
    if (data.length) {
        const currentColumn = getCurrentColumnFromData(data);
        const numbers = [];
        for (let a = currentColumn; a < data.length; a += columns) {
            numbers.push(data[a]);
        }

        return numbers;
    }

    return [];
}

function getSquareNumbers(data) {
    if (data.length) {
        const currentColumn = getCurrentColumnFromData(data);
        const currentRow = getCurrentRowFromData(data);
        const numbers = [];
        let rowsPos = [];
        let columnsPos = [];

        for (let x = square; x <= rows + 1; x += square) {
            if (currentRow < x) {
                rowsPos = [x - square, x - 1];
                break;
            }
        }

        for (let x = square; x <= columns + 1; x += square) {
            if (currentColumn < x) {
                columnsPos = [x - square, x - 1];
                break;
            }
        }

        let index;

        if (rowsPos.length === 2 && columnsPos.length === 2) {
            for (let r = rowsPos[0]; r <= rowsPos[1]; r += 1) {
                for (let c = columnsPos[0]; c <= columnsPos[1]; c += 1) {
                    index = (r * rows) + c;
                    if (!data.hasOwnProperty(index)) {
                        break;
                    }

                    numbers.push(data[index]);
                }
            }
        }

        return numbers;
    }

    return [];
}

function getCurrentSquareFirstIndex(data) {
    if (data.length) {
        const currentRow = getCurrentRowFromData(data);

        for (let x = square; x <= rows + 1; x += square) {
            if (currentRow < x) {
                return (x - square) * rows;
            }
        }
    }

    return 0;
}

function getAvailableNumbers(data) {
    const numbers = createArrayNumbers();

    if (!data.length) {
        return numbers;
    }

    const rowNumbers = getRowNumbers(data);
    const columnNumbers = getColumnNumbers(data);
    const squareNumbers = getSquareNumbers(data);
    const currentNumbers = rowNumbers.concat(columnNumbers, squareNumbers);

    return difference(numbers, currentNumbers);
}

function getNextNumber(data) {
    const numbers = getAvailableNumbers(data);
    return numbers.sort(() => 0.5 - Math.random())[0];
}

function arrayToGameData(data, blankCells) {
    const formatted = data.map((n, i) => {
        return {
            index: i,
            correct: n,
            guess: n,
            row: Math.floor(i / 9),
            column: i % 9,
            disabled: true,
        };
    });
    const blankItems = sampleSize(Array.from(Array(data.length).keys()), blankCells);

    for (let a = 0; a < blankItems.length; a += 1) {
        formatted[blankItems[a]].disabled = false;
        formatted[blankItems[a]].guess = '';
    }

    return formatted;
}

export default function createGame(blankCells) {
    let data = [];
    let nextNumber;
    let backTo;

    for (let a = 0; a <= total; a += 1) {
        nextNumber = getNextNumber(data);

        if (!nextNumber) {
            a = getCurrentSquareFirstIndex(data);

            if (backTo === a) {
                data = slice(data, 0, a-1);
                a = getCurrentSquareFirstIndex(data);
            } else {
                backTo = a;
            }

            data = slice(data, 0, a);
        } else {
            data.push(nextNumber);
        }
    }

    return arrayToGameData(data, blankCells);
}
