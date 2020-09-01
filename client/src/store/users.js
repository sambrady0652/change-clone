//REQUISITE IMPORTS HERE
import { baseUrl } from '../config';

//ACTION TYPES AND LOCAL STORAGE ASSIGNMENTS
const REMOVE_TOKEN = 'change/users/REMOVE_TOKEN';
const SET_USER = 'change/users/SET_USER';
const SESSION_TOKEN = 'SESSION_TOKEN';
const USER_ID = 'USER_ID';

//SIGN IN 
export const signIn = (email, password) => async dispatch => {
  try {
    //Retrieve Information from Server
    const response = await fetch(`${baseUrl}/api/users/signin`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    console.log(response)
    if (!response.ok) {
      throw response;
    }
    //Place token in Local Storage, update Redux State
    const { access_token } = await response.json();
    localStorage.setItem(SESSION_TOKEN, access_token);
    // dispatch(setUser(token, user));
  }
  catch (err) {
    console.error(err);
  }
}

//SIGN UP 
export const signUp = (firstName, lastName, email, password) => async dispatch => {
  try {
    const formData = new FormData();
    formData.append("first_name", firstName)
    formData.append("last_name", lastName)
    formData.append("email", email)
    formData.append("password", password)
    // if (profPic !== "") {
    //   formData.append("profPic", profPic, `${firstName}-profpic`)
    // }

    const response = await fetch(`${baseUrl}/api/signup`, {
      method: 'post',
      body: formData
    });
    console.log(response)
    if (!response.ok) {
      throw response
    }
    //Place token in Local Storage, update Redux State
    const { access_token, user } = await response.json();
    localStorage.setItem(SESSION_TOKEN, access_token);
    // localStorage.setItem(USER_ID, user.id);
    // dispatch(setUser(token, user));
  }
  catch (err) {
    console.error(err);
  }
}

//SIGN OUT
export const signOut = () => async (dispatch) => {
  localStorage.removeItem(SESSION_TOKEN);
  localStorage.removeItem(USER_ID);
  // dispatch(removeToken())
}

//LOAD USER INFO

//ACTION CREATOR FUNCTIONS


export default function reducer(state = {}, action) {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  switch (action.type) {
    // INSERT CASES HERE 
    default: return state;
  }
}