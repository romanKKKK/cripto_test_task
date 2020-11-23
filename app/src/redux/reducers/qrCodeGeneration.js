import { handleActions } from 'redux-actions'
import { qrCodeGenerationStart, qrCodeGenerationSuccess } from '../actions/qrCodeGeneration'

const defaultState = {}

const qrCodeReducer = handleActions(
    {
        [qrCodeGenerationStart]: (state, { payload: { key } }) => {
            const obj = {}
            obj[key] = {
                loading: true,
                code: null,
            }
            return {
                ...state,
                ...obj,
            }
        },
        [qrCodeGenerationSuccess]: (state, { payload: { key, code } }) => {
            const obj = {}
            obj[key] = {
                loading: false,
                code,
            }
            return {
                ...state,
                ...obj,
            }
        },
    },
    defaultState,
)

export default qrCodeReducer
