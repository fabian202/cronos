import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useEntries } from '../hooks/useEntries'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { navigate } from 'hookrouter';
import Entries from './Entries'
import Grid from '@material-ui/core/Grid';
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
    const [open, setOpen] = useState(false);
    const [entryId, setEntryId] = useState(null)
    const { entries, onDeleteEntry, total, date, handleDateChange } = useEntries()

    useEffect(() => {
      if(entryId) setOpen(true)
    }, [entryId])

    const handleClose = () => {
      setEntryId(null);
      setOpen(false);
    }

    const handleDelete = (_id) => {
      onDeleteEntry(_id)
      handleClose()
    }

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
            <Entries entries={entries} onDelete={(_id) => setEntryId(_id)} />          
          </Grid>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure yu want to delete the entry?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleDelete(entryId)} color="primary" autoFocus>
                Ok
              </Button>

              <Button onClick={handleClose} color="primary" autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    )
}

export default Home
