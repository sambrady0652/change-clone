//REQUISITE IMPORTS
import { apiUrl } from '../config';
import { signUp, fetchUserDetails } from './auth';

//VARIABLE DECLARATIONS
const GET_PETITION = 'change/petitions/GET_PETITION';
// const CREATE_PETITION = 'change/petitions/CREATE_PETITION';

//FETCH PETITION
export const fetchPetitionDetails = (header) => async dispatch => {
  const response = await fetch(`${apiUrl}/petitions/${header}`)
  if (!response.ok) {
    throw response;
  }

  const data = await response.json()
  const { creator } = data
  const creatorData = await fetchCreator(creator)
  dispatch(getPetition(data, creatorData))
}

//GET CREATOR DETAILS
export const fetchCreator = async (id) => {
  const response = await fetch(`${apiUrl}/users/creator/${id}`)
  if (!response.ok) {
    throw response;
  }
  const creator = await response.json()
  return creator
}

//SIGN PETITION
//GUEST SIGN PETITION
export const guestSignPetition = (firstName, lastName, email, password, message, petitionId, header) => async dispatch => {
  //Must wait until an Account is created before Signing Petitions
  await dispatch(signUp(firstName, lastName, email, password))
  //Once an account is created, we pull the account id from Local Storage
  const id = Number(localStorage.getItem("USER_ID"))
  //Dispatch the userSignPetition below to complete petition signature
  dispatch(userSignPetition(id, message, petitionId, header))
}

//USER SIGN PETITION
export const userSignPetition = (user_id, message, petition_id, header) => async dispatch => {
  const body = { user_id, message }
  await fetch(`${apiUrl}/petitions/${petition_id}/signatures`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  //UPDATE REDUX
  const id = Number(localStorage.getItem("USER_ID"))
  const token = localStorage.getItem("SESSION_TOKEN")
  dispatch(fetchUserDetails(token, id))
  dispatch(fetchPetitionDetails(header))
}

//ACTION CREATORS
export const getPetition = (data, creatorData) => {
  const { id, description, current, goal, header, signatures, image_url } = data
  return ({
    type: GET_PETITION,
    id,
    description,
    creator: creatorData,
    current,
    goal,
    header,
    signatures,
    image_url
  })
}

//REDUCER
export default function reducer(state = { creator: {} }, action) {
  Object.freeze(state)
  const newState = Object.assign({}, state);
  switch (action.type) {
    case GET_PETITION: {
      return {
        id: action.id,
        description: action.description,
        creator: action.creator,
        current: action.current,
        goal: action.goal,
        header: action.header,
        signatures: action.signatures,
        image_url: action.image_url
      }
    }
    default: return newState
  }
}