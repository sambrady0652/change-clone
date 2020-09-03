//REQUISITE IMPORTS
import { baseUrl } from '../config';
import { signUp } from './auth';

//VARIABLE DECLARATIONS
const GET_PETITIONS = 'change/petitions/GET_PETITIONS';
// const CREATE_PETITION = 'change/petitions/CREATE_PETITION';

//FETCH ALL PETITIONS 
export const fetchPetitions = () => async dispatch => {
  const response = await fetch(`${baseUrl}/api/petitions`)
  if (!response.ok) {
    throw response;
  }

  const data = await response.json()
  dispatch(getPetitions(data))
}

//SIGN PETITION
//GUEST SIGN PETITION
export const guestSignPetition = (firstName, lastName, email, password, message, petitionId) => async dispatch => {
  //Must wait until an Account is created before Signing Petitions
  await dispatch(signUp(firstName, lastName, email, password))
  //Once an account is created, we pull the account id from Local Storage
  const id = Number(localStorage.getItem("USER_ID"))
  //Dispatch the userSignPetition below to complete petition signature
  dispatch(userSignPetition(id, message, petitionId))
}

//USER SIGN PETITION
export const userSignPetition = (user_id, message, petition_id) => async dispatch => {
  const body = { user_id, message }
  await fetch(`${baseUrl}/api/petitions/${petition_id}/signatures`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  dispatch(fetchPetitions())
}

//ACTION CREATORS
export const getPetitions = (data) => ({
  type: GET_PETITIONS,
  data
})

//REDUCER
export default function reducer(state = {}, action) {
  Object.freeze(state)
  const newState = Object.assign({}, state);
  switch (action.type) {
    case GET_PETITIONS: {
      return action.data
    }
    default: return newState
  }
}