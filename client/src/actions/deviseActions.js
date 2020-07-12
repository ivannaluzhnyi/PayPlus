import axios from 'src/utils/axios';

export const DEVISE_REQUEST = '@devise/request';
export const DEVISE_SUCCESS = '@devise/success';
export const DEVISE_FAILURE = '@devise/failure';

export function getAllDevise() {
  return async dispatch => {
    try {
      dispatch({ type: DEVISE_REQUEST });

      axios
        .get('/api/devises')
        .then(response => {
          if (response.status === 200) {
            dispatch({
              type: DEVISE_SUCCESS,
              payload: {
                devises: response.data
              }
            });
          } else {
            dispatch({ type: DEVISE_FAILURE });
            throw response.data;
          }
        })
        .catch(err => {
          dispatch({ type: DEVISE_FAILURE });
          throw err;
        });
    } catch (err) {
      dispatch({ type: DEVISE_FAILURE });

      throw err;
    }
  };
}
