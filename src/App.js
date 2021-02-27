import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./icons.js";
import Dashboard from "./screens/Dashboard";
import FuelQuoteForm from "./screens/FuelQuoteForm";
import FuelQuoteHistory from "./screens/FuelQuoteHistory";
import ProfileManagement from "./screens/ProfileManagement";
import Registration from "./screens/Registration";
import Splash from "./screens/Splash";
import "./style.css";

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
