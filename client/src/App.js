import React from 'react';
import './App.css';
import {useRoutes} from 'hookrouter';
import Home from './components/Home'
import EntryForm from './components/EntryForm'
import Login from './components/Login'
import SignUp from './components/SignUp'
import PublicLayout from './components/PublicLayout'
import PrivateLayout from './components/PrivateLayout'

const routes = {
  '/': () => <PublicLayout component={Login} />,
  '/signup': () => <PublicLayout component={SignUp} />,
  '/home': () => <PrivateLayout component={Home} />,
  '/entry': () => <PrivateLayout component={EntryForm} />
};

const App = () => {
  const routeResult = useRoutes(routes);

  // return routeResult || <NotFoundPage />;
  return routeResult;
  // return (
  //   <Button variant="contained" color="primary">
  //     Hello World
  //   </Button>
  // );
}

export default App;
