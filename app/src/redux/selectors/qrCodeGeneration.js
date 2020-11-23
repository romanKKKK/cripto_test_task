import { createSelector } from 'reselect'

const qrCodeGenerationSelector = ({ qrCodeGeneration }) => qrCodeGeneration

export const getPrivateKeyQrCodeSelector = createSelector(qrCodeGenerationSelector, (data) => data['privateKey']?.code)
export const getLegacyKeyQrCodeSelector = createSelector(qrCodeGenerationSelector, (data) => data['legacyKey']?.code)
export const getSegWitKeyQrCodeSelector = createSelector(qrCodeGenerationSelector, (data) => data['segWitKey']?.code)

export const getPrivateKeyLoadingQrCodeSelector = createSelector(
    qrCodeGenerationSelector,
    (data) => data['privateKey']?.loading,
)
export const getLegacyKeyLoadingQrCodeSelector = createSelector(
    qrCodeGenerationSelector,
    (data) => data['legacyKey']?.loading,
)
export const getSegWitKeyLoadingQrCodeSelector = createSelector(
    qrCodeGenerationSelector,
    (data) => data['segWitKey']?.loading,
)
