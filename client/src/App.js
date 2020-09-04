import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Home from "./components/Home"
import Search from "./components/Search"
import UpdateForm from "./components/UpdateForm"
import StartPetition from "./components/StartPetition"
import MyPetitions from "./components/MyPetitions"
import Petitions from "./components/Petitions"
import SettingsPage from "./components/SettingsPage"
import { fetchUserDetails } from './store/auth'
import PetitionDetails from './components/PetitionDetails';

function App() {
    const token = localStorage.getItem("SESSION_TOKEN")
    const id = localStorage.getItem("USER_ID")
    const dispatch = useDispatch()

    useEffect(() => {
        if (token && id) {
            dispatch(fetchUserDetails(token, id))
        }
    })

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
                        path="/p/:header"
                        component={PetitionDetails} />
                    <Route
                        path="/search"
                        component={Search} />
                    <Route
                        path="/settings"
                        component={SettingsPage} />
                    <Route
                        path="/*/updateform"
                        component={UpdateForm} />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
