import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import Text from '../components/Text'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setPassPhraseAction } from '../redux/actions/passPhrase'

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
        width: '500px',
        height: '500px',
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
}))

const Main = () => {
    const [loading, setLoading] = useState(false)
    const [passPhase, setPassPhase] = useState('')
    const classes = useTheme()
    const history = useHistory()
    const dispatch = useDispatch()

    const toNextPage = () => {
        dispatch(setPassPhraseAction(passPhase))
        history.push('/wallet')
        setLoading(true)
    }

    return (
        <Box className={classes.root}>
            {loading ? (
                <Box className={classes.container}>
                    <CircularProgress color="secondary" />
                </Box>
            ) : (
                <Box className={classes.container}>
                    <Text style={classes.titleText}>Task with crypto</Text>
                    <CustomInput onChange={setPassPhase} value={passPhase} />
                    <Button className={classes.button} variant="outlined" color="primary" onClick={toNextPage}>
                        Next
                    </Button>
                </Box>
            )}
        </Box>
    )
}

export default Main
