import { baseUrl } from "../config";

export const GET_TOPICS = "change/topics/GET_TOPICS";

export const fetchTopics = () => async (dispatch) => {
  const res = await fetch(`${baseUrl}/api/topics`);

  if (!res.ok) {
    throw res;
  }

  const data = await res.json();
  dispatch(getTopics(data));
};

export const getTopics = (data) => ({
  type: GET_TOPICS,
  data,
});

export default function reducer(state = {}, action) {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  switch (action.type) {
    case GET_TOPICS: {
      return action.data;
    }
    default:
      return newState;
  }
}
