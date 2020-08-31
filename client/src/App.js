import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from "./components/Home"

function App() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route
                        exact path="/"
                        component={Home}
                    >
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
