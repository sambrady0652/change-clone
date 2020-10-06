import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Footer from './components/Footer'
import Home from "./components/Home"
import Search from "./components/Search"
import UpdateForm from "./components/UpdateForm"
import UpdatesBox from "./components/UpdatesBox"
import UpdateCard from "./components/UpdateCard"
import StartPetition from "./components/StartPetition"
import MyPetitions from "./components/MyPetitions"
import Petitions from "./components/Petitions"
import SettingsPage from "./components/SettingsPage"
import PetitionDetails from './components/PetitionDetails';
import { fetchUserDetails } from './store/auth'
import Navbar from './components/Navbar'

function App() {
  const token = localStorage.getItem("SESSION_TOKEN");
  const id = localStorage.getItem("USER_ID");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && id) {
      dispatch(fetchUserDetails(token, id))
    }
  })

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch >
          <Route
            exact path="/"
            component={Home}
          />
          <Route
            exact path="/start-a-petition"
            component={StartPetition} />
          <Route
            exact path="/u/me"
            component={MyPetitions} />
          <Route
            exact path="/petitions"
            component={Petitions} />
          <Route
            exact path="/p/:id"
            component={PetitionDetails} />
          <Route
            exact path="/search"
            component={Search} />
          <Route
            exact path="/settings"
            component={SettingsPage} />
          <Route
            path="/p/:id/updateform"
            component={UpdateForm} />
          <Route
            path="/p/:id/updates"
            component={UpdatesBox} />
          <Route
            path="/:petitionId/update/:updateId"
            component={UpdateCard} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
