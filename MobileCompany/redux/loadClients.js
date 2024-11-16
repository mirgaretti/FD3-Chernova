import { requestStarted, requestFailed, requestSucceeded } from "./clientSlice.js";

export async function loadClients(dispatch) {
    try {
      dispatch(requestStarted());
      const response = await fetch("https://fe.it-academy.by/Examples/mobile_company.json");
      if ( response.ok ) {
        const data = await response.json();
        dispatch(requestSucceeded(data));
      }
      else {
        dispatch(requestFailed(response.statusText));
      }
    }
    catch ( err ) {
      dispatch( requestFailed(err.message) );
    }
};
