import { FETCH_LOG_DATA } from "../actions/types";

const initialState = {
  logs: [],
  summary: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOG_DATA:
      return {
        ...state,
        logs: [...state.logs, action.payload],
        summary: [...state.summary, action.payload]
      };
    default:
      return state;
  }
}
