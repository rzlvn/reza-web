import React from 'react'
// import './App.css';
import Login from './login/login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Register from './register/register';
import Forget from './login/forget';
import Dashboard from './dashboard/dashboard';
import Reset from './login/reset';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>   
        <Route exact path="/" name="Login Page" render={(props) => <Login {...props} />} />
        <Route path="/register"><Register /></Route>
        <Route path="/forget"><Forget /></Route>
        <Route path="/dashboard"><Dashboard/></Route>
        <Route path="/reset/:id"><Reset/></Route>
      </Switch>                
    </div>
    </Router> 
  );
}

export default App;
