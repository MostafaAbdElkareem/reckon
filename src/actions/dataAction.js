import { FETCH_LOG_DATA } from "./types";
export const fetchDate = () => dispatch => {
  fetch("https://join.reckon.com/stock-pricing")
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: FETCH_LOG_DATA,
        payload: data
      })
    );
};
