import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {useAuthentication} from '../hooks/useAuthentication'
import { A } from 'hookrouter';

const Login = ({useStyles}) => {
    const classes = useStyles();
    const { email, password, onEmailChange, onPasswordChange, onAuthenticate, message } = useAuthentication()

    return (
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Typography component="h1" variant="subtitle1">
                {message}
            </Typography>
            <form className={classes.form} noValidate onSubmit={onAuthenticate}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={onEmailChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={onPasswordChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <A href="/signup"  className={classes.link}>
                    {"Don't have an account? Sign Up"}
                  </A>
                </Grid>
              </Grid>
            </form>
          </div>
      );
}

export default Login
