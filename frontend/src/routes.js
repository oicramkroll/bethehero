import React from  'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncidente from './pages/NewIncidente';

export default ()=>{
    return(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Logon} />
            <Route path="/register" component={Register }/>
            <Route path="/profile" component={Profile} />
            <Route path="/incidentes/new" component={NewIncidente} />
        </Switch>
    </BrowserRouter>
    );
}