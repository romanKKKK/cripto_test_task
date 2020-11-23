import { Box, CircularProgress, makeStyles } from '@material-ui/core'
import React, { useEffect, useState, useRef } from 'react'
import Text from '../components/Text'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPassPhraseSelector } from '../redux/selectors/passPhrase'
import {
    getPrivateKeySelector,
    getLoadingKeysSelector,
    getLegacyKeySelector,
    getSegwitSelector,
} from '../redux/selectors/keyGeneration'

import {
    getPrivateKeyQrCodeSelector,
    getLegacyKeyQrCodeSelector,
    getSegWitKeyQrCodeSelector,
    getPrivateKeyLoadingQrCodeSelector,
    getLegacyKeyLoadingQrCodeSelector,
    getSegWitKeyLoadingQrCodeSelector,
} from '../redux/selectors/qrCodeGeneration'

import { keyGeneration } from '../redux/actions/keyGeneration'
import { qrCodeGeneration } from '../redux/actions/qrCodeGeneration'
import clsx from 'clsx'

const useTheme = makeStyles((theme) => ({
    root: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        // backgroundColor: theme.palette.primary.main,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '900px',
        height: '700px',
        borderWidth: '1px',
        borderColor: theme.palette.primary.main,
        borderStyle: 'solid',
        borderRadius: '25px',
    },
    button: {
        width: '200px',
        marginTop: theme.spacing(5),
    },
    titleText: {
        fontSize: '25px',
        paddingBottom: theme.spacing(10),
    },
    item: {
        paddingTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
    },
    itemRow: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'left',
    },
    passPhase: {
        textAlign: 'center',
    },
}))

const WalletPage = () => {
    const [loading, setLoading] = useState(false)

    const [privateQrLoading, setPrivateKeyLoading] = useState(false)
    const [legacyQrLoading, setLegacyKeyLoading] = useState(false)
    const [segWitQrLoading, setSegWitKeyLoading] = useState(false)

    const classes = useTheme()
    const dispatch = useDispatch()
    const history = useHistory()

    const keysLoading = useSelector(getLoadingKeysSelector)
    const passPhrase = useSelector(getPassPhraseSelector)

    const privateKey = useSelector(getPrivateKeySelector)
    const legacyKey = useSelector(getLegacyKeySelector)
    const segWitKey = useSelector(getSegwitSelector)

    const privateKeyQrCode = useSelector(getPrivateKeyQrCodeSelector)
    const legacyKeyQrCode = useSelector(getLegacyKeyQrCodeSelector)
    const segWitKeyQrCode = useSelector(getSegWitKeyQrCodeSelector)

    const privateKeyLoadingQrCode = useSelector(getPrivateKeyLoadingQrCodeSelector)
    const legacyKeyLoadingQrCode = useSelector(getLegacyKeyLoadingQrCodeSelector)
    const segWitKeyLoadingQrCode = useSelector(getSegWitKeyLoadingQrCodeSelector)

    const getKeys = () => dispatch(keyGeneration(passPhrase))

    const generateQrCode = (data) => dispatch(qrCodeGeneration(data))

    useEffect(() => {
        if (!loading && privateKey) generateQrCode({ key: 'privateKey', text: privateKey })
    }, [loading, privateKey])

    useEffect(() => {
        if ((!loading, legacyKey)) generateQrCode({ key: 'legacyKey', text: legacyKey })
    }, [loading, legacyKey])

    useEffect(() => {
        if ((!loading, segWitKey)) generateQrCode({ key: 'segWitKey', text: segWitKey })
    }, [loading, segWitKey])

    useEffect(() => {
        if (privateKeyLoadingQrCode !== privateQrLoading && privateKeyQrCode) {
            setPrivateKeyLoading(privateKeyLoadingQrCode)
        }
    }, [privateKeyLoadingQrCode])

    useEffect(() => {
        if (legacyKeyLoadingQrCode !== legacyQrLoading && legacyKeyQrCode) {
            setLegacyKeyLoading(legacyKeyLoadingQrCode)
        }
    }, [legacyKeyLoadingQrCode])

    useEffect(() => {
        if (segWitKeyLoadingQrCode !== segWitQrLoading && segWitKeyQrCode) {
            setSegWitKeyLoading(segWitKeyLoadingQrCode)
        }
    }, [segWitKeyLoadingQrCode])

    useEffect(() => {
        if (!passPhrase) history.push('/')
        getKeys()
    }, [passPhrase])

    useEffect(() => {
        if (keysLoading !== loading) setLoading(keysLoading)
    }, [keysLoading])

    return (
        <Box className={classes.root}>
            {loading ? (
                <Box className={classes.container}>
                    <CircularProgress color="secondary" />
                </Box>
            ) : (
                <Box className={classes.container}>
                    <Box className={clsx(classes.item, classes.passPhase)}>
                        <Text>Your Pass Phrase:</Text>
                        <Text data>{passPhrase}</Text>
                    </Box>
                    <Box className={classes.itemRow}>
                        <Box className={classes.item}>
                            <Text>Bitcoin private key</Text>
                            {/* <Text data>{privateKey}</Text> */}
                            {!privateKey ? <CircularProgress color="secondary" /> : <Text data>{privateKey}</Text>}
                        </Box>
                        {privateQrLoading ? <CircularProgress color="secondary" /> : <img src={privateKeyQrCode} />}
                    </Box>
                    <Box className={classes.itemRow}>
                        <Box className={classes.item}>
                            <Text> legacy address (P2PKH)</Text>
                            <Text data>{legacyKey}</Text>
                        </Box>
                        {legacyQrLoading ? <CircularProgress color="secondary" /> : <img src={legacyKeyQrCode} />}
                    </Box>
                    <Box className={classes.itemRow}>
                        <Box className={classes.item}>
                            <Text> segWit address (P2PWKH)</Text>
                            <Text data>{segWitKey}</Text>
                        </Box>
                        {segWitQrLoading ? <CircularProgress color="secondary" /> : <img src={segWitKeyQrCode} />}
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default WalletPage
