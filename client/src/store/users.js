//REQUISITE IMPORTS HERE
import { baseUrl } from '../config';

//ACTION TYPES AND LOCAL STORAGE ASSIGNMENTS
const REMOVE_USER = 'change/users/REMOVE_USER';
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

    if (response.status !== 200) {
      throw response;
    }
    //Place token in Local Storage, update Redux State
    const { access_token, id } = await response.json();
    localStorage.setItem(SESSION_TOKEN, access_token);
    localStorage.setItem(USER_ID, id);
    dispatch(setUser(access_token, id));
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

    const response = await fetch(`${baseUrl}/api/users/signup`, {
      method: 'post',
      body: formData
    });

    if (response.status !== 200) {
      throw response
    }
    //Place token in Local Storage, update Redux State
    const { access_token, id } = await response.json();
    localStorage.setItem(SESSION_TOKEN, access_token);
    localStorage.setItem(USER_ID, id);
    dispatch(setUser(access_token, id));
  }
  catch (err) {
    console.error(err);
  }
}

//SIGN OUT
export const signOut = () => async (dispatch) => {
  localStorage.removeItem(SESSION_TOKEN);
  localStorage.removeItem(USER_ID);
  dispatch(removeUser())
}

//LOAD USER INFO

//ACTION CREATOR FUNCTIONS
export const setUser = (access_token, id) => ({
  type: SET_USER,
  access_token,
  id
});

export const removeUser = () => ({
  type: REMOVE_USER
})

export default function reducer(state = { needSignIn: true }, action) {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_USER: {
      return {
        token: action.access_token,
        id: action.id,
        needSignIn: false
      }
    }
    case REMOVE_USER: {
      return {
        needSignIn: true
      }
    }
    default: return newState;
  }
}