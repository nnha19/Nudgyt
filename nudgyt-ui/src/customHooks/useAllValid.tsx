import { useEffect, useState } from "react";
import { IInputVals } from "../components/Auth/Auth";

const useAllValid = (inputVals: IInputVals) => {
  const [allValid, setAllValid] = useState(false);

  useEffect(() => {
    const valid = [];
    for (let key in inputVals) {
      valid.push(inputVals[key as keyof IInputVals]?.error ? false : true);
    }
    setAllValid(valid.every((v) => v));
  }, [inputVals]);

  return allValid;
};

export default useAllValid;
