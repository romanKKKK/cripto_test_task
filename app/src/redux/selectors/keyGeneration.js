import { createSelector } from 'reselect'

const keyGenerationSelector = ({ keyGeneration }) => keyGeneration

export const getLoadingKeysSelector = createSelector(keyGenerationSelector, ({ loading }) => loading)
export const getPrivateKeySelector = createSelector(keyGenerationSelector, ({privateKey}) => privateKey)
export const getLegacyKeySelector = createSelector(keyGenerationSelector, ({ legacyKey }) => legacyKey)
export const getSegwitSelector = createSelector(keyGenerationSelector, ({ segWitKey }) => segWitKey)
