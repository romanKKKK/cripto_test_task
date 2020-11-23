import { createAction } from 'redux-actions'
import { toQrCode } from '../../utils/index'

import { QR_CODE_GENERATION_START, QR_CODE_GENERATION_ERROR, QR_CODE_GENERATION_SUCCESS } from './actionTypes'

export const qrCodeGenerationStart = createAction(QR_CODE_GENERATION_START)
export const qrCodeGenerationError = createAction(QR_CODE_GENERATION_ERROR)
export const qrCodeGenerationSuccess = createAction(QR_CODE_GENERATION_SUCCESS)

export const qrCodeGeneration = ({ key, text }) => async (dispatch) => {
    dispatch(qrCodeGenerationStart({ key }))
    try {
        const code = await toQrCode(text)
        if (code) dispatch(qrCodeGenerationSuccess({ key, code }))
    } catch (e) {
        dispatch(qrCodeGenerationError(e))
        throw new Error('QR code not generated', e)
    }
}
