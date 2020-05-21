import React from "react";
import { useRecoilState } from "recoil";
import { inputValueState } from "../store";

const InputA = () => {
  const [value, setValue] = useRecoilState(inputValueState);

  return <input value={value} onChange={e => setValue(e.target.value)} />;
};

export default InputA;
