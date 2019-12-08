export const EASY = 20;
export const MEDIUM = 35;
export const HARD = 54;
export const INSANE = 62;

export const toString = level => {
    if (level === EASY) {
        return 'Easy';
    }

    if (level === MEDIUM) {
        return 'Medium';
    }

    if (level === HARD) {
        return 'Hard';
    }

    return 'Insane';
};
