import React, {Component} from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./icons.js";
import Dashboard from "./Dashboard";
import FuelQuoteForm from "./FuelQuoteForm";
import FuelQuoteHistory from "./FuelQuoteHistory";
import ProfileManagement from "./ProfileManagement";
import Registration from "./Registration";
import Splash from "./Splash";

class App extends Component {
  render() {
    return (
  
      <div className="site">  
        <nav>
          <Link className={"nav-link"} to={"/"}>Home</Link>
          <Link className={"nav-link"} to={"/Splash/"}>Login</Link>
          <Link className={"nav-link"} to={"/Registration/"}>Signup</Link>
        </nav>
        <main>
          <Switch>
            {/* <Route path={"/"} render={() => <div>Home again</div>} /> */}
            <Route exact path={"/Dashboard/"} component={Dashboard} />
            <Route exact path={"/FuelQuoteForm/"} component={FuelQuoteForm} />
            <Route exact path={"/FuelQuoteHistory/"} component={FuelQuoteHistory} />
            <Route exact path={"/ProfileManagement/"} component={ProfileManagement} />
            <Route exact path={"/Registration/"} component={Registration} />
            <Route exact path={"/Splash/"} component={Splash} />
            <Route path={"/"} component={Splash} />
          </Switch>
        </main>
      </div>

    );
  }
}

export default App;
