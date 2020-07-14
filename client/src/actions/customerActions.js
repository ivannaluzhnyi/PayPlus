import axios from 'src/utils/axios';

export const CHNAGE_STATE_CUSTOMER = '@customer/update-state';
export const LOAD_KBIS_CUSTOMER = '@customer/load-kbis';

export function changeStateCustomer(customerId, state) {
  return dispatch => {
    dispatch({ type: CHNAGE_STATE_CUSTOMER });
    const request = axios.put(`/api/users/change-user-status/${customerId}`, {
      state
    });

    request.then(response => {});
  };
}
