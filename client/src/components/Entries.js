import React, { useState } from 'react'
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Entry from './Entry'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { useDeleteEntry } from '../hooks/useDeleteEntry'

const useStyles = makeStyles(theme => ({
    cardHeader: {
      backgroundColor: theme.palette.grey[200],
    },
}));

export default function Entries({ entries }) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [id, setId] = useState()
    const { handleDeleteEntry } = useDeleteEntry()

    const handleClose = () => {
        // setEntryId(null);
        setOpen(false);
        setId(null)
    }

    const handleOk = () => {
        handleDeleteEntry(id)
        setOpen(false)
    }

    const handleDelete = (_id) => {
        setId(_id)
        setOpen(true)
    }

    return (
        <React.Fragment>
            {entries && entries.map(project => (
                <Grid item key={project.key} xs={12}  md={4}>
                    <Card>
                        <CardHeader 
                            title={project.key} 
                            subheader={`${project.total} hours`} 
                            titleTypographyProps={{ align: 'center' }} 
                            subheaderTypographyProps={{ align: 'center' }} 
                            className={classes.cardHeader} 
                        />
                        <CardContent>
                            <List>
                                {project.data.map(entry => (
                                    <Entry  key={entry._id} entry={entry} onDelete={handleDelete} />
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            ))}

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
                <Button onClick={handleOk} color="primary" autoFocus>
                    Ok
                </Button>

                <Button onClick={handleClose} color="primary" autoFocus>
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    )
}
