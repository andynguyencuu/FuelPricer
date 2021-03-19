import React, { Component} from "react";
import { Switch, Route, Link } from "react-router-dom";
import Splash from "./Splash";
import Signup from "./signup";
import "../icons.js";

class App extends Component {
    render() {
        return (
            <div className="site">
                <main>
                    <h1>Ahhh after 10,000 years I'm free. Time to conquer the Earth!</h1>
                    <Switch>
                        <Route exact path={"/Splash/"} component={Splash}/>
                        <Route exact path={"/signup/"} component={Signup}/>
                        <Route path={"/"} component={Splash}/>
                   </Switch>
               </main>
            </div>
        );
    }
}

export default App;