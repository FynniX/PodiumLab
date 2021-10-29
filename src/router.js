import React from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";

import FuelCalculator from "./pages/FuelCalculator";
import CircleOfDoom from "./pages/CircleOfDoom";

class Router extends React.Component {
    render() {
        return (
            <div className="MainContainer">
                <BrowserRouter>
                    <Switch>
                        <Route path="/FuelCalculator">
                            <FuelCalculator/>
                        </Route>

                        <Route path="/CircleOfDoom">
                            <CircleOfDoom/>
                        </Route>

                        <Route exact path="/">
                            <Link to="/FuelCalculator">
                                Fuel Calculator
                            </Link>
                            <br/>
                            <Link to="/CircleOfDoom">
                                Circle Of Doom
                            </Link>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default Router;