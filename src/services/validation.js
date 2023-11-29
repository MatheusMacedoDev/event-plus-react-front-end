export const minimumCharacters = value => value.trim().length < 3;

export const validate = (conditions, errorAction) => {
    if (conditions) {
        errorAction();

        return false;
    }

    return true;
}