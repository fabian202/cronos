import React from 'react'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

export default function Calendar({date, onChange}) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date"
            value={date}
            onChange={onChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
  
        </Grid>
      </MuiPickersUtilsProvider>
    )
}
