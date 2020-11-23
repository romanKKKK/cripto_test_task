import { createAction } from 'redux-actions'

import {
    KEY_GENERATION_START,
    KEY_GENERATION_ERROR,
    KEY_GENERATION_SUCCESS,
    
    LEGACY_KEY_GENERATION_START,
    LEGACY_KEY_GENERATION_ERROR,
    LEGACY_KEY_GENERATION_SUCCESS,
    
    WIF_KEY_GENERATION_START,
    WIF_KEY_GENERATION_ERROR,
    WIF_KEY_GENERATION_SUCCESS,

    PRIVATE_KEY_GENERATION_START,
    PRIVATE_KEY_GENERATION_ERROR,
    PRIVATE_KEY_GENERATION_SUCCESS,
    
    SEG_WIT_KEY_GENERATION_START,
    SEG_WIT_KEY_GENERATION_ERROR,
    SEG_WIT_KEY_GENERATION_SUCCESS,

 } from './actionTypes.js'

import { 
    getLegacyKeyData,
    getPrivateKeyData,
    toWif,
    getSegWitAddressData
} from '../../utils/index'

/***Legacy Key Generation Handler (P2PKH) */

export const legacyKeyGenerationStart = createAction(LEGACY_KEY_GENERATION_START)
export const legacyKeyGenerationError = createAction(LEGACY_KEY_GENERATION_ERROR)
export const legacyKeyGenerationSuccess = createAction(LEGACY_KEY_GENERATION_SUCCESS)

const getLegacyKey = () => async (dispatch) => {
    dispatch(legacyKeyGenerationStart())
    try {
        const legacyKey = await getLegacyKeyData()

        if (legacyKey) {
            dispatch(legacyKeyGenerationSuccess({ legacyKey }))
            return legacyKey
        }
    } catch (e) {
        dispatch(legacyKeyGenerationError(e))
        throw new Error('legacy key not generated')
    }
}

/***Private Key Generation Handler (Bitcoin private key) */

export const getPrivateKeyStart = createAction(PRIVATE_KEY_GENERATION_START)
export const getPrivateKeyError = createAction(PRIVATE_KEY_GENERATION_ERROR)
export const getPrivateKeySuccess = createAction(PRIVATE_KEY_GENERATION_SUCCESS)

const getPrivateKey = (wif, passPhrase) => async (dispatch) => {
    dispatch(getPrivateKeyStart())
    try {
        const privateKey = await getPrivateKeyData(wif, passPhrase)
        if (privateKey) {
            dispatch(getPrivateKeySuccess({ privateKey }))
            return privateKey
        }
    } catch (e) {
        dispatch(getPrivateKeyError(e))
        throw new Error('private key not generated')
    }
}

/***SegWit Key Generation Handler (P2WPKH) */


export const getSegWitKeyStart = createAction(SEG_WIT_KEY_GENERATION_START)
export const getSegWitKeyError = createAction(SEG_WIT_KEY_GENERATION_ERROR)
export const getSegWitKeySuccess = createAction(SEG_WIT_KEY_GENERATION_SUCCESS)

const getSegWitKey = (wif) => async (dispatch) => {
    dispatch(getSegWitKeyStart())
    try {
        const segWitKey = await getSegWitAddressData(wif)
        if (segWitKey) {
            dispatch(getSegWitKeySuccess({ segWitKey }))
            return segWitKey
        }
    } catch (e) {
        dispatch(getSegWitKeyError(e))
        throw new Error('segWit key not generated')
    }
}

export const getWifKeyStart = createAction(WIF_KEY_GENERATION_START)
export const getWifKeyError = createAction(WIF_KEY_GENERATION_ERROR)
export const getWifKeySuccess = createAction(WIF_KEY_GENERATION_SUCCESS)

const getWifKey = (legacyKey) => async (dispatch) => {
    dispatch(getWifKeyStart())
    try {
        const wifKey = await toWif(legacyKey)
        if (wifKey) {
            dispatch(getWifKeySuccess({ wifKey }))
            return wifKey
        }
    } catch (e) {
        dispatch(getWifKeyError(e))
        throw new Error('wif key not generated')
    }
}

export const keyGenerationStart = createAction(KEY_GENERATION_START)
export const keyGenerationError = createAction(KEY_GENERATION_ERROR)
export const keyGenerationSuccess = createAction(KEY_GENERATION_SUCCESS)

export const keyGeneration = (passPhase) => async (dispatch) => {
    dispatch(keyGenerationStart())
    try {
        const legacyKey = await dispatch(getLegacyKey())

        const wifKey = await dispatch(getWifKey(legacyKey))

        await dispatch(getPrivateKey(wifKey, passPhase))

        await dispatch(getSegWitKey(wifKey))

        dispatch(keyGenerationSuccess())
    } catch (e) {
        dispatch(keyGenerationError(e))
    }
}
