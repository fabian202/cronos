import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function ProjectDialog({name, open, onChange, onClose}) {
    return (
        <Dialog open={open} onClose={onClose(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New project</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the name of the new project
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="email"
                    fullWidth
                    value={name}
                    onChange={onChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={onClose(true)} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}
