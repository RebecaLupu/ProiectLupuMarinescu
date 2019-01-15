
import React from "react";
import {render} from "react-dom";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Contact from "./Contact";
import Gen from "./Gen";

class App extends React.Component {
  render() {
    return (
      <HashRouter>
       <div>
          <h1>WonderWomen</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/signup">SignUp</NavLink></li>
            <li><NavLink to="/contact">Movies</NavLink></li>
        
          </ul>
          
           <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/contact" component={Contact}/>
            
        </div>
        </div>
        </HashRouter>
    );
  }
}

export default App;
