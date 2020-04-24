import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Info from './components/info';
import Pokemon from './components/Pokemon';

class Router extends Component {    
    render() { 
      return (
          <Switch>
   <Route exact path='/' component={Pokemon}/>
   <Route exact path= '/info/:pokeId' component={Info} /> 

        </Switch>
      )
    }
}
    export default Router;