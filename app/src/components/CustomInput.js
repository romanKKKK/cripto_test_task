import React from 'react'
import { Box, InputBase, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        display: 'flex',
        flex: 1,
        width: '100%',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '20px',
        backgroundColor: theme.palette.secondary.main,
    },
    inputInput: {
        paddingLeft: theme.spacing(1),
    },
    inputFocused: {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '20px',
        backgroundColor: 'inherit',
    },
    root: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1),
        borderRadius: '20px',
        width: '400px',
    },
}))

const CustomInput = ({ onChange, value, style }) => {
    const classes = useStyles()
    const changeText = (e) => onChange(e.currentTarget.value)
    return (
        <Box className={clsx(classes.root, style)}>
            <InputBase
                placeholder="Pass Phase..."
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                    focused: classes.inputFocused,
                }}
                value={value}
                onChange={changeText}
            />
        </Box>
    )
}

CustomInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    style: PropTypes.object,
}

export default CustomInput
