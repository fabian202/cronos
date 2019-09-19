import React, { useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { A, navigate } from 'hookrouter';
import {checkCookie} from '../cookies'

const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
      ul: {
        margin: 0,
        padding: 0,
      },
      li: {
        listStyle: 'none',
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      marginBottom: theme.spacing(2),
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
      textDecoration: 'none',
      textTransform: 'uppercase',
      color: 'rgba(0, 0, 0, 0.87)'
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
      backgroundColor: theme.palette.grey[200],
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing(2),
    },
    content: {
        alignItems: 'flex-start'
    }
}));

export default function PrivateLayout({ component }) {
    const Component = component;
    const classes = useStyles();

    useEffect(() => {
      console.log(checkCookie(), new Date().getTime())
      const token = checkCookie()
      const now = new Date().getTime()

      if(!token || now > token.exp * 1000) {
        setTimeout(() => {
          navigate('/')
        }, 200);
      } 
      
    }, [])

    return (
        <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Cronos
          </Typography>
          <nav>

          </nav>
          <Button href="/" color="primary" variant="outlined" className={classes.link}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
          <Component />
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">

        </Grid>
        <Box mt={5}>
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
    )
}
