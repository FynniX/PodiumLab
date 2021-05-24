import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './styles/index.css';

import CircleOfDoom from "./pages/CircleOfDoom";
import WeatherApp from "./pages/WeatherApp";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Route exact path="/CircleOfDoom">
                <CircleOfDoom/>
            </Route>
            <Route exact path="/WeatherApp">
                <WeatherApp/>
            </Route>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
