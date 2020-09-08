//REQUISITE IMPORTS
import { apiUrl } from '../config';

//VARIABLE DECLARATIONS
const GET_PETITIONS = 'change/petitions/GET_PETITIONS';
const GET_FEATURED = 'change/petitions/GET_FEATURED';
const GET_POPULAR = 'change/petitions/GET_POPULAR';
const GET_RECENT = 'change/petitions/GET_RECENT';
// const CREATE_PETITION = 'change/petitions/CREATE_PETITION';

//FETCH ALL PETITIONS 
export const fetchPetitions = () => async dispatch => {
  const response = await fetch(`${apiUrl}/petitions`)
  if (!response.ok) {
    throw response;
  }

  const data = await response.json()
  dispatch(getPetitions(data))
}

export const fetchFeatured = () => async dispatch => {
  const response = await fetch(`${apiUrl}/petitions/featured`)
  if (!response.ok) {
    throw response;
  }

  const data = await response.json()
  dispatch(getFeatured(data.petitions))
}

export const fetchPopular = () => async dispatch => {
  const response = await fetch(`${apiUrl}/petitions/popular`)
  if (!response.ok) {
    throw response;
  }

  const data = await response.json()
  dispatch(getPopular(data.petitions))
}

export const fetchRecent = () => async dispatch => {
  const response = await fetch(`${apiUrl}/petitions/recent`)
  if (!response.ok) {
    throw response;
  }

  const data = await response.json()
  dispatch(getRecent(data.petitions))
}

export const postPetition = data => async dispatch => {
  const formData = new FormData()
  Object.keys(data).forEach(key => formData.append(key, data[key]))
  const response = await fetch(`${apiUrl}/petitions`, { method: 'post', body: formData })
  if (!response.ok) {
    throw response;
  }
}

//ACTION CREATORS
export const getPetitions = (data) => ({
  type: GET_PETITIONS,
  data
})

export const getFeatured = (data) => ({
  type: GET_FEATURED,
  data
})

export const getPopular = (data) => ({
  type: GET_POPULAR,
  data
})

export const getRecent = (data) => ({
  type: GET_RECENT,
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
    case GET_FEATURED: {
      return { ...state, featured: action.data }
    }
    case GET_POPULAR: {
      return { ...state, popular: action.data }
    }
    case GET_RECENT: {
      return { ...state, recent: action.data }
    }
    default: return newState
  }
}