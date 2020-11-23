import { handleActions } from 'redux-actions'
import {
    keyGenerationStart,
    keyGenerationError,
    keyGenerationSuccess,
    legacyKeyGenerationSuccess,
    getPrivateKeySuccess,
    getSegWitKeySuccess,
    getWifKeySuccess
} from '../actions/keyGeneration'

const defaultState = {
    loading: false,
}

const keyGenerationReducer = handleActions(
    {
        [keyGenerationStart]: () => ({
            loading: true,
        }),
        [keyGenerationError]: (_, { payload }) => ({
            loading: false,
            error: payload,
        }),
        [keyGenerationSuccess]: (state) => ({
            ...state,
            loading: false,
        }),
        [legacyKeyGenerationSuccess]: (state, { payload }) => ({
            ...state,
            ...payload,
        }),
        [legacyKeyGenerationSuccess]: (state, { payload }) => ({
            ...state,
            ...payload,
        }),
        [getPrivateKeySuccess]: (state, { payload }) => ({
            ...state,
            ...payload,
        }),
        [getSegWitKeySuccess]: (state, { payload }) => ({
            ...state,
            ...payload,
        }),
        [getWifKeySuccess]:  (state, { payload }) => ({
            ...state,
            ...payload,
        }),
    },
    defaultState,
)

export default keyGenerationReducer
