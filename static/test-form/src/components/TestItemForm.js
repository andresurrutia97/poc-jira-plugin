import React, { useCallback, useEffect, useState, useReducer } from "react";

import Input from "./Input";

const TestItemForm = ({ onAdd }) => {
  const initialState = { step: "", data: "", result: "" };

  const reducer = (state, action) => {
    switch (action.type) {
      case "setStep":
        return { ...state, step: action.value };
      case "setData":
        return { ...state, data: action.value };
      case "setResult":
        return { ...state, result: action.value };
      case "clear":
        return initialState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [isValid, setIsValid] = useState(false);

  const handleValidation = useCallback(() => {
    const { step, data, result } = state;

    setIsValid(step && data && result);
  }, [state, setIsValid]);

  useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  const handleAdd = () => {
    onAdd(state);
    dispatch({ type: "clear" });
  };

  return (
    <tr>
      <td>
        <Input
          value={state.step}
          onChange={(e) => dispatch({ type: "setStep", value: e.target.value })}
        />
      </td>
      <td>
        <Input
          value={state.data}
          onChange={(e) => dispatch({ type: "setData", value: e.target.value })}
        />
      </td>
      <td>
        <Input
          value={state.result}
          onChange={(e) =>
            dispatch({ type: "setResult", value: e.target.value })
          }
        />
      </td>
      <td>
        <button onClick={handleAdd} disabled={!isValid}>
          Add
        </button>
      </td>
    </tr>
  );
};

export default TestItemForm;
