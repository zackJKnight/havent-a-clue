import React, { useEffect } from "react";
import { API_URL_PREFIX } from "../api/constants";
import { EliminateRequest } from "../api/eliminate-request";
import { Possibility } from "../api/possibility";

// take an array of strings and update possibilities
// export const useEliminate = (possibilities: Possibility[]) => {
//   const [eliminated, setEliminated] = React.useState<EliminateRequest>(eliminateRequest);
//   useEffect(() => {
    
//   } , [eliminateRequest]);
//   return eliminated;
// }