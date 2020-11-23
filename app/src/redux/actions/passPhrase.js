import { createAction } from 'redux-actions'

import { SET_PASSPHRASE_SUCCESS } from './actionTypes.js'

export const setPassPhraseSuccess = createAction(SET_PASSPHRASE_SUCCESS)

export const setPassPhraseAction = (passPhrase) => async (dispatch) => dispatch(setPassPhraseSuccess({ passPhrase }))
