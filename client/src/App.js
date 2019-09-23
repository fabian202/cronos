import React, { useReducer } from 'react';
import './App.css';
import {useRoutes} from 'hookrouter';
import Home from './components/Home'
import EntryForm from './components/EntryForm'
import Login from './components/Login'
import SignUp from './components/SignUp'
import PublicLayout from './components/PublicLayout'
import PrivateLayout from './components/PrivateLayout'
import { EntryProvider } from './providers/entryProvider';
import { entryReducer } from './reducers/entryReducer';
const initialState = {
  entries: []
};

const routes = {
  '/': () => <PublicLayout component={Login} />,
  '/signup': () => <PublicLayout component={SignUp} />,
  '/home': () => <PrivateLayout component={Home} />,
  '/entry': () => <PrivateLayout component={EntryForm} />
};

const App = () => {
  const routeResult = useRoutes(routes);

  const state = useReducer(entryReducer, initialState);

  return (
    <EntryProvider value={state}>
      {routeResult}
    </EntryProvider>
  );
  // return routeResult;
}

export default App;
