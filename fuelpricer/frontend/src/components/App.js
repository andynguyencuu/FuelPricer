import React, { Component} from "react";
import { Switch, Route, Link } from "react-router-dom";
import Splash from "./Splash";
import Registration from "./Registration";
import Dashboard from "./Dashboard";
import ProfileManagement from "./ProfileManagement";
import FuelQuoteForm from "./FuelQuoteForm";
import FuelQuoteHistory from "./FuelQuoteHistory";
import "../icons.js";


class App extends Component {
    render() {
        return (
            <div className="site">
                <main>
                    <Switch>
                        <Route exact path={"/Splash/"} component={Splash}/>
                        <Route exact path={"/Registration/"} component={Registration}/>
                        <Route exact path={"/Dashboard/"} component={Dashboard}/>
                        <Route exact path={"/Profile/"} component={ProfileManagement}/>
                        <Route exact path={"/QuoteForm/"} component={FuelQuoteForm}/>
                        <Route exact path={"/QuoteHistory/"} component={FuelQuoteHistory}/>
                        <Route path={"/"} component={Splash}/>
                   </Switch>
               </main>
            </div>
        );
    }
}

export default App;