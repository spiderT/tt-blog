import React from "react";
import { useRecoilState } from "recoil";
import { filterdInputValue } from "../store";

const InputA = () => {
  const [value] = useRecoilState(filterdInputValue);

  return <div>过滤数字: {value}</div>;
};

export default InputA;
