import { makeStyles, Box } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: theme.typography.fontFamily,
        fontWeight: 600,
        padding: theme.spacing(1),
        color: theme.palette.primary.main,
    },
    data: {
        color: theme.palette.secondary.main,
    },
}))

const Text = ({ children, style, data }) => {
    const classes = useStyles()
    return (
        <Box className={clsx(classes.root, data && classes.data, style)} component="span">
            {children}
        </Box>
    )
}

Text.defaultProps = {
    style: null,
    data: false,
    children: '',
}

Text.propTypes = {
    children: PropTypes.string,
    style: PropTypes.string,
    data: PropTypes.bool,
}

export default Text
