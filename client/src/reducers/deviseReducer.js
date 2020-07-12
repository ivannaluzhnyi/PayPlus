/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  DEVISE_FAILURE,
  DEVISE_REQUEST,
  DEVISE_SUCCESS
} from 'src/actions/deviseActions';

const initialState = {
  devises: null
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEVISE_REQUEST: {
      return produce(state, draft => {
        // Ensure we clear current session
        draft.devises = null;
      });
    }

    case DEVISE_SUCCESS: {
      const { devises } = action.payload;

      return produce(state, draft => {
        draft.devises = devises;
      });
    }

    case DEVISE_FAILURE: {
      return produce(state, () => {
        // Maybe store error
      });
    }

    default: {
      return state;
    }
  }
};

export default accountReducer;
