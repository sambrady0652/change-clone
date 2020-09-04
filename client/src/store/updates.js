// import { baseUrl } from '../config';

// const SET_UPDATE = 'change/updates/SET_UPDATE';


// export const createUpdate = (header, content, mediaurl) => async dispatch => {
//   try {
//     const formData = new FormData();
//     formData.append("header", header)
//     formData.append("content", content)
//     formData.append("mediaurl", mediaurl)

//     const response = await fetch(`${baseUrl}/api/*/updates`, {
//       method: 'post',
//       body: formData
//     });

//     if (!response.ok) {
//       throw response
//     }
//     //Place token in Local Storage, update Redux State
//     const { access_token, id } = await response.json();
//     dispatch(setUser(access_token, id));
//   }
//   catch (err) {
//     const errJSON = await err.json()
//     dispatch(handleAuthErrors(errJSON))
//   }
// }
// export default function reducer(state = {}, action) {
//   return state
// }

