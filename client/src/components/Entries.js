import React from 'react'
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Entry from './Entry'

const useStyles = makeStyles(theme => ({
    cardHeader: {
      backgroundColor: theme.palette.grey[200],
    },
}));

export default function Entries({ entries, onDelete }) {
    const classes = useStyles();

    return (
        <React.Fragment>
            {entries.map(project => (
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
                                    <Entry  key={entry._id} entry={entry} onDelete={onDelete} />
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </React.Fragment>
    )
}
