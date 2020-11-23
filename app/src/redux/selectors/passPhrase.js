import { createSelector } from 'reselect'

const passPhraseSelector = ({ passPhrase }) => passPhrase

export const getPassPhraseSelector = createSelector(passPhraseSelector, (data) => data.passPhrase)
