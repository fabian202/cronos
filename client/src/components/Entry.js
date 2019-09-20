import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    billable: {
      color: 'green',
      fontWeight: 'bold'
    }
}));

export default function Entry({ entry, onDelete }) {
    const classes = useStyles();

    return (
        <ListItem>
            <ListItemText
                primary={entry.comment}
                secondary={
                <React.Fragment>
                    <Typography component="span" variant="body2" className={entry.billable ? classes.billable : null} color="textSecondary">
                        $ 
                    </Typography>
                    <Typography component="span" variant="body2" color="textPrimary">
                        {` ${entry.hours} hours`}
                    </Typography>
                </React.Fragment>
                }
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => onDelete(entry._id)} >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}
