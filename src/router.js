import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

import FuelCalculator from "./pages/FuelCalculator";

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/FuelCalculator">
                        <FuelCalculator/>
                    </Route>

                    <Route exact path="/">
                        <Link to="/FuelCalculator">
                            Fuel Calculator
                        </Link>
                    </Route>
                </Switch>

                <img style={{width: "100%", height: "100%", position: "absolute", top: 0, bottom: 0, left: 0, right: 0, margin: "auto", zIndex: -1}} src="content/img/20210214222734_1-1024x576.jpg" alt=""/>

                <Link to="/">
                    <span style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0
                    }}>
                        Go Back
                    </span>
                </Link>
            </BrowserRouter>
        )
    }
}

export default Router;