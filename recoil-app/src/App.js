import React from "react";
import { RecoilRoot } from "recoil";
import InputA from "./components/InputA";
import InputB from "./components/InputB";
import FilteredValue from "./components/FilteredValue";

export default function App() {
  return (
    <RecoilRoot>
      <h1>输入框 A</h1>
      <InputA />
      <br />
      <h1>输入框 B</h1>
      <InputB />
      <FilteredValue />
    </RecoilRoot>
  );
}
