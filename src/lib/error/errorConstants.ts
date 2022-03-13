
const GENERAL_VALIDATION_ERRORS = {
    generalValidationError: 'error.general.validation',
}

const PLAYER_ERRORS = {
    playerIdEmpty: 'error.player.id.empty',

    playerNameRequired: 'error.player.name.required',
    playerNameMaxLength: 'error.player.name.max.length',
    playerNameMinLength: 'error.player.name.min.length',
    playerNameTypeError: 'error.player.name.not.text',

    playerAgeTypeError: 'error.player.age.not.int',
    playerAgeRequired: 'error.player.age.required',
}

const GAME_ERRORS = {
    gameIdEmpty: 'error.game.id.empty',

    gamePlayerEmpty: 'error.game.player.empty',
    gamePlayerNotExist: 'error.game.player.not.exist',
    gamePlayerTurnExceeded: 'error.game.player.turn.exceeded',
    gamePlayerCannotPlayWithHimself: 'error.game.playing.himself',
}

const MOVE_ERRORS = {
    moveIdEmpty: 'error.move.id.empty',

    movePitNumberEmpty: 'error.move.pit.number.empty',
    movePitNumberInvalid: 'error.move.pit.number.invalid',

    moveNotYourTurn: 'error.move.not.your.turn',
    moveGameInvalid: 'error.move.game.invalid',
    movePlayerTypeInvalid: 'error.move.player.type.invalid',

    moveInvalid: 'error.move.invalid',
}

// These messages should be provided at frontend application for localization purposes.
export const ERROR_MESSAGES = {
    ...GENERAL_VALIDATION_ERRORS,
    ...PLAYER_ERRORS,
    ...GAME_ERRORS,
    ...MOVE_ERRORS,
}

export enum ERROR_TYPES {
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    BUSINESS_LOGIC_ERROR = 'BUSINESS_LOGIC_ERROR',
    UNKNOWN_ERROR = 'UNKNOWN',
}
