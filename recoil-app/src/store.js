import { atom, selector } from "recoil";

const inputValueState = atom({
  key: "inputValueState",
  default: ""
});

const filterdInputValue = selector({
  key: "filterdInputValue",
  get: ({ get }) => {
    const inputValue = get(inputValueState);
    return inputValue.replace(/[0-9]/gi, "");
  }
});

export { inputValueState, filterdInputValue };
