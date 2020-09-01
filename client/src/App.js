import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Home from "./components/Home"
import Search from "./components/Search"
import StartPetition from "./components/StartPetition"
import MyPetitions from "./components/MyPetitions"
import Petitions from "./components/Petitions"
import { setUser } from './store/users'

function App() {
    const token = localStorage.getItem("SESSION_TOKEN")
    const id = localStorage.getItem("USER_ID")
    const dispatch = useDispatch()

    if (token && id) {
        dispatch(setUser(token, id))
    }
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route
                        exact path="/"
                        component={Home}
                    />
                    <Route
                        path="/start-a-petition"
                        component={StartPetition} />
                    <Route
                        path="/u/me"
                        component={MyPetitions} />
                    <Route
                        path="/petitions"
                        component={Petitions} />
                    <Route
                        path="/search"
                        component={Search} />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
