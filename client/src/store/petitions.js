//REQUISITE IMPORTS
import { baseUrl } from '../config';

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

export const postPetition = data => async dispatch => {
  const formData = new FormData()
  Object.keys(data).forEach(key => formData.append(key, data[key]))
  const response = await fetch(`${baseUrl}/api/petitions`, { method: 'post', body: formData })
  if (!response.ok) {
    throw response;
  }
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