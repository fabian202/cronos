import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useAddEntry } from '../hooks/useAddEntry'
import { useProjectList } from '../hooks/useProjectList';
import { useAddProject } from '../hooks/useAddProject'
import ProjectDialog from './ProjectDialog'

const useStyles = makeStyles(theme => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    link: {
        textDecoration: 'none', 
        color: '#3f51b5'
    }
  }));

export default function EntryForm() {
    const classes = useStyles()
    const { values, setValues, handleChange, handleCheck, handleSubmit } = useAddEntry();
    const { name, newProject, setNewProject, handleNameChange, handleNewProject } = useAddProject();
    const { projects, setProjects } = useProjectList()

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(newProject) {
            setProjects(projects => [...projects, newProject])
            setNewProject(null)
            setValues({...values, project: newProject._id})
        }
    }, [newProject])

    function handleClickOpen() {
        setOpen(true);
    }

    const handleClose = save => event => {
        if(save) {
            handleNewProject(event)
        }
        setOpen(false);
    }

    return (
        <div>
            <form  noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="center" >
                <Grid item xs={10}>
                  <FormControl variant="outlined" className={classes.form}>
                    <InputLabel htmlFor="outlined-project">
                      Project
                    </InputLabel>
                    <Select fullWidth
                      value={values.project}
                      onChange={handleChange('project')}
                      inputProps={{
                        name: 'project',
                        id: 'outlined-project',
                      }}
                    >
                      <MenuItem value="">
                        <em>Select project</em>
                      </MenuItem>
                      {projects.map(project => (
                          <MenuItem value={project._id} key={project._id}>{project.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Add
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="hours"
                    variant="outlined"
                    type="number"
                    required
                    fullWidth
                    id="hours"
                    label="Hours"
                    value={values.hours}
                    onChange={handleChange('hours')}
                  />
                </Grid>
                <FormControlLabel
                    control={<Checkbox checked={values.billable} value="billable" onChange={handleCheck('billable')} color="primary" />}
                    label="Billable"
                />
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="comment"
                    label="Comment"
                    name="comment"
                    value={values.comment}
                    onChange={handleChange('comment')}
                    multiline
                      rowsMax="4"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save
              </Button>
            </form>
            <ProjectDialog name={name} open={open} onChange={handleNameChange} onClose={handleClose} />
        </div>
    )
}
