import React from 'react';
import './App.css';
import Login from './containers/Login/Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import TimeLine from './containers/Login/timeline/Timeline';
import PrivateRoute from './components/header/privateRoute/PrivateRoute';

function App(){
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Login}/>
                <PrivateRoute path="/timeline" component={TimeLine}/>
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}


export default App;