import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { navigate } from 'hookrouter';
import Grid from '@material-ui/core/Grid';
import { useEntries } from '../hooks/useEntries'
// import { useDeleteEntry } from '../hooks/useDeleteEntry'
import Entries from './Entries'
import Calendar from './Calendar'

const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
    left: {
      textAlign: 'left'
    },
    center: {
      textAlign: 'center'
    }
}));

const Home = () => {
    const classes = useStyles();
    const { grupedEntries, total, date, handleDateChange, onDeleteEntry } = useEntries()

    const handleRedirect = () => {
      navigate('/entry')
    }

    return (
        <div>
          <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleRedirect}>
            <AddIcon />
          </Fab>
          <Grid container spacing={5} alignItems="flex-start">
            <Grid item xs={4} className={classes.left}>
              <Typography component="h1" variant="h5">
                Daily entries
              </Typography>
              <Typography component="h1" variant="subtitle1">
                {`${total} billable hours`}
              </Typography>
            </Grid>
            <Grid item xs={8} className={classes.left}>
              <Calendar date={date} onChange={handleDateChange} />
            </Grid>
            <Entries entries={grupedEntries} />          
          </Grid>
        </div>
    )
}

export default Home
