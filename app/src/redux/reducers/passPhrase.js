import { handleActions } from 'redux-actions'
import { setPassPhraseSuccess } from '../actions/passPhrase'

const defaultState = {
    passPhrase: '',
    loading: false,
}

const passPhraseReducer = handleActions(
    {
        [setPassPhraseSuccess]: (_, { payload }) => ({
            loading: false,
            ...payload,
        }),
    },
    defaultState,
)

export default passPhraseReducer
