import { combineReducers } from 'redux'

import keyGeneration from './keyGeneration'
import passPhrase from './passPhrase'
import qrCodeGeneration from './qrCodeGeneration'

export default combineReducers({
    keyGeneration,
    passPhrase,
    qrCodeGeneration,
})
