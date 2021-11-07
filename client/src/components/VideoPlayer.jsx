import { Grid, Paper, Typography } from '@mui/material'
import { makeStyles } from "@mui/styles";
import React from 'react'
import { SocketContext } from '../context/SocketContext';

const useStyles = makeStyles((theme) => ({
    video: {
        width: '550px',
        [theme.breakpoints.down('xs')]: {
            width: '300px',
        },
    },
    gridContainer: {
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    paper: {
        padding: '10px',
        border: '2px solid black',
        margin: '10px',
    },
}));

const VideoPlayer = () => {
    const classes = useStyles()
    return (
        <Grid container className={classes.gridContainer}>
            {/* MY video */}
            <Paper className={classes.paper}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>Name</Typography>
                    <video playsInline muted ref={null} autoPlay className={classes.video} />
                </Grid>
            </Paper>

            {/* User Video */}
            <Paper className={classes.paper}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>Name</Typography>
                    <video playsInline muted ref={null} autoPlay className={classes.video} />
                </Grid>
            </Paper>
        </Grid>
    )
}

export default VideoPlayer
