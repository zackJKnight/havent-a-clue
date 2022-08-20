import React from "react";
import { useEffect } from "react";
import { API_URL_PREFIX } from "../api/constants";
import { Possibility } from "../api/possibility";

export const usePossibilities = (): [Possibility[], (value: Possibility[]) => void] => {
  const [possibilities, setPossibilities] = React.useState<Possibility[]>([]);
  useEffect(() => {
    const fetchPossibilities = async () => {
      const response = await fetch(`${API_URL_PREFIX}/newgame`);
      const possibilities = await response.json();
      setPossibilities(possibilities);
    };
    fetchPossibilities();
  } , []);
  return [possibilities, setPossibilities];
}