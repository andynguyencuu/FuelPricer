import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./icons.js";
import Dashboard from "./Dashboard";
import FuelQuoteForm from "./FuelQuoteForm";
import FuelQuoteHistory from "./FuelQuoteHistory";
import ProfileManagement from "./ProfileManagement";
import Registration from "./Registration";
import Splash from "./Splash";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Splash} />
      <Route path="/Dashboard/" exact component={Dashboard} />
      <Route path="/FuelQuoteForm/" exact component={FuelQuoteForm} />
      <Route path="/FuelQuoteHistory/" exact component={FuelQuoteHistory} />
      <Route path="/ProfileManagement/" exact component={ProfileManagement} />
      <Route path="/Registration/" exact component={Registration} />
      <Route path="/Splash/" exact component={Splash} />
    </Router>
  );
}

export default App;
